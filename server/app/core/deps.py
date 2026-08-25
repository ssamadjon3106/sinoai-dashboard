"""FastAPI auth dependencies — equivalent of the Node backend's requireAuth/
requireRole Express middleware.
"""

import jwt
from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.security import decode_token
from app.models.database import ClinicianRole

_bearer = HTTPBearer(auto_error=False)


class CurrentClinician:
    def __init__(self, sub: str, email: str, name: str, role: ClinicianRole):
        self.sub = sub
        self.email = email
        self.name = name
        self.role = role


async def get_current_clinician(
    creds: HTTPAuthorizationCredentials | None = Depends(_bearer),
) -> CurrentClinician:
    if creds is None or not creds.credentials:
        raise HTTPException(status_code=401, detail="Missing bearer token")
    try:
        payload = decode_token(creds.credentials)
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    try:
        return CurrentClinician(
            sub=payload["sub"],
            email=payload["email"],
            name=payload["name"],
            role=ClinicianRole(payload["role"]),
        )
    except (KeyError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid or expired token")


def require_role(role: ClinicianRole):
    async def _dep(clinician: CurrentClinician = Depends(get_current_clinician)) -> CurrentClinician:
        if clinician.role != role:
            raise HTTPException(status_code=403, detail=f'This action requires the "{role.value}" role')
        return clinician

    return _dep
