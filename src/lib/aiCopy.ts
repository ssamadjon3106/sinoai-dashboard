import type { DepartmentKey, Language, RiskBand, WellnessMetrics } from '@/types'
import { metBand, stressBand, wellnessBand, wellnessIndex, type DepartmentSummary } from './wellness'

/**
 * Every AI-authored string in the demo is generated here, in third-party
 * voice ("SinoAI's analysis shows...", never "you"/"your"), and grounded in
 * the actual wellness numbers passed in — never hardcoded prose. This keeps
 * every AI panel across the app (worker risk overview/suggestion, weekly
 * recommendation, department insights, the Overview trend/risk-scoring/
 * absenteeism cards) consistently voiced from one place instead of each
 * component inventing its own copy style.
 */

function pick<T>(band: RiskBand, low: T, moderate: T, high: T): T {
  return band === 'low' ? low : band === 'moderate' ? moderate : high
}

// ---- worker-level risk overview + suggestion (worker detail page) ----

export function buildWorkerRiskOverview(w: WellnessMetrics, lang: Language): string {
  const recoveryBand = wellnessBand(w.recovery)
  const sleepBand = wellnessBand(w.sleepScore)
  const stress = stressBand(w.stressScore)
  const met = metBand(w.met)

  if (lang === 'uz') {
    const recoveryText = pick(
      recoveryBand,
      `Tiklanish ko'rsatkichi ${w.recovery}% — barqaror va sog'lom diapazonda.`,
      `Tiklanish ko'rsatkichi ${w.recovery}% — o'rtacha darajada, kuzatishni davom ettirish tavsiya etiladi.`,
      `Tiklanish ko'rsatkichi ${w.recovery}% — past, bu surunkali charchoq belgisi bo'lishi mumkin.`,
    )
    const sleepText = pick(
      sleepBand,
      `Uyqu sifati (${w.sleepScore} ball) yaxshi darajada.`,
      `Uyqu sifati (${w.sleepScore} ball) o'rtacha, uyqu rejimini yaxshilash foydali bo'ladi.`,
      `Uyqu sifati (${w.sleepScore} ball) past — bu tiklanish va diqqatga salbiy ta'sir ko'rsatishi mumkin.`,
    )
    const stressText = pick(
      stress,
      `Stress darajasi past (${w.stressScore} ball) va nazorat ostida.`,
      `Stress darajasi o'rtacha (${w.stressScore} ball).`,
      `Stress darajasi yuqori (${w.stressScore} ball) — bu tiklanish ko'rsatkichlariga ta'sir qilayotgan bo'lishi mumkin.`,
    )
    const metText = pick(
      met,
      `Faollik darajasi (MET ${w.met}) yaxshi harakatchanlikni ko'rsatadi.`,
      `Faollik darajasi (MET ${w.met}) o'rtacha.`,
      `Faollik darajasi (MET ${w.met}) past — kundalik harakat hajmi kam.`,
    )
    return `SinoAI tahliliga ko'ra, ${recoveryText} ${sleepText} ${stressText} ${metText}`
  }

  if (lang === 'ru') {
    const recoveryText = pick(
      recoveryBand,
      `Показатель восстановления составляет ${w.recovery}% и находится в стабильном, здоровом диапазоне.`,
      `Показатель восстановления составляет ${w.recovery}% — на среднем уровне, рекомендуется продолжить наблюдение.`,
      `Показатель восстановления составляет ${w.recovery}% — низкий, что может указывать на хроническую усталость.`,
    )
    const sleepText = pick(
      sleepBand,
      `Качество сна (${w.sleepScore} баллов) находится на хорошем уровне.`,
      `Качество сна (${w.sleepScore} баллов) среднее — улучшение режима сна было бы полезным.`,
      `Качество сна (${w.sleepScore} баллов) низкое, что может негативно влиять на восстановление и концентрацию.`,
    )
    const stressText = pick(
      stress,
      `Уровень стресса низкий (${w.stressScore} баллов) и находится под контролем.`,
      `Уровень стресса средний (${w.stressScore} баллов).`,
      `Уровень стресса высокий (${w.stressScore} баллов), что может влиять на показатели восстановления.`,
    )
    const metText = pick(
      met,
      `Уровень активности (MET ${w.met}) свидетельствует о хорошей подвижности.`,
      `Уровень активности (MET ${w.met}) средний.`,
      `Уровень активности (MET ${w.met}) низкий — объём ежедневного движения невелик.`,
    )
    return `По данным анализа SinoAI, ${recoveryText} ${sleepText} ${stressText} ${metText}`
  }

  const recoveryText = pick(
    recoveryBand,
    `Recovery is at ${w.recovery}%, a stable and healthy range.`,
    `Recovery is at ${w.recovery}%, a moderate level worth continuing to monitor.`,
    `Recovery is at ${w.recovery}%, a low reading that may indicate chronic fatigue.`,
  )
  const sleepText = pick(
    sleepBand,
    `Sleep quality (${w.sleepScore}/100) is in a good range.`,
    `Sleep quality (${w.sleepScore}/100) is moderate — improving the sleep schedule would help.`,
    `Sleep quality (${w.sleepScore}/100) is low, which can affect both recovery and focus.`,
  )
  const stressText = pick(
    stress,
    `Stress levels are low (${w.stressScore}/100) and well managed.`,
    `Stress levels are moderate (${w.stressScore}/100).`,
    `Stress levels are high (${w.stressScore}/100), which may be weighing on recovery.`,
  )
  const metText = pick(
    met,
    `Activity level (MET ${w.met}) shows good day-to-day movement.`,
    `Activity level (MET ${w.met}) is moderate.`,
    `Activity level (MET ${w.met}) is low, with limited daily movement.`,
  )
  return `According to SinoAI's analysis, ${recoveryText} ${sleepText} ${stressText} ${metText}`
}

