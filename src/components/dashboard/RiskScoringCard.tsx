import { Gauge } from 'lucide-react'
import type { Patient } from '@/types'
import { useI18n } from '@/hooks/useI18n'
import { averageWellness, metBand, stressBand, wellnessBand } from '@/lib/wellness'
import { RISK_COLORS } from '@/lib/clinicalConfig'
import { Card } from '@/components/ui/Card'

/**
 * Overview page: workforce-wide risk scoring across Sleep level, Activity,
 * Stress and MET (item 9 of the redesign brief) — four horizontal bars
 * summarizing the whole enrolled population at a glance.
 */
export function RiskScoringCard({ patients }: { patients: Patient[] }) {
  const { t } = useI18n()
  const avg = averageWellness(patients.map((p) => p.wellness))

  const rows = [
    { label: t.overview.riskScoringSleep, value: avg.sleepScore, max: 100, band: wellnessBand(avg.sleepScore), display: `${avg.sleepScore}` },
    { label: t.overview.riskScoringActivity, value: avg.activityScore, max: 100, band: wellnessBand(avg.activityScore), display: `${avg.activityScore}` },
    { label: t.overview.riskScoringStress, value: avg.stressScore, max: 100, band: stressBand(avg.stressScore), display: `${avg.stressScore}` },
    { label: t.overview.riskScoringMet, value: Math.min(100, (avg.met / 8) * 100), max: 100, band: metBand(avg.met), display: `${avg.met}` },
  ]

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <Gauge className="h-4 w-4 text-brand-600" />
        <div>
          <h3 className="text-sm font-bold text-ink-900">{t.overview.riskScoringTitle}</h3>
          <p className="text-xs text-ink-400">{t.overview.riskScoringSubtitle}</p>
        </div>
      </div>

      <div className="space-y-4">
        {rows.map((row) => {
          const color = RISK_COLORS[row.band]
          return (
            <div key={row.label}>
              <div className="mb-1.5 flex items-baseline justify-between text-xs">
                <span className="font-semibold text-ink-700">{row.label}</span>
                <span className="font-bold tabular-nums" style={{ color }}>
                  {row.display}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${Math.max(4, Math.min(100, row.value))}%`, backgroundColor: color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
