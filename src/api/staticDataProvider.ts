import { getISOWeek, getISOWeekYear } from 'date-fns'
import type {
  DomainKey,
  InsightsResponse,
  LocalizedText,
  NewWorkerInput,
  OverviewStats,
  Patient,
  PatientDomains,
  RiskBand,
  UpdateWorkerInput,
  WeeklyRecommendationResponse,
} from '@/types'
import { demoWorkers } from '@/data/demoWorkers'
import { buildWeeklySummary, buildWeeklyTasks, buildWorkerRiskOverview, buildWorkerSuggestion } from '@/lib/aiCopy'
import type { ClinicianProfile, DataProvider, LoginResult, UserListFilters } from './dataProvider'

/**
 * Backend-free implementation of {@link DataProvider} for the investor demo
 * build (`demo/static` branch only — never wired into `main`/`index.ts`).
 * State lives entirely in memory, seeded fresh from `demoWorkers` on every
 * module load, so a page reload always reverts to the original 12 workers —
 * this is the explicitly-requested behavior (no persistence), not a bug.
 * Makes zero network calls of any kind.
 */
export class StaticDataProvider implements DataProvider {
  private workers: Patient[] = clone(demoWorkers)

  // ---- auth ---------------------------------------------------------

  async login(email: string, password: string): Promise<LoginResult> {
    const account = DEMO_ACCOUNTS.find((a) => a.email === email && a.password === password)
    if (!account) throw new Error('Invalid email or password')
    const clinician: ClinicianProfile = { id: account.id, email: account.email, name: account.name, role: account.role }
    return { token: 'demo-static-token', clinician }
  }

  // ---- reads ----------------------------------------------------------

  async getUsers(filters: UserListFilters = {}): Promise<Patient[]> {
    const search = filters.search?.trim().toLowerCase()
    const isUuidSearch = search ? UUID_RE.test(search) : false
    // Multi-word keyword search: every space-separated word in the query
    // must appear somewhere in the worker's searchable text, but each word
    // can match a different field — e.g. "Chilonzor operator" finds a
    // worker in Chilonzor whose job is "ombor operatori", even though that
    // exact phrase never appears in any single field.
    const keywords = search ? search.split(/\s+/).filter(Boolean) : []

    let result = this.workers.filter((w) => {
      if (filters.sex && w.sex !== filters.sex) return false
      if (search) {
        const idMatch = isUuidSearch && w.id.toLowerCase() === search
        if (!idMatch) {
          const haystack = [
            w.firstName,
            w.lastName,
            w.region,
            w.phone,
            w.job,
            w.description,
            w.sex === 'male' ? 'erkak male' : 'ayol female',
            String(w.age),
          ]
            .join(' ')
            .toLowerCase()
          const keywordMatch = keywords.every((word) => haystack.includes(word))
          if (!keywordMatch) return false
        }
      }
      return true
    })

    if (filters.riskBand) {
      result = result.filter((w) => DOMAIN_KEYS.some((d) => domainBandOf(w, d) === filters.riskBand))
    }

    result = [...result].sort((a, b) => a.lastName.localeCompare(b.lastName))
    return clone(result)
  }

  async getUser(id: string): Promise<Patient | undefined> {
    const worker = this.workers.find((w) => w.id === id)
    return worker ? clone(worker) : undefined
  }

  async getUserRiskDomains(id: string): Promise<PatientDomains | undefined> {
    const worker = this.workers.find((w) => w.id === id)
    return worker ? clone(worker.domains) : undefined
  }

