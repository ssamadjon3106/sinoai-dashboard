import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, UserX } from 'lucide-react'
import { useI18n } from '@/hooks/useI18n'
import { useUser } from '@/hooks/useUser'
import { UserDetailPanel } from '@/components/dashboard/UserDetailPanel'
import { WeeklyRecommendationCard } from '@/components/dashboard/WeeklyRecommendationCard'
import { RiskOverviewCard } from '@/components/dashboard/RiskOverviewCard'
import { SuggestionCard } from '@/components/dashboard/SuggestionCard'
import { InsuranceCard } from '@/components/dashboard/InsuranceCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'

/**
 * Reached from Overview -> Needs attention -> a worker. Three panes: the
 * existing worker-detail info on the left (unchanged), and on the right a
 * weekly recommendation on top, the AI risk overview and suggestion as two
 * independent cards below it, and an insurance-status placeholder at the
 * bottom — see WeeklyRecommendationCard / RiskOverviewCard / SuggestionCard
 * / InsuranceCard.
 */
export function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useI18n()
  const { data: patient, loading } = useUser(id)

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-6 py-3">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-700">
          <ArrowLeft className="h-4 w-4" />
          {t.nav.users}
        </Link>
      </div>

      {loading ? (
        <div className="mx-auto min-h-0 w-full max-w-xl flex-1 space-y-4 p-6">
          <Skeleton className="h-11 w-11 rounded-full" />
          <Skeleton className="h-48 w-48 self-center rounded-full" />
          <Skeleton className="h-40 rounded-card" />
        </div>
      ) : patient ? (
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <div className="min-h-0 border-border lg:w-[420px] lg:shrink-0 lg:border-r">
            <UserDetailPanel patient={patient} />
          </div>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6">
            <WeeklyRecommendationCard patientId={patient.id} />
            <RiskOverviewCard patientId={patient.id} />
            <SuggestionCard patientId={patient.id} />
            <InsuranceCard />
          </div>
        </div>
      ) : (
        <EmptyState icon={UserX} title={t.table.noResults} />
      )}
    </div>
  )
}
