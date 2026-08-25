from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query

from app.core.deps import get_current_clinician, require_role
from app.models.database import ClinicianRole, Worker, WorkerSex
from app.schemas.worker import DomainBandCounts, NewWorkerInput, OverviewStatsOut, PatientOut, UpdateWorkerInput

router = APIRouter(prefix="/patients", tags=["patients"], dependencies=[Depends(get_current_clinician)])

DOMAIN_KEYS = ["diabetes", "cvd", "oncology"]
DOMAIN_METHOD = {"diabetes": "CANRISK", "cvd": "SCORE2", "oncology": "SIGNAL_COUNT"}

_PENDING_TEXT = {
    "uz": "Ushbu xodim hali SinoAI sog‘liq skriningidan o‘tmagan — ma’lumotlar mavjud bo‘lgach shu yerda ko‘rinadi.",
    "ru": "Этот сотрудник ещё не прошёл скрининг здоровья SinoAI — данные появятся здесь после прохождения.",
    "en": "This worker has not been through SinoAI's health screening yet — data will appear here once they have.",
}


def _split_full_name(full_name: str) -> tuple[str, str]:
    parts = full_name.strip().split()
    if not parts:
        return full_name, "—"
    first, rest = parts[0], parts[1:]
    return first, (" ".join(rest) or "—")


def _to_patient_out(w: Worker) -> PatientOut:
    return PatientOut(
        id=str(w.id),
        first_name=w.first_name,
        last_name=w.last_name,
        age=w.age,
        sex=w.sex,
        region=w.region,
        phone=w.phone,
        enrolled_at=w.enrolled_at,
        photo_url=w.photo_url,
        job=w.job,
        description=w.description,
        insurance_number=w.insurance_number,
        assessed=w.assessed,
        sinoai_user_id=w.sinoai_user_id,
        measurements=w.measurements,
        domains=w.domains,
    )


def _domain_band_of(patient: PatientOut, domain: str) -> tuple[bool, str | None]:
    """Returns (applicable, band) for one domain of an already-shaped `domains` JSON blob."""
    result = patient.domains.get(domain) or {}
    return bool(result.get("applicable")), result.get("band")


# NOTE: "/overview-stats" MUST be declared before "/{id}" — otherwise FastAPI
# would match it against the "{id}" path parameter first.
@router.get("/overview-stats", response_model=OverviewStatsOut)
async def overview_stats():
    workers = await Worker.all()
    patients = [_to_patient_out(w) for w in workers]

    per_domain = {d: {"low": 0, "moderate": 0, "high": 0, "notApplicable": 0} for d in DOMAIN_KEYS}
    needs_attention = 0
    normal_users = 0

    for p in patients:
        has_high = False
        all_low_or_na = True
        has_any_applicable = False

        for d in DOMAIN_KEYS:
            applicable, band = _domain_band_of(p, d)
            if not applicable:
                per_domain[d]["notApplicable"] += 1
                continue
            has_any_applicable = True
            if band in per_domain[d]:
                per_domain[d][band] += 1
            if band == "high":
                has_high = True
            if band != "low":
                all_low_or_na = False

        if has_high:
            needs_attention += 1
        if has_any_applicable and all_low_or_na:
            normal_users += 1

    return OverviewStatsOut(
        total_enrolled=len(patients),
        normal_users=normal_users,
        needs_attention=needs_attention,
        per_domain={d: DomainBandCounts(**per_domain[d]) for d in DOMAIN_KEYS},
    )


@router.get("", response_model=list[PatientOut])
async def list_patients(
    search: str | None = Query(default=None),
    risk_band: str | None = Query(default=None, alias="riskBand"),
    sex: WorkerSex | None = Query(default=None),
):
    qs = Worker.all()
    if sex:
        qs = qs.filter(sex=sex)
    if search:
        from tortoise.expressions import Q

        text_match = Q(first_name__icontains=search) | Q(last_name__icontains=search) | Q(region__icontains=search)
        # Only add an id-equality clause when `search` is actually a valid
        # UUID — comparing a non-UUID string against the id column the way
        # the old raw-SQL version did (`id::text = $param`) never matches,
        # so skipping it entirely here is equivalent and avoids a bogus
        # sentinel value.
        qs = qs.filter(text_match | Q(id=search) if _looks_like_uuid(search) else text_match)
    workers = await qs.order_by("last_name")
    patients = [_to_patient_out(w) for w in workers]

    if risk_band:
        patients = [p for p in patients if any(_domain_band_of(p, d) == (True, risk_band) for d in DOMAIN_KEYS)]

    return patients


