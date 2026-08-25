import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { dataProvider } from '@/api'
import type { ClinicianProfile } from '@/api'
import { getStoredClinician, setSession } from '@/api/session'

export type { ClinicianProfile } from '@/api'

interface AuthContextValue {
  isAuthenticated: boolean
  clinician: ClinicianProfile | undefined
  /** hr can add/edit/delete workers; viewer is read-only. Mirrors the server's own role check — this is for UI affordances only, never the security boundary. */
  isHr: boolean
  /** Real credential login against the server. Throws on invalid credentials — callers show the message. */
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  // Rehydrate from localStorage so a page reload doesn't force re-login.
  const [clinician, setClinician] = useState<ClinicianProfile | undefined>(() => getStoredClinician() ?? undefined)

  const signIn = useCallback(async (email: string, password: string) => {
    const { token, clinician: profile } = await dataProvider.login(email, password)
    setSession({ token, clinician: profile })
    setClinician(profile)
  }, [])

  const signOut = useCallback(() => {
    setSession(null)
    setClinician(undefined)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: clinician !== undefined,
      clinician,
      isHr: clinician?.role === 'hr',
      signIn,
      signOut,
    }),
    [clinician, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
