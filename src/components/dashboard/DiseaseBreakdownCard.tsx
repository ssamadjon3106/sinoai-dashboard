import { Dna } from 'lucide-react'
import { useI18n } from '@/hooks/useI18n'
import { pickLocalized } from '@/lib/i18n'
import { buildDiseaseBreakdownIntro } from '@/lib/aiCopy'
import { CVD_TYPES, ONCOLOGY_TYPES } from '@/data/diseaseBreakdown'
import { DOMAIN_ACCENT_COLORS } from '@/lib/clinicalConfig'
import { Card } from '@/components/ui/Card'
import type { DiseaseBreakdownEntry } from '@/data/diseaseBreakdown'

function BreakdownRows({ entries, color }: { entries: DiseaseBreakdownEntry[]; color: string }) {
  const { language } = useI18n()
  const max = Math.max(...entries.map((e) => e.percent))

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <div key={entry.id}>
          <div className="mb-1 flex items-baseline justify-between text-xs">
            <span className="font-medium text-ink-700">{pickLocalized(entry.label, language)}</span>
            <span className="font-bold tabular-nums" style={{ color }}>
              {entry.percent}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.max(4, (entry.percent / max) * 100)}%`, backgroundColor: color }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Overview page: a more granular breakdown of the specific oncology and CVD
 * disease types SinoAI's screening covers (item 10 of the redesign brief).
 * SinoAI's real API has no per-sub-type breakdown endpoint, so the figures
 * here are fabricated (explicitly authorized) — see src/data/diseaseBreakdown.ts.
 */
export function DiseaseBreakdownCard() {
  const { t, language } = useI18n()

  return (
    <Card>
      <div className="mb-1 flex items-center gap-2">
        <Dna className="h-4 w-4 text-brand-600" />
        <h3 className="text-sm font-bold text-ink-900">{t.overview.diseaseBreakdownTitle}</h3>
      </div>
      <p className="mb-5 text-sm leading-relaxed text-ink-500">{buildDiseaseBreakdownIntro(language)}</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-400">{t.overview.oncologyTypesTitle}</h4>
          <BreakdownRows entries={ONCOLOGY_TYPES} color={DOMAIN_ACCENT_COLORS.oncology} />
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-400">{t.overview.cvdTypesTitle}</h4>
          <BreakdownRows entries={CVD_TYPES} color={DOMAIN_ACCENT_COLORS.cvd} />
        </div>
      </div>
    </Card>
  )
}
