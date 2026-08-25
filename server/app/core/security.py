"""Password hashing + JWT sign/verify. Kept dependency-light (plain `bcrypt`
+ `pyjwt`, no passlib) — same intent as the Node backend's auth.ts
(bcryptjs + jsonwebtoken).
"""

from datetime import datetime, timedelta, timezone
from typing import Any

import bcrypt
import jwt

from app.config import settings

BCRYPT_ROUNDS = 12


def hash_password(plain: str) -> str:
    salt = bcrypt.gensalt(rounds=BCRYPT_ROUNDS)
    return bcrypt.hashpw(plain.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except ValueError:
        # Malformed hash (e.g. empty string) — never a match, never a crash.
        return False


def sign_token(payload: dict[str, Any]) -> str:
    to_encode = {
        **payload,
        "exp": datetime.now(timezone.utc) + timedelta(hours=settings.JWT_TTL_HOURS),
    }
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm="HS256")


def decode_token(token: str) -> dict[str, Any]:
    """Raises jwt.PyJWTError (ExpiredSignatureError, InvalidTokenError, ...) on failure — callers catch broadly."""
    return jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
