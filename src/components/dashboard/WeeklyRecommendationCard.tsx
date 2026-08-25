import { CalendarCheck2 } from 'lucide-react'
import { ApiError } from '@/api'
import { useI18n } from '@/hooks/useI18n'
import { useWeeklyRecommendation } from '@/hooks/useWeeklyRecommendation'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

/**
 * Top-right panel of the worker detail page: a short weekly nudge generated
 * from the worker's recent SinoAI health/fitness data (chatapi.sinoai.io),
 * synthesized by OpenAI on our server — not SinoAI's own self-scoped
 * `/weekly-recommendation` endpoint, which is built for the mobile app's
 * own logged-in user, not a third party. See server/src/sinoaiClient.ts.
 */
export function WeeklyRecommendationCard({ patientId }: { patientId: string }) {
  const { t, language } = useI18n()
  const { data, loading, error, reload } = useWeeklyRecommendation(patientId, language)

  return (
    <Card>
      <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-ink-900">
        <CalendarCheck2 className="h-4 w-4 text-brand-600" />
        {t.weeklyRecommendation.title}
      </h3>

      {loading && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      )}

      {!loading && error && <ErrorState error={error} onRetry={reload} />}

      {!loading && !error && data && 'notLinked' in data && (
        <p className="text-sm text-ink-400">{t.weeklyRecommendation.notLinked}</p>
      )}

      {!loading && !error && data && !('notLinked' in data) && (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-ink-700">{data.summary}</p>
          {data.tasks.length > 0 && (
            <ul className="space-y-1.5">
              {data.tasks.map((task) => (
                <li key={task.id} className="flex items-start gap-2 text-sm text-ink-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {task.text}
                </li>
              ))}
            </ul>
          )}
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
      <p className="text-sm text-ink-400">{notConfigured ? t.weeklyRecommendation.notConfigured : t.weeklyRecommendation.loadError}</p>
      {!notConfigured && (
        <button type="button" onClick={onRetry} className="text-sm font-semibold text-brand-600 hover:underline">
          {t.common.retry}
        </button>
      )}
    </div>
  )
}
