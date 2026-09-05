import { ArrowDown, ArrowUp, ArrowUpDown, Pencil, SearchX, Trash2 } from 'lucide-react'
import type { Patient } from '@/types'
import type { PatientSortKey, SortDirection } from '@/lib/patientSort'
import { metBand, wellnessBand } from '@/lib/wellness'
import { useI18n } from '@/hooks/useI18n'
import { formatInitials } from '@/lib/format'
import { WellnessChip } from '@/components/WellnessChip'
import { EmptyState } from '@/components/ui/EmptyState'
import { TableRowSkeleton } from '@/components/ui/Skeleton'

interface PatientTableProps {
  /** Already sorted by the parent, so the first row here always matches the panel's default patient. */
  patients: Patient[]
  loading: boolean
  activeId: string | undefined
  sortKey: PatientSortKey
  sortDirection: SortDirection
  onToggleSort: (key: PatientSortKey) => void
  /** A row is only opened on explicit click/Enter — never on hover. */
  onSelectPatient: (id: string) => void
  /** hr-only affordances — the server enforces this regardless, this is just UI gating. When absent, no actions column renders (viewer's exact original table). */
  canManage?: boolean
  onEdit?: (patient: Patient) => void
  onDelete?: (patient: Patient) => void
}

const SORT_COLUMNS: { key: PatientSortKey; labelKey: 'patient' | 'ageSex' | 'department' | 'recovery' | 'sleep' | 'met' }[] = [
  { key: 'name', labelKey: 'patient' },
  { key: 'age', labelKey: 'ageSex' },
  { key: 'department', labelKey: 'department' },
  { key: 'recovery', labelKey: 'recovery' },
  { key: 'sleep', labelKey: 'sleep' },
  { key: 'met', labelKey: 'met' },
]

export function PatientTable({
  patients,
  loading,
  activeId,
  sortKey,
  sortDirection,
  onToggleSort,
  onSelectPatient,
  canManage = false,
  onEdit,
  onDelete,
}: PatientTableProps) {
  const { t } = useI18n()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-canvas">
            <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
              {SORT_COLUMNS.map((col) => (
                <th key={col.key} className="px-4 py-3 font-semibold">
                  <button
                    type="button"
                    onClick={() => onToggleSort(col.key)}
                    className="inline-flex items-center gap-1 hover:text-ink-700"
                  >
                    {t.table[col.labelKey]}
                    {sortKey === col.key ? (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-30" />
                    )}
                  </button>
                </th>
              ))}
              {canManage && <th className="px-4 py-3 font-semibold" aria-hidden="true" />}
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 10 }).map((_, i) => <TableRowSkeleton key={i} />)}

            {!loading &&
              patients.map((patient) => {
                const isActive = activeId === patient.id
                return (
                  <tr
                    key={patient.id}
                    tabIndex={0}
                    role="row"
                    aria-selected={isActive}
                    onClick={() => onSelectPatient(patient.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onSelectPatient(patient.id)
                      }
                    }}
                    className={[
                      // Selection is the left accent border alone (below) —
                      // no background tint stacked on top of it.
                      'group cursor-pointer border-b border-border/70 transition-colors',
                      isActive ? '' : 'hover:bg-surface-sunken',
                    ].join(' ')}
                    style={isActive ? { boxShadow: 'inset 3px 0 0 0 #17977E' } : undefined}
                  >
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        {patient.photoUrl ? (
                          <img
                            src={patient.photoUrl}
                            alt=""
                            className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-transparent transition-all group-hover:ring-brand-100"
                          />
                        ) : (
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-200 text-xs font-bold text-brand-700">
                            {formatInitials(patient.firstName, patient.lastName)}
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-ink-900">
                            {patient.firstName} {patient.lastName}
                          </p>
                          <p className="truncate text-xs text-ink-400">{patient.region}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-ink-700">
                      {patient.age}
                      {t.table.yearsShort} · {patient.sex === 'male' ? t.table.male : t.table.female}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center rounded-full bg-surface-muted px-2.5 py-1 text-xs font-semibold text-ink-700">
                        {t.department[patient.department]}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <WellnessChip kind="recovery" value={patient.wellness.recovery} band={wellnessBand(patient.wellness.recovery)} suffix="%" />
                    </td>
                    <td className="px-4 py-2.5">
                      <WellnessChip kind="sleep" value={patient.wellness.sleepScore} band={wellnessBand(patient.wellness.sleepScore)} />
                    </td>
                    <td className="px-4 py-2.5">
                      <WellnessChip kind="met" value={patient.wellness.met} band={metBand(patient.wellness.met)} />
                    </td>
                    {canManage && (
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              onEdit?.(patient)
                            }}
                            aria-label={t.worker.editAction}
                            className="rounded-full p-1.5 text-ink-400 hover:bg-surface-muted hover:text-ink-700"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              onDelete?.(patient)
                            }}
                            aria-label={t.worker.deleteAction}
                            className="rounded-full p-1.5 text-ink-400 hover:bg-risk-high-bg hover:text-risk-high"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })}
          </tbody>
        </table>

        {!loading && patients.length === 0 && (
          <EmptyState icon={SearchX} title={t.table.noResults} description={t.table.noResultsHint} />
        )}
      </div>

      {!loading && (
        <div className="border-t border-border px-4 py-2.5 text-xs text-ink-400">
          {patients.length} {t.table.resultsCount}
        </div>
      )}
    </div>
  )
}
