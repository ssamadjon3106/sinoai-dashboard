import { MapPin, X } from 'lucide-react'
import type { Patient } from '@/types'
import { useI18n } from '@/hooks/useI18n'
import { ageToAgeBand, REFERENCE_RANGES } from '@/lib/clinicalConfig'
import { metBand, stressBand, wellnessBand, wellnessIndex } from '@/lib/wellness'
import { formatInitials } from '@/lib/format'
import { RiskGauge } from '@/components/RiskGauge'
import { WellnessMetricTile } from '@/components/WellnessMetricTile'
import { ReferenceRangeBar } from '@/components/ReferenceRangeBar'

export function UserDetailPanel({ patient, onClose }: { patient: Patient; onClose?: () => void }) {
  const { t } = useI18n()
  const ranges = REFERENCE_RANGES[ageToAgeBand(patient.age)][patient.sex]

  const index = wellnessIndex(patient.wellness)
  const indexBand = wellnessBand(index)
  const indexBandLabel = { low: t.wellness.bandGood, moderate: t.wellness.bandModerate, high: t.wellness.bandPoor }[indexBand]

  return (
    <div className="flex h-full flex-col">
      <header className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-6 py-5 text-white">
        <span className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <div className="relative flex items-start gap-3">
          {patient.photoUrl ? (
            <img
              src={patient.photoUrl}
              alt=""
              className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white/40"
            />
          ) : (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 font-display text-sm font-bold text-white ring-2 ring-white/40">
              {formatInitials(patient.firstName, patient.lastName)}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-display text-lg font-bold text-white">
              {patient.firstName} {patient.lastName}
            </h2>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-brand-100">
              <span>
                {patient.age} {t.common.years} · {patient.sex === 'male' ? t.table.male : t.table.female}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {patient.region}
              </span>
              <span className="inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 font-semibold text-white">
                {t.department[patient.department]}
              </span>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label={t.common.close}
              className="rounded-full p-1.5 text-brand-100 hover:bg-white/15 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="flex cursor-default flex-col items-center rounded-card bg-surface-sunken px-6 py-6">
          <RiskGauge
            percent={index}
            band={indexBand}
            applicable
            size={196}
            strokeWidth={15}
            topLabel={t.detail.wellnessIndexLabel}
            bottomLabel={indexBandLabel}
          />
          <p className="mt-3 max-w-xs text-center text-xs leading-relaxed text-ink-400">{t.detail.wellnessIndexExplain}</p>
        </div>

        {/* Wellness metric tiles — replace the old diabetes/CVD/oncology
            domain selector, which now only appears on the Overview page's
            workforce-level breakdown. */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          <WellnessMetricTile kind="recovery" value={patient.wellness.recovery} band={wellnessBand(patient.wellness.recovery)} suffix="%" />
          <WellnessMetricTile kind="sleep" value={patient.wellness.sleepScore} band={wellnessBand(patient.wellness.sleepScore)} />
          <WellnessMetricTile kind="met" value={patient.wellness.met} band={metBand(patient.wellness.met)} />
          <WellnessMetricTile kind="activity" value={patient.wellness.activityScore} band={wellnessBand(patient.wellness.activityScore)} />
          <WellnessMetricTile kind="stress" value={patient.wellness.stressScore} band={stressBand(patient.wellness.stressScore)} />
        </div>

        {/* Reference ranges — only measurements the real API can supply, and
            only when there's a value to show (vitamin D3 requires a lab
            document; BMI is no longer surfaced in this panel). */}
        {patient.measurements.vitaminD3 !== undefined && (
          <div className="mt-5">
            <ReferenceRangeBar label="Vitamin D3" unit="ng/mL" value={patient.measurements.vitaminD3} min={ranges.vitaminD3[0]} max={ranges.vitaminD3[1]} />
          </div>
        )}
      </div>
    </div>
  )
}
