import { createContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Language } from '@/types'
import { DICTIONARIES } from '@/lib/i18n'
import type { UiStrings } from '@/lib/i18n'

export interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: UiStrings
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

const DEFAULT_LANGUAGE: Language = 'uz'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE)

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: DICTIONARIES[language] }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
