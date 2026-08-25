from datetime import datetime

from app.models.database import WorkerSex
from app.schemas.common import CamelModel


class PatientOut(CamelModel):
    id: str
    first_name: str
    last_name: str
    age: int
    sex: WorkerSex
    region: str
    phone: str
    enrolled_at: datetime
    photo_url: str | None = None
    job: str
    description: str
    insurance_number: str | None = None
    assessed: bool
    sinoai_user_id: str | None = None
    # Pre-shaped, already-camelCase JSON blobs (see models/database.py) —
    # passed through untouched, not re-validated field-by-field here.
    measurements: dict
    domains: dict


class NewWorkerInput(CamelModel):
    """Mirrors NewPatientInput on the frontend (request body arrives as
    camelCase JSON — fullName, insuranceNumber, sinoaiUserId). Fields are all
    Optional here (rather than required) so a missing field produces the
    same 400 + combined message the original Express handler gave, instead
    of FastAPI's generic 422."""

    phone: str | None = None
    full_name: str | None = None
    job: str | None = None
    description: str | None = None
    insurance_number: str | None = None
    sinoai_user_id: str | None = None


class UpdateWorkerInput(CamelModel):
    phone: str | None = None
    full_name: str | None = None
    job: str | None = None
    description: str | None = None
    insurance_number: str | None = None
    sinoai_user_id: str | None = None


class DomainBandCounts(CamelModel):
    low: int
    moderate: int
    high: int
    not_applicable: int


class OverviewStatsOut(CamelModel):
    total_enrolled: int
    normal_users: int
    needs_attention: int
    per_domain: dict[str, DomainBandCounts]
