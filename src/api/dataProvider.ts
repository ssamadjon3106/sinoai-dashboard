import type {
  ClinicianRole,
  InsightsResponse,
  NewWorkerInput,
  OverviewStats,
  Patient,
  PatientDomains,
  RiskBand,
  Sex,
  UpdateWorkerInput,
  WeeklyRecommendationResponse,
} from '@/types'

export interface UserListFilters {
  search?: string
  riskBand?: RiskBand
  sex?: Sex
}

export interface ClinicianProfile {
  id: string
  email: string
  name: string
  role: ClinicianRole
}

export interface LoginResult {
  token: string
  clinician: ClinicianProfile
}

/**
 * Contract for every data source the dashboard can run against.
 * {@link MockDataProvider} is kept for reference/tests; the active
 * implementation is {@link HttpDataProvider} against the real server — see
 * `api/index.ts`. Components never import an implementation directly, only
 * this interface via the `dataProvider` singleton.
 */
export interface DataProvider {
  login(email: string, password: string): Promise<LoginResult>

  getUsers(filters?: UserListFilters): Promise<Patient[]>
  getUser(id: string): Promise<Patient | undefined>
  getUserRiskDomains(id: string): Promise<PatientDomains | undefined>
  getOverviewStats(): Promise<OverviewStats>

  /** hr-only — the server enforces this regardless of what the UI shows. */
  createWorker(input: NewWorkerInput): Promise<Patient>
  updateWorker(id: string, input: UpdateWorkerInput): Promise<Patient>
  deleteWorker(id: string): Promise<void>

  getInsights(id: string, lang: string): Promise<InsightsResponse>
  getWeeklyRecommendation(id: string, lang: string): Promise<WeeklyRecommendationResponse>
}
