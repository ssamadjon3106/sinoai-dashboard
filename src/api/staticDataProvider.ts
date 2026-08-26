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

    let result = this.workers.filter((w) => {
      if (filters.sex && w.sex !== filters.sex) return false
      if (search) {
        const textMatch =
          w.firstName.toLowerCase().includes(search) ||
          w.lastName.toLowerCase().includes(search) ||
          w.region.toLowerCase().includes(search) ||
          w.phone.toLowerCase().includes(search)
        const idMatch = isUuidSearch && w.id.toLowerCase() === search
        if (!textMatch && !idMatch) return false
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

  // ---- AI panels (static copy — see server/app/api/{insights,weekly}.py for the same fallback text) ----

  async getInsights(id: string, lang: string): Promise<InsightsResponse> {
    const worker = this.workers.find((w) => w.id === id)
    if (!worker) throw new Error('Not found')
    if (!worker.assessed) return { notApplicable: true }

    // Every pre-seeded demo worker is `assessed`, so this is the branch that
    // actually renders for them: build the overview from the worker's own
    // real per-domain analysisSummary text (already tailored per person)
    // rather than a generic message.
    const applicableDomain = DOMAIN_KEYS.find((d) => worker.domains[d].applicable)
    const riskOverview = applicableDomain
      ? localize(worker.domains[applicableDomain].analysisSummary, lang)
      : localize(INSIGHTS_SUGGESTION_FALLBACK, lang)

    return {
      riskOverview,
      suggestion: localize(INSIGHTS_SUGGESTION_FALLBACK, lang),
      generatedAt: new Date().toISOString(),
    }
  }

  async getWeeklyRecommendation(id: string, lang: string): Promise<WeeklyRecommendationResponse> {
    const worker = this.workers.find((w) => w.id === id)
    if (!worker) throw new Error('Not found')
    if (!worker.sinoaiUserId) return { notLinked: true }

    // Reachable only if a demo-added/edited worker is given a sinoaiUserId
    // during the session — no live SinoAI/OpenAI calls happen here, same
    // static fallback copy the real server shows while those aren't wired up.
    const now = new Date()
    const fallback = WEEKLY_FALLBACK[asLang(lang)]
    return {
      isoYear: getISOWeekYear(now),
      isoWeek: getISOWeek(now),
      summary: fallback.summary,
      tasks: fallback.tasks.map((text, i) => ({ id: `static-${i}`, text })),
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

function localize(text: LocalizedText, lang: string): string {
  return text[asLang(lang)]
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

// Identical copy to server/app/api/insights.py's `_STATIC_FALLBACK.suggestion`
// — the "what should the company do" half of the Risk Insights card, paired
// above with the worker's own real analysisSummary text as the "overview" half.
const INSIGHTS_SUGGESTION_FALLBACK: LocalizedText = {
  uz: "Xodim bilan yaqin orada suhbat o'tkazing va zarur bo'lsa mutaxassisga yo'naltiring. Kuzatuvni davom ettiring va natijalar o'zgarsa qayta baholang.",
  ru: 'Проведите беседу с сотрудником в ближайшее время и при необходимости направьте к специалисту. Продолжайте наблюдение и переоцените ситуацию при изменении показателей.',
  en: 'Check in with the worker soon and refer them to a specialist if needed. Keep monitoring and re-evaluate if the results change.',
}

// Identical copy to server/app/api/weekly.py's `_STATIC_FALLBACK` — shown for
// every worker without a linked sinoaiUserId (all 12 pre-seeded demo workers).
const WEEKLY_FALLBACK: Record<keyof LocalizedText, { summary: string; tasks: string[] }> = {
  uz: {
    summary: "Bu hafta uchun umumiy sog'liqni saqlash tavsiyalari (SinoAI'ga ulanmagan yoki AI xulosa hali sozlanmagan).",
    tasks: [
      'Har kuni kamida 20-30 daqiqa piyoda yuring',
      'Kuniga 6-8 stakan suv ichishga harakat qiling',
      'Uyqu tartibini kuzating (kamida 7 soat)',
    ],
  },
  ru: {
    summary:
      'Общие рекомендации по здоровью на эту неделю (аккаунт не привязан к SinoAI или AI-сводка ещё не настроена).',
    tasks: [
      'Гуляйте пешком минимум 20-30 минут каждый день',
      'Старайтесь выпивать 6-8 стаканов воды в день',
      'Следите за режимом сна (не менее 7 часов)',
    ],
  },
  en: {
    summary: "General wellness guidance for this week (not yet linked to SinoAI, or the AI summary isn't configured yet).",
    tasks: [
      'Take at least a 20-30 minute walk every day',
      'Aim for 6-8 glasses of water a day',
      'Keep a consistent sleep schedule (at least 7 hours)',
    ],
  },
}
