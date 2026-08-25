# SinoAI Clinician/HR Dashboard

A clinician / HR dashboard for SinoAI's smart wristband program. It visualizes
the three risk domains the mobile app computes — **Diabetes (CANRISK)**,
**Cardiovascular disease (SCORE2)**, and **Oncology screening signals** — for
every worker enrolled at a company, and gives HR a workflow for registering
workers and acting on risk.

Full stack, running entirely on your machine:

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4 + react-router-dom + Recharts
- **Backend:** FastAPI (Python), real JWT auth (bcrypt-hashed credentials), role-based access control
- **Database:** PostgreSQL via **Tortoise ORM**, versioned migrations via **Aerich** — the same ORM/migration approach as SinoAI's `sinoai-chatbot` service
- **AI:** OpenAI (risk overview + suggestion, weekly recommendation), source data pulled from SinoAI's own mobile API (`chatapi.sinoai.io`)

## Roles

| Role     | Can do |
|----------|--------|
| `viewer` | Read-only — views all workers, stats, risk data, and detail pages. No add/edit/delete controls. |
| `hr`     | Everything `viewer` can do, plus: register a new worker (phone, full name, job title, description, optional insurance number), edit, and delete. |

Role is issued server-side in the JWT at login and enforced on every write
endpoint (a `require_role(HR)` FastAPI dependency) — the frontend hides
HR-only controls for `viewer` for UX, but the real security boundary is the
server.

## One-time setup

### 1. Install dependencies

```bash
npm install

cd server
python3 -m venv .venv
source .venv/bin/activate    # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 2. Set up PostgreSQL

Pick one:

**Option A — Homebrew (native, simplest on macOS):**
```bash
brew install postgresql@16
brew services start postgresql@16
createdb sinoai_dashboard
```

**Option B — Docker:**
```bash
docker run --name sinoai-postgres -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=sinoai_dashboard -p 5432:5432 -d postgres:16
```

### 3. Configure environment variables

```bash
cp .env.example .env
cp server/.env.example server/.env
```

Edit `server/.env`:

- `DATABASE_URL` — point at the Postgres instance from step 2. **Tortoise
  expects the `postgres://` scheme**, e.g.
  `postgres://postgres:postgres@localhost:5432/sinoai_dashboard` (Docker) or
  `postgres://localhost:5432/sinoai_dashboard` (Homebrew, no password by default).
- `JWT_SECRET` — **required**, no default. Generate one with
  `openssl rand -base64 32`.
- `OPENAI_API_KEY` — required for the risk-overview/suggestion panel and the
  weekly-recommendation panel to work. Without it, those panels show a clear
  "not configured" state instead of erroring.
- `SINOAI_API_KEY` — required to pull a worker's real health data from
  `chatapi.sinoai.io` for the weekly recommendation. Without it, or without a
  worker having a `sinoaiUserId` set, the weekly-recommendation panel shows a
  "not linked" state.

The root `.env` (`VITE_API_BASE_URL`) only needs changing if you move the
backend off `http://localhost:8787`.

### 4. Create the schema and seed data

```bash
cd server
source .venv/bin/activate
aerich init-db          # first time only — creates migrations/ and applies the schema
python seed.py
cd ..
```

If the schema ever changes later (new field, new table), the workflow is
`aerich migrate --name <description>` then `aerich upgrade` — versioned
migration files land under `server/migrations/models/`, same as
`sinoai-chatbot`.

Seeding loads the existing 12-worker dataset and creates two dev accounts:

| Email | Password | Role |
|-------|----------|------|
| `hr@sinoai.io` | `hr12345` | `hr` |
| `viewer@sinoai.io` | `viewer12345` | `viewer` |

Change these passwords (or add real accounts) before this ever leaves your
laptop.

## Running it

Two terminals:

```bash
# Terminal 1 — backend (port 8787)
cd server
source .venv/bin/activate
uvicorn app.main:app --reload --port 8787

# Terminal 2 — frontend (port 5173)
npm run dev
```

Open `http://localhost:5173`. After login you land on **Overview**; the
sidebar is Overview → Users → Settings.

## What to look at

- **Overview (`/overview`)** — cohort-wide KPIs: Enrolled, Normal, Needs
  attention (in that order), plus a per-domain low/moderate/high breakdown
  and a "Needs attention" shortlist linking straight to each worker's detail
  page.
- **Users (`/`)** — the searchable, sortable, filterable worker table. HR
  sees an "Add worker" button and per-row edit/delete; viewers see the same
  data with no management controls. Clicking a row opens an inline detail
  panel on the same page.
- **Worker detail (`/users/:id`)** — reached from Overview's "Needs
  attention" list (or the table's edit affordances). Three panes: the
  existing risk-gauge/domain-card/BMI panel on the left, that worker's
  **weekly recommendation** top-right (generated from SinoAI source data via
  OpenAI, cached per ISO week), and an OpenAI-generated **risk overview +
  suggestion** bottom-right (e.g. "give a rest") for when a domain shows
  high risk.
