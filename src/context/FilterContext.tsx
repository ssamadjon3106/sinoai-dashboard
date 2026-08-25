import { createContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { RiskBand, Sex } from '@/types'

interface FilterContextValue {
  search: string
  setSearch: (value: string) => void
  riskBand: RiskBand | undefined
  setRiskBand: (value: RiskBand | undefined) => void
  sex: Sex | undefined
  setSex: (value: Sex | undefined) => void
}

export const FilterContext = createContext<FilterContextValue | null>(null)

/** Shared patient-list filter state so the top bar's global search and the dashboard's local filters stay in sync. */
export function FilterProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState('')
  const [riskBand, setRiskBand] = useState<RiskBand | undefined>(undefined)
  const [sex, setSex] = useState<Sex | undefined>(undefined)

  const value = useMemo(() => ({ search, setSearch, riskBand, setRiskBand, sex, setSex }), [search, riskBand, sex])

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}
