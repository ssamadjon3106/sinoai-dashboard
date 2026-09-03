import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, ShieldCheck } from 'lucide-react'
import { useI18n } from '@/hooks/useI18n'
import { useAuth } from '@/hooks/useAuth'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { LoginBackdrop } from '@/components/LoginBackdrop'

export function LoginPage() {
  const { t } = useI18n()
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(undefined)
    try {
      await signIn(email, password)
      navigate('/overview', { replace: true })
    } catch {
      setError(t.login.invalidCredentials)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen">
      <LoginBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex items-center justify-between px-6 py-6 sm:px-10">
          <span className="flex items-center gap-2 font-display text-base font-extrabold text-ink-900">
            <img src="/logo.svg" alt="" className="h-8 w-8 rounded-lg" />
            {t.app.name}
          </span>
          <LanguageSwitcher />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-16">
          <div className="w-full max-w-sm rounded-card border border-white/60 bg-surface/70 p-8 shadow-card-hover backdrop-blur-xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-card">
              <img src="/logo.svg" alt="" className="h-7 w-7 rounded-md" />
            </div>
            <h1 className="font-display text-2xl font-extrabold text-ink-900">{t.login.title}</h1>
            <p className="mt-1.5 text-sm text-ink-500">{t.login.subtitle}</p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink-700">{t.login.emailLabel}</span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.login.emailPlaceholder}
                    className="w-full rounded-control border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink-700">{t.login.passwordLabel}</span>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.login.passwordPlaceholder}
                    className="w-full rounded-control border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500"
                  />
                </div>
              </label>

              {error && <p className="text-sm font-medium text-risk-high">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-control bg-gradient-to-r from-brand-600 to-brand-700 py-2.5 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-card disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {submitting ? t.login.signingIn : t.login.submit}
              </button>
            </form>

            <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t.login.footNote}
            </p>
          </div>
        </div>

        <p className="px-6 pb-6 text-center text-xs text-ink-400">{t.detail.decisionSupportDisclaimer}</p>
      </div>
    </div>
  )
}
