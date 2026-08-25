"""Tortoise models for the SinoAI clinician/HR dashboard.

Field names are snake_case (Python/Postgres convention); the API layer's
Pydantic schemas (app/schemas/) translate to the camelCase JSON contract the
frontend already expects, via an alias_generator — no frontend changes
needed for this ORM swap.
"""

import uuid
from datetime import datetime, timezone
from enum import Enum

from tortoise import fields
from tortoise.models import Model


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class ClinicianRole(str, Enum):
    VIEWER = "viewer"
    HR = "hr"


class WorkerSex(str, Enum):
    MALE = "male"
    FEMALE = "female"


class Clinician(Model):
    """A dashboard user account (not a worker). Provisioned by seed.py or a
    direct insert — there is no self-serve signup, matching the original
    Node backend's design."""

    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    email = fields.CharField(max_length=255, unique=True)
    password_hash = fields.CharField(max_length=255)
    name = fields.CharField(max_length=255)
    role = fields.CharEnumField(ClinicianRole)
    created_at = fields.DatetimeField(auto_now_add=True)

    class Meta:
        table = "clinicians"


class Worker(Model):
    """An enrolled worker/employee. Kept as "workers" (the domain this
    product actually serves) while the HTTP routes stay at /api/patients
    for continuity with the existing frontend contract."""

    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    first_name = fields.CharField(max_length=255)
    last_name = fields.CharField(max_length=255)
    age = fields.IntField(default=0)
    sex = fields.CharEnumField(WorkerSex, default=WorkerSex.MALE)
    region = fields.CharField(max_length=255, default="—")
    phone = fields.CharField(max_length=64)
    # A plain settable default (NOT auto_now_add) — seed.py backdates this to
    # each legacy worker's original enrollment date; auto_now_add would force
    # "now" on every insert and silently discard that.
    enrolled_at = fields.DatetimeField(default=_utcnow)
    photo_url = fields.TextField(null=True)
    job = fields.TextField()
    description = fields.TextField()
    insurance_number = fields.CharField(max_length=255, null=True)
    # False for a worker HR just added: they haven't been through SinoAI's
    # real CANRISK/SCORE2 assessment yet, so there is no real percentage to
    # show. The UI renders "pending assessment" rather than a fabricated 0%.
    assessed = fields.BooleanField(default=False)
    # Links this worker to their account in the SinoAI mobile chatbot
    # (chatapi.sinoai.io), when known. Required for the weekly-recommendation
    # endpoint to have any source data to work from.
    sinoai_user_id = fields.CharField(max_length=255, null=True, index=True)
    # Pre-shaped, already-camelCase JSON blobs matching the frontend's
    # PatientMeasurements / { diabetes, cvd, oncology } domain-result
    # contract exactly — stored as-is, never re-keyed by this layer.
    measurements = fields.JSONField(default=dict)
    domains = fields.JSONField(default=dict)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "workers"
        indexes = [("last_name",)]


class Insight(Model):
    """OpenAI-generated risk overview + suggestion for one worker, cached
    per language until the underlying input (job/description/risk domains)
    changes — see app/api/insights.py."""

    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    worker = fields.ForeignKeyField("models.Worker", related_name="insights", on_delete=fields.CASCADE)
    lang = fields.CharField(max_length=8)
    risk_overview = fields.TextField()
    suggestion = fields.TextField()
    input_hash = fields.CharField(max_length=64)
    generated_at = fields.DatetimeField(auto_now_add=True)

    class Meta:
        table = "insights"
        unique_together = (("worker", "lang"),)


class WeeklyRecommendation(Model):
    """OpenAI-generated weekly recommendation, sourced from chatapi.sinoai.io
    profile/health/fitness data, cached per ISO week — see
    app/api/weekly.py."""

    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    worker = fields.ForeignKeyField("models.Worker", related_name="weekly_recommendations", on_delete=fields.CASCADE)
    iso_year = fields.IntField()
    iso_week = fields.IntField()
    summary = fields.TextField()
    tasks = fields.JSONField(default=list)
    generated_at = fields.DatetimeField(auto_now_add=True)

    class Meta:
        table = "weekly_recommendations"
        unique_together = (("worker", "iso_year", "iso_week"),)