export function buildWorkerSuggestion(w: WellnessMetrics, lang: Language): string {
  const overall = wellnessBand(wellnessIndex(w))
  if (lang === 'uz') {
    return pick(
      overall,
      "Joriy ko'rsatkichlarni saqlab qolish uchun mavjud uyqu va faollik rejimini davom ettirish tavsiya etiladi. Har chorakda qayta baholashni rejalashtirish yetarli bo'ladi.",
      "HR jamoasi ushbu xodim uchun yengil ish yukini rejalashtirishi va tiklanish uchun qo'shimcha tanaffuslar taqdim etishi tavsiya etiladi. Uyqu va stressni kamaytirish bo'yicha qisqa maslahat sessiyasi foydali bo'lishi mumkin.",
      "HR jamoasi ushbu xodim bilan yaqin orada suhbat o'tkazishi va ish yukini vaqtincha kamaytirishni ko'rib chiqishi tavsiya etiladi. Tiklanish va uyqu ko'rsatkichlari past bo'lgani uchun mutaxassis konsultatsiyasi foydali bo'ladi.",
    )
  }
  if (lang === 'ru') {
    return pick(
      overall,
      'Рекомендуется сохранить текущий режим сна и активности для поддержания стабильных показателей. Достаточно запланировать повторную оценку в следующем квартале.',
      'HR-команде рекомендуется предусмотреть более щадящую рабочую нагрузку и дополнительные перерывы для восстановления. Также может быть полезна короткая консультация по улучшению сна и снижению стресса.',
      'HR-команде рекомендуется в ближайшее время провести беседу с сотрудником и рассмотреть временное снижение нагрузки. Учитывая низкие показатели восстановления и сна, будет полезна консультация специалиста.',
    )
  }
  return pick(
    overall,
    "Maintaining the current sleep and activity routine is recommended to keep these results stable. A quarterly re-check should be sufficient.",
    "HR is advised to plan a lighter workload for this worker and offer additional recovery breaks. A short coaching session on sleep and stress reduction may also help.",
    "HR is advised to check in with this worker soon and consider a temporary reduction in workload. Given the low recovery and sleep readings, a specialist consultation would be beneficial.",
  )
}

