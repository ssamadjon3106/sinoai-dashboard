import type { LocalizedText } from './i18n'

export const RISK_BANDS = ['low', 'moderate', 'high'] as const
export type RiskBand = (typeof RISK_BANDS)[number]

export const DOMAIN_KEYS = ['diabetes', 'cvd', 'oncology'] as const
export type DomainKey = (typeof DOMAIN_KEYS)[number]

export type Sex = 'male' | 'female'

export const CLINICIAN_ROLES = ['viewer', 'hr'] as const
export type ClinicianRole = (typeof CLINICIAN_ROLES)[number]

export interface RiskFactor {
  id: string
  label: LocalizedText
  /** Whether this factor is present/elevated for the patient. */
  present: boolean
  /** Optional measured value shown alongside the factor, e.g. "BMI 31.2". */
  value?: string
}

/** Shared shape for every domain result before its domain-specific payload. */
interface DomainResultBase {
  domain: DomainKey
  /** Overall risk expressed 0-100. For oncology this is a screening-signal level, not a probability. */
  percent: number
  band: RiskBand
  /** Whether this domain's model applies to this patient (false for CVD outside 40-69). */
  applicable: boolean
  notApplicableReason?: LocalizedText
  /** "If abnormal, refer to..." guidance shown under the breakdown. */
  referral?: LocalizedText
  /** Canned AI-style "Analiz natijasi" paragraph, full length. */
  analysis: LocalizedText
  /** Shorter lead-in shown before the "Batafsil o'qish" expander. */
  analysisSummary: LocalizedText
  updatedAt: string
}

export interface DiabetesResult extends DomainResultBase {
  domain: 'diabetes'
  method: 'CANRISK'
  factors: RiskFactor[]
}

export interface CvdResult extends DomainResultBase {
  domain: 'cvd'
  method: 'SCORE2'
  factors: RiskFactor[]
}

export interface OncologySite {
  id: string
  label: LocalizedText
  percent: number
  band: RiskBand
  factors: RiskFactor[]
}

export interface OncologyResult extends DomainResultBase {
  domain: 'oncology'
  method: 'SIGNAL_COUNT'
  sites: OncologySite[]
}

export type DomainResult = DiabetesResult | CvdResult | OncologyResult

export interface ReferenceRange {
  min: number
  max: number
  unit: string
}

/**
 * Only the measurements SinoAI's real API actually exposes for a user: BMI
 * (GET /api/users/{id}) and vitamin D3 (parsed from a lab document on
 * GET /api/medcard/{id}). Blood pressure, glucose, and SpO2 have no
 * retrievable source in the API — removed rather than fabricated.
 */
export interface ReferenceRangeSet {
  vitaminD3: ReferenceRange
  bmi: ReferenceRange
}

export interface PatientDomains {
  diabetes: DiabetesResult
  cvd: CvdResult
  oncology: OncologyResult
}

export interface PatientMeasurements {
  /** Only present when a real lab document on the user's medcard states it explicitly. */
  vitaminD3?: number
  bmi: number
}

export interface Patient {
  id: string
  firstName: string
  lastName: string
  age: number
  sex: Sex
  region: string
  phone: string
  enrolledAt: string
  /** Present only for the users a real photo was supplied for; falls back to initials otherwise. */
  photoUrl?: string | null
  /** Job title within the company, captured by HR at registration. */
  job: string
  /** What the worker does day to day — used as LLM context for the risk-insights and weekly-recommendation panels. */
  description: string
  /** Company-issued insurance number — the one optional field in HR's registration form. */
  insuranceNumber?: string | null
  /** False until the worker has been through SinoAI's real CANRISK/SCORE2 assessment. */
  assessed: boolean
  /** Links this worker to their account in the SinoAI mobile chatbot, when known. */
  sinoaiUserId?: string | null
  measurements: PatientMeasurements
  domains: PatientDomains
}

export interface DomainBandCounts {
  low: number
  moderate: number
  high: number
  notApplicable: number
}

export interface OverviewStats {
  totalEnrolled: number
  /** Enrolled workers whose applicable domains are all "low" — the KPI tile between Enrolled and Needs attention. */
  normalUsers: number
  needsAttention: number
  perDomain: Record<DomainKey, DomainBandCounts>
}

/** Fields HR fills in when registering a new worker. Only insuranceNumber is optional. */
export interface NewWorkerInput {
  phone: string
  fullName: string
  job: string
  description: string
  insuranceNumber?: string
  sinoaiUserId?: string
}

/** All fields optional — only what's provided gets updated. */
export interface UpdateWorkerInput {
  phone?: string
  fullName?: string
  job?: string
  description?: string
  insuranceNumber?: string | null
  sinoaiUserId?: string | null
}

export interface InsightsResult {
  riskOverview: string
  suggestion: string
  generatedAt: string
}

export type InsightsResponse = InsightsResult | { notApplicable: true }

export interface WeeklyTask {
  id: string
  text: string
}

export interface WeeklyRecommendationResult {
  isoYear: number
  isoWeek: number
  summary: string
  tasks: WeeklyTask[]
  generatedAt: string
}

export type WeeklyRecommendationResponse = WeeklyRecommendationResult | { notLinked: true }
