"""One-time import of the pre-Postgres JSON store, plus two dev clinician
accounts. Safe to re-run: workers are upserted by their original id,
clinicians by email.

Run with: python seed.py
"""

import asyncio
import json
from datetime import datetime
from pathlib import Path

from tortoise import Tortoise

from app.core.security import hash_password
from app.db import TORTOISE_ORM
from app.models.database import Clinician, ClinicianRole, Worker, WorkerSex

STORE_PATH = Path(__file__).parent / "data" / "store.json"


async def upsert_worker(p: dict) -> None:
    if await Worker.exists(id=p["id"]):
        return
    await Worker.create(
        id=p["id"],
        first_name=p["firstName"],
        last_name=p["lastName"],
        age=p["age"],
        sex=WorkerSex(p["sex"]),
        region=p["region"],
        phone=p["phone"],
        enrolled_at=datetime.fromisoformat(p["enrolledAt"].replace("Z", "+00:00")),
        photo_url=p.get("photoUrl"),
        # Legacy records predate the required job/description fields —
        # backfilled with a clear placeholder rather than left null, matching
        # the fallback the insights prompt already used for missing job info.
        job=p.get("job") or "Not specified",
        description=p.get("description") or "Not specified",
        insurance_number=p.get("insuranceNumber"),
        assessed=p["assessed"],
        measurements=p["measurements"],
        domains=p["domains"],
    )


async def upsert_clinician(email: str, password: str, name: str, role: ClinicianRole) -> None:
    if await Clinician.exists(email=email):
        return
    await Clinician.create(email=email, password_hash=hash_password(password), name=name, role=role)


async def main() -> None:
    await Tortoise.init(config=TORTOISE_ORM)

    store = json.loads(STORE_PATH.read_text())
    print(f"Seeding {len(store['patients'])} worker(s) from {STORE_PATH}...")
    for p in store["patients"]:
        await upsert_worker(p)

    print("Seeding dev clinician accounts...")
    await upsert_clinician("viewer@sinoai.io", "viewer12345", "Aziza Karimova", ClinicianRole.VIEWER)
    await upsert_clinician("hr@sinoai.io", "hr12345", "Bekzod Yusupov", ClinicianRole.HR)

    print("\nDone. Dev login credentials:")
    print("  viewer@sinoai.io / viewer12345  (read-only)")
    print("  hr@sinoai.io     / hr12345      (full CRUD)")
    print("\nChange these before deploying anywhere real.")

    await Tortoise.close_connections()


if __name__ == "__main__":
    asyncio.run(main())
