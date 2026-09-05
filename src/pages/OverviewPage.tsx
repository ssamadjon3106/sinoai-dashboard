import { useState } from 'react'
import { AlertTriangle, CheckCircle2, Users } from 'lucide-react'
import { useI18n } from '@/hooks/useI18n'
import { useAuth } from '@/hooks/useAuth'
import { useOverviewStats } from '@/hooks/useOverviewStats'
import { useUsers } from '@/hooks/useUsers'
import { PageHeader } from '@/components/PageHeader'
import { StatTile } from '@/components/ui/StatTile'
import { Skeleton } from '@/components/ui/Skeleton'
import { DomainDonutCard } from '@/components/dashboard/DomainDonutCard'
import { WellnessTrendCard } from '@/components/dashboard/WellnessTrendCard'
import { RiskScoringCard } from '@/components/dashboard/RiskScoringCard'
import { DiseaseBreakdownCard } from '@/components/dashboard/DiseaseBreakdownCard'
import { AbsenteeismCard } from '@/components/dashboard/AbsenteeismCard'
import { NeedsAttentionModal } from '@/components/dashboard/NeedsAttentionModal'
import { DOMAIN_KEYS } from '@/types'

export function OverviewPage() {
  const { t } = useI18n()
  const { clinician } = useAuth()
  const { data: stats, loading } = useOverviewStats()
  const { data: allUsers } = useUsers({})
  const { data: attentionUsers } = useUsers({ riskBand: 'high' })
  const [attentionModalOpen, setAttentionModalOpen] = useState(false)

  const percentOf = (n: number) => (stats && stats.totalEnrolled > 0 ? Math.round((n / stats.totalEnrolled) * 100) : 0)
  const healthScore = stats ? percentOf(stats.normalUsers) : undefined

  // Health-index ring geometry (see item 3/4: explain + visually upgrade the hero's headline metric).
  const ringSize = 108
  const ringStroke = 10
  const ringRadius = ringSize / 2 - ringStroke
  const ringCircumference = 2 * Math.PI * ringRadius
  const ringOffset = healthScore !== undefined ? ringCircumference * (1 - healthScore / 100) : ringCircumference

  const workers = allUsers ?? []

  return (
    <div className="h-full overflow-y-auto">
      <PageHeader title={t.overview.title} subtitle={t.overview.subtitle} />

      <div className="space-y-6 p-6">
        {/* Hero — decorative glow circles removed (item 1); welcome line,
            explained + redesigned health-index ring added (items 2-4). */}
        <div className="animate-fade-up relative overflow-hidden rounded-card bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 p-6 text-white sm:p-8">
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              {clinician && (
                <p className="text-sm font-medium text-brand-100">
                  {t.overview.heroGreeting} {clinician.name}
                </p>
              )}
              <h2 className="mt-1 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{t.overview.heroWelcome}</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-100/90">{t.overview.subtitle}</p>
            </div>

            {healthScore !== undefined && (
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-sm">
                <div className="relative shrink-0" style={{ width: ringSize, height: ringSize }}>
                  <svg width={ringSize} height={ringSize} viewBox={`0 0 ${ringSize} ${ringSize}`} className="-rotate-90">
                    <circle cx={ringSize / 2} cy={ringSize / 2} r={ringRadius} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth={ringStroke} />
                    <circle
                      cx={ringSize / 2}
                      cy={ringSize / 2}
                      r={ringRadius}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth={ringStroke}
                      strokeLinecap="round"
                      strokeDasharray={ringCircumference}
                      strokeDashoffset={ringOffset}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-2xl font-extrabold tabular-nums">{healthScore}%</span>
                  </div>
                </div>
                <div className="max-w-[9rem]">
                  <span className="block text-xs font-bold uppercase leading-tight tracking-wide text-white">{t.overview.normalUsers}</span>
                  <span className="mt-1 block text-[11px] leading-snug text-brand-100/90">{t.overview.healthIndexExplain}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {loading || !stats ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[112px] rounded-card" />)
          ) : (
            <>
              <StatTile icon={Users} label={t.overview.totalEnrolled} value={stats.totalEnrolled} accent="#0F6E5C" />
              <StatTile
                icon={CheckCircle2}
                label={t.overview.normalUsers}
                value={stats.normalUsers}
                hint={t.overview.normalUsersHint}
                accent="#2E7D32"
                percentOfTotal={percentOf(stats.normalUsers)}
              />
              <StatTile
                icon={AlertTriangle}
                label={t.overview.needsAttention}
                value={stats.needsAttention}
                hint={t.overview.needsAttentionHint}
                accent="#C62828"
                percentOfTotal={percentOf(stats.needsAttention)}
                onClick={() => setAttentionModalOpen(true)}
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <WellnessTrendCard patients={workers} />
          <RiskScoringCard patients={workers} />
        </div>

        <div>
          <h2 className="mb-3 text-sm font-bold text-ink-900">{t.overview.perDomainBreakdown}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {loading || !stats
              ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[300px] rounded-card" />)
              : DOMAIN_KEYS.map((domain) => <DomainDonutCard key={domain} domain={domain} counts={stats.perDomain[domain]} />)}
          </div>
        </div>

        <DiseaseBreakdownCard />

        <AbsenteeismCard patients={workers} />
      </div>

      {attentionModalOpen && (
        <NeedsAttentionModal patients={attentionUsers ?? []} onClose={() => setAttentionModalOpen(false)} />
      )}
    </div>
  )
}
