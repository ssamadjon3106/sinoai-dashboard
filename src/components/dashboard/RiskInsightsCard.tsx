import { Sparkles } from 'lucide-react'
import { ApiError } from '@/api'
import { useI18n } from '@/hooks/useI18n'
import { useInsights } from '@/hooks/useInsights'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

/**
 * Bottom-right panel of the worker detail page: an OpenAI-generated risk
 * overview (what happens to the company if this worker's condition worsens)
 * and a suggestion (what the company should do about it — e.g. give rest,
 * cross-train a backup). Backed by POST /api/patients/:id/insights, cached
 * server-side until the underlying risk data changes.
 */
export function RiskInsightsCard({ patientId }: { patientId: string }) {
  const { t, language } = useI18n()
  const { data, loading, error, reload } = useInsights(patientId, language)

  return (
    <Card>
      <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-ink-900">
        <Sparkles className="h-4 w-4 text-brand-600" />
        {t.riskInsights.title}
      </h3>

      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      )}

      {!loading && error && (
        <ErrorState error={error} onRetry={reload} />
      )}

      {!loading && !error && data && 'notApplicable' in data && (
        <p className="text-sm text-ink-400">{t.riskInsights.notApplicable}</p>
      )}

      {!loading && !error && data && !('notApplicable' in data) && (
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-400">{t.riskInsights.riskOverviewLabel}</p>
            <p className="text-sm leading-relaxed text-ink-700">{data.riskOverview}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-400">{t.riskInsights.suggestionLabel}</p>
            <p className="text-sm leading-relaxed text-ink-700">{data.suggestion}</p>
          </div>
        </div>
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
        <button
          type="button"
          onClick={onRetry}
          className="text-sm font-semibold text-brand-600 hover:underline"
        >
          {t.common.retry}
        </button>
      )}
    </div>
  )
}
