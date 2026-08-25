import { useEffect, useState } from 'react'
import { ChevronDown, MapPin, Sparkles, X } from 'lucide-react'
import type { DomainKey, Patient } from '@/types'
import { DOMAIN_KEYS } from '@/types'
import { useI18n } from '@/hooks/useI18n'
import { ageToAgeBand, REFERENCE_RANGES } from '@/lib/clinicalConfig'
import { pickLocalized } from '@/lib/i18n'
import { formatInitials } from '@/lib/format'
import { RiskGauge } from '@/components/RiskGauge'
import { DomainCard } from '@/components/DomainCard'
import { AnalysisPanel } from '@/components/AnalysisPanel'
import { ReferenceRangeBar } from '@/components/ReferenceRangeBar'

export function UserDetailPanel({ patient, onClose }: { patient: Patient; onClose?: () => void }) {
  const { t, language } = useI18n()
  const [activeDomain, setActiveDomain] = useState<DomainKey>('diabetes')
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setActiveDomain('diabetes')
    setExpanded(false)
  }, [patient.id])

  const activeResult = patient.domains[activeDomain]
  const ranges = REFERENCE_RANGES[ageToAgeBand(patient.age)][patient.sex]

  function selectDomain(domain: DomainKey) {
    if (domain !== activeDomain) {
      setActiveDomain(domain)
      setExpanded(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-border px-6 py-5">
        <div className="flex items-start gap-3">
          {patient.photoUrl ? (
            <img
              src={patient.photoUrl}
              alt=""
              className="h-11 w-11 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-bold text-brand-700">
              {formatInitials(patient.firstName, patient.lastName)}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-display text-lg font-bold text-ink-900">
              {patient.firstName} {patient.lastName}
            </h2>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
              <span>
                {patient.age} {t.common.years} · {patient.sex === 'male' ? t.table.male : t.table.female}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {patient.region}
              </span>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label={t.common.close}
              className="rounded-full p-1.5 text-ink-400 hover:bg-surface-muted hover:text-ink-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="flex cursor-default flex-col items-center rounded-card border border-border bg-surface-sunken/50 py-6">
          <RiskGauge
            percent={activeResult.percent}
            band={activeResult.band}
            applicable={activeResult.applicable}
            size={196}
            strokeWidth={15}
            bottomLabel={activeResult.applicable ? t.riskBand[`${activeResult.band}Long`] : undefined}
            notApplicableLabel={activeResult.notApplicableReason ? pickLocalized(activeResult.notApplicableReason, language) : t.detail.notApplicable}
          />
        </div>

        {/* Domain selector row */}
        <div className="mt-4 flex gap-2">
          {DOMAIN_KEYS.map((domain) => (
            <DomainCard
              key={domain}
              domain={domain}
              result={patient.domains[domain]}
              active={activeDomain === domain}
              onActivate={() => selectDomain(domain)}
            />
          ))}
        </div>

        {/* Reference ranges — only measurements the real API can supply (BMI always; vitamin D3 only when a lab document states it) */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {patient.measurements.vitaminD3 !== undefined && (
            <ReferenceRangeBar label="Vitamin D3" unit="ng/mL" value={patient.measurements.vitaminD3} min={ranges.vitaminD3[0]} max={ranges.vitaminD3[1]} />
          )}
          <ReferenceRangeBar label="BMI" unit="kg/m²" value={patient.measurements.bmi} min={ranges.bmi[0]} max={ranges.bmi[1]} />
        </div>

        {/* Analysis toggle (explicit, keyboard/touch-friendly path) */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-5 flex w-full items-center justify-between rounded-control border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-surface-sunken"
        >
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-600" />
            {t.detail.analysisTitle}
          </span>
          <ChevronDown className={`h-4 w-4 text-ink-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        {expanded && (
          <div className="mt-3">
            <AnalysisPanel result={activeResult} />
          </div>
        )}
      </div>
    </div>
  )
}
