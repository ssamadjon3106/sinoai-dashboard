import { Sparkles } from 'lucide-react'
import { useI18n } from '@/hooks/useI18n'
import { useUsers } from '@/hooks/useUsers'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { WellnessMetricTile } from '@/components/WellnessMetricTile'
import { departmentSummaries, metBand, wellnessBand } from '@/lib/wellness'
import { buildDepartmentOverview, buildDepartmentSuggestion } from '@/lib/aiCopy'

/**
 * New sidebar page (item 11 of the redesign brief): per-department aggregate
 * Recovery/Sleep/MET, plus an AI-generated risk overview and suggestion for
 * HR, one card per department.
 */
export function DepartmentsPage() {
  const { t, language } = useI18n()
  const { data: users, loading } = useUsers({})
  const summaries = departmentSummaries(users ?? [])

  return (
    <div className="h-full overflow-y-auto">
      <PageHeader title={t.departmentsPage.title} subtitle={t.departmentsPage.subtitle} />

      <div className="grid grid-cols-1 gap-4 p-6 lg:grid-cols-2">
        {loading || !users
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[320px] rounded-card" />)
          : summaries.map((summary) => (
              <Card key={summary.key}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-bold text-ink-900">{t.department[summary.key]}</h3>
                  <span className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-semibold text-ink-500">
                    {summary.count} {t.departmentsPage.workersLabel}
                  </span>
                </div>

                <div className="mb-4 grid grid-cols-3 gap-2">
                  <WellnessMetricTile kind="recovery" value={summary.average.recovery} band={wellnessBand(summary.average.recovery)} suffix="%" />
                  <WellnessMetricTile kind="sleep" value={summary.average.sleepScore} band={wellnessBand(summary.average.sleepScore)} />
                  <WellnessMetricTile kind="met" value={summary.average.met} band={metBand(summary.average.met)} />
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div>
                    <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-400">
                      <Sparkles className="h-3.5 w-3.5 text-brand-600" />
                      {t.riskInsights.riskOverviewLabel}
                    </p>
                    <p className="text-sm leading-relaxed text-ink-700">{buildDepartmentOverview(summary, language)}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-400">{t.riskInsights.suggestionLabel}</p>
                    <p className="text-sm leading-relaxed text-ink-700">{buildDepartmentSuggestion(summary, language)}</p>
                  </div>
                </div>
              </Card>
            ))}
      </div>
    </div>
  )
}
