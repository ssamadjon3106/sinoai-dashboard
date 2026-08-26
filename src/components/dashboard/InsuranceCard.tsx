import { ShieldOff } from 'lucide-react'
import { useI18n } from '@/hooks/useI18n'
import { Card } from '@/components/ui/Card'

/**
 * Placeholder for a future insurance-status integration on the worker
 * detail page — no real insurer data source exists yet, so this always
 * shows "not available" rather than a dead-end error or fabricated status.
 */
export function InsuranceCard() {
  const { t } = useI18n()

  return (
    <Card>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-900">
        <ShieldOff className="h-4 w-4 text-brand-600" />
        {t.insurance.title}
      </h3>
      <p className="text-sm text-ink-400">{t.insurance.notAvailable}</p>
    </Card>
  )
}
