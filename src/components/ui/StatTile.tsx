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
    <div className="relative overflow-hidden rounded-card border border-border bg-surface p-4 transition-shadow duration-200 hover:shadow-card-hover">
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${accent}1a`, color: accent }}
        >
          {/* Filled, not linear — this icon sits on its own plate. */}
          <Icon className="h-5 w-5" fill="currentColor" strokeWidth={1.5} />
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