// ---- weekly recommendation (worker detail page) ----

export function buildWeeklySummary(w: WellnessMetrics, lang: Language): string {
  const overall = wellnessBand(wellnessIndex(w))
  if (lang === 'uz') {
    return pick(
      overall,
      `Ushbu hafta uchun SinoAI tahlili barqaror ko'rsatkichlarni qayd etdi: tiklanish ${w.recovery}%, uyqu ${w.sleepScore} ball. Joriy rejimni davom ettirish tavsiya etiladi.`,
      `Ushbu hafta SinoAI tahliliga ko'ra tiklanish (${w.recovery}%) va uyqu (${w.sleepScore} ball) o'rtacha darajada qayd etildi — yengil tuzatishlar foydali bo'ladi.`,
      `Ushbu hafta SinoAI tahlili past tiklanish (${w.recovery}%) va yuqori stress (${w.stressScore} ball) ko'rsatkichlarini aniqladi — dam olish va uyqu rejimiga alohida e'tibor talab etiladi.`,
    )
  }
  if (lang === 'ru') {
    return pick(
      overall,
      `Анализ SinoAI за эту неделю зафиксировал стабильные показатели: восстановление ${w.recovery}%, сон ${w.sleepScore} баллов. Рекомендуется продолжать текущий режим.`,
      `По данным SinoAI за эту неделю восстановление (${w.recovery}%) и сон (${w.sleepScore} баллов) находятся на среднем уровне — небольшие корректировки будут полезны.`,
      `Анализ SinoAI за эту неделю выявил низкое восстановление (${w.recovery}%) и повышенный стресс (${w.stressScore} баллов) — стоит уделить особое внимание отдыху и режиму сна.`,
    )
  }
  return pick(
    overall,
    `SinoAI's analysis for this week recorded stable readings: recovery at ${w.recovery}%, sleep at ${w.sleepScore}/100. Continuing the current routine is recommended.`,
    `SinoAI's analysis for this week shows recovery (${w.recovery}%) and sleep (${w.sleepScore}/100) at moderate levels — small adjustments would help.`,
    `SinoAI's analysis for this week flagged low recovery (${w.recovery}%) and elevated stress (${w.stressScore}/100) — rest and sleep routine deserve particular attention.`,
  )
}

