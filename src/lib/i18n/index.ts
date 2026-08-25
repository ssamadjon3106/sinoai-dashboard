import type { Language, LocalizedText } from '@/types'
import type { UiStrings } from './strings'
import { uz } from './uz'
import { ru } from './ru'
import { en } from './en'

/** Resolves a per-language content blob (patient names' analysis text, referrals, etc.) to the active language. */
export function pickLocalized(text: LocalizedText, language: Language): string {
  return text[language]
}

export type { UiStrings } from './strings'

export const DICTIONARIES: Record<Language, UiStrings> = { uz, ru, en }

export const LANGUAGE_LABELS: Record<Language, string> = {
  uz: 'UZ',
  ru: 'RU',
  en: 'EN',
}

export const LANGUAGE_NATIVE_NAMES: Record<Language, string> = {
  uz: 'O‘zbekcha',
  ru: 'Русский',
  en: 'English',
}
