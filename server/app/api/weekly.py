from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query

from app.core.deps import get_current_clinician
from app.models.database import Worker, WeeklyRecommendation
from app.schemas.weekly import NotLinkedOut, WeeklyRecommendationOut, WeeklyTaskOut
from app.services import sinoai_client
from app.services.llm_service import LlmNotConfiguredError, LlmResponseError, generate_weekly_recommendation

router = APIRouter(prefix="/patients", tags=["weekly-recommendation"], dependencies=[Depends(get_current_clinician)])


def _is_lang(v: str) -> bool:
    return v in ("uz", "ru", "en")


def _iso_week_of(date: datetime) -> tuple[int, int]:
    """ISO-8601 week number (1-53) and its ISO year, per the standard Thursday-anchored algorithm."""
    iso = date.isocalendar()
    return iso.year, iso.week


@router.get("/{worker_id}/weekly-recommendation")
async def get_weekly_recommendation(worker_id: str, lang: str = Query(default="en")):
    lang = lang if _is_lang(lang) else "en"

    worker = await Worker.get_or_none(id=worker_id)
    if not worker:
        raise HTTPException(status_code=404, detail="Not found")

    if not worker.sinoai_user_id:
        return NotLinkedOut()

    if not sinoai_client.is_configured():
        raise HTTPException(status_code=503, detail="The SinoAI data source is not configured on this server yet (missing SINOAI_API_KEY).")

    iso_year, iso_week = _iso_week_of(datetime.now(timezone.utc))

    cached = await WeeklyRecommendation.get_or_none(worker_id=worker.id, iso_year=iso_year, iso_week=iso_week)
    if cached:
        return WeeklyRecommendationOut(
            iso_year=cached.iso_year,
            iso_week=cached.iso_week,
            summary=cached.summary,
            tasks=[WeeklyTaskOut(**t) for t in cached.tasks],
            generated_at=cached.generated_at,
        )

    try:
        source_data = await sinoai_client.get_weekly_source_data(worker.sinoai_user_id)
        result = await generate_weekly_recommendation(
            full_name=f"{worker.first_name} {worker.last_name}",
            job=worker.job,
            description=worker.description,
            language=lang,
            source_data=source_data,
        )
    except LlmNotConfiguredError:
        raise HTTPException(status_code=503, detail="Weekly recommendations are not configured on this server yet (missing OPENAI_API_KEY).")
    except LlmResponseError as err:
        raise HTTPException(status_code=502, detail=str(err))

    tasks = [{"id": f"{iso_year}-{iso_week}-{i}", "text": text} for i, text in enumerate(result["tasks"])]
    generated_at = datetime.now(timezone.utc)

    await WeeklyRecommendation.create(
        worker_id=worker.id,
        iso_year=iso_year,
        iso_week=iso_week,
        summary=result["summary"],
        tasks=tasks,
        generated_at=generated_at,
    )

    return WeeklyRecommendationOut(
        iso_year=iso_year,
        iso_week=iso_week,
        summary=result["summary"],
        tasks=[WeeklyTaskOut(**t) for t in tasks],
        generated_at=generated_at,
    )