def _looks_like_uuid(value: str) -> bool:
    import uuid

    try:
        uuid.UUID(value)
        return True
    except ValueError:
        return False


@router.get("/{worker_id}", response_model=PatientOut)
async def get_patient(worker_id: str):
    worker = await Worker.get_or_none(id=worker_id)
    if not worker:
        raise HTTPException(status_code=404, detail="Not found")
    return _to_patient_out(worker)


@router.post("", response_model=PatientOut, status_code=201, dependencies=[Depends(require_role(ClinicianRole.HR))])
async def create_patient(body: NewWorkerInput):
    if not body.phone or not body.full_name or not body.job or not body.description:
        raise HTTPException(status_code=400, detail="phone, fullName, job, and description are required")

    first_name, last_name = _split_full_name(body.full_name)
    now = datetime.now(timezone.utc)

    pending: dict[str, str] = dict(_PENDING_TEXT)
    domains = {
        "diabetes": {
            "domain": "diabetes", "method": DOMAIN_METHOD["diabetes"], "percent": 0, "band": "low",
            "applicable": False, "notApplicableReason": pending,
            "analysis": pending, "analysisSummary": pending, "updatedAt": now.isoformat(),
        },
        "cvd": {
            "domain": "cvd", "method": DOMAIN_METHOD["cvd"], "percent": 0, "band": "low",
            "applicable": False, "notApplicableReason": pending,
            "analysis": pending, "analysisSummary": pending, "updatedAt": now.isoformat(),
        },
        "oncology": {
            "domain": "oncology", "method": DOMAIN_METHOD["oncology"], "percent": 0, "band": "low",
            "applicable": False, "notApplicableReason": pending, "sites": [],
            "analysis": pending, "analysisSummary": pending, "updatedAt": now.isoformat(),
        },
    }
    measurements = {"bmi": 0}

    worker = await Worker.create(
        first_name=first_name or body.full_name,
        last_name=last_name,
        age=0,
        sex=WorkerSex.MALE,
        region="—",
        phone=body.phone,
        enrolled_at=now,
        job=body.job,
        description=body.description,
        insurance_number=body.insurance_number or None,
        sinoai_user_id=body.sinoai_user_id or None,
        assessed=False,
        measurements=measurements,
        domains=domains,
    )
    return _to_patient_out(worker)


@router.patch("/{worker_id}", response_model=PatientOut, dependencies=[Depends(require_role(ClinicianRole.HR))])
async def update_patient(worker_id: str, body: UpdateWorkerInput):
    worker = await Worker.get_or_none(id=worker_id)
    if not worker:
        raise HTTPException(status_code=404, detail="Not found")

    provided = body.model_dump(exclude_unset=True, by_alias=False)

    if "phone" in provided:
        worker.phone = provided["phone"]
    if "job" in provided:
        worker.job = provided["job"]
    if "description" in provided:
        worker.description = provided["description"]
    if "insurance_number" in provided:
        worker.insurance_number = provided["insurance_number"]
    if "sinoai_user_id" in provided:
        worker.sinoai_user_id = provided["sinoai_user_id"]
    if "full_name" in provided and provided["full_name"] is not None:
        worker.first_name, worker.last_name = _split_full_name(provided["full_name"])

    if provided:
        await worker.save()
    return _to_patient_out(worker)


@router.delete("/{worker_id}", status_code=204, dependencies=[Depends(require_role(ClinicianRole.HR))])
async def delete_patient(worker_id: str):
    deleted_count = await Worker.filter(id=worker_id).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail="Not found")
