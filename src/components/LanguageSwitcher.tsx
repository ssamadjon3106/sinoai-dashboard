import { LANGUAGES } from '@/types'
import { LANGUAGE_LABELS } from '@/lib/i18n'
import { useI18n } from '@/hooks/useI18n'

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n()

  return (
    <div role="radiogroup" aria-label="Language" className="inline-flex items-center rounded-full bg-surface-muted p-0.5">
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          role="radio"
          aria-checked={language === lang}
          onClick={() => setLanguage(lang)}
          className={[
            'rounded-full px-2.5 py-1 text-xs font-bold transition-colors',
            language === lang ? 'bg-surface text-brand-700 shadow-sm' : 'text-ink-500 hover:text-ink-700',
          ].join(' ')}
        >
          {LANGUAGE_LABELS[lang]}
        </button>
      ))}
    </div>
  )
}