- **Add worker** (HR only) — phone number, full name, job title, a
  description of what they do, and an optional insurance number. Optionally
  link a SinoAI mobile-app user ID to enable the weekly-recommendation panel.

## Architecture

```
src/                     Frontend — unchanged by the backend rewrite below;
                          it only ever talks to the /api/* HTTP contract.
  types/         Domain model (Patient, OverviewStats, WeeklyTask, i18n types...)
  lib/
    clinicalConfig.ts   Risk-band colors, CANRISK/SCORE2/oncology thresholds.
    i18n/                Typed UI dictionary (uz/ru/en) + useI18n().
  api/
    dataProvider.ts      The DataProvider interface every component depends on.
    httpDataProvider.ts  Real fetch-based implementation, bearer-token auth.
    http.ts              Typed fetch wrapper (ApiError/UnauthorizedError, 401 → session clear).
    session.ts           Token + clinician persistence (localStorage).
  hooks/         useAsync + typed wrappers (useUsers, useUser, useOverviewStats,
                 useInsights, useWeeklyRecommendation).
  context/       AuthContext (real login), language, filters.
  components/    UI kit + dashboard composition (PatientTable, WorkerFormModal,
                 DeleteWorkerDialog, RiskInsightsCard, WeeklyRecommendationCard).
  pages/         Route-level screens.

server/                  Backend — FastAPI + Tortoise ORM + Aerich.
  pyproject.toml         [tool.aerich] config, points Aerich at app.db.TORTOISE_ORM.
  app/
    config.py             pydantic-settings Settings (.env-backed).
    db.py                  TORTOISE_ORM connection/model registry.
    main.py                 FastAPI app, CORS, error-shape override, router wiring.
    core/
      security.py            bcrypt hash/verify, JWT sign/verify (pyjwt).
      deps.py                 get_current_clinician / require_role() FastAPI dependencies.
    models/
      database.py              Tortoise models: Clinician, Worker, Insight, WeeklyRecommendation.
    schemas/                  Pydantic request/response models — camelCase JSON
                               in/out over snake_case Python fields (alias_generator),
                               so the existing frontend contract needed zero changes.
    api/
      auth.py                  POST /api/auth/login
      patients.py               CRUD + overview-stats for workers (HR-only writes)
      insights.py                POST /api/patients/:id/insights (cached by input hash)
      weekly.py                   GET /api/patients/:id/weekly-recommendation (cached by ISO week)
    services/
      llm_service.py             OpenAI calls: risk insights + weekly recommendation (httpx).
      sinoai_client.py            Adapter for chatapi.sinoai.io source-data endpoints (httpx).
  migrations/models/       Aerich-generated versioned migration files.
  seed.py                  Loads server/data/store.json + creates the two dev accounts.
```

### Why FastAPI + Tortoise + Aerich

This mirrors `sinoai-chatbot`'s stack and conventions on purpose — same ORM
(model classes, not hand-written SQL), same migration tool, same
`pydantic-settings` config pattern, same `TORTOISE_ORM` dict shape read by
both the app and Aerich. An earlier iteration of this dashboard used a
Node/Express backend with hand-written SQL (Prisma's engine-binary download
was blocked in the build sandbox at the time); this rewrite replaces that
entirely. The frontend's REST contract (`/api/*` routes, camelCase JSON
shapes) was kept identical on purpose, so none of the React code needed to
change — verified by running the full existing Playwright E2E suite against
this backend with zero frontend edits.

## Open items

These are read from environment variables and the features degrade
gracefully (clear "not configured" UI state, no crashes) until set:

- `OPENAI_API_KEY` — needed for both LLM-backed panels.
- `SINOAI_API_KEY` — needed to pull a linked worker's real health data from
  `chatapi.sinoai.io`. The exact header/auth scheme for that API's
  `profile/analysis` and `health/*` endpoints is unconfirmed — it's isolated
  behind `server/app/services/sinoai_client.py`, so wiring the real scheme
  once you have credentials is a small, contained change.
- Linking a worker to their SinoAI mobile-app account is manual today (the
  optional "SinoAI app user ID" field on the worker form) — there's no
  phone-number lookup endpoint in SinoAI's spec to do this automatically.

## Clinical model notes (MVP simplifications)

Documented in code (`src/lib/clinicalConfig.ts`) as well:

- **CANRISK** band cutoffs (0–20 / 21–32 / 33+) match the brief exactly.
- **SCORE2** is only computed for ages 40–69; outside that range the UI
  shows a not-applicable state instead of a percentage. This MVP uses a
  common simplification (<5% low, 5–9.9% moderate, ≥10% high) rather than
  the full age-banded SCORE2 tables.
- **Oncology** is presented strictly as a *screening signal count*, never a
  diagnosis or a probability of having cancer.
