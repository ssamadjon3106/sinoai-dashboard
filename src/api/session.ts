import type { ClinicianProfile } from './dataProvider'

const TOKEN_KEY = 'sinoai.auth.token'
const CLINICIAN_KEY = 'sinoai.auth.clinician'

/**
 * Small in-memory + localStorage-backed session store shared between
 * `AuthContext` (which sets/clears it on sign-in/out, and rehydrates from it
 * on mount so a reload doesn't force re-login) and `HttpDataProvider` (which
 * reads the token to attach `Authorization: Bearer <token>` to every
 * request). Kept out of React state so a plain module function — not a
 * hook — can read the current token from inside `fetch` calls.
 */
let currentToken: string | null = null
let currentClinician: ClinicianProfile | null = null

try {
  currentToken = localStorage.getItem(TOKEN_KEY)
  const stored = localStorage.getItem(CLINICIAN_KEY)
  currentClinician = stored ? (JSON.parse(stored) as ClinicianProfile) : null
} catch {
  // localStorage can throw in some contexts (private browsing, disabled
  // storage) — the app just behaves as if no session was persisted.
  currentToken = null
  currentClinician = null
}

export function getToken(): string | null {
  return currentToken
}

export function getStoredClinician(): ClinicianProfile | null {
  return currentClinician
}

export function setSession(session: { token: string; clinician: ClinicianProfile } | null): void {
  currentToken = session?.token ?? null
  currentClinician = session?.clinician ?? null
  try {
    if (session) {
      localStorage.setItem(TOKEN_KEY, session.token)
      localStorage.setItem(CLINICIAN_KEY, JSON.stringify(session.clinician))
    } else {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(CLINICIAN_KEY)
    }
  } catch {
    // Best-effort persistence only — an in-memory session for this tab is
    // still correct even if localStorage is unavailable.
  }
}
