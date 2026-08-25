from tortoise import BaseDBAsyncClient

RUN_IN_TRANSACTION = True


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "clinicians" (
    "id" UUID NOT NULL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password_hash" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "role" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL
);
COMMENT ON COLUMN "clinicians"."role" IS 'VIEWER: viewer\nHR: hr';
COMMENT ON TABLE "clinicians" IS 'A dashboard user account (not a worker). Provisioned by seed.py or a';
CREATE TABLE IF NOT EXISTS "workers" (
    "id" UUID NOT NULL PRIMARY KEY,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "age" INT NOT NULL,
    "sex" VARCHAR(6) NOT NULL,
    "region" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(64) NOT NULL,
    "enrolled_at" TIMESTAMPTZ NOT NULL,
    "photo_url" TEXT,
    "job" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "insurance_number" VARCHAR(255),
    "assessed" BOOL NOT NULL,
    "sinoai_user_id" VARCHAR(255),
    "measurements" JSONB NOT NULL,
    "domains" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_workers_sinoai__a324af" ON "workers" ("sinoai_user_id");
CREATE INDEX IF NOT EXISTS "idx_workers_last_na_9f0b2b" ON "workers" ("last_name");
COMMENT ON COLUMN "workers"."sex" IS 'MALE: male\nFEMALE: female';
COMMENT ON TABLE "workers" IS 'An enrolled worker/employee. Kept as \"workers\" (the domain this';
CREATE TABLE IF NOT EXISTS "insights" (
    "id" UUID NOT NULL PRIMARY KEY,
    "lang" VARCHAR(8) NOT NULL,
    "risk_overview" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,
    "input_hash" VARCHAR(64) NOT NULL,
    "generated_at" TIMESTAMPTZ NOT NULL,
    "worker_id" UUID NOT NULL REFERENCES "workers" ("id") ON DELETE CASCADE,
    CONSTRAINT "uid_insights_worker__e04b30" UNIQUE ("worker_id", "lang")
);
COMMENT ON TABLE "insights" IS 'OpenAI-generated risk overview + suggestion for one worker, cached';
CREATE TABLE IF NOT EXISTS "weekly_recommendations" (
    "id" UUID NOT NULL PRIMARY KEY,
    "iso_year" INT NOT NULL,
    "iso_week" INT NOT NULL,
    "summary" TEXT NOT NULL,
    "tasks" JSONB NOT NULL,
    "generated_at" TIMESTAMPTZ NOT NULL,
    "worker_id" UUID NOT NULL REFERENCES "workers" ("id") ON DELETE CASCADE,
    CONSTRAINT "uid_weekly_reco_worker__80cca9" UNIQUE ("worker_id", "iso_year", "iso_week")
);
COMMENT ON TABLE "weekly_recommendations" IS 'OpenAI-generated weekly recommendation, sourced from chatapi.sinoai.io';
CREATE TABLE IF NOT EXISTS "aerich" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(100) NOT NULL,
    "content" JSONB NOT NULL
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """


MODELS_STATE = (
    "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"
)