export function buildWeeklyTasks(w: WellnessMetrics, lang: Language): string[] {
  const overall = wellnessBand(wellnessIndex(w))
  const stress = stressBand(w.stressScore)
  const sleep = wellnessBand(w.sleepScore)
  const met = metBand(w.met)

  if (lang === 'uz') {
    const tasks = [
      pick(sleep, "Barqaror uyqu vaqtini saqlab qolish (kamida 7 soat).", "Uyqu vaqtini kamida 30 daqiqaga uzaytirish.", "Uyqudan oldin ekrandan foydalanishni kamaytirish va uyqu vaqtini erta boshlash."),
      pick(stress, "Joriy dam olish rejimini davom ettirish.", "Kuniga 10 daqiqalik nafas olish mashqlarini qo'shish.", "Ish yukini vaqtincha kamaytirish va qisqa tanaffuslarni ko'paytirish."),
      pick(met, "Joriy faollik darajasini saqlab qolish.", "Kuniga 20-30 daqiqa piyoda yurishni qo'shish.", "Kuniga kamida 20 daqiqa yengil jismoniy faollikni boshlash."),
    ]
    if (overall === 'high') tasks.push("Keyingi haftada qayta baholash uchun SinoAI tahlilini kuzatib borish.")
    return tasks
  }
  if (lang === 'ru') {
    const tasks = [
      pick(sleep, "Сохранять стабильный режим сна (не менее 7 часов).", "Увеличить продолжительность сна минимум на 30 минут.", "Сократить использование экрана перед сном и ложиться раньше."),
      pick(stress, "Продолжать текущий режим отдыха.", "Добавить 10-минутные дыхательные упражнения в течение дня.", "Временно снизить рабочую нагрузку и увеличить количество коротких перерывов."),
      pick(met, "Сохранять текущий уровень активности.", "Добавить пешую прогулку на 20-30 минут в день.", "Начать минимум 20 минут лёгкой физической активности в день."),
    ]
    if (overall === 'high') tasks.push("Отслеживать анализ SinoAI для повторной оценки на следующей неделе.")
    return tasks
  }
  const tasks = [
    pick(sleep, "Keep a consistent sleep schedule (at least 7 hours).", "Extend sleep duration by at least 30 minutes.", "Reduce screen time before bed and move bedtime earlier."),
    pick(stress, "Continue the current recovery routine.", "Add a 10-minute breathing exercise during the day.", "Temporarily reduce workload and take more short breaks."),
    pick(met, "Maintain the current activity level.", "Add a 20-30 minute walk each day.", "Start at least 20 minutes of light physical activity daily."),
  ]
  if (overall === 'high') tasks.push("Keep an eye on SinoAI's analysis for a re-check next week.")
  return tasks
}

// ---- wellness trend summary (Overview) ----

export function buildWellnessTrendSummary(first: number, last: number, lang: Language): string {
  const delta = last - first
  const direction: 'up' | 'down' | 'flat' = delta > 2 ? 'up' : delta < -2 ? 'down' : 'flat'

  if (lang === 'uz') {
    return pick(
      direction === 'up' ? 'low' : direction === 'down' ? 'high' : 'moderate',
      `So'nggi 12 hafta davomida jamoaning umumiy salomatlik indeksi ${first}% dan ${last}% ga ko'tarilib, barqaror ijobiy tendensiyani ko'rsatmoqda. SinoAI tahliliga ko'ra, bu asosan uyqu sifati va kundalik faollikning yaxshilanishi bilan bog'liq.`,
      `So'nggi 12 hafta davomida jamoaning umumiy salomatlik indeksi ${first}% atrofida barqaror saqlanib, ${last}% darajasida turibdi. SinoAI tahliliga ko'ra, hozircha alohida tendensiya kuzatilmayapti.`,
      `So'nggi 12 hafta davomida jamoaning umumiy salomatlik indeksi ${first}% dan ${last}% gacha pasaydi. SinoAI tahliliga ko'ra, bu tendensiyaga ortgan stress va uyqu sifatining pasayishi sabab bo'lishi mumkin, shu sababli yaqin orada monitoring kuchaytirilishi tavsiya etiladi.`,
    )
  }
  if (lang === 'ru') {
    return pick(
      direction === 'up' ? 'low' : direction === 'down' ? 'high' : 'moderate',
      `За последние 12 недель общий индекс здоровья команды вырос с ${first}% до ${last}%, демонстрируя устойчивую положительную динамику. По данным анализа SinoAI, это в первую очередь связано с улучшением качества сна и повседневной активности.`,
      `За последние 12 недель общий индекс здоровья команды остаётся стабильным, около ${last}%. По данным анализа SinoAI, выраженной тенденции пока не наблюдается.`,
      `За последние 12 недель общий индекс здоровья команды снизился с ${first}% до ${last}%. Согласно анализу SinoAI, причиной может быть рост стресса и снижение качества сна, поэтому в ближайшее время рекомендуется усилить мониторинг.`,
    )
  }
  return pick(
    direction === 'up' ? 'low' : direction === 'down' ? 'high' : 'moderate',
    `Over the past 12 weeks, the team's overall wellness index climbed from ${first}% to ${last}%, a steady positive trend. According to SinoAI's analysis, this is mainly linked to improved sleep quality and day-to-day activity.`,
    `Over the past 12 weeks, the team's overall wellness index has held steady around ${last}%. According to SinoAI's analysis, no strong trend is evident at this time.`,
    `Over the past 12 weeks, the team's overall wellness index declined from ${first}% to ${last}%. According to SinoAI's analysis, rising stress and reduced sleep quality may be contributing factors, so closer monitoring is recommended in the near term.`,
  )
}

