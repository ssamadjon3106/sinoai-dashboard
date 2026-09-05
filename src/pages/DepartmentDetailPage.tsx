import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, Lightbulb, Sparkles } from 'lucide-react'
import type { DepartmentKey } from '@/types'
import { DEPARTMENT_KEYS } from '@/types'
import { useI18n } from '@/hooks/useI18n'
import { useUsers } from '@/hooks/useUsers'
import { averageWellness, metBand, stressBand, wellnessBand, wellnessIndex } from '@/lib/wellness'
import { buildDepartmentOverview, buildDepartmentSuggestion } from '@/lib/aiCopy'
import { formatInitials } from '@/lib/format'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { WellnessChip } from '@/components/WellnessChip'
import { WellnessMetricTile } from '@/components/WellnessMetricTile'

function isDepartmentKey(value: string | undefined): value is DepartmentKey {
  return !!value && (DEPARTMENT_KEYS as readonly string[]).includes(value)
}

/**
 * Drill-down destination from DepartmentsPage's list (item 3 fix): full
 * aggregate metrics, the AI risk overview/suggestion (split into two cards,
 * matching the worker-detail-page convention), and the list of workers
 * belonging to this department.
 */
export function DepartmentDetailPage() {
  const { key } = useParams<{ key: string }>()
  const { t, language } = useI18n()
  const { data: users, loading } = useUsers({})

  if (!isDepartmentKey(key)) {
    return <EmptyState icon={Building2} title={t.table.noResults} />
  }

  const workers = (users ?? []).filter((w) => w.department === key)
  const average = averageWellness(workers.map((w) => w.wellness))
  const summary = { key, count: workers.length, average, index: wellnessIndex(average) }

  return (
    <div className="h-full overflow-y-auto">
      <div className="border-b border-border px-6 py-3">
        <Link to="/departments" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-700">
          <ArrowLeft className="h-4 w-4" />
          {t.departmentsPage.backAction}
        </Link>
      </div>

      {loading || !users ? (
        <div className="space-y-4 p-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-24 rounded-card" />
          <Skeleton className="h-40 rounded-card" />
        </div>
      ) : (
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Building2 className="h-5 w-5" fill="currentColor" strokeWidth={1.5} />
            </span>
            <div>
              <h1 className="font-display text-xl font-extrabold text-ink-900">{t.department[key]}</h1>
              <p className="text-sm text-ink-400">
                {summary.count} {t.departmentsPage.workersLabel}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            <WellnessMetricTile kind="recovery" value={average.recovery} band={wellnessBand(average.recovery)} suffix="%" />
            <WellnessMetricTile kind="sleep" value={average.sleepScore} band={wellnessBand(average.sleepScore)} />
            <WellnessMetricTile kind="met" value={average.met} band={metBand(average.met)} />
            <WellnessMetricTile kind="activity" value={average.activityScore} band={wellnessBand(average.activityScore)} />
            <WellnessMetricTile kind="stress" value={average.stressScore} band={stressBand(average.stressScore)} />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-900">
                <Sparkles className="h-4 w-4 text-brand-600" />
                {t.riskInsights.riskOverviewLabel}
              </h3>
              <p className="text-sm leading-relaxed text-ink-700">{buildDepartmentOverview(summary, language)}</p>
            </Card>
            <Card>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-900">
                <Lightbulb className="h-4 w-4 text-brand-600" />
                {t.riskInsights.suggestionLabel}
              </h3>
              <p className="text-sm leading-relaxed text-ink-700">{buildDepartmentSuggestion(summary, language)}</p>
            </Card>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-bold text-ink-900">{t.nav.users}</h2>
            <div className="divide-y divide-border rounded-card border border-border bg-surface">
              {workers.map((worker) => (
                <Link
                  key={worker.id}
                  to={`/users/${worker.id}`}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-sunken"
                >
                  {worker.photoUrl ? (
                    <img src={worker.photoUrl} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                      {formatInitials(worker.firstName, worker.lastName)}
                    </span>
                  )}
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink-900">
                    {worker.firstName} {worker.lastName}
                  </span>
                  <div className="flex shrink-0 gap-1">
                    <WellnessChip kind="recovery" value={worker.wellness.recovery} band={wellnessBand(worker.wellness.recovery)} suffix="%" />
                    <WellnessChip kind="sleep" value={worker.wellness.sleepScore} band={wellnessBand(worker.wellness.sleepScore)} />
                    <WellnessChip kind="met" value={worker.wellness.met} band={metBand(worker.wellness.met)} />
                  </div>
                </Link>
              ))}
              {workers.length === 0 && <div className="px-4 py-6 text-center text-sm text-ink-400">—</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
