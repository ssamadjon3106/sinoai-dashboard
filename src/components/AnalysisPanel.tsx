import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { DomainResult } from '@/types'
import { useI18n } from '@/hooks/useI18n'
import { pickLocalized } from '@/lib/i18n'

/**
 * Matches the real mobile app's "Analysis result" card: full text shown
 * immediately (no click needed to read it), with a "Close" toggle at the
 * bottom to collapse back to a one-line summary. The section-level reveal
 * (whether this card shows at all) is handled by the toggle bar in
 * UserDetailPanel, which already carries the "Analiz natijasi" heading —
 * this card stays unlabeled to avoid repeating that title.
 */
export function AnalysisPanel({ result }: { result: DomainResult }) {
  const { t, language } = useI18n()
  const [expanded, setExpanded] = useState(true)

  const summary = pickLocalized(result.analysisSummary, language)
  const full = pickLocalized(result.analysis, language)
  const showToggle = full.trim() !== summary.trim()

  return (
    <div className="animate-fade-up rounded-control border border-border bg-surface p-4">
      <p className="text-sm leading-relaxed text-ink-700">{expanded ? full : summary}</p>

      {showToggle && (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 text-sm font-semibold text-ink-700 hover:text-ink-900"
          >
            {expanded ? t.detail.readLess : t.detail.readMore}
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      )}

      <p className="mt-3 text-xs text-ink-400">
        {result.domain === 'oncology' ? t.detail.screeningDisclaimer : t.detail.decisionSupportDisclaimer}
      </p>
    </div>
  )
}
