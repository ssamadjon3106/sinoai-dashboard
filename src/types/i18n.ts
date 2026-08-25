export const LANGUAGES = ['uz', 'ru', 'en'] as const

/** UZ (Latin) is the product's default language; RU and EN are supported. */
export type Language = (typeof LANGUAGES)[number]

/** A string that must be provided in every supported language. */
export type LocalizedText = Record<Language, string>
