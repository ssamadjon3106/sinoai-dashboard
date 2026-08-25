"""Adapter around chatapi.sinoai.io — the source data behind SinoAI's own
mobile-app weekly recommendation. We deliberately do NOT call SinoAI's
`GET /api/weekly-recommendation` (that endpoint is scoped to the calling
user's own token, i.e. built for the mobile app, not a third-party HR
dashboard) — instead we pull the same underlying profile/health/fitness
data it's built from and generate our own recommendation via OpenAI
(see app/services/llm_service.py generate_weekly_recommendation).

NOTE — integration is unfinished pending two things from SinoAI:
  1. SINOAI_API_KEY — the service/admin credential for cross-user reads
     (their spec shows an X-ADMIN-KEY pattern on other admin endpoints;
     confirm the exact header name/scheme for these three routes).
  2. Whether these endpoints take a user_id query param for a third party
     to read another user's data, since none of them show a {user_id} path
     segment in the spec — they may be self-scoped like
     /weekly-recommendation is. If so, this file's request shape needs a
     one-line update (the _auth_headers()/query-param spot below), not a
     redesign — every caller already goes through this module.
Until then, every method raises SinoaiNotConfiguredError, and the
weekly-recommendation route surfaces that as a clear "not configured" state
rather than fabricating data.
"""

import asyncio
from typing import Any
from urllib.parse import quote

import httpx

from app.config import settings


class SinoaiNotConfiguredError(Exception):
    pass


class SinoaiResponseError(Exception):
    pass


def is_configured() -> bool:
    """Cheap upfront check so callers can short-circuit to a "not configured" response before making any network calls."""
    return bool(settings.SINOAI_API_KEY)


def _auth_headers() -> dict[str, str]:
    if not settings.SINOAI_API_KEY:
        raise SinoaiNotConfiguredError("SINOAI_API_KEY is not set on the server")
    # Placeholder scheme — swap for whatever chatapi.sinoai.io actually
    # expects once confirmed (e.g. X-ADMIN-KEY as seen on their
    # notification-trigger endpoints).
    return {"authorization": f"Bearer {settings.SINOAI_API_KEY}"}


async def _get_json(path: str) -> Any:
    url = f"{settings.SINOAI_API_BASE_URL}{path}"
    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.get(url, headers=_auth_headers())
    if response.status_code >= 400:
        raise SinoaiResponseError(f"chatapi.sinoai.io {path} -> {response.status_code}: {response.text[:300]}")
    return response.json()


def get_profile_analysis(user_id: str) -> Any:
    return _get_json(f"/api/profile/analysis?user_id={quote(user_id)}")


def get_recent_health(user_id: str) -> Any:
    return _get_json(f"/api/health/{quote(user_id)}/recent")


def get_workouts(user_id: str) -> Any:
    return _get_json(f"/api/health/{quote(user_id)}/workouts")


async def get_weekly_source_data(user_id: str) -> dict[str, Any]:
    """Best-effort aggregate of everything we can pull for one user — partial failures don't block the others."""

    async def _safe(coro):
        try:
            return await coro
        except Exception as err:  # noqa: BLE001 — deliberately broad: any per-call failure degrades to an inline error, not a crash
            return {"error": str(err)}

    profile_analysis, recent_health, workouts = await asyncio.gather(
        _safe(get_profile_analysis(user_id)),
        _safe(get_recent_health(user_id)),
        _safe(get_workouts(user_id)),
    )
    return {"profileAnalysis": profile_analysis, "recentHealth": recent_health, "workouts": workouts}
