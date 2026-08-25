import { useEffect, useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useI18n } from '@/hooks/useI18n'
import { useFilters } from '@/hooks/useFilters'
import { useUsers } from '@/hooks/useUsers'
import { useUser } from '@/hooks/useUser'
import { useAuth } from '@/hooks/useAuth'
import { dataProvider } from '@/api'
import { PatientTable } from '@/components/dashboard/PatientTable'
import { UserDetailPanel } from '@/components/dashboard/UserDetailPanel'
import { WorkerFormModal } from '@/components/dashboard/WorkerFormModal'
import { DeleteWorkerDialog } from '@/components/dashboard/DeleteWorkerDialog'
import { Skeleton } from '@/components/ui/Skeleton'
import type { Patient, RiskBand, Sex } from '@/types'
import type { PatientSortKey, SortDirection } from '@/lib/patientSort'
import { sortPatients } from '@/lib/patientSort'

const RISK_BAND_OPTIONS: RiskBand[] = ['low', 'moderate', 'high']

export function DashboardPage() {
  const { t } = useI18n()
  const { isHr } = useAuth()
  const { search, setSearch, riskBand, setRiskBand, sex, setSex } = useFilters()
  const { data: patients, loading, reload } = useUsers({ search, riskBand, sex })

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
  const [sortKey, setSortKey] = useState<PatientSortKey>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [formTarget, setFormTarget] = useState<'add' | Patient | undefined>(undefined)
  const [deleteTarget, setDeleteTarget] = useState<Patient | undefined>(undefined)

  function toggleSort(key: PatientSortKey) {
    if (key === sortKey) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const list = useMemo(() => sortPatients(patients ?? [], sortKey, sortDirection), [patients, sortKey, sortDirection])

  useEffect(() => {
    if (selectedId && !list.some((p) => p.id === selectedId)) setSelectedId(undefined)
  }, [list, selectedId])

  const { data: selectedPatient, loading: selectedLoading } = useUser(selectedId)

  return (
    <div className="flex h-full min-h-0">
      <div className={['flex min-w-0 flex-col', selectedId ? 'flex-[1.4] border-r border-border' : 'flex-1'].join(' ')}>
        <div className="flex flex-wrap items-center gap-2 border-b border-border px-6 py-4">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.table.searchPlaceholder}
              className="w-full rounded-control border border-border bg-surface py-2 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500"
            />
          </div>
          <select
            value={riskBand ?? ''}
            onChange={(e) => setRiskBand(e.target.value ? (e.target.value as RiskBand) : undefined)}
            className="rounded-control border border-border bg-surface px-3 py-2 text-sm text-ink-700 focus:border-brand-500"
          >
            <option value="">
              {t.table.filterRiskBand}: {t.table.filterAll}
            </option>
            {RISK_BAND_OPTIONS.map((band) => (
              <option key={band} value={band}>
                {t.riskBand[band]}
              </option>
            ))}
          </select>
          <select
            value={sex ?? ''}
            onChange={(e) => setSex(e.target.value ? (e.target.value as Sex) : undefined)}
            className="rounded-control border border-border bg-surface px-3 py-2 text-sm text-ink-700 focus:border-brand-500"
          >
            <option value="">
              {t.table.filterSex}: {t.table.filterAll}
            </option>
            <option value="male">{t.table.male}</option>
            <option value="female">{t.table.female}</option>
          </select>
          {isHr && (
            <button
              type="button"
              onClick={() => setFormTarget('add')}
              className="inline-flex items-center gap-1.5 rounded-control bg-gradient-to-r from-brand-600 to-brand-700 px-3.5 py-2 text-sm font-bold text-white shadow-sm hover:-translate-y-0.5 hover:shadow-card"
            >
              <Plus className="h-4 w-4" />
              {t.worker.addAction}
            </button>
          )}
        </div>

        <div className="min-h-0 flex-1">
          <PatientTable
            patients={list}
            loading={loading}
            activeId={selectedId}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onToggleSort={toggleSort}
            onSelectPatient={setSelectedId}
            canManage={isHr}
            onEdit={setFormTarget}
            onDelete={setDeleteTarget}
          />
        </div>
      </div>

      {selectedId && (
        <aside key={selectedId} className="hidden min-w-0 flex-1 animate-panel-in md:block">
          {selectedLoading || !selectedPatient ? (
            <PanelSkeleton />
          ) : (
            <UserDetailPanel patient={selectedPatient} onClose={() => setSelectedId(undefined)} />
          )}
        </aside>
      )}

      {formTarget && (
        <WorkerFormModal
          patient={formTarget === 'add' ? undefined : formTarget}
          onClose={() => setFormTarget(undefined)}
          onSubmit={async (input) => {
            if (formTarget === 'add') {
              await dataProvider.createWorker(input)
            } else {
              await dataProvider.updateWorker(formTarget.id, input)
            }
            reload()
          }}
        />
      )}

      {deleteTarget && (
        <DeleteWorkerDialog
          patient={deleteTarget}
          onClose={() => setDeleteTarget(undefined)}
          onConfirm={async () => {
            await dataProvider.deleteWorker(deleteTarget.id)
            reload()
          }}
        />
      )}
    </div>
  )
}

function PanelSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-11 w-11 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
      <Skeleton className="h-48 w-48 self-center rounded-full" />
      <Skeleton className="h-24 rounded-card" />
      <Skeleton className="h-40 rounded-card" />
    </div>
  )
}
