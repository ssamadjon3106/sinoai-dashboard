import { CalendarClock } from 'lucide-react'
import type { Patient } from '@/types'
import { useI18n } from '@/hooks/useI18n'
import { averageWellness } from '@/lib/wellness'
import { buildAbsenteeismAnalysis, buildAbsenteeismStats } from '@/lib/aiCopy'
import { Card } from '@/components/ui/Card'

/**
 * Overview page, shown right after the disease-type breakdown: a plain-
 * language explanation of absenteeism/presenteeism plus an AI analysis
 * grounded in the workforce's stress/recovery averages (item 14 of the
 * redesign brief). Neither term nor these figures exist in SinoAI's real
 * API — fabricated, per explicit sign-off, but computed from real averages
 * of the demo's own wellness data rather than hardcoded numbers.
 */
export function AbsenteeismCard({ patients }: { patients: Patient[] }) {
  const { t, language } = useI18n()
  const avg = averageWellness(patients.map((p) => p.wellness))
  const stats = buildAbsenteeismStats(avg.stressScore, avg.recovery)
  const analysis = buildAbsenteeismAnalysis(stats, language)

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <CalendarClock className="h-4 w-4 text-brand-600" />
        <h3 className="text-sm font-bold text-ink-900">{t.overview.absenteeismTitle}</h3>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-control border border-border bg-surface p-3.5">
          <p className="text-xs font-semibold text-ink-500">
            <span className="text-ink-900">{t.overview.absenteeismTermLabel}</span> — {t.overview.absenteeismTermExplain}
          </p>
          <p className="mt-2 font-display text-2xl font-extrabold tabular-nums text-ink-900">
            {stats.absenteeismDaysPerMonth} <span className="text-xs font-semibold text-ink-400">{t.overview.absenteeismDaysLabel}</span>
          </p>
        </div>
        <div className="rounded-control border border-border bg-surface p-3.5">
          <p className="text-xs font-semibold text-ink-500">
            <span className="text-ink-900">{t.overview.presenteeismTermLabel}</span> — {t.overview.presenteeismTermExplain}
          </p>
          <p className="mt-2 font-display text-2xl font-extrabold tabular-nums text-ink-900">
            {stats.presenteeismLossPercent}% <span className="text-xs font-semibold text-ink-400">{t.overview.presenteeismLossLabel}</span>
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-ink-700">{analysis}</p>
    </Card>
  )
}
