import hashlib
import json
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query

from app.core.deps import get_current_clinician
from app.models.database import Insight, Worker
from app.schemas.insights import InsightsResultOut, NotApplicableOut
from app.services.llm_service import LlmNotConfiguredError, LlmResponseError, generate_insights

router = APIRouter(prefix="/patients", tags=["insights"], dependencies=[Depends(get_current_clinician)])

DOMAIN_LABEL = {"diabetes": "Diabetes", "cvd": "Cardiovascular disease", "oncology": "Oncology screening signal"}
DOMAIN_KEYS = ["diabetes", "cvd", "oncology"]


def _is_lang(v: str) -> bool:
    return v in ("uz", "ru", "en")


@router.post("/{worker_id}/insights")
async def post_insights(worker_id: str, lang: str = Query(default="en")):
    lang = lang if _is_lang(lang) else "en"

    worker = await Worker.get_or_none(id=worker_id)
    if not worker:
        raise HTTPException(status_code=404, detail="Not found")

    if not worker.assessed:
        return NotApplicableOut()

    domains = worker.domains or {}
    domain_inputs = [
        {"label": DOMAIN_LABEL[d], "percent": domains[d]["percent"], "band": domains[d]["band"]}
        for d in DOMAIN_KEYS
        if domains.get(d, {}).get("applicable")
    ]

    input_hash = hashlib.sha256(
        json.dumps(
            {
                "job": worker.job,
                "description": worker.description,
                "domains": domain_inputs,
                "lang": lang,
                "age": worker.age,
                "sex": worker.sex.value,
            },
            sort_keys=True,
        ).encode("utf-8")
    ).hexdigest()

    cached = await Insight.get_or_none(worker_id=worker.id, lang=lang)
    if cached and cached.input_hash == input_hash:
        return InsightsResultOut(
            risk_overview=cached.risk_overview,
            suggestion=cached.suggestion,
            generated_at=cached.generated_at,
            input_hash=cached.input_hash,
        )

    try:
        result = await generate_insights(
            full_name=f"{worker.first_name} {worker.last_name}",
            job=worker.job,
            description=worker.description,
            age=worker.age,
            sex=worker.sex.value,
            domains=domain_inputs,
            language=lang,
        )
    except LlmNotConfiguredError:
        raise HTTPException(status_code=503, detail="AI insights are not configured on this server yet (missing OPENAI_API_KEY).")
    except LlmResponseError as err:
        raise HTTPException(status_code=502, detail=str(err))

    generated_at = datetime.now(timezone.utc)
    if cached:
        cached.risk_overview = result["riskOverview"]
        cached.suggestion = result["suggestion"]
        cached.input_hash = input_hash
        cached.generated_at = generated_at
        await cached.save()
    else:
        await Insight.create(
            worker_id=worker.id,
            lang=lang,
            risk_overview=result["riskOverview"],
            suggestion=result["suggestion"],
            input_hash=input_hash,
            generated_at=generated_at,
        )

    return InsightsResultOut(
        risk_overview=result["riskOverview"],
        suggestion=result["suggestion"],
        generated_at=generated_at,
        input_hash=input_hash,
    )
