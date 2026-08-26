import { Dna, Droplet, HeartPulse } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { DomainBandCounts, DomainKey } from '@/types'
import { useI18n } from '@/hooks/useI18n'
import { DOMAIN_ACCENT_BG_COLORS, DOMAIN_ACCENT_COLORS } from '@/lib/clinicalConfig'
import { Card } from '@/components/ui/Card'
import { DomainDonut } from './DomainDonut'

const DOMAIN_ICONS: Record<DomainKey, LucideIcon> = {
  diabetes: Droplet,
  cvd: HeartPulse,
  oncology: Dna,
}

/**
 * One domain's risk-band ring on the Overview page, framed with its own
 * icon + title header in the domain's accent color. Three of these sit
 * side by side (see OverviewPage) in place of the earlier layout that
 * stacked all three domains' bars inside one shared card.
 */
export function DomainDonutCard({ domain, counts }: { domain: DomainKey; counts: DomainBandCounts }) {
  const { t } = useI18n()
  const Icon = DOMAIN_ICONS[domain]
  const accent = DOMAIN_ACCENT_COLORS[domain]
  const accentBg = DOMAIN_ACCENT_BG_COLORS[domain]

  return (
    <Card interactive className="relative flex flex-col items-center overflow-hidden text-center">
      <span
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-60 blur-2xl"
        style={{ backgroundColor: accentBg }}
        aria-hidden
      />
      <div className="relative mb-4 flex items-center gap-2">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: accentBg, color: accent }}
        >
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <h3 className="text-sm font-bold" style={{ color: accent }}>
          {t.domain[domain]}
        </h3>
      </div>
      <div className="relative">
        <DomainDonut domain={domain} counts={counts} />
      </div>
    </Card>
  )
}
