import { format, formatDistanceToNowStrict } from 'date-fns'
import { enUS, ru, uz } from 'date-fns/locale'
import type { Locale } from 'date-fns'
import type { Language } from '@/types'

const DATE_FNS_LOCALES: Record<Language, Locale> = {
  uz,
  ru,
  en: enUS,
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`
}

export function formatDate(iso: string, language: Language): string {
  return format(new Date(iso), 'd MMM yyyy', { locale: DATE_FNS_LOCALES[language] })
}

export function formatRelativeToNow(iso: string, language: Language): string {
  return formatDistanceToNowStrict(new Date(iso), { addSuffix: true, locale: DATE_FNS_LOCALES[language] })
}

export function formatMinutesAgo(minutes: number, language: Language): string {
  const date = new Date(Date.now() - minutes * 60_000)
  return formatDistanceToNowStrict(date, { addSuffix: true, locale: DATE_FNS_LOCALES[language] })
}

export function formatFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`
}

export function formatInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}