// ---- department insights (Departments page) ----

export function buildDepartmentOverview(summary: DepartmentSummary, lang: Language): string {
  const a = summary.average
  const recoveryBand = wellnessBand(a.recovery)

  if (lang === 'uz') {
    return pick(
      recoveryBand,
      `SinoAI tahliliga ko'ra, bu bo'lim xodimlari o'rtacha ${a.recovery}% tiklanish va ${a.sleepScore} ball uyqu sifati bilan barqaror, sog'lom ko'rsatkichlarni namoyish etmoqda. Stress darajasi (${a.stressScore} ball) nazorat ostida.`,
      `SinoAI tahliliga ko'ra, bu bo'lim xodimlarining o'rtacha tiklanish ko'rsatkichi ${a.recovery}%, uyqu sifati esa ${a.sleepScore} ball — bu o'rtacha diapazonda. Stress darajasi ${a.stressScore} ball atrofida.`,
      `SinoAI tahliliga ko'ra, bu bo'lim xodimlarining o'rtacha tiklanish ko'rsatkichi past — ${a.recovery}%, uyqu sifati ${a.sleepScore} ball. Stress darajasi ${a.stressScore} ball bilan yuqori chegarada, bu holat ish faoliyatiga ta'sir qilishi mumkin.`,
    )
  }
  if (lang === 'ru') {
    return pick(
      recoveryBand,
      `По данным анализа SinoAI, сотрудники этого отдела показывают стабильные и здоровые показатели: восстановление в среднем ${a.recovery}%, качество сна ${a.sleepScore} баллов. Уровень стресса (${a.stressScore} баллов) под контролем.`,
      `По данным анализа SinoAI, среднее восстановление сотрудников этого отдела составляет ${a.recovery}%, а качество сна — ${a.sleepScore} баллов, что соответствует среднему диапазону. Уровень стресса — около ${a.stressScore} баллов.`,
      `По данным анализа SinoAI, среднее восстановление сотрудников этого отдела низкое — ${a.recovery}%, качество сна — ${a.sleepScore} баллов. Уровень стресса (${a.stressScore} баллов) повышен, что может сказываться на работоспособности.`,
    )
  }
  return pick(
    recoveryBand,
    `According to SinoAI's analysis, workers in this department show stable, healthy readings: average recovery at ${a.recovery}% and sleep quality at ${a.sleepScore}/100. Stress levels (${a.stressScore}/100) are under control.`,
    `According to SinoAI's analysis, this department's average recovery is ${a.recovery}% and sleep quality is ${a.sleepScore}/100, both in a moderate range. Stress levels sit around ${a.stressScore}/100.`,
    `According to SinoAI's analysis, this department's average recovery is low at ${a.recovery}%, with sleep quality at ${a.sleepScore}/100. Stress levels (${a.stressScore}/100) are elevated, which may be affecting performance.`,
  )
}

/** Which of the four non-recovery metrics is dragging this department down the most, so the suggestion can name it specifically instead of reading identically for every department in the same overall band. */
function weakestMetric(a: WellnessMetrics): 'sleep' | 'activity' | 'stress' | 'met' {
  const candidates: [ 'sleep' | 'activity' | 'stress' | 'met', number][] = [
    ['sleep', a.sleepScore],
    ['activity', a.activityScore],
    ['stress', 100 - a.stressScore],
    ['met', Math.min(100, (a.met / 8) * 100)],
  ]
  candidates.sort((x, y) => x[1] - y[1])
  return candidates[0][0]
}

