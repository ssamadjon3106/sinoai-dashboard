import { useEffect, useState } from 'react'
import { MapPin, X } from 'lucide-react'
import type { DomainKey, Patient } from '@/types'
import { DOMAIN_KEYS } from '@/types'
import { useI18n } from '@/hooks/useI18n'
import { ageToAgeBand, REFERENCE_RANGES } from '@/lib/clinicalConfig'
import { pickLocalized } from '@/lib/i18n'
import { formatInitials } from '@/lib/format'
import { RiskGauge } from '@/components/RiskGauge'
import { DomainCard } from '@/components/DomainCard'
import { ReferenceRangeBar } from '@/components/ReferenceRangeBar'

export function UserDetailPanel({ patient, onClose }: { patient: Patient; onClose?: () => void }) {
  const { t, language } = useI18n()
  const [activeDomain, setActiveDomain] = useState<DomainKey>('diabetes')

  useEffect(() => {
    setActiveDomain('diabetes')
  }, [patient.id])

  const activeResult = patient.domains[activeDomain]
  const ranges = REFERENCE_RANGES[ageToAgeBand(patient.age)][patient.sex]

  function selectDomain(domain: DomainKey) {
    if (domain !== activeDomain) {
      setActiveDomain(domain)
    }
  }

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
        <div className="flex cursor-default flex-col items-center rounded-card bg-surface-sunken py-6">
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
