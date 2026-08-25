import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from tortoise.contrib.fastapi import register_tortoise

from app.api import auth, insights, patients, weekly
from app.config import settings
from app.db import TORTOISE_ORM

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"SinoAI clinician dashboard API listening on http://localhost:{settings.PORT}")
    if not settings.OPENAI_API_KEY:
        logger.warning("OPENAI_API_KEY is not set — the AI insights and weekly-recommendation endpoints will return 503 until it is.")
    if not settings.SINOAI_API_KEY:
        logger.warning("SINOAI_API_KEY is not set — the weekly-recommendation endpoint will return 503 until it is.")
    yield


app = FastAPI(title="SinoAI Clinician Dashboard API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CORS_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# The frontend's http.ts reads `body.error` on any non-2xx response
# (see src/api/http.ts) — override FastAPI's default {"detail": ...} shape
# so every HTTPException raised anywhere in the app matches that contract
# without each route having to build its own error body.
@app.exception_handler(HTTPException)
async def http_exception_handler(_request: Request, exc: HTTPException):
    return JSONResponse(status_code=exc.status_code, content={"error": exc.detail})


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=422, content={"error": str(exc.errors())})


# Aerich owns schema migrations (see migrations/), so generate_schemas=False —
# this only wires Tortoise's connection pool into FastAPI's lifecycle.
register_tortoise(app, config=TORTOISE_ORM, generate_schemas=False, add_exception_handlers=False)

app.include_router(auth.router, prefix="/api")
app.include_router(patients.router, prefix="/api")
app.include_router(insights.router, prefix="/api")
app.include_router(weekly.router, prefix="/api")


@app.get("/api/health")
async def health():
    return {"ok": True}
