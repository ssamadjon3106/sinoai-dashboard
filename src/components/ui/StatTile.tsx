import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface StatTileProps {
  icon: LucideIcon
  label: string
  value: ReactNode
  hint?: string
  accent?: string
  /** Optional "N%" badge next to the value, e.g. share of total enrolled. */
  percentOfTotal?: number
}

export function StatTile({ icon: Icon, label, value, hint, accent = '#17977E', percentOfTotal }: StatTileProps) {
  return (
    <div className="relative overflow-hidden rounded-card border border-border bg-surface p-4 shadow-card transition-shadow duration-200 hover:shadow-card-hover">
      <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: accent }} />
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${accent}1a`, color: accent }}
        >
          <Icon className="h-5 w-5" strokeWidth={2.25} />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</span>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-3xl font-extrabold tabular-nums text-ink-900">{value}</span>
        {percentOfTotal !== undefined && (
          <span
            className="rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular-nums"
            style={{ backgroundColor: `${accent}1a`, color: accent }}
          >
            {percentOfTotal}%
          </span>
        )}
      </div>
      {hint && <p className="mt-0.5 text-xs text-ink-400">{hint}</p>}
    </div>
  )
}
