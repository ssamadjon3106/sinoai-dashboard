"""App settings — mirrors sinoai-chatbot's app/config.py (pydantic-settings
BaseSettings, .env loaded via python-dotenv before Settings() is constructed).
"""

from dotenv import load_dotenv
load_dotenv()

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = Field(..., description="PostgreSQL connection string, e.g. postgres://user:pass@localhost:5432/sinoai_dashboard")

    # Auth
    JWT_SECRET: str = Field(..., description="Secret used to sign clinician session JWTs. No default — refuses to start without one.")
    JWT_TTL_HOURS: int = 12

    # Server
    PORT: int = 8787
    CORS_ORIGIN: str = "http://localhost:5173"

    # OpenAI — risk overview/suggestion + weekly recommendation. Left unset,
    # the two LLM-backed endpoints degrade to a clear 503 rather than crash.
    OPENAI_API_KEY: str | None = None
    OPENAI_MODEL: str = "gpt-4o-mini"

    # chatapi.sinoai.io — source data (profile analysis / recent health /
    # workouts) behind the weekly recommendation. See app/services/sinoai_client.py
    # for why we don't call SinoAI's own self-scoped weekly-recommendation endpoint.
    SINOAI_API_BASE_URL: str = "https://chatapi.sinoai.io"
    SINOAI_API_KEY: str | None = None

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
