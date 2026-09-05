import { Sparkles } from 'lucide-react'
import { ApiError } from '@/api'
import { useI18n } from '@/hooks/useI18n'
import { useInsights } from '@/hooks/useInsights'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

/**
 * First half of the worker detail page's AI panel: what SinoAI's analysis
 * says about this worker's current wellness readings, in third-party voice
 * (see src/lib/aiCopy.ts). Split out from the old combined RiskInsightsCard
 * into its own card, paired with SuggestionCard below/beside it.
 */
export function RiskOverviewCard({ patientId }: { patientId: string }) {
  const { t, language } = useI18n()
  const { data, loading, error, reload } = useInsights(patientId, language)

  return (
    <Card>
      <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-ink-900">
        <Sparkles className="h-4 w-4 text-brand-600" />
        {t.riskInsights.riskOverviewLabel}
      </h3>

      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      )}

      {!loading && error && <ErrorState error={error} onRetry={reload} />}

      {!loading && !error && data && 'notApplicable' in data && (
        <p className="text-sm text-ink-400">{t.riskInsights.notApplicable}</p>
      )}

      {!loading && !error && data && !('notApplicable' in data) && (
        <p className="text-sm leading-relaxed text-ink-700">{data.riskOverview}</p>
      )}
    </Card>
  )
}

function ErrorState({ error, onRetry }: { error: Error; onRetry: () => void }) {
  const { t } = useI18n()
  const notConfigured = error instanceof ApiError && error.status === 503

  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-sm text-ink-400">{notConfigured ? t.riskInsights.notConfigured : t.riskInsights.loadError}</p>
      {!notConfigured && (
        <button type="button" onClick={onRetry} className="text-sm font-semibold text-brand-600 hover:underline">
          {t.common.retry}
        </button>
      )}
    </div>
  )
}
