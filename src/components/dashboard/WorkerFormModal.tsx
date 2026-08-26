import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import type { NewWorkerInput, Patient } from '@/types'
import { useI18n } from '@/hooks/useI18n'
import { Modal } from '@/components/ui/Modal'

interface WorkerFormModalProps {
  /** Present when editing an existing worker; absent when adding a new one. */
  patient?: Patient
  onClose: () => void
  /** Always the full shape — every field is populated from a required input, even though NewWorkerInput happens to be the exact type UpdateWorkerInput also structurally accepts. */
  onSubmit: (input: NewWorkerInput) => Promise<void>
}

/** Add/edit form for a worker — HR-only, per the server's requireRole('hr') on the underlying endpoints. */
export function WorkerFormModal({ patient, onClose, onSubmit }: WorkerFormModalProps) {
  const { t } = useI18n()
  const isEdit = Boolean(patient)

  const [fullName, setFullName] = useState(patient ? `${patient.firstName} ${patient.lastName}` : '')
  const [phone, setPhone] = useState(patient?.phone ?? '')
  const [job, setJob] = useState(patient?.job ?? '')
  const [description, setDescription] = useState(patient?.description ?? '')
  const [insuranceNumber, setInsuranceNumber] = useState(patient?.insuranceNumber ?? '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(undefined)
    try {
      await onSubmit({
        fullName,
        phone,
        job,
        description,
        insuranceNumber: insuranceNumber || undefined,
        // No SinoAI user ID field in this form anymore — an existing
        // worker's link (if any) is left untouched since it's simply not
        // included in the submitted payload.
      })
      onClose()
    } catch {
      setError(t.worker.savingError)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal title={isEdit ? t.worker.formTitleEdit : t.worker.formTitleAdd} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label={t.worker.fullNameLabel}>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t.worker.fullNamePlaceholder}
            className={inputClass}
          />
        </Field>

        <Field label={t.worker.phoneLabel}>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.worker.phonePlaceholder}
            className={inputClass}
          />
        </Field>

        <Field label={t.worker.jobLabel}>
          <input
            required
            value={job}
            onChange={(e) => setJob(e.target.value)}
            placeholder={t.worker.jobPlaceholder}
            className={inputClass}
          />
        </Field>

        <Field label={t.worker.descriptionLabel}>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.worker.descriptionPlaceholder}
            className={`${inputClass} resize-none`}
          />
        </Field>

        <Field label={`${t.worker.insuranceNumberLabel} ${t.worker.insuranceNumberOptional}`}>
          <input value={insuranceNumber ?? ''} onChange={(e) => setInsuranceNumber(e.target.value)} className={inputClass} />
        </Field>

        {error && <p className="text-sm font-medium text-risk-high">{error}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-control border border-border px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-surface-muted"
          >
            {t.worker.cancel}
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-control bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-2 text-sm font-bold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? t.worker.saving : t.worker.save}
          </button>
        </div>
      </form>
    </Modal>
  )
}

const inputClass =
  'w-full rounded-control border border-border bg-surface px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500'

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-400">{hint}</span>}
    </label>
  )
}
