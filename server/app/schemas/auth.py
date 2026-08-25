from pydantic import BaseModel

from app.models.database import ClinicianRole
from app.schemas.common import CamelModel


class LoginRequest(BaseModel):
    email: str | None = None
    password: str | None = None


class ClinicianOut(CamelModel):
    id: str
    email: str
    name: str
    role: ClinicianRole


class LoginResponse(CamelModel):
    token: str
    clinician: ClinicianOut