const WEAKEST_FOCUS: Record<Language, Record<'sleep' | 'activity' | 'stress' | 'met', string>> = {
  uz: {
    sleep: 'uyqu sifatini yaxshilashga',
    activity: 'kundalik jismoniy faollikni oshirishga',
    stress: 'stressni kamaytirish choralariga',
    met: 'harakatchanlik va faollik darajasini oshirishga',
  },
  ru: {
    sleep: 'улучшение качества сна',
    activity: 'повышение повседневной физической активности',
    stress: 'меры по снижению стресса',
    met: 'повышение уровня подвижности и активности',
  },
  en: {
    sleep: 'improving sleep quality',
    activity: 'increasing day-to-day physical activity',
    stress: 'stress-reduction measures',
    met: 'raising overall movement and activity levels',
  },
}

export function buildDepartmentSuggestion(summary: DepartmentSummary, lang: Language): string {
  const overall = wellnessBand(summary.index)
  const focus = WEAKEST_FOCUS[lang][weakestMetric(summary.average)]

  if (lang === 'uz') {
    return pick(
      overall,
      "HR uchun tavsiya: joriy ish rejimi va salomatlik dasturini davom ettirish, har chorakda kuzatuvni davom ettirish yetarli.",
      `HR uchun tavsiya: bo'lim uchun ${focus} e'tibor qaratish va qisqa dam olish tanaffuslarini ko'paytirish tavsiya etiladi.`,
      `HR uchun tavsiya: ish yukini qayta taqsimlash va bo'lim rahbari bilan yaqin orada muhokama o'tkazish tavsiya etiladi — birinchi navbatda ${focus} e'tibor qaratilsin.`,
    )
  }
  if (lang === 'ru') {
    return pick(
      overall,
      "Рекомендация для HR: продолжать текущий рабочий режим и программу поддержки здоровья, ежеквартального мониторинга достаточно.",
      `Рекомендация для HR: сосредоточиться на действиях, направленных на ${focus} для этого отдела, и увеличить количество коротких перерывов.`,
      `Рекомендация для HR: пересмотреть распределение нагрузки и в ближайшее время обсудить ситуацию с руководителем отдела, в первую очередь через ${focus}.`,
    )
  }
  return pick(
    overall,
    "Recommendation for HR: continue the current work routine and wellness program — quarterly monitoring should be sufficient.",
    `Recommendation for HR: prioritize ${focus} for this department and add more short recovery breaks.`,
    `Recommendation for HR: redistribute workload and discuss the situation with the department lead soon, starting with ${focus}.`,
  )
}

// ---- disease breakdown intro (Overview) ----

export function buildDiseaseBreakdownIntro(lang: Language): string {
  if (lang === 'uz') {
    return "SinoAI skrining modeli quyidagi onkologik va yurak-qon tomir kasalliklari turlari bo'yicha xavf signallarini tahlil qiladi. Ko'rsatkichlar joriy tekshiruvdan o'tgan xodimlar bo'yicha aniqlangan signallar ulushini bildiradi."
  }
  if (lang === 'ru') {
    return 'Модель скрининга SinoAI анализирует сигналы риска по следующим типам онкологических и сердечно-сосудистых заболеваний. Показатели отражают долю сигналов, выявленных среди прошедших обследование сотрудников.'
  }
  return "SinoAI's screening model analyzes risk signals across the following oncology and cardiovascular disease types. Figures reflect the share of signals detected among screened workers."
}

// ---- absenteeism / presenteeism (Overview) ----

export interface AbsenteeismStats {
  absenteeismDaysPerMonth: number
  presenteeismLossPercent: number
}

