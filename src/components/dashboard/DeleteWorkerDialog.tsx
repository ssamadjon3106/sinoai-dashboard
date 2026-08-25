import { useState } from 'react'
import type { Patient } from '@/types'
import { useI18n } from '@/hooks/useI18n'
import { formatFullName } from '@/lib/format'
import { Modal } from '@/components/ui/Modal'

interface DeleteWorkerDialogProps {
  patient: Patient
  onClose: () => void
  onConfirm: () => Promise<void>
}

export function DeleteWorkerDialog({ patient, onClose, onConfirm }: DeleteWorkerDialogProps) {
  const { t } = useI18n()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  async function handleConfirm() {
    setSubmitting(true)
    setError(undefined)
    try {
      await onConfirm()
      onClose()
    } catch {
      setError(t.worker.deletingError)
      setSubmitting(false)
    }
  }

  return (
    <Modal title={t.worker.deleteConfirmTitle} onClose={onClose}>
      <p className="text-sm text-ink-700">
        <span className="font-semibold">{formatFullName(patient.firstName, patient.lastName)}</span> — {t.worker.deleteConfirmBody}
      </p>

      {error && <p className="mt-3 text-sm font-medium text-risk-high">{error}</p>}

      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-control border border-border px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-surface-muted"
        >
          {t.worker.cancel}
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={submitting}
          className="rounded-control bg-risk-high px-4 py-2 text-sm font-bold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? t.worker.saving : t.worker.deleteAction}
        </button>
      </div>
    </Modal>
  )
}
