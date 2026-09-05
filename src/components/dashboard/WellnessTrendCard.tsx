import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { TrendingUp } from 'lucide-react'
import type { Patient } from '@/types'
import { useI18n } from '@/hooks/useI18n'
import { averageWellness, wellnessIndex } from '@/lib/wellness'
import { buildWellnessTrendSummary } from '@/lib/aiCopy'
import { buildWellnessTrend } from '@/lib/wellnessTrend'
import { Card } from '@/components/ui/Card'

/**
 * Overview page: dynamic line/area chart of the workforce's overall wellness
 * index over the last 12 weeks, followed by an AI-generated summary
 * paragraph (item 7 of the redesign brief). The trend itself is fabricated
 * (no historical time-series exists in the static demo data) but always
 * ends on today's real average — see src/lib/wellnessTrend.ts.
 */
export function WellnessTrendCard({ patients }: { patients: Patient[] }) {
  const { t, language } = useI18n()
  const currentIndex = wellnessIndex(averageWellness(patients.map((p) => p.wellness)))
  const trend = buildWellnessTrend(currentIndex)
  const summary = buildWellnessTrendSummary(trend[0].index, trend[trend.length - 1].index, language)

  return (
    <Card>
      <div className="mb-1 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-brand-600" />
        <h3 className="text-sm font-bold text-ink-900">{t.overview.wellnessTrendTitle}</h3>
      </div>
      <p className="mb-4 text-xs text-ink-400">{t.overview.wellnessTrendSubtitle}</p>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trend} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="wellnessTrendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#17977E" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#17977E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#EEF2F1" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64716D' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64716D' }} axisLine={false} tickLine={false} width={36} />
            <Tooltip
              formatter={(value) => [`${value}%`, t.overview.wellnessTrendTitle] as [string, string]}
              contentStyle={{ borderRadius: 12, border: '1px solid #E1E8E6', fontSize: 12 }}
            />
            <Area type="monotone" dataKey="index" stroke="#128069" strokeWidth={2.5} fill="url(#wellnessTrendFill)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-700">{summary}</p>
    </Card>
  )
}
