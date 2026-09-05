import { Link } from 'react-router-dom'
import { Building2, ChevronRight } from 'lucide-react'
import { useI18n } from '@/hooks/useI18n'
import { useUsers } from '@/hooks/useUsers'
import { PageHeader } from '@/components/PageHeader'
import { Skeleton } from '@/components/ui/Skeleton'
import { WellnessChip } from '@/components/WellnessChip'
import { departmentSummaries, metBand, wellnessBand } from '@/lib/wellness'
import { RISK_COLORS } from '@/lib/clinicalConfig'

/**
 * Sidebar page (item 11 of the redesign brief): a list of departments, each
 * row summarizing its headcount and average wellness metrics. Clicking a
 * row drills into DepartmentDetailPage for that department's full AI
 * overview/suggestion and worker list — a master list + detail-drill-down
 * pattern, per design feedback (the page previously showed every
 * department's full detail inline, which read as cluttered).
 */
export function DepartmentsPage() {
  const { t } = useI18n()
  const { data: users, loading } = useUsers({})
  const summaries = departmentSummaries(users ?? [])

  return (
    <div className="h-full overflow-y-auto">
      <PageHeader title={t.departmentsPage.title} subtitle={t.departmentsPage.subtitle} />

      <div className="space-y-3 p-6">
        {loading || !users
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[76px] rounded-card" />)
          : summaries.map((summary) => {
              const color = RISK_COLORS[wellnessBand(summary.index)]
              return (
                <Link
                  key={summary.key}
                  to={`/departments/${summary.key}`}
                  className="flex items-center gap-4 rounded-card border border-border bg-surface p-4 transition-shadow duration-200 hover:shadow-card-hover"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${color}1a`, color }}
                  >
                    <Building2 className="h-5 w-5" fill="currentColor" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-ink-900">{t.department[summary.key]}</h3>
                    <p className="text-xs text-ink-400">
                      {summary.count} {t.departmentsPage.workersLabel}
                    </p>
                  </div>
                  <div className="hidden shrink-0 gap-1.5 sm:flex">
                    <WellnessChip kind="recovery" value={summary.average.recovery} band={wellnessBand(summary.average.recovery)} suffix="%" />
                    <WellnessChip kind="sleep" value={summary.average.sleepScore} band={wellnessBand(summary.average.sleepScore)} />
                    <WellnessChip kind="met" value={summary.average.met} band={metBand(summary.average.met)} />
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-ink-300" />
                </Link>
              )
            })}
      </div>
    </div>
  )
}
