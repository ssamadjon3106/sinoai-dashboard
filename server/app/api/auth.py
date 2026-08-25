"""Real credential login: verifies the submitted password against the
clinician's stored bcrypt hash and issues a JWT carrying the role from the
database record — the client can no longer pick its own role.

No self-serve signup: clinician accounts are provisioned by `python seed.py`
(see server_py/seed.py) or a direct insert into `clinicians`.
"""

from fastapi import APIRouter, HTTPException

from app.core.security import sign_token, verify_password
from app.models.database import Clinician
from app.schemas.auth import ClinicianOut, LoginRequest, LoginResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
async def login(body: LoginRequest):
    if not body.email or not body.password:
        raise HTTPException(status_code=400, detail="email and password are required")

    clinician = await Clinician.get_or_none(email=body.email.lower().strip())
    if not clinician:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(body.password, clinician.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = sign_token(
        {
            "sub": str(clinician.id),
            "email": clinician.email,
            "name": clinician.name,
            "role": clinician.role.value,
        }
    )
    return LoginResponse(
        token=token,
        clinician=ClinicianOut(
            id=str(clinician.id),
            email=clinician.email,
            name=clinician.name,
            role=clinician.role,
        ),
    )