  async getOverviewStats(): Promise<OverviewStats> {
    const perDomain: OverviewStats['perDomain'] = {
      diabetes: { low: 0, moderate: 0, high: 0, notApplicable: 0 },
      cvd: { low: 0, moderate: 0, high: 0, notApplicable: 0 },
      oncology: { low: 0, moderate: 0, high: 0, notApplicable: 0 },
    }
    let needsAttention = 0
    let normalUsers = 0

    for (const w of this.workers) {
      let hasHigh = false
      let allLowOrNa = true
      let hasAnyApplicable = false

      for (const d of DOMAIN_KEYS) {
        const result = w.domains[d]
        if (!result.applicable) {
          perDomain[d].notApplicable += 1
          continue
        }
        hasAnyApplicable = true
        perDomain[d][result.band] += 1
        if (result.band === 'high') hasHigh = true
        if (result.band !== 'low') allLowOrNa = false
      }

      if (hasHigh) needsAttention += 1
      if (hasAnyApplicable && allLowOrNa) normalUsers += 1
    }

    return {
      totalEnrolled: this.workers.length,
      normalUsers,
      needsAttention,
      perDomain,
    }
  }

  // ---- writes (in-memory only — reload reverts to the original 12) ----

  async createWorker(input: NewWorkerInput): Promise<Patient> {
    if (!input.phone || !input.fullName || !input.job || !input.description) {
      throw new Error('phone, fullName, job, and description are required')
    }
    const [firstName, lastName] = splitFullName(input.fullName)
    const now = new Date().toISOString()

    const worker: Patient = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      // No live SinoAI lookup in the static build (zero network calls,
      // by design) — same defaults the real backend falls back to when no
      // id is given or the lookup fails.
      age: 0,
      sex: 'male',
      region: '—',
      phone: input.phone,
      enrolledAt: now,
      photoUrl: null,
      job: input.job,
      description: input.description,
      insuranceNumber: input.insuranceNumber || null,
      assessed: false,
      sinoaiUserId: input.sinoaiUserId || null,
      // Neutral starting point for a freshly-added worker — no wearable/app
      // history yet, so every metric sits at a moderate midpoint rather than
      // implying data that doesn't exist.
      department: 'production',
      wellness: { recovery: 50, sleepScore: 50, met: 4, activityScore: 50, stressScore: 50 },
      measurements: { bmi: 0 },
      domains: pendingDomains(now),
    }

    this.workers.push(worker)
    return clone(worker)
  }

  async updateWorker(id: string, input: UpdateWorkerInput): Promise<Patient> {
    const worker = this.workers.find((w) => w.id === id)
    if (!worker) throw new Error('Not found')

    if (input.phone !== undefined) worker.phone = input.phone
    if (input.job !== undefined) worker.job = input.job
    if (input.description !== undefined) worker.description = input.description
    if (input.insuranceNumber !== undefined) worker.insuranceNumber = input.insuranceNumber
    if (input.sinoaiUserId !== undefined) worker.sinoaiUserId = input.sinoaiUserId
    if (input.fullName) [worker.firstName, worker.lastName] = splitFullName(input.fullName)

    return clone(worker)
  }

  async deleteWorker(id: string): Promise<void> {
    const index = this.workers.findIndex((w) => w.id === id)
    if (index === -1) throw new Error('Not found')
    this.workers.splice(index, 1)
  }

  // ---- AI panels ----
  // Every AI-authored string is generated in third-party voice, grounded in
  // the worker's own wellness numbers, via src/lib/aiCopy.ts — never a
  // static, per-worker canned paragraph (see that module for the full
  // rationale, including why the old per-domain analysisSummary text in
  // demoWorkers.ts is no longer read here).

  async getInsights(id: string, lang: string): Promise<InsightsResponse> {
    const worker = this.workers.find((w) => w.id === id)
    if (!worker) throw new Error('Not found')
    if (!worker.assessed) return { notApplicable: true }

    const language = asLang(lang)
    return {
      riskOverview: buildWorkerRiskOverview(worker.wellness, language),
      suggestion: buildWorkerSuggestion(worker.wellness, language),
      generatedAt: new Date().toISOString(),
    }
  }

  async getWeeklyRecommendation(id: string, lang: string): Promise<WeeklyRecommendationResponse> {
    const worker = this.workers.find((w) => w.id === id)
    if (!worker) throw new Error('Not found')
    if (!worker.sinoaiUserId) return { notLinked: true }

    const now = new Date()
    const language = asLang(lang)
    const tasks = buildWeeklyTasks(worker.wellness, language)
    return {
      isoYear: getISOWeekYear(now),
      isoWeek: getISOWeek(now),
      summary: buildWeeklySummary(worker.wellness, language),
      tasks: tasks.map((text, i) => ({ id: `weekly-${i}`, text })),
      generatedAt: now.toISOString(),
    }
  }
}

