import type { Patient } from '@/types'

export type PatientSortKey = 'name' | 'age' | 'diabetes' | 'cvd' | 'oncology'
export type SortDirection = 'asc' | 'desc'

function sortValue(patient: Patient, key: PatientSortKey): number | string {
  switch (key) {
    case 'name':
      return `${patient.lastName} ${patient.firstName}`.toLowerCase()
    case 'age':
      return patient.age
    case 'diabetes':
      return patient.domains.diabetes.percent
    case 'cvd':
      return patient.domains.cvd.applicable ? patient.domains.cvd.percent : -1
    case 'oncology':
      return patient.domains.oncology.percent
  }
}

export function sortPatients(patients: Patient[], key: PatientSortKey, direction: SortDirection): Patient[] {
  const copy = [...patients]
  copy.sort((a, b) => {
    const av = sortValue(a, key)
    const bv = sortValue(b, key)
    const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number)
    return direction === 'asc' ? cmp : -cmp
  })
  return copy
}
