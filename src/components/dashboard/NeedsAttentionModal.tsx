import { Link } from 'react-router-dom'
import type { Patient } from '@/types'
import { useI18n } from '@/hooks/useI18n'
import { metBand, wellnessBand } from '@/lib/wellness'
import { formatInitials } from '@/lib/format'
import { Modal } from '@/components/ui/Modal'
import { WellnessChip } from '@/components/WellnessChip'

/**
 * Opened by clicking the "Needs attention" stat tile on Overview (previously
 * an always-embedded list card in the page body — now hidden behind a click
 * so the page itself stays shorter). Shows Recovery/Sleep/MET instead of the
 * diabetes/CVD/oncology chips the old embedded list used, per the rule that
 * those domains are Overview-breakdown-only now.
 */
export function NeedsAttentionModal({ patients, onClose }: { patients: Patient[]; onClose: () => void }) {
  const { t } = useI18n()

  return (
    <Modal title={t.overview.needsAttentionModalTitle} onClose={onClose} maxWidth="max-w-lg">
      <ul className="-mx-2 max-h-96 divide-y divide-border overflow-y-auto">
        {patients.map((patient) => (
          <li key={patient.id}>
            <Link
              to={`/users/${patient.id}`}
              onClick={onClose}
              className="flex items-center gap-3 rounded-control px-2 py-2.5 transition-colors hover:bg-surface-sunken"
            >
              {patient.photoUrl ? (
                <img src={patient.photoUrl} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
              ) : (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                  {formatInitials(patient.firstName, patient.lastName)}
                </span>
              )}
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink-900">
                {patient.firstName} {patient.lastName}
              </span>
              <div className="flex shrink-0 gap-1">
                <WellnessChip kind="recovery" value={patient.wellness.recovery} band={wellnessBand(patient.wellness.recovery)} suffix="%" />
                <WellnessChip kind="sleep" value={patient.wellness.sleepScore} band={wellnessBand(patient.wellness.sleepScore)} />
                <WellnessChip kind="met" value={patient.wellness.met} band={metBand(patient.wellness.met)} />
              </div>
            </Link>
          </li>
        ))}
        {patients.length === 0 && <li className="px-2 py-6 text-center text-sm text-ink-400">—</li>}
      </ul>
    </Modal>
  )
}