// ---- demo accounts (mirrors server/seed.py) ----

const DEMO_ACCOUNTS = [
  { id: 'demo-hr', email: 'hr@sinoai.io', password: 'hr12345', name: 'Bekzod Yusupov', role: 'hr' as const },
  { id: 'demo-viewer', email: 'viewer@sinoai.io', password: 'viewer12345', name: 'Aziza Karimova', role: 'viewer' as const },
]

// ---- shared helpers ----

const DOMAIN_KEYS: DomainKey[] = ['diabetes', 'cvd', 'oncology']
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function clone<T>(value: T): T {
  return structuredClone(value)
}

function domainBandOf(worker: Patient, domain: DomainKey): RiskBand | undefined {
  const result = worker.domains[domain]
  return result.applicable ? result.band : undefined
}

/** Mirrors server/app/api/patients.py's `_split_full_name`. */
function splitFullName(fullName: string): [string, string] {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return [fullName, '—']
  const [first, ...rest] = parts
  return [first, rest.join(' ') || '—']
}

function asLang(lang: string): keyof LocalizedText {
  return lang === 'uz' || lang === 'ru' || lang === 'en' ? lang : 'en'
}

// Identical copy to server/app/api/patients.py's `_PENDING_TEXT` — shown for
// every domain of a freshly-added worker until they go through screening.
const PENDING_TEXT: LocalizedText = {
  uz: 'Ushbu xodim hali SinoAI sog‘liq skriningidan o‘tmagan — ma’lumotlar mavjud bo‘lgach shu yerda ko‘rinadi.',
  ru: 'Этот сотрудник ещё не прошёл скрининг здоровья SinoAI — данные появятся здесь после прохождения.',
  en: "This worker has not been through SinoAI's health screening yet — data will appear here once they have.",
}

function pendingDomains(nowIso: string): PatientDomains {
  return {
    diabetes: {
      domain: 'diabetes',
      method: 'CANRISK',
      percent: 0,
      band: 'low',
      applicable: false,
      notApplicableReason: PENDING_TEXT,
      analysis: PENDING_TEXT,
      analysisSummary: PENDING_TEXT,
      updatedAt: nowIso,
      factors: [],
    },
    cvd: {
      domain: 'cvd',
      method: 'SCORE2',
      percent: 0,
      band: 'low',
      applicable: false,
      notApplicableReason: PENDING_TEXT,
      analysis: PENDING_TEXT,
      analysisSummary: PENDING_TEXT,
      updatedAt: nowIso,
      factors: [],
    },
    oncology: {
      domain: 'oncology',
      method: 'SIGNAL_COUNT',
      percent: 0,
      band: 'low',
      applicable: false,
      notApplicableReason: PENDING_TEXT,
      sites: [],
      analysis: PENDING_TEXT,
      analysisSummary: PENDING_TEXT,
      updatedAt: nowIso,
    },
  }
}

// Weekly-recommendation and risk-insight copy for every worker is now
// generated on the fly from their wellness numbers in third-party voice —
// see src/lib/aiCopy.ts's buildWeeklySummary/buildWeeklyTasks/
// buildWorkerRiskOverview/buildWorkerSuggestion. The two demo workers with a
// pre-seeded sinoaiUserId (Samadjon Sayfullayev, Alisher Akmaljonov) get
// naturally-tailored output because that generator reads their own real
// (fabricated) wellness data, without needing a hardcoded per-worker table.
