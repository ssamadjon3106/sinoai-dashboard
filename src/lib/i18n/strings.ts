/**
 * Typed UI dictionary. `useI18n()` resolves this to the strings object for the
 * active language, so components use `t.nav.users` (compiler-checked) rather
 * than i18next-style dot-path lookups.
 */
export interface UiStrings {
  app: {
    name: string
    tagline: string
  }
  nav: {
    users: string
    overview: string
    settings: string
  }
  topbar: {
    searchPlaceholder: string
    alerts: string
    noAlerts: string
    profile: string
    signOut: string
    clinician: string
  }
  login: {
    title: string
    subtitle: string
    emailLabel: string
    emailPlaceholder: string
    passwordLabel: string
    passwordPlaceholder: string
    submit: string
    footNote: string
    invalidCredentials: string
    signingIn: string
  }
  domain: {
    diabetes: string
    diabetesCategory: string
    cvd: string
    cvdCategory: string
    oncology: string
    oncologyCategory: string
  }
  riskBand: {
    low: string
    moderate: string
    high: string
    lowLong: string
    moderateLong: string
    highLong: string
  }
  table: {
    patient: string
    ageSex: string
    diabetes: string
    cvd: string
    oncology: string
    searchPlaceholder: string
    noResults: string
    noResultsHint: string
    resultsCount: string
    filterAll: string
    filterRiskBand: string
    filterSex: string
    male: string
    female: string
    yearsShort: string
  }
  overview: {
    title: string
    subtitle: string
    totalEnrolled: string
    normalUsers: string
    normalUsersHint: string
    needsAttention: string
    needsAttentionHint: string
    perDomainBreakdown: string
  }
  worker: {
    addAction: string
    editAction: string
    deleteAction: string
    formTitleAdd: string
    formTitleEdit: string
    fullNameLabel: string
    fullNamePlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    jobLabel: string
    jobPlaceholder: string
    descriptionLabel: string
    descriptionPlaceholder: string
    insuranceNumberLabel: string
    insuranceNumberOptional: string
    sinoaiUserIdLabel: string
    sinoaiUserIdHint: string
    save: string
    saving: string
    cancel: string
    deleteConfirmTitle: string
    deleteConfirmBody: string
    savingError: string
    deletingError: string
  }
  weeklyRecommendation: {
    title: string
    notLinked: string
    notConfigured: string
    loadError: string
  }
  riskInsights: {
    title: string
    riskOverviewLabel: string
    suggestionLabel: string
    notApplicable: string
    notConfigured: string
    loadError: string
  }
  detail: {
    normalRange: string
    analysisTitle: string
    readMore: string
    readLess: string
    notApplicable: string
    screeningDisclaimer: string
    decisionSupportDisclaimer: string
  }
  settings: {
    title: string
    subtitle: string
    placeholder: string
  }
  common: {
    loading: string
    error: string
    retry: string
    close: string
    years: string
  }
}