export function buildAbsenteeismStats(avgStress: number, avgRecovery: number): AbsenteeismStats {
  // Fabricated, but grounded: higher workforce stress and lower recovery
  // push both figures up, within realistic ranges reported in workplace
  // wellness literature (roughly 0.5-3 absence days/month, 5-25% productivity loss).
  const strainIndex = Math.max(0, Math.min(1, (avgStress - 20) / 60 + (70 - avgRecovery) / 100))
  return {
    absenteeismDaysPerMonth: Math.round((0.6 + strainIndex * 2.2) * 10) / 10,
    presenteeismLossPercent: Math.round(6 + strainIndex * 18),
  }
}

export function buildAbsenteeismAnalysis(stats: AbsenteeismStats, lang: Language): string {
  const band: RiskBand = stats.presenteeismLossPercent >= 18 ? 'high' : stats.presenteeismLossPercent >= 11 ? 'moderate' : 'low'

  if (lang === 'uz') {
    return pick(
      band,
      `SinoAI tahliliga ko'ra, joriy ko'rsatkichlar bo'yicha o'rtacha yo'qlik oyiga ${stats.absenteeismDaysPerMonth} kunni, ishda bo'lib turib samaradorlik pasayishi (prezentizm) esa ${stats.presenteeismLossPercent}% ni tashkil etadi — bu past va boshqariladigan daraja.`,
      `SinoAI tahliliga ko'ra, o'rtacha yo'qlik oyiga ${stats.absenteeismDaysPerMonth} kunni, prezentizm sababli samaradorlik yo'qotilishi esa ${stats.presenteeismLossPercent}% ni tashkil etadi. Bu ko'rsatkich stress va tiklanish darajasi bilan bog'liq bo'lib, kuzatishni davom ettirish tavsiya etiladi.`,
      `SinoAI tahliliga ko'ra, o'rtacha yo'qlik oyiga ${stats.absenteeismDaysPerMonth} kunga, prezentizm sababli samaradorlik yo'qotilishi esa ${stats.presenteeismLossPercent}% ga yetdi — bu yuqori jamoaviy stress va past tiklanish ko'rsatkichlari bilan bog'liq bo'lishi mumkin, shu sababli HR tomonidan choralar ko'rish tavsiya etiladi.`,
    )
  }
  if (lang === 'ru') {
    return pick(
      band,
      `По данным анализа SinoAI, среднее количество пропусков составляет ${stats.absenteeismDaysPerMonth} дней в месяц, а снижение продуктивности при присутствии на работе (презентеизм) — ${stats.presenteeismLossPercent}%, что является низким и управляемым уровнем.`,
      `По данным анализа SinoAI, среднее количество пропусков составляет ${stats.absenteeismDaysPerMonth} дней в месяц, а потери продуктивности из-за презентеизма — ${stats.presenteeismLossPercent}%. Показатель связан с уровнем стресса и восстановления и требует наблюдения.`,
      `По данным анализа SinoAI, среднее количество пропусков достигло ${stats.absenteeismDaysPerMonth} дней в месяц, а потери продуктивности из-за презентеизма — ${stats.presenteeismLossPercent}%. Это может быть связано с высоким уровнем стресса и низким восстановлением в команде, поэтому HR рекомендуется принять меры.`,
    )
  }
  return pick(
    band,
    `According to SinoAI's analysis, average absenteeism sits at ${stats.absenteeismDaysPerMonth} days per month, and presenteeism-related productivity loss is ${stats.presenteeismLossPercent}% — a low, manageable level.`,
    `According to SinoAI's analysis, average absenteeism sits at ${stats.absenteeismDaysPerMonth} days per month, and presenteeism-related productivity loss is ${stats.presenteeismLossPercent}%. This tracks with team stress and recovery levels and is worth continued monitoring.`,
    `According to SinoAI's analysis, average absenteeism has reached ${stats.absenteeismDaysPerMonth} days per month, and presenteeism-related productivity loss is ${stats.presenteeismLossPercent}%. This may be linked to elevated team stress and low recovery, so HR action is recommended.`,
  )
}

export type { DepartmentKey }
