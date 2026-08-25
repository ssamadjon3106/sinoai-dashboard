import type { InsightsResponse, NewWorkerInput, OverviewStats, Patient, PatientDomains, UpdateWorkerInput, WeeklyRecommendationResponse } from '@/types'
import { http } from './http'
import type { DataProvider, LoginResult, UserListFilters } from './dataProvider'

/**
 * Real backend implementation of {@link DataProvider}, talking to the
 * Express + Postgres API in `server/`. This is the one-line swap the
 * codebase's own docs described — see `api/index.ts`.
 */
export class HttpDataProvider implements DataProvider {
  login(email: string, password: string): Promise<LoginResult> {
    return http.post<LoginResult>('/api/auth/login', { email, password }, { skipAuth: true })
  }

  getUsers(filters: UserListFilters = {}): Promise<Patient[]> {
    const params = new URLSearchParams()
    if (filters.search) params.set('search', filters.search)
    if (filters.riskBand) params.set('riskBand', filters.riskBand)
    if (filters.sex) params.set('sex', filters.sex)
    const qs = params.toString()
    return http.get<Patient[]>(`/api/patients${qs ? `?${qs}` : ''}`)
  }

  async getUser(id: string): Promise<Patient | undefined> {
    try {
      return await http.get<Patient>(`/api/patients/${id}`)
    } catch {
      return undefined
    }
  }

  async getUserRiskDomains(id: string): Promise<PatientDomains | undefined> {
    const patient = await this.getUser(id)
    return patient?.domains
  }

  getOverviewStats(): Promise<OverviewStats> {
    return http.get<OverviewStats>('/api/patients/overview-stats')
  }

  createWorker(input: NewWorkerInput): Promise<Patient> {
    return http.post<Patient>('/api/patients', input)
  }

  updateWorker(id: string, input: UpdateWorkerInput): Promise<Patient> {
    return http.patch<Patient>(`/api/patients/${id}`, input)
  }

  deleteWorker(id: string): Promise<void> {
    return http.delete<void>(`/api/patients/${id}`)
  }

  getInsights(id: string, lang: string): Promise<InsightsResponse> {
    return http.post<InsightsResponse>(`/api/patients/${id}/insights?lang=${encodeURIComponent(lang)}`)
  }

  getWeeklyRecommendation(id: string, lang: string): Promise<WeeklyRecommendationResponse> {
    return http.get<WeeklyRecommendationResponse>(`/api/patients/${id}/weekly-recommendation?lang=${encodeURIComponent(lang)}`)
  }
}
