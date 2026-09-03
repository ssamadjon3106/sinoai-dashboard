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

    // Two of the demo workers (Samadjon Sayfullayev, Alisher Akmaljonov) are
    // pre-seeded with a sinoaiUserId and get copy tailored to their own real
    // domain data (see CUSTOM_WEEKLY below) instead of the generic fallback —
    // everyone else who picks up a sinoaiUserId via the demo's add/edit form
    // during the session gets the same generic WEEKLY_FALLBACK copy the real
    // server shows while live SinoAI/OpenAI calls aren't wired up.
    const now = new Date()
    const custom = CUSTOM_WEEKLY[worker.id]
    const source = custom ? custom[asLang(lang)] : WEEKLY_FALLBACK[asLang(lang)]
    return {
      isoYear: getISOWeekYear(now),
      isoWeek: getISOWeek(now),
      summary: source.summary,
      tasks: source.tasks.map((text, i) => ({ id: `${custom ? 'custom' : 'static'}-${i}`, text })),
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

// Per-worker weekly-recommendation copy for the two demo workers given a
// fake sinoaiUserId (see demoWorkers.ts) — written from each worker's own
// real domains.* data so the linked-account state reads as tailored rather
// than generic: Samadjon (diabetes 37% high, on metformin; cvd 22%
// moderate/hypertension) and Alisher (diabetes 40% high; cvd 24% moderate;
// ongoing lower back pain/muscle spasms; overdue hormone panel).
const CUSTOM_WEEKLY: Record<string, Record<keyof LocalizedText, { summary: string; tasks: string[] }>> = {
  // Samadjon Sayfullayev
  'daedfe05-f9d7-4ab6-8d92-c4b9d3b85539': {
    uz: {
      summary:
        "Bu hafta ham qandli diabet va qon bosimi ko'rsatkichlaringiz asosiy e'tibor markazida bo'lib qolmoqda. Metformin qabulini uzmang va shakar darajangizni muntazam kuzatib boring.",
      tasks: [
        'Metforminni shifokor belgilagan dozada, har kuni bir xil vaqtda iching',
        "Qon shakarini har kuni ertalab, ovqatlanishdan oldin o'lchang",
        'Tuz iste’molini kamaytiring va qon bosimingizni haftada kamida 3 marta tekshiring',
        'Endokrinologga navbatdagi tashrifni belgilang',
      ],
    },
    ru: {
      summary:
        'На этой неделе показатели сахара в крови и артериального давления по-прежнему требуют внимания. Продолжайте приём метформина и регулярно контролируйте уровень глюкозы.',
      tasks: [
        'Принимайте метформин строго по назначенной дозировке в одно и то же время',
        'Измеряйте уровень сахара в крови каждое утро натощак',
        'Ограничьте потребление соли и проверяйте давление минимум 3 раза в неделю',
        'Запишитесь на приём к эндокринологу для контроля лечения',
      ],
    },
    en: {
      summary:
        'Your blood sugar and blood pressure remain this week\'s focus. Keep taking metformin as prescribed and continue monitoring your glucose levels.',
      tasks: [
        'Take metformin exactly as prescribed, at the same time each day',
        'Check your fasting blood glucose every morning',
        'Reduce salt intake and check your blood pressure at least 3 times this week',
        'Schedule a follow-up visit with your endocrinologist',
      ],
    },
  },
  // Alisher Akmaljonov
  '3d51baf3-f109-4359-aa85-0e44295554bd': {
    uz: {
      summary:
        "Bu hafta bel og'rig'ingiz va qandli diabet ko'rsatkichlaringiz asosiy e'tibor markazida. Mushaklarni bo'shashtiruvchi mashqlarni davom ettiring va kechiktirilgan gormonlar tahlilini unutmang.",
      tasks: [
        "Har kuni yengil cho'zilish (stretching) mashqlarini bajaring",
        'Uzoq vaqt bir xil holatda o‘tirishdan saqlaning — har soatda tanaffus qiling',
        'Kechiktirilgan gormonlar tahlilini topshiring',
        'Qon shakaringizni haftada kamida 3 marta o‘lchab boring',
      ],
    },
    ru: {
      summary:
        'На этой неделе в фокусе — боль в пояснице и показатели сахара в крови. Продолжайте упражнения на расслабление мышц и не забудьте про отложенный анализ на гормоны.',
      tasks: [
        'Выполняйте лёгкую растяжку каждый день',
        'Избегайте долгого сидения в одной позе — делайте перерыв каждый час',
        'Сдайте отложенный анализ на гормоны',
        'Измеряйте уровень сахара в крови минимум 3 раза в неделю',
      ],
    },
    en: {
      summary:
        "Your lower back pain and blood sugar levels are this week's focus. Keep up the gentle stretching and don't forget the overdue hormone panel.",
      tasks: [
        'Do gentle stretching exercises every day',
        'Avoid sitting in one position too long — take a break every hour',
        'Complete the overdue hormone blood test',
        'Check your blood glucose at least 3 times this week',
      ],
    },
  },
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
