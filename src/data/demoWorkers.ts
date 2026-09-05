import type { Patient } from '@/types'

/**
 * The 12 demo workers used for the investor-facing static build (see
 * src/api/staticDataProvider.ts). Byte-for-byte adapted from
 * server/data/store.json -- same ids, photos, and multi-language risk-domain
 * copy already seeded into the real local database, so this demo looks
 * identical to the live app. Differences from the source file:
 *   - job/description null -> "Not specified" (same backfill server/seed.py
 *     applies when importing this file into Postgres).
 *   - empty factors: [] added to diabetes/cvd domains and oncology sites --
 *     required by the Patient type but never populated in the source data;
 *     the UI already renders fine with zero factors (this is the same data
 *     currently live in the real seeded DB).
 *   - no worker has a sinoaiUserId, matching the source data -- so the
 *     Weekly Recommendation card correctly falls back to its static copy
 *     for all 12 (see staticDataProvider.ts).
 */
export const demoWorkers: Patient[] = [
  {
    "id": "88df6452-5802-41ad-b9bb-106efdae4160",
    "firstName": "Javohir",
    "lastName": "Hoshimov",
    "age": 25,
    "sex": "male",
    "region": "Mirzo Ulug‘bek",
    "phone": "+998774882427",
    "enrolledAt": "2025-11-13T18:41:17.779678+05:00",
    "photoUrl": "/photos/88df6452-5802-41ad-b9bb-106efdae4160.jpg",
    "job": "Not specified",
    "description": "Not specified",
    "insuranceNumber": null,
    "assessed": true,
    "measurements": {
      "bmi": 20.8,
      "vitaminD3": 35.3
    },
    "domains": {
      "diabetes": {
        "domain": "diabetes",
        "method": "CANRISK",
        "percent": 2,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Bu hafta siz bilan muloqot bo'lmadi va yangi shikoyatlar qayd etilmadi, biroq avvalgi haftalardan qolgan D vitamini yetishmovchiligi va gormonal ko'rsatkichlaringizni e'tibordan chetda qoldirmasligingiz muhim.\n\nD vitamini tanqisligi va gormonal muvozanatning e'tiborsiz qoldirilishi organizmda umumiy holsizlik, kayfiyat o'zgarishlari va moddalar almashinuvining buzilishiga olib kelishi mumkin.\n\nSiz bajarilmagan vazifangiz bo'yicha Endokrinologga murojaat qiling va tahlil natijalaringizni mutaxassis ko'rigidan o'tkazing.",
          "ru": "На этой неделе вы не обращались к нам с новыми жалобами, и в чате не было активности, однако у вас остаются невыполненные рекомендации, в частности необходимость консультации эндокринолога по поводу уровня гормонов.\n\nНеконтролируемый гормональный дисбаланс и повышенный уровень свободного тестостерона могут со временем приводить к нарушениям обмена веществ, изменениям настроения и ухудшению общего самочувствия.\n\nЗапишитесь на прием к эндокринологу, чтобы обсудить результаты анализов крови и проверить уровень тестостерона, а также постарайтесь наладить режим сна и следить за уровнем физической активности.",
          "en": "This week was quiet with no new chat messages or wearable activity data recorded, but it is important to keep an eye on your elevated free testosterone levels and vitamin D status from your recent blood tests.\n\nUntreated hormonal imbalances and vitamin D insufficiency can potentially lead to persistent fatigue, mood fluctuations, and metabolic changes over time.\n\nYou should schedule a consultation with an Endokrinolog to review your hormone levels and ensure your vitamin D supplementation is properly managed."
        },
        "analysisSummary": {
          "uz": "Bu hafta siz bilan muloqot bo'lmadi va yangi shikoyatlar qayd etilmadi, biroq avvalgi haftalardan qolgan D vitamini yetishmovchiligi va gormonal ko'rsatkichlaringizni e'tibordan chetda qoldirmasligingiz muhim.\n\nD vitamini tanqisligi va gormonal muvozanatning e'tiborsiz qoldirilishi organizmda umumiy holsizlik, kayfiyat o'zgarishlari va moddalar almashinuvining buzilishiga olib kelishi mumkin.\n\nSiz bajarilmagan vazifangiz bo'yicha Endokrinologga murojaat qiling va tahlil natijalaringizni mutaxassis ko'rigidan o'tkazing.",
          "ru": "На этой неделе вы не обращались к нам с новыми жалобами, и в чате не было активности, однако у вас остаются невыполненные рекомендации, в частности необходимость консультации эндокринолога по поводу уровня гормонов.\n\nНеконтролируемый гормональный дисбаланс и повышенный уровень свободного тестостерона могут со временем приводить к нарушениям обмена веществ, изменениям настроения и ухудшению общего самочувствия.\n\nЗапишитесь на прием к эндокринологу, чтобы обсудить результаты анализов крови и проверить уровень тестостерона, а также постарайтесь наладить режим сна и следить за уровнем физической активности.",
          "en": "This week was quiet with no new chat messages or wearable activity data recorded, but it is important to keep an eye on your elevated free testosterone levels and vitamin D status from your recent blood tests.\n\nUntreated hormonal imbalances and vitamin D insufficiency can potentially lead to persistent fatigue, mood fluctuations, and metabolic changes over time.\n\nYou should schedule a consultation with an Endokrinolog to review your hormone levels and ensure your vitamin D supplementation is properly managed."
        },
        "updatedAt": "2026-08-21T12:00:04.487666+05:00",
        "factors": []
      },
      "cvd": {
        "domain": "cvd",
        "method": "SCORE2",
        "percent": 8,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Bu hafta siz bilan muloqot bo'lmadi va yangi shikoyatlar qayd etilmadi, biroq avvalgi haftalardan qolgan D vitamini yetishmovchiligi va gormonal ko'rsatkichlaringizni e'tibordan chetda qoldirmasligingiz muhim.\n\nD vitamini tanqisligi va gormonal muvozanatning e'tiborsiz qoldirilishi organizmda umumiy holsizlik, kayfiyat o'zgarishlari va moddalar almashinuvining buzilishiga olib kelishi mumkin.\n\nSiz bajarilmagan vazifangiz bo'yicha Endokrinologga murojaat qiling va tahlil natijalaringizni mutaxassis ko'rigidan o'tkazing.",
          "ru": "На этой неделе вы не обращались к нам с новыми жалобами, и в чате не было активности, однако у вас остаются невыполненные рекомендации, в частности необходимость консультации эндокринолога по поводу уровня гормонов.\n\nНеконтролируемый гормональный дисбаланс и повышенный уровень свободного тестостерона могут со временем приводить к нарушениям обмена веществ, изменениям настроения и ухудшению общего самочувствия.\n\nЗапишитесь на прием к эндокринологу, чтобы обсудить результаты анализов крови и проверить уровень тестостерона, а также постарайтесь наладить режим сна и следить за уровнем физической активности.",
          "en": "This week was quiet with no new chat messages or wearable activity data recorded, but it is important to keep an eye on your elevated free testosterone levels and vitamin D status from your recent blood tests.\n\nUntreated hormonal imbalances and vitamin D insufficiency can potentially lead to persistent fatigue, mood fluctuations, and metabolic changes over time.\n\nYou should schedule a consultation with an Endokrinolog to review your hormone levels and ensure your vitamin D supplementation is properly managed."
        },
        "analysisSummary": {
          "uz": "Bu hafta siz bilan muloqot bo'lmadi va yangi shikoyatlar qayd etilmadi, biroq avvalgi haftalardan qolgan D vitamini yetishmovchiligi va gormonal ko'rsatkichlaringizni e'tibordan chetda qoldirmasligingiz muhim.\n\nD vitamini tanqisligi va gormonal muvozanatning e'tiborsiz qoldirilishi organizmda umumiy holsizlik, kayfiyat o'zgarishlari va moddalar almashinuvining buzilishiga olib kelishi mumkin.\n\nSiz bajarilmagan vazifangiz bo'yicha Endokrinologga murojaat qiling va tahlil natijalaringizni mutaxassis ko'rigidan o'tkazing.",
          "ru": "На этой неделе вы не обращались к нам с новыми жалобами, и в чате не было активности, однако у вас остаются невыполненные рекомендации, в частности необходимость консультации эндокринолога по поводу уровня гормонов.\n\nНеконтролируемый гормональный дисбаланс и повышенный уровень свободного тестостерона могут со временем приводить к нарушениям обмена веществ, изменениям настроения и ухудшению общего самочувствия.\n\nЗапишитесь на прием к эндокринологу, чтобы обсудить результаты анализов крови и проверить уровень тестостерона, а также постарайтесь наладить режим сна и следить за уровнем физической активности.",
          "en": "This week was quiet with no new chat messages or wearable activity data recorded, but it is important to keep an eye on your elevated free testosterone levels and vitamin D status from your recent blood tests.\n\nUntreated hormonal imbalances and vitamin D insufficiency can potentially lead to persistent fatigue, mood fluctuations, and metabolic changes over time.\n\nYou should schedule a consultation with an Endokrinolog to review your hormone levels and ensure your vitamin D supplementation is properly managed."
        },
        "updatedAt": "2026-08-21T12:00:04.487666+05:00",
        "factors": []
      },
      "oncology": {
        "domain": "oncology",
        "method": "SIGNAL_COUNT",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "sites": [
          {
            "id": "stomach",
            "label": {
              "uz": "Oshqozon saratoni xavf omillari",
              "ru": "Факторы риска рака желудка",
              "en": "Stomach cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          },
          {
            "id": "prostate",
            "label": {
              "uz": "Prostata saratoni xavf omillari",
              "ru": "Факторы риска рака простаты",
              "en": "Prostate cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          }
        ],
        "analysis": {
          "uz": "Bu hafta siz bilan muloqot bo'lmadi va yangi shikoyatlar qayd etilmadi, biroq avvalgi haftalardan qolgan D vitamini yetishmovchiligi va gormonal ko'rsatkichlaringizni e'tibordan chetda qoldirmasligingiz muhim.\n\nD vitamini tanqisligi va gormonal muvozanatning e'tiborsiz qoldirilishi organizmda umumiy holsizlik, kayfiyat o'zgarishlari va moddalar almashinuvining buzilishiga olib kelishi mumkin.\n\nSiz bajarilmagan vazifangiz bo'yicha Endokrinologga murojaat qiling va tahlil natijalaringizni mutaxassis ko'rigidan o'tkazing.",
          "ru": "На этой неделе вы не обращались к нам с новыми жалобами, и в чате не было активности, однако у вас остаются невыполненные рекомендации, в частности необходимость консультации эндокринолога по поводу уровня гормонов.\n\nНеконтролируемый гормональный дисбаланс и повышенный уровень свободного тестостерона могут со временем приводить к нарушениям обмена веществ, изменениям настроения и ухудшению общего самочувствия.\n\nЗапишитесь на прием к эндокринологу, чтобы обсудить результаты анализов крови и проверить уровень тестостерона, а также постарайтесь наладить режим сна и следить за уровнем физической активности.",
          "en": "This week was quiet with no new chat messages or wearable activity data recorded, but it is important to keep an eye on your elevated free testosterone levels and vitamin D status from your recent blood tests.\n\nUntreated hormonal imbalances and vitamin D insufficiency can potentially lead to persistent fatigue, mood fluctuations, and metabolic changes over time.\n\nYou should schedule a consultation with an Endokrinolog to review your hormone levels and ensure your vitamin D supplementation is properly managed."
        },
        "analysisSummary": {
          "uz": "Bu hafta siz bilan muloqot bo'lmadi va yangi shikoyatlar qayd etilmadi, biroq avvalgi haftalardan qolgan D vitamini yetishmovchiligi va gormonal ko'rsatkichlaringizni e'tibordan chetda qoldirmasligingiz muhim.\n\nD vitamini tanqisligi va gormonal muvozanatning e'tiborsiz qoldirilishi organizmda umumiy holsizlik, kayfiyat o'zgarishlari va moddalar almashinuvining buzilishiga olib kelishi mumkin.\n\nSiz bajarilmagan vazifangiz bo'yicha Endokrinologga murojaat qiling va tahlil natijalaringizni mutaxassis ko'rigidan o'tkazing.",
          "ru": "На этой неделе вы не обращались к нам с новыми жалобами, и в чате не было активности, однако у вас остаются невыполненные рекомендации, в частности необходимость консультации эндокринолога по поводу уровня гормонов.\n\nНеконтролируемый гормональный дисбаланс и повышенный уровень свободного тестостерона могут со временем приводить к нарушениям обмена веществ, изменениям настроения и ухудшению общего самочувствия.\n\nЗапишитесь на прием к эндокринологу, чтобы обсудить результаты анализов крови и проверить уровень тестостерона, а также постарайтесь наладить режим сна и следить за уровнем физической активности.",
          "en": "This week was quiet with no new chat messages or wearable activity data recorded, but it is important to keep an eye on your elevated free testosterone levels and vitamin D status from your recent blood tests.\n\nUntreated hormonal imbalances and vitamin D insufficiency can potentially lead to persistent fatigue, mood fluctuations, and metabolic changes over time.\n\nYou should schedule a consultation with an Endokrinolog to review your hormone levels and ensure your vitamin D supplementation is properly managed."
        },
        "updatedAt": "2026-08-21T12:00:04.487666+05:00"
      }
    },
    "department": "warehouse",
    "wellness": {
      "recovery": 78,
      "sleepScore": 82,
      "met": 5.4,
      "activityScore": 74,
      "stressScore": 28
    }
  },
  {
    "id": "d2631eba-daf3-4c41-a97c-456fcc75b7ed",
    "firstName": "Shakhzod",
    "lastName": "Toshboyev",
    "age": 18,
    "sex": "male",
    "region": "Bektemir",
    "phone": "+998200109964",
    "enrolledAt": "2026-02-16T13:30:32.931633+05:00",
    "photoUrl": "/photos/d2631eba-daf3-4c41-a97c-456fcc75b7ed.jpg",
    "job": "Not specified",
    "description": "Not specified",
    "insuranceNumber": null,
    "assessed": true,
    "measurements": {
      "bmi": 29.1,
      "vitaminD3": 35.3
    },
    "domains": {
      "diabetes": {
        "domain": "diabetes",
        "method": "CANRISK",
        "percent": 12,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Bu hafta siz chatda hech qanday yangi shikoyat yozmadingiz va tana faolligingiz bo'yicha ma'lumotlar kelib tushmadi. Shu sababli, oldingi haftalarda aniqlangan umumiy xolesterin miqdori yuqoriligicha qolayotgani e'tibor qaratish kerak bo'lgan asosiy jihatdir.\n\nQondagi xolesterin miqdorining uzoq vaqt davomida yuqori bo'lishi qon tomirlarida plitalar hosil bo'lishiga va yurak-qon tomir tizimi kasalliklari xavfining oshishiga olib kelishi mumkin.\n\nXolesterin miqdorini nazorat qilish va yurak salomatligini qo'llab-quvvatlash uchun kardiologga murojaat qiling, shuningdek, yog'li ovqatlarni kamaytirib, muvozanatli ovqatlanish tartibiga amal qiling.",
          "ru": "На этой неделе у вас не было новых сообщений в чате, а физическая активность не фиксировалась. Тем не менее, учитывая ваш высокий уровень общего холестерина и ЛПНП, важно продолжать следить за состоянием сердечно-сосудистой системы.\n\nПовышенный уровень холестерина и липидов в крови со временем может приводить к атеросклерозу — сужению и уплотнению стенок артерий из-за формирования холестериновых бляшек. Это состояние значительно увеличивает риск развития серьезных сердечно-сосудистых осложнений, таких как ишемическая болезнь сердца.\n\nВам необходимо записаться на прием к кardiologu для профессиональной оценки риска и составления плана профилактики. Старайтесь придерживаться принципов сбалансированного питания и контролируйте уровень физической активности.",
          "en": "This week was completely quiet with no new chat messages, symptom reports, or wearable activity changes logged. Since your health status has been stable, your most pressing ongoing priority is to address your high total and LDL cholesterol levels that we have been monitoring.\n\nElevated LDL cholesterol can lead to the gradual accumulation of atherosclerotic plaques within the arterial walls, which progressively restricts blood flow and significantly increases the long-term risk of cardiovascular events such as myocardial infarction and stroke.\n\nYou should schedule a consultation with a Kardiolog to evaluate your lipid profile and discuss personalized strategies for lowering your cholesterol. Continue focusing on a balanced diet rich in fiber and maintain your regular physical activity."
        },
        "analysisSummary": {
          "uz": "Bu hafta siz chatda hech qanday yangi shikoyat yozmadingiz va tana faolligingiz bo'yicha ma'lumotlar kelib tushmadi.",
          "ru": "На этой неделе у вас не было новых сообщений в чате, а физическая активность не фиксировалась.",
          "en": "This week was completely quiet with no new chat messages, symptom reports, or wearable activity changes logged."
        },
        "updatedAt": "2026-08-21T12:23:18.809394+05:00",
        "factors": []
      },
      "cvd": {
        "domain": "cvd",
        "method": "SCORE2",
        "percent": 19,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Bu hafta siz chatda hech qanday yangi shikoyat yozmadingiz va tana faolligingiz bo'yicha ma'lumotlar kelib tushmadi. Shu sababli, oldingi haftalarda aniqlangan umumiy xolesterin miqdori yuqoriligicha qolayotgani e'tibor qaratish kerak bo'lgan asosiy jihatdir.\n\nQondagi xolesterin miqdorining uzoq vaqt davomida yuqori bo'lishi qon tomirlarida plitalar hosil bo'lishiga va yurak-qon tomir tizimi kasalliklari xavfining oshishiga olib kelishi mumkin.\n\nXolesterin miqdorini nazorat qilish va yurak salomatligini qo'llab-quvvatlash uchun kardiologga murojaat qiling, shuningdek, yog'li ovqatlarni kamaytirib, muvozanatli ovqatlanish tartibiga amal qiling.",
          "ru": "На этой неделе у вас не было новых сообщений в чате, а физическая активность не фиксировалась. Тем не менее, учитывая ваш высокий уровень общего холестерина и ЛПНП, важно продолжать следить за состоянием сердечно-сосудистой системы.\n\nПовышенный уровень холестерина и липидов в крови со временем может приводить к атеросклерозу — сужению и уплотнению стенок артерий из-за формирования холестериновых бляшек. Это состояние значительно увеличивает риск развития серьезных сердечно-сосудистых осложнений, таких как ишемическая болезнь сердца.\n\nВам необходимо записаться на прием к кardiologu для профессиональной оценки риска и составления плана профилактики. Старайтесь придерживаться принципов сбалансированного питания и контролируйте уровень физической активности.",
          "en": "This week was completely quiet with no new chat messages, symptom reports, or wearable activity changes logged. Since your health status has been stable, your most pressing ongoing priority is to address your high total and LDL cholesterol levels that we have been monitoring.\n\nElevated LDL cholesterol can lead to the gradual accumulation of atherosclerotic plaques within the arterial walls, which progressively restricts blood flow and significantly increases the long-term risk of cardiovascular events such as myocardial infarction and stroke.\n\nYou should schedule a consultation with a Kardiolog to evaluate your lipid profile and discuss personalized strategies for lowering your cholesterol. Continue focusing on a balanced diet rich in fiber and maintain your regular physical activity."
        },
        "analysisSummary": {
          "uz": "Bu hafta siz chatda hech qanday yangi shikoyat yozmadingiz va tana faolligingiz bo'yicha ma'lumotlar kelib tushmadi.",
          "ru": "На этой неделе у вас не было новых сообщений в чате, а физическая активность не фиксировалась.",
          "en": "This week was completely quiet with no new chat messages, symptom reports, or wearable activity changes logged."
        },
        "updatedAt": "2026-08-21T12:23:18.809394+05:00",
        "factors": []
      },
      "oncology": {
        "domain": "oncology",
        "method": "SIGNAL_COUNT",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "sites": [
          {
            "id": "stomach",
            "label": {
              "uz": "Oshqozon saratoni xavf omillari",
              "ru": "Факторы риска рака желудка",
              "en": "Stomach cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          },
          {
            "id": "prostate",
            "label": {
              "uz": "Prostata saratoni xavf omillari",
              "ru": "Факторы риска рака простаты",
              "en": "Prostate cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          }
        ],
        "analysis": {
          "uz": "Bu hafta siz chatda hech qanday yangi shikoyat yozmadingiz va tana faolligingiz bo'yicha ma'lumotlar kelib tushmadi. Shu sababli, oldingi haftalarda aniqlangan umumiy xolesterin miqdori yuqoriligicha qolayotgani e'tibor qaratish kerak bo'lgan asosiy jihatdir.\n\nQondagi xolesterin miqdorining uzoq vaqt davomida yuqori bo'lishi qon tomirlarida plitalar hosil bo'lishiga va yurak-qon tomir tizimi kasalliklari xavfining oshishiga olib kelishi mumkin.\n\nXolesterin miqdorini nazorat qilish va yurak salomatligini qo'llab-quvvatlash uchun kardiologga murojaat qiling, shuningdek, yog'li ovqatlarni kamaytirib, muvozanatli ovqatlanish tartibiga amal qiling.",
          "ru": "На этой неделе у вас не было новых сообщений в чате, а физическая активность не фиксировалась. Тем не менее, учитывая ваш высокий уровень общего холестерина и ЛПНП, важно продолжать следить за состоянием сердечно-сосудистой системы.\n\nПовышенный уровень холестерина и липидов в крови со временем может приводить к атеросклерозу — сужению и уплотнению стенок артерий из-за формирования холестериновых бляшек. Это состояние значительно увеличивает риск развития серьезных сердечно-сосудистых осложнений, таких как ишемическая болезнь сердца.\n\nВам необходимо записаться на прием к кardiologu для профессиональной оценки риска и составления плана профилактики. Старайтесь придерживаться принципов сбалансированного питания и контролируйте уровень физической активности.",
          "en": "This week was completely quiet with no new chat messages, symptom reports, or wearable activity changes logged. Since your health status has been stable, your most pressing ongoing priority is to address your high total and LDL cholesterol levels that we have been monitoring.\n\nElevated LDL cholesterol can lead to the gradual accumulation of atherosclerotic plaques within the arterial walls, which progressively restricts blood flow and significantly increases the long-term risk of cardiovascular events such as myocardial infarction and stroke.\n\nYou should schedule a consultation with a Kardiolog to evaluate your lipid profile and discuss personalized strategies for lowering your cholesterol. Continue focusing on a balanced diet rich in fiber and maintain your regular physical activity."
        },
        "analysisSummary": {
          "uz": "Bu hafta siz chatda hech qanday yangi shikoyat yozmadingiz va tana faolligingiz bo'yicha ma'lumotlar kelib tushmadi.",
          "ru": "На этой неделе у вас не было новых сообщений в чате, а физическая активность не фиксировалась.",
          "en": "This week was completely quiet with no new chat messages, symptom reports, or wearable activity changes logged."
        },
        "updatedAt": "2026-08-21T12:23:18.809394+05:00"
      }
    },
    "department": "production",
    "wellness": {
      "recovery": 61,
      "sleepScore": 58,
      "met": 4.1,
      "activityScore": 55,
      "stressScore": 52
    }
  },
  {
    "id": "03595534-4c26-4ae8-bdc4-98a8f384a03d",
    "firstName": "Shehroz",
    "lastName": "Nurliyev",
    "age": 25,
    "sex": "male",
    "region": "Shayxontoxur",
    "phone": "+998943799333",
    "enrolledAt": "2026-07-16T08:14:20.600830+05:00",
    "photoUrl": "/photos/03595534-4c26-4ae8-bdc4-98a8f384a03d.jpg",
    "job": "Not specified",
    "description": "Not specified",
    "insuranceNumber": null,
    "assessed": true,
    "measurements": {
      "bmi": 18.3
    },
    "domains": {
      "diabetes": {
        "domain": "diabetes",
        "method": "CANRISK",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Siz bu hafta chatda hech qanday yangi xabar yozmadingiz va faolligingiz haqida ma'lumot bermadingiz. Biroq, sizda o'tgan haftalardan beri davom etayotgan yo'tal shikoyati va past tana vazni (BMI 18.3) e'tibor talab qiladigan asosiy masalalardan biri bo'lib qolmoqda.\n\nUzoq vaqt davom etadigan yo'tal va past tana vazni organizmning himoya qobiliyatini zaiflashtirishi hamda nafas olish tizimida yashirin infeksiyalar yoki boshqa yallig'lanish jarayonlarining kuchayishiga olib kelishi mumkin.\n\nSizga o'tgan haftalardagi bajarilmagan vazifalarni e'tiborga olib, mutaxassis ko'rigidan o'tishni maslahat beramiz. Iltimos, sog'ligingizni to'liq tekshirish uchun [Terapevtga](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) murojaat qiling va ovqatlanish tartibingizni yaxshilang.",
          "ru": "На этой неделе вы не обращались к нам в чат и не фиксировали новых симптомов, однако в вашей истории остается недавняя жалоба на кашель. Учитывая ваш низкий индекс массы тела (18.3 кг/м²), важно следить за общим самосохранением и питанием.\n\nНевыясненная причина длительного кашля на фоне дефицита массы тела может привести к истощению организма, развитию хронических воспалительных процессов в дыхательных путях и снижению общего иммунитета.\n\nВам следует обратиться к [терапевту](sinoai://open?path=doctors&speciality_id=17&speciality_name=%D0%A2%D0%B5%D1%80%D0%B0%D0%BF%D0%B5%D0%B2%D1%82) для оценки характера кашля и исключения скрытых патологий легких. Старайтесь полноценно питаться и контролировать массу тела.",
          "en": "Since you did not chat with us this week and no wearable data was recorded, your week has been quiet. Looking at your medical profile, your recent cough from last week is worth keeping an eye on to ensure it does not return or worsen.\n\nPersistent or recurring coughs can sometimes indicate underlying respiratory irritation or bronchial inflammation if left unchecked.\n\nMonitor your breathing closely and schedule an appointment with a [Pulmonolog](sinoai://open?path=doctors&speciality_id=88&speciality_name=Pulmonolog) if you notice any new respiratory symptoms."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta chatda hech qanday yangi xabar yozmadingiz va faolligingiz haqida ma'lumot bermadingiz.",
          "ru": "На этой неделе вы не обращались к нам в чат и не фиксировали новых симптомов, однако в вашей истории остается недавняя жалоба на кашель.",
          "en": "Since you did not chat with us this week and no wearable data was recorded, your week has been quiet."
        },
        "updatedAt": "2026-08-21T12:23:30.835165+05:00",
        "factors": []
      },
      "cvd": {
        "domain": "cvd",
        "method": "SCORE2",
        "percent": 4,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Siz bu hafta chatda hech qanday yangi xabar yozmadingiz va faolligingiz haqida ma'lumot bermadingiz. Biroq, sizda o'tgan haftalardan beri davom etayotgan yo'tal shikoyati va past tana vazni (BMI 18.3) e'tibor talab qiladigan asosiy masalalardan biri bo'lib qolmoqda.\n\nUzoq vaqt davom etadigan yo'tal va past tana vazni organizmning himoya qobiliyatini zaiflashtirishi hamda nafas olish tizimida yashirin infeksiyalar yoki boshqa yallig'lanish jarayonlarining kuchayishiga olib kelishi mumkin.\n\nSizga o'tgan haftalardagi bajarilmagan vazifalarni e'tiborga olib, mutaxassis ko'rigidan o'tishni maslahat beramiz. Iltimos, sog'ligingizni to'liq tekshirish uchun [Terapevtga](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) murojaat qiling va ovqatlanish tartibingizni yaxshilang.",
          "ru": "На этой неделе вы не обращались к нам в чат и не фиксировали новых симптомов, однако в вашей истории остается недавняя жалоба на кашель. Учитывая ваш низкий индекс массы тела (18.3 кг/м²), важно следить за общим самосохранением и питанием.\n\nНевыясненная причина длительного кашля на фоне дефицита массы тела может привести к истощению организма, развитию хронических воспалительных процессов в дыхательных путях и снижению общего иммунитета.\n\nВам следует обратиться к [терапевту](sinoai://open?path=doctors&speciality_id=17&speciality_name=%D0%A2%D0%B5%D1%80%D0%B0%D0%BF%D0%B5%D0%B2%D1%82) для оценки характера кашля и исключения скрытых патологий легких. Старайтесь полноценно питаться и контролировать массу тела.",
          "en": "Since you did not chat with us this week and no wearable data was recorded, your week has been quiet. Looking at your medical profile, your recent cough from last week is worth keeping an eye on to ensure it does not return or worsen.\n\nPersistent or recurring coughs can sometimes indicate underlying respiratory irritation or bronchial inflammation if left unchecked.\n\nMonitor your breathing closely and schedule an appointment with a [Pulmonolog](sinoai://open?path=doctors&speciality_id=88&speciality_name=Pulmonolog) if you notice any new respiratory symptoms."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta chatda hech qanday yangi xabar yozmadingiz va faolligingiz haqida ma'lumot bermadingiz.",
          "ru": "На этой неделе вы не обращались к нам в чат и не фиксировали новых симптомов, однако в вашей истории остается недавняя жалоба на кашель.",
          "en": "Since you did not chat with us this week and no wearable data was recorded, your week has been quiet."
        },
        "updatedAt": "2026-08-21T12:23:30.835165+05:00",
        "factors": []
      },
      "oncology": {
        "domain": "oncology",
        "method": "SIGNAL_COUNT",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "sites": [
          {
            "id": "stomach",
            "label": {
              "uz": "Oshqozon saratoni xavf omillari",
              "ru": "Факторы риска рака желудка",
              "en": "Stomach cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          },
          {
            "id": "prostate",
            "label": {
              "uz": "Prostata saratoni xavf omillari",
              "ru": "Факторы риска рака простаты",
              "en": "Prostate cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          }
        ],
        "analysis": {
          "uz": "Siz bu hafta chatda hech qanday yangi xabar yozmadingiz va faolligingiz haqida ma'lumot bermadingiz. Biroq, sizda o'tgan haftalardan beri davom etayotgan yo'tal shikoyati va past tana vazni (BMI 18.3) e'tibor talab qiladigan asosiy masalalardan biri bo'lib qolmoqda.\n\nUzoq vaqt davom etadigan yo'tal va past tana vazni organizmning himoya qobiliyatini zaiflashtirishi hamda nafas olish tizimida yashirin infeksiyalar yoki boshqa yallig'lanish jarayonlarining kuchayishiga olib kelishi mumkin.\n\nSizga o'tgan haftalardagi bajarilmagan vazifalarni e'tiborga olib, mutaxassis ko'rigidan o'tishni maslahat beramiz. Iltimos, sog'ligingizni to'liq tekshirish uchun [Terapevtga](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) murojaat qiling va ovqatlanish tartibingizni yaxshilang.",
          "ru": "На этой неделе вы не обращались к нам в чат и не фиксировали новых симптомов, однако в вашей истории остается недавняя жалоба на кашель. Учитывая ваш низкий индекс массы тела (18.3 кг/м²), важно следить за общим самосохранением и питанием.\n\nНевыясненная причина длительного кашля на фоне дефицита массы тела может привести к истощению организма, развитию хронических воспалительных процессов в дыхательных путях и снижению общего иммунитета.\n\nВам следует обратиться к [терапевту](sinoai://open?path=doctors&speciality_id=17&speciality_name=%D0%A2%D0%B5%D1%80%D0%B0%D0%BF%D0%B5%D0%B2%D1%82) для оценки характера кашля и исключения скрытых патологий легких. Старайтесь полноценно питаться и контролировать массу тела.",
          "en": "Since you did not chat with us this week and no wearable data was recorded, your week has been quiet. Looking at your medical profile, your recent cough from last week is worth keeping an eye on to ensure it does not return or worsen.\n\nPersistent or recurring coughs can sometimes indicate underlying respiratory irritation or bronchial inflammation if left unchecked.\n\nMonitor your breathing closely and schedule an appointment with a [Pulmonolog](sinoai://open?path=doctors&speciality_id=88&speciality_name=Pulmonolog) if you notice any new respiratory symptoms."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta chatda hech qanday yangi xabar yozmadingiz va faolligingiz haqida ma'lumot bermadingiz.",
          "ru": "На этой неделе вы не обращались к нам в чат и не фиксировали новых симптомов, однако в вашей истории остается недавняя жалоба на кашель.",
          "en": "Since you did not chat with us this week and no wearable data was recorded, your week has been quiet."
        },
        "updatedAt": "2026-08-21T12:23:30.835165+05:00"
      }
    },
    "department": "warehouse",
    "wellness": {
      "recovery": 85,
      "sleepScore": 88,
      "met": 6.0,
      "activityScore": 80,
      "stressScore": 22
    }
  },
  {
    "id": "28e1b80a-958a-462b-8aaa-809c9c4bd393",
    "firstName": "Javlonbek",
    "lastName": "Rustamov",
    "age": 21,
    "sex": "male",
    "region": "Yuqorichirchiq",
    "phone": "+998990526804",
    "enrolledAt": "2026-06-10T12:52:13.234792+05:00",
    "photoUrl": "/photos/28e1b80a-958a-462b-8aaa-809c9c4bd393.jpg",
    "job": "Not specified",
    "description": "Not specified",
    "insuranceNumber": null,
    "assessed": true,
    "measurements": {
      "bmi": 19.2
    },
    "domains": {
      "diabetes": {
        "domain": "diabetes",
        "method": "CANRISK",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Sizda oxirgi yetti kun davomida hech qanday yangi shikoyatlar yoki faollik bo'lmadi, suhbatlar ham qayd etilmadi. Shu sababli, bu hafta sog'lig'ingizdagi umumiy tana vazni indeksi (BMI: 19.2) biroz past ekanligiga e'tibor qaratish lozim.\n\nTana vazni indeksining past bo'lishi organizmda ozuqa moddalari yetishmasligiga, immunitetning pasayishiga va umumiy holsizlikka olib kelishi mumkin.\n\nSiz ovqatlanish ratsioningizni muvozanatlashtirib, kaloriyali va vitaminlarga boy mahsulotlarni ko'proq iste'mol qilishingiz kerak. Agar vazn tashvishlantirsa, Terapevtga murojaat qiling.",
          "ru": "За последнюю неделю у вас не было активности в чате, а данные с носимых устройств и измерительных приборов отсутствуют. Учитывая ваш возраст и низкий индекс массы тела (19.2 при росте 187 см и весе 67 кг), важно продолжать следить за своим питанием и общим самочувствием.\n\nНедостаточный вес и дефицит массы тела могут со временем приводить к снижению иммунитета, постоянной утомляемости, дефициту полезных веществ в организме и гормональным нарушениям.\n\nОбратитесь к терапевту, чтобы обсудить ваш рацион, сдать базовые анализы крови и исключить скрытые причины дефицита веса. Старайтесь регулярно питаться и следить за достаточным количеством калорий в ежедневном рационе.",
          "en": "You had no chat activity and no wearable data logged over the past seven days, keeping your weekly record entirely quiet. Looking at your ongoing profile, you have not yet completed the task from last week to schedule a general check-up with a Terapevt, and your BMI remains on the leaner side at 19.2 for your 187 cm height.\n\nA consistently low BMI and inadequate caloric intake can potentially lead to nutritional deficiencies, decreased immune function, and reduced muscle mass over time. Furthermore, postponing preventive medical evaluations can delay the early detection of underlying health issues.\n\nYou should schedule a consultation with a Terapevt to discuss your overall health and address your low BMI. Focus on incorporating nutrient-dense foods and sufficient calories into your daily meals to support your height and daily energy needs."
        },
        "analysisSummary": {
          "uz": "Sizda oxirgi yetti kun davomida hech qanday yangi shikoyatlar yoki faollik bo'lmadi, suhbatlar ham qayd etilmadi.",
          "ru": "За последнюю неделю у вас не было активности в чате, а данные с носимых устройств и измерительных приборов отсутствуют.",
          "en": "You had no chat activity and no wearable data logged over the past seven days, keeping your weekly record entirely quiet."
        },
        "updatedAt": "2026-08-21T12:23:42.596813+05:00",
        "factors": []
      },
      "cvd": {
        "domain": "cvd",
        "method": "SCORE2",
        "percent": 4,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Sizda oxirgi yetti kun davomida hech qanday yangi shikoyatlar yoki faollik bo'lmadi, suhbatlar ham qayd etilmadi. Shu sababli, bu hafta sog'lig'ingizdagi umumiy tana vazni indeksi (BMI: 19.2) biroz past ekanligiga e'tibor qaratish lozim.\n\nTana vazni indeksining past bo'lishi organizmda ozuqa moddalari yetishmasligiga, immunitetning pasayishiga va umumiy holsizlikka olib kelishi mumkin.\n\nSiz ovqatlanish ratsioningizni muvozanatlashtirib, kaloriyali va vitaminlarga boy mahsulotlarni ko'proq iste'mol qilishingiz kerak. Agar vazn tashvishlantirsa, Terapevtga murojaat qiling.",
          "ru": "За последнюю неделю у вас не было активности в чате, а данные с носимых устройств и измерительных приборов отсутствуют. Учитывая ваш возраст и низкий индекс массы тела (19.2 при росте 187 см и весе 67 кг), важно продолжать следить за своим питанием и общим самочувствием.\n\nНедостаточный вес и дефицит массы тела могут со временем приводить к снижению иммунитета, постоянной утомляемости, дефициту полезных веществ в организме и гормональным нарушениям.\n\nОбратитесь к терапевту, чтобы обсудить ваш рацион, сдать базовые анализы крови и исключить скрытые причины дефицита веса. Старайтесь регулярно питаться и следить за достаточным количеством калорий в ежедневном рационе.",
          "en": "You had no chat activity and no wearable data logged over the past seven days, keeping your weekly record entirely quiet. Looking at your ongoing profile, you have not yet completed the task from last week to schedule a general check-up with a Terapevt, and your BMI remains on the leaner side at 19.2 for your 187 cm height.\n\nA consistently low BMI and inadequate caloric intake can potentially lead to nutritional deficiencies, decreased immune function, and reduced muscle mass over time. Furthermore, postponing preventive medical evaluations can delay the early detection of underlying health issues.\n\nYou should schedule a consultation with a Terapevt to discuss your overall health and address your low BMI. Focus on incorporating nutrient-dense foods and sufficient calories into your daily meals to support your height and daily energy needs."
        },
        "analysisSummary": {
          "uz": "Sizda oxirgi yetti kun davomida hech qanday yangi shikoyatlar yoki faollik bo'lmadi, suhbatlar ham qayd etilmadi.",
          "ru": "За последнюю неделю у вас не было активности в чате, а данные с носимых устройств и измерительных приборов отсутствуют.",
          "en": "You had no chat activity and no wearable data logged over the past seven days, keeping your weekly record entirely quiet."
        },
        "updatedAt": "2026-08-21T12:23:42.596813+05:00",
        "factors": []
      },
      "oncology": {
        "domain": "oncology",
        "method": "SIGNAL_COUNT",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "sites": [
          {
            "id": "stomach",
            "label": {
              "uz": "Oshqozon saratoni xavf omillari",
              "ru": "Факторы риска рака желудка",
              "en": "Stomach cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          },
          {
            "id": "prostate",
            "label": {
              "uz": "Prostata saratoni xavf omillari",
              "ru": "Факторы риска рака простаты",
              "en": "Prostate cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          }
        ],
        "analysis": {
          "uz": "Sizda oxirgi yetti kun davomida hech qanday yangi shikoyatlar yoki faollik bo'lmadi, suhbatlar ham qayd etilmadi. Shu sababli, bu hafta sog'lig'ingizdagi umumiy tana vazni indeksi (BMI: 19.2) biroz past ekanligiga e'tibor qaratish lozim.\n\nTana vazni indeksining past bo'lishi organizmda ozuqa moddalari yetishmasligiga, immunitetning pasayishiga va umumiy holsizlikka olib kelishi mumkin.\n\nSiz ovqatlanish ratsioningizni muvozanatlashtirib, kaloriyali va vitaminlarga boy mahsulotlarni ko'proq iste'mol qilishingiz kerak. Agar vazn tashvishlantirsa, Terapevtga murojaat qiling.",
          "ru": "За последнюю неделю у вас не было активности в чате, а данные с носимых устройств и измерительных приборов отсутствуют. Учитывая ваш возраст и низкий индекс массы тела (19.2 при росте 187 см и весе 67 кг), важно продолжать следить за своим питанием и общим самочувствием.\n\nНедостаточный вес и дефицит массы тела могут со временем приводить к снижению иммунитета, постоянной утомляемости, дефициту полезных веществ в организме и гормональным нарушениям.\n\nОбратитесь к терапевту, чтобы обсудить ваш рацион, сдать базовые анализы крови и исключить скрытые причины дефицита веса. Старайтесь регулярно питаться и следить за достаточным количеством калорий в ежедневном рационе.",
          "en": "You had no chat activity and no wearable data logged over the past seven days, keeping your weekly record entirely quiet. Looking at your ongoing profile, you have not yet completed the task from last week to schedule a general check-up with a Terapevt, and your BMI remains on the leaner side at 19.2 for your 187 cm height.\n\nA consistently low BMI and inadequate caloric intake can potentially lead to nutritional deficiencies, decreased immune function, and reduced muscle mass over time. Furthermore, postponing preventive medical evaluations can delay the early detection of underlying health issues.\n\nYou should schedule a consultation with a Terapevt to discuss your overall health and address your low BMI. Focus on incorporating nutrient-dense foods and sufficient calories into your daily meals to support your height and daily energy needs."
        },
        "analysisSummary": {
          "uz": "Sizda oxirgi yetti kun davomida hech qanday yangi shikoyatlar yoki faollik bo'lmadi, suhbatlar ham qayd etilmadi.",
          "ru": "За последнюю неделю у вас не было активности в чате, а данные с носимых устройств и измерительных приборов отсутствуют.",
          "en": "You had no chat activity and no wearable data logged over the past seven days, keeping your weekly record entirely quiet."
        },
        "updatedAt": "2026-08-21T12:23:42.596813+05:00"
      }
    },
    "department": "management",
    "wellness": {
      "recovery": 70,
      "sleepScore": 74,
      "met": 3.6,
      "activityScore": 42,
      "stressScore": 38
    }
  },
  {
    "id": "cb0478c0-9214-4636-97fc-dd3eee2815d0",
    "firstName": "Asror",
    "lastName": "Xudoyberdiyev",
    "age": 23,
    "sex": "male",
    "region": "Yashnobod",
    "phone": "+998900012644",
    "enrolledAt": "2026-07-17T10:23:07.260860+05:00",
    "photoUrl": "/photos/cb0478c0-9214-4636-97fc-dd3eee2815d0.jpg",
    "job": "Not specified",
    "description": "Not specified",
    "insuranceNumber": null,
    "assessed": true,
    "measurements": {
      "bmi": 21.6
    },
    "domains": {
      "diabetes": {
        "domain": "diabetes",
        "method": "CANRISK",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Sizda so'nggi yetti kun ichida hech qanday yangi shikoyatlar yoki faollik ma'lumotlari qayd etilmadi, biroq o'tgan haftalardagi muhim vazifa — jismoniy faollik bo'yicha shifokor maslahati hali ham bajarilmaganicha qolmoqda.\n\nMuntazam jismoniy faollikning yetishmasligi va tavsiya etilgan tibbiy ko'riklarning o'z vaqtida bajarilmasligi kelgusida yurak-qon tomir tizimi faoliyatining pasayishi hamda umumiy jismoniy holatning yomonlashishiga olib kelishi mumkin.\n\nSiz o'tgan haftalardagi kabi jismoniy faollik bo'yicha [Terapevtga](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) murojaat qilish vazifasini bajarishingiz va kunlik harakatlanish darajangizni bosqichma-bosqich oshirib borishingiz kerak.",
          "ru": "На этой неделе вы не обращались в чат с новыми жалобами и не фиксировали показатели активности, что говорит о стабильном состоянии. Учитывая ваш возраст (23 года) и молодой организм, важно периодически контролировать общее самочувствие и поддерживать здоровый уровень физической активности.\n\nОтсутствие регулярного контроля за образом жизни и уровнем физической нагрузки со временем может привести к снижению общего тонуса организма, ухудшению обмена веществ и повышенной утомляемости. Даже при отсутствии жалоб профилактика играет ключевую роль в сохранении здоровья.\n\nСтарайтесь уделять хотя бы 30 минут в день умеренной физической активности и следите за режимом сна. При возникновении любых вопросов по здоровью или для планового профилактического осмотра рекомендуется обратиться к специалисту.",
          "en": "Since you had no chat activity and no recorded wearable data this week, your week was entirely quiet. At 23 years old with a healthy BMI of 21.6, it is a great time to focus on maintaining your baseline wellness and staying physically active.\n\nMaintaining a healthy weight and normal body mass index significantly lowers the long-term risk of developing cardiovascular and metabolic disorders. Neglecting regular physical activity, however, can gradually lead to reduced cardiorespiratory fitness and muscle tone over time.\n\nYou should aim for at least 150 minutes of moderate aerobic activity each week and keep your daily step count consistent. If you ever notice new or unusual physical symptoms, you should consult a [Terapevt](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) to get a professional evaluation."
        },
        "analysisSummary": {
          "uz": "Sizda so'nggi yetti kun ichida hech qanday yangi shikoyatlar yoki faollik ma'lumotlari qayd etilmadi, biroq o'tgan haftalardagi muhim vazifa — jismoniy faollik bo'yicha shifokor maslahati hali ham bajarilmaganicha qolmoqda.\n\nMuntazam jismoniy faollikning yetishmasligi va tavsiya etilgan tibbiy ko'riklarning o'z vaqtida bajarilmasligi kelgusida yurak-qon tomir tizimi faoliyatining pasayishi hamda umumiy jismoniy holatning yomonlashishiga olib kelishi mumkin.\n\nSiz o'tgan haftalardagi kabi jismoniy faollik bo'yicha [Terapevtga](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) murojaat qilish vazifasini bajarishingiz va kunlik harakatlanish darajangizni bosqichma-bosqich oshirib borishingiz kerak.",
          "ru": "На этой неделе вы не обращались в чат с новыми жалобами и не фиксировали показатели активности, что говорит о стабильном состоянии.",
          "en": "Since you had no chat activity and no recorded wearable data this week, your week was entirely quiet."
        },
        "updatedAt": "2026-08-21T12:23:54.764736+05:00",
        "factors": []
      },
      "cvd": {
        "domain": "cvd",
        "method": "SCORE2",
        "percent": 4,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Sizda so'nggi yetti kun ichida hech qanday yangi shikoyatlar yoki faollik ma'lumotlari qayd etilmadi, biroq o'tgan haftalardagi muhim vazifa — jismoniy faollik bo'yicha shifokor maslahati hali ham bajarilmaganicha qolmoqda.\n\nMuntazam jismoniy faollikning yetishmasligi va tavsiya etilgan tibbiy ko'riklarning o'z vaqtida bajarilmasligi kelgusida yurak-qon tomir tizimi faoliyatining pasayishi hamda umumiy jismoniy holatning yomonlashishiga olib kelishi mumkin.\n\nSiz o'tgan haftalardagi kabi jismoniy faollik bo'yicha [Terapevtga](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) murojaat qilish vazifasini bajarishingiz va kunlik harakatlanish darajangizni bosqichma-bosqich oshirib borishingiz kerak.",
          "ru": "На этой неделе вы не обращались в чат с новыми жалобами и не фиксировали показатели активности, что говорит о стабильном состоянии. Учитывая ваш возраст (23 года) и молодой организм, важно периодически контролировать общее самочувствие и поддерживать здоровый уровень физической активности.\n\nОтсутствие регулярного контроля за образом жизни и уровнем физической нагрузки со временем может привести к снижению общего тонуса организма, ухудшению обмена веществ и повышенной утомляемости. Даже при отсутствии жалоб профилактика играет ключевую роль в сохранении здоровья.\n\nСтарайтесь уделять хотя бы 30 минут в день умеренной физической активности и следите за режимом сна. При возникновении любых вопросов по здоровью или для планового профилактического осмотра рекомендуется обратиться к специалисту.",
          "en": "Since you had no chat activity and no recorded wearable data this week, your week was entirely quiet. At 23 years old with a healthy BMI of 21.6, it is a great time to focus on maintaining your baseline wellness and staying physically active.\n\nMaintaining a healthy weight and normal body mass index significantly lowers the long-term risk of developing cardiovascular and metabolic disorders. Neglecting regular physical activity, however, can gradually lead to reduced cardiorespiratory fitness and muscle tone over time.\n\nYou should aim for at least 150 minutes of moderate aerobic activity each week and keep your daily step count consistent. If you ever notice new or unusual physical symptoms, you should consult a [Terapevt](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) to get a professional evaluation."
        },
        "analysisSummary": {
          "uz": "Sizda so'nggi yetti kun ichida hech qanday yangi shikoyatlar yoki faollik ma'lumotlari qayd etilmadi, biroq o'tgan haftalardagi muhim vazifa — jismoniy faollik bo'yicha shifokor maslahati hali ham bajarilmaganicha qolmoqda.\n\nMuntazam jismoniy faollikning yetishmasligi va tavsiya etilgan tibbiy ko'riklarning o'z vaqtida bajarilmasligi kelgusida yurak-qon tomir tizimi faoliyatining pasayishi hamda umumiy jismoniy holatning yomonlashishiga olib kelishi mumkin.\n\nSiz o'tgan haftalardagi kabi jismoniy faollik bo'yicha [Terapevtga](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) murojaat qilish vazifasini bajarishingiz va kunlik harakatlanish darajangizni bosqichma-bosqich oshirib borishingiz kerak.",
          "ru": "На этой неделе вы не обращались в чат с новыми жалобами и не фиксировали показатели активности, что говорит о стабильном состоянии.",
          "en": "Since you had no chat activity and no recorded wearable data this week, your week was entirely quiet."
        },
        "updatedAt": "2026-08-21T12:23:54.764736+05:00",
        "factors": []
      },
      "oncology": {
        "domain": "oncology",
        "method": "SIGNAL_COUNT",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "sites": [
          {
            "id": "stomach",
            "label": {
              "uz": "Oshqozon saratoni xavf omillari",
              "ru": "Факторы риска рака желудка",
              "en": "Stomach cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          },
          {
            "id": "prostate",
            "label": {
              "uz": "Prostata saratoni xavf omillari",
              "ru": "Факторы риска рака простаты",
              "en": "Prostate cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          }
        ],
        "analysis": {
          "uz": "Sizda so'nggi yetti kun ichida hech qanday yangi shikoyatlar yoki faollik ma'lumotlari qayd etilmadi, biroq o'tgan haftalardagi muhim vazifa — jismoniy faollik bo'yicha shifokor maslahati hali ham bajarilmaganicha qolmoqda.\n\nMuntazam jismoniy faollikning yetishmasligi va tavsiya etilgan tibbiy ko'riklarning o'z vaqtida bajarilmasligi kelgusida yurak-qon tomir tizimi faoliyatining pasayishi hamda umumiy jismoniy holatning yomonlashishiga olib kelishi mumkin.\n\nSiz o'tgan haftalardagi kabi jismoniy faollik bo'yicha [Terapevtga](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) murojaat qilish vazifasini bajarishingiz va kunlik harakatlanish darajangizni bosqichma-bosqich oshirib borishingiz kerak.",
          "ru": "На этой неделе вы не обращались в чат с новыми жалобами и не фиксировали показатели активности, что говорит о стабильном состоянии. Учитывая ваш возраст (23 года) и молодой организм, важно периодически контролировать общее самочувствие и поддерживать здоровый уровень физической активности.\n\nОтсутствие регулярного контроля за образом жизни и уровнем физической нагрузки со временем может привести к снижению общего тонуса организма, ухудшению обмена веществ и повышенной утомляемости. Даже при отсутствии жалоб профилактика играет ключевую роль в сохранении здоровья.\n\nСтарайтесь уделять хотя бы 30 минут в день умеренной физической активности и следите за режимом сна. При возникновении любых вопросов по здоровью или для планового профилактического осмотра рекомендуется обратиться к специалисту.",
          "en": "Since you had no chat activity and no recorded wearable data this week, your week was entirely quiet. At 23 years old with a healthy BMI of 21.6, it is a great time to focus on maintaining your baseline wellness and staying physically active.\n\nMaintaining a healthy weight and normal body mass index significantly lowers the long-term risk of developing cardiovascular and metabolic disorders. Neglecting regular physical activity, however, can gradually lead to reduced cardiorespiratory fitness and muscle tone over time.\n\nYou should aim for at least 150 minutes of moderate aerobic activity each week and keep your daily step count consistent. If you ever notice new or unusual physical symptoms, you should consult a [Terapevt](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) to get a professional evaluation."
        },
        "analysisSummary": {
          "uz": "Sizda so'nggi yetti kun ichida hech qanday yangi shikoyatlar yoki faollik ma'lumotlari qayd etilmadi, biroq o'tgan haftalardagi muhim vazifa — jismoniy faollik bo'yicha shifokor maslahati hali ham bajarilmaganicha qolmoqda.\n\nMuntazam jismoniy faollikning yetishmasligi va tavsiya etilgan tibbiy ko'riklarning o'z vaqtida bajarilmasligi kelgusida yurak-qon tomir tizimi faoliyatining pasayishi hamda umumiy jismoniy holatning yomonlashishiga olib kelishi mumkin.\n\nSiz o'tgan haftalardagi kabi jismoniy faollik bo'yicha [Terapevtga](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) murojaat qilish vazifasini bajarishingiz va kunlik harakatlanish darajangizni bosqichma-bosqich oshirib borishingiz kerak.",
          "ru": "На этой неделе вы не обращались в чат с новыми жалобами и не фиксировали показатели активности, что говорит о стабильном состоянии.",
          "en": "Since you had no chat activity and no recorded wearable data this week, your week was entirely quiet."
        },
        "updatedAt": "2026-08-21T12:23:54.764736+05:00"
      }
    },
    "department": "production",
    "wellness": {
      "recovery": 80,
      "sleepScore": 79,
      "met": 5.2,
      "activityScore": 68,
      "stressScore": 30
    }
  },
  {
    "id": "0980cdbe-3b92-4000-a870-bff336ec916b",
    "firstName": "Abdugaffor",
    "lastName": "Odilov",
    "age": 26,
    "sex": "male",
    "region": "Yunusobod",
    "phone": "+998971614482",
    "enrolledAt": "2025-11-04T12:12:49.703137+05:00",
    "photoUrl": "/photos/0980cdbe-3b92-4000-a870-bff336ec916b.jpg",
    "job": "Not specified",
    "description": "Not specified",
    "insuranceNumber": null,
    "assessed": true,
    "measurements": {
      "bmi": 24.1
    },
    "domains": {
      "diabetes": {
        "domain": "diabetes",
        "method": "CANRISK",
        "percent": 8,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Bu hafta chatda hech qanday faollik bo'lmadi va sog'ligingiz bo'yicha yangi shikoyat bildirmadingiz. Biroq, profilingizdagi yuqori qand xavfi va avval aniqlangan kamqonlik holatiga e'tibor qaratishingiz muhim.\n\nDiabet xavfi va kamqonlik o'z vaqtida nazorat qilinmasa, vaqt o'tishi bilan umumiy ahvolning yomonlashishi, charchoq va turli asoratlarning kelib chiqishiga olib kelishi mumkin.\n\nSalomatligingizni nazorat qilish va aniq tavsiyalar olish uchun terapevtga murojaat qiling, shuningdek qon tahlillarini muddatida topshiring.",
          "ru": "Bu hafta sizda hech qanday yangi shikoyatlar yoki faollik o'zgarishlari kuzatilmadi, muloqot bo'lmadi. Shuning uchun profilaktika maqsadida sizda avval aniqlangan yuqori diabet xavfiga e'tibor qaratishimiz muhimdir.\n\nDiabet xavfi yuqori bo'lgan holatda turmush tarzi va ovqatlanish tartibi nazorat qilinmasa, vaqt o'tishi bilan qon shakarining buzilishi va metabolik asoratlarga olib kelishi mumkin.\n\nSog'lom vaznni saqlash va uglevodlarni cheklash uchun dietologga murojaat qiling, shuningdek muntazam ravishda qon shakarini tekshirib boring.",
          "en": "This week was quiet with no chat messages or new symptoms reported. However, keeping an eye on your high diabetes risk score from your profile remains important for your long-term health.\n\nUnmanaged blood sugar issues and insulin resistance over time can lead to chronic fatigue, nerve damage, and an increased risk of cardiovascular complications.\n\nYou should schedule a check-up with an Endokrinolog to review your metabolic health and discuss preventive strategies. Focus on incorporating balanced meals with fiber and maintaining regular daily physical activity."
        },
        "analysisSummary": {
          "uz": "Bu hafta chatda hech qanday faollik bo'lmadi va sog'ligingiz bo'yicha yangi shikoyat bildirmadingiz.",
          "ru": "Bu hafta sizda hech qanday yangi shikoyatlar yoki faollik o'zgarishlari kuzatilmadi, muloqot bo'lmadi.",
          "en": "This week was quiet with no chat messages or new symptoms reported."
        },
        "updatedAt": "2026-08-21T12:24:02.714861+05:00",
        "factors": []
      },
      "cvd": {
        "domain": "cvd",
        "method": "SCORE2",
        "percent": 6,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Bu hafta chatda hech qanday faollik bo'lmadi va sog'ligingiz bo'yicha yangi shikoyat bildirmadingiz. Biroq, profilingizdagi yuqori qand xavfi va avval aniqlangan kamqonlik holatiga e'tibor qaratishingiz muhim.\n\nDiabet xavfi va kamqonlik o'z vaqtida nazorat qilinmasa, vaqt o'tishi bilan umumiy ahvolning yomonlashishi, charchoq va turli asoratlarning kelib chiqishiga olib kelishi mumkin.\n\nSalomatligingizni nazorat qilish va aniq tavsiyalar olish uchun terapevtga murojaat qiling, shuningdek qon tahlillarini muddatida topshiring.",
          "ru": "Bu hafta sizda hech qanday yangi shikoyatlar yoki faollik o'zgarishlari kuzatilmadi, muloqot bo'lmadi. Shuning uchun profilaktika maqsadida sizda avval aniqlangan yuqori diabet xavfiga e'tibor qaratishimiz muhimdir.\n\nDiabet xavfi yuqori bo'lgan holatda turmush tarzi va ovqatlanish tartibi nazorat qilinmasa, vaqt o'tishi bilan qon shakarining buzilishi va metabolik asoratlarga olib kelishi mumkin.\n\nSog'lom vaznni saqlash va uglevodlarni cheklash uchun dietologga murojaat qiling, shuningdek muntazam ravishda qon shakarini tekshirib boring.",
          "en": "This week was quiet with no chat messages or new symptoms reported. However, keeping an eye on your high diabetes risk score from your profile remains important for your long-term health.\n\nUnmanaged blood sugar issues and insulin resistance over time can lead to chronic fatigue, nerve damage, and an increased risk of cardiovascular complications.\n\nYou should schedule a check-up with an Endokrinolog to review your metabolic health and discuss preventive strategies. Focus on incorporating balanced meals with fiber and maintaining regular daily physical activity."
        },
        "analysisSummary": {
          "uz": "Bu hafta chatda hech qanday faollik bo'lmadi va sog'ligingiz bo'yicha yangi shikoyat bildirmadingiz.",
          "ru": "Bu hafta sizda hech qanday yangi shikoyatlar yoki faollik o'zgarishlari kuzatilmadi, muloqot bo'lmadi.",
          "en": "This week was quiet with no chat messages or new symptoms reported."
        },
        "updatedAt": "2026-08-21T12:24:02.714861+05:00",
        "factors": []
      },
      "oncology": {
        "domain": "oncology",
        "method": "SIGNAL_COUNT",
        "percent": 8,
        "band": "low",
        "applicable": true,
        "sites": [
          {
            "id": "stomach",
            "label": {
              "uz": "Oshqozon saratoni xavf omillari",
              "ru": "Факторы риска рака желудка",
              "en": "Stomach cancer risk factors"
            },
            "percent": 8,
            "band": "low",
            "factors": []
          },
          {
            "id": "prostate",
            "label": {
              "uz": "Prostata saratoni xavf omillari",
              "ru": "Факторы риска рака простаты",
              "en": "Prostate cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          }
        ],
        "analysis": {
          "uz": "Bu hafta chatda hech qanday faollik bo'lmadi va sog'ligingiz bo'yicha yangi shikoyat bildirmadingiz. Biroq, profilingizdagi yuqori qand xavfi va avval aniqlangan kamqonlik holatiga e'tibor qaratishingiz muhim.\n\nDiabet xavfi va kamqonlik o'z vaqtida nazorat qilinmasa, vaqt o'tishi bilan umumiy ahvolning yomonlashishi, charchoq va turli asoratlarning kelib chiqishiga olib kelishi mumkin.\n\nSalomatligingizni nazorat qilish va aniq tavsiyalar olish uchun terapevtga murojaat qiling, shuningdek qon tahlillarini muddatida topshiring.",
          "ru": "Bu hafta sizda hech qanday yangi shikoyatlar yoki faollik o'zgarishlari kuzatilmadi, muloqot bo'lmadi. Shuning uchun profilaktika maqsadida sizda avval aniqlangan yuqori diabet xavfiga e'tibor qaratishimiz muhimdir.\n\nDiabet xavfi yuqori bo'lgan holatda turmush tarzi va ovqatlanish tartibi nazorat qilinmasa, vaqt o'tishi bilan qon shakarining buzilishi va metabolik asoratlarga olib kelishi mumkin.\n\nSog'lom vaznni saqlash va uglevodlarni cheklash uchun dietologga murojaat qiling, shuningdek muntazam ravishda qon shakarini tekshirib boring.",
          "en": "This week was quiet with no chat messages or new symptoms reported. However, keeping an eye on your high diabetes risk score from your profile remains important for your long-term health.\n\nUnmanaged blood sugar issues and insulin resistance over time can lead to chronic fatigue, nerve damage, and an increased risk of cardiovascular complications.\n\nYou should schedule a check-up with an Endokrinolog to review your metabolic health and discuss preventive strategies. Focus on incorporating balanced meals with fiber and maintaining regular daily physical activity."
        },
        "analysisSummary": {
          "uz": "Bu hafta chatda hech qanday faollik bo'lmadi va sog'ligingiz bo'yicha yangi shikoyat bildirmadingiz.",
          "ru": "Bu hafta sizda hech qanday yangi shikoyatlar yoki faollik o'zgarishlari kuzatilmadi, muloqot bo'lmadi.",
          "en": "This week was quiet with no chat messages or new symptoms reported."
        },
        "updatedAt": "2026-08-21T12:24:02.714861+05:00"
      }
    },
    "department": "warehouse",
    "wellness": {
      "recovery": 66,
      "sleepScore": 63,
      "met": 4.4,
      "activityScore": 58,
      "stressScore": 46
    }
  },
  {
    "id": "9566318c-f6ca-4fcf-83fa-438437fd902a",
    "firstName": "Абдулазиз",
    "lastName": "Абдухалил-зода",
    "age": 23,
    "sex": "male",
    "region": "Mirzo Ulug‘bek",
    "phone": "+998990008139",
    "enrolledAt": "2026-07-23T10:14:19.963376+05:00",
    "photoUrl": "/photos/9566318c-f6ca-4fcf-83fa-438437fd902a.jpg",
    "job": "Not specified",
    "description": "Not specified",
    "insuranceNumber": null,
    "assessed": true,
    "measurements": {
      "bmi": 20.7
    },
    "domains": {
      "diabetes": {
        "domain": "diabetes",
        "method": "CANRISK",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Siz bu hafta stomatologga murojaat qilib, tish olib tashlangandan keyin yuzaga kelgan shish haqida so'radingiz va buning sabablari hamda parvarish qilish bo'yicha ma'lumot oldingiz. Shuningdek, o'tgan haftalardagi tizza og'rig'i va pastki bel og'rig'i bo'yicha tavsiya etilgan mutaxassislarga hali bormadingiz.\n\nTish olib tashlangandan keyingi shish va yallig'lanish jarayonlari o'z vaqtida nazorat qilinmasa, ikkilamchi infeksiya yoki kuchli og'riq kabi asoratlarga olib kelishi mumkin. Shuningdek, oldingi jismoniy shikastlanishlar va tizza bo'g'imidagi muammolar davolanmasa, harakat funksiyasining uzoq muddatli cheklanishiga sabab bo'lishi mumkin.\n\nSiz stomatologga murojaat qilishingiz kerak, chunki shish jarayonini mutaxassis nazorat qilishi zarur. Og'rigan joylarga sovuq kompresslar qo'llashni davom eting, yumshoq ovqatlar iste'mol qiling va og'zingizni iliq tuzli suv bilan ehtiyotkorlik bilan chaying.",
          "ru": "На этой неделе вы обратились к нам с вопросом об удалении зуба мудрости и столкнулись с отеком в области вмешательства. Вы отмечали, что вас беспокоит один зуб с сопутствующим отеком.\n\nОтек после удаления зуба мудрости является частым следствием хирургической травмы тканей, однако при отсутствии должного контроля он может привести к усилению воспалительного процесса, нагноению или распространению инфекции в окружающие ткани.\n\nДля контроля заживления и исключения осложнений вам следует записаться к стоматологу. Прикладывайте холодные компрессы, держите голову приподнятой и аккуратно полоскайте рот теплой соленой водой.",
          "en": "This week you asked about wisdom tooth removal and reported having swelling after extracting one of your wisdom teeth.\n\nSwelling after a tooth extraction is a normal part of the healing process, but if left unmonitored or unmanaged, it can sometimes indicate an infection or prolonged inflammation that requires professional dental intervention.\n\nYou should apply cold compresses, keep your head elevated, and consult a Stomatolog to properly evaluate your recovery and the cause of the swelling."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta stomatologga murojaat qilib, tish olib tashlangandan keyin yuzaga kelgan shish haqida so'radingiz va buning sabablari hamda parvarish qilish bo'yicha ma'lumot oldingiz.",
          "ru": "На этой неделе вы обратились к нам с вопросом об удалении зуба мудрости и столкнулись с отеком в области вмешательства.",
          "en": "This week you asked about wisdom tooth removal and reported having swelling after extracting one of your wisdom teeth.\n\nSwelling after a tooth extraction is a normal part of the healing process, but if left unmonitored or unmanaged, it can sometimes indicate an infection or prolonged inflammation that requires professional dental intervention.\n\nYou should apply cold compresses, keep your head elevated, and consult a Stomatolog to properly evaluate your recovery and the cause of the swelling."
        },
        "updatedAt": "2026-08-21T12:24:15.391957+05:00",
        "factors": []
      },
      "cvd": {
        "domain": "cvd",
        "method": "SCORE2",
        "percent": 4,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Siz bu hafta stomatologga murojaat qilib, tish olib tashlangandan keyin yuzaga kelgan shish haqida so'radingiz va buning sabablari hamda parvarish qilish bo'yicha ma'lumot oldingiz. Shuningdek, o'tgan haftalardagi tizza og'rig'i va pastki bel og'rig'i bo'yicha tavsiya etilgan mutaxassislarga hali bormadingiz.\n\nTish olib tashlangandan keyingi shish va yallig'lanish jarayonlari o'z vaqtida nazorat qilinmasa, ikkilamchi infeksiya yoki kuchli og'riq kabi asoratlarga olib kelishi mumkin. Shuningdek, oldingi jismoniy shikastlanishlar va tizza bo'g'imidagi muammolar davolanmasa, harakat funksiyasining uzoq muddatli cheklanishiga sabab bo'lishi mumkin.\n\nSiz stomatologga murojaat qilishingiz kerak, chunki shish jarayonini mutaxassis nazorat qilishi zarur. Og'rigan joylarga sovuq kompresslar qo'llashni davom eting, yumshoq ovqatlar iste'mol qiling va og'zingizni iliq tuzli suv bilan ehtiyotkorlik bilan chaying.",
          "ru": "На этой неделе вы обратились к нам с вопросом об удалении зуба мудрости и столкнулись с отеком в области вмешательства. Вы отмечали, что вас беспокоит один зуб с сопутствующим отеком.\n\nОтек после удаления зуба мудрости является частым следствием хирургической травмы тканей, однако при отсутствии должного контроля он может привести к усилению воспалительного процесса, нагноению или распространению инфекции в окружающие ткани.\n\nДля контроля заживления и исключения осложнений вам следует записаться к стоматологу. Прикладывайте холодные компрессы, держите голову приподнятой и аккуратно полоскайте рот теплой соленой водой.",
          "en": "This week you asked about wisdom tooth removal and reported having swelling after extracting one of your wisdom teeth.\n\nSwelling after a tooth extraction is a normal part of the healing process, but if left unmonitored or unmanaged, it can sometimes indicate an infection or prolonged inflammation that requires professional dental intervention.\n\nYou should apply cold compresses, keep your head elevated, and consult a Stomatolog to properly evaluate your recovery and the cause of the swelling."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta stomatologga murojaat qilib, tish olib tashlangandan keyin yuzaga kelgan shish haqida so'radingiz va buning sabablari hamda parvarish qilish bo'yicha ma'lumot oldingiz.",
          "ru": "На этой неделе вы обратились к нам с вопросом об удалении зуба мудрости и столкнулись с отеком в области вмешательства.",
          "en": "This week you asked about wisdom tooth removal and reported having swelling after extracting one of your wisdom teeth.\n\nSwelling after a tooth extraction is a normal part of the healing process, but if left unmonitored or unmanaged, it can sometimes indicate an infection or prolonged inflammation that requires professional dental intervention.\n\nYou should apply cold compresses, keep your head elevated, and consult a Stomatolog to properly evaluate your recovery and the cause of the swelling."
        },
        "updatedAt": "2026-08-21T12:24:15.391957+05:00",
        "factors": []
      },
      "oncology": {
        "domain": "oncology",
        "method": "SIGNAL_COUNT",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "sites": [
          {
            "id": "stomach",
            "label": {
              "uz": "Oshqozon saratoni xavf omillari",
              "ru": "Факторы риска рака желудка",
              "en": "Stomach cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          },
          {
            "id": "prostate",
            "label": {
              "uz": "Prostata saratoni xavf omillari",
              "ru": "Факторы риска рака простаты",
              "en": "Prostate cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          }
        ],
        "analysis": {
          "uz": "Siz bu hafta stomatologga murojaat qilib, tish olib tashlangandan keyin yuzaga kelgan shish haqida so'radingiz va buning sabablari hamda parvarish qilish bo'yicha ma'lumot oldingiz. Shuningdek, o'tgan haftalardagi tizza og'rig'i va pastki bel og'rig'i bo'yicha tavsiya etilgan mutaxassislarga hali bormadingiz.\n\nTish olib tashlangandan keyingi shish va yallig'lanish jarayonlari o'z vaqtida nazorat qilinmasa, ikkilamchi infeksiya yoki kuchli og'riq kabi asoratlarga olib kelishi mumkin. Shuningdek, oldingi jismoniy shikastlanishlar va tizza bo'g'imidagi muammolar davolanmasa, harakat funksiyasining uzoq muddatli cheklanishiga sabab bo'lishi mumkin.\n\nSiz stomatologga murojaat qilishingiz kerak, chunki shish jarayonini mutaxassis nazorat qilishi zarur. Og'rigan joylarga sovuq kompresslar qo'llashni davom eting, yumshoq ovqatlar iste'mol qiling va og'zingizni iliq tuzli suv bilan ehtiyotkorlik bilan chaying.",
          "ru": "На этой неделе вы обратились к нам с вопросом об удалении зуба мудрости и столкнулись с отеком в области вмешательства. Вы отмечали, что вас беспокоит один зуб с сопутствующим отеком.\n\nОтек после удаления зуба мудрости является частым следствием хирургической травмы тканей, однако при отсутствии должного контроля он может привести к усилению воспалительного процесса, нагноению или распространению инфекции в окружающие ткани.\n\nДля контроля заживления и исключения осложнений вам следует записаться к стоматологу. Прикладывайте холодные компрессы, держите голову приподнятой и аккуратно полоскайте рот теплой соленой водой.",
          "en": "This week you asked about wisdom tooth removal and reported having swelling after extracting one of your wisdom teeth.\n\nSwelling after a tooth extraction is a normal part of the healing process, but if left unmonitored or unmanaged, it can sometimes indicate an infection or prolonged inflammation that requires professional dental intervention.\n\nYou should apply cold compresses, keep your head elevated, and consult a Stomatolog to properly evaluate your recovery and the cause of the swelling."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta stomatologga murojaat qilib, tish olib tashlangandan keyin yuzaga kelgan shish haqida so'radingiz va buning sabablari hamda parvarish qilish bo'yicha ma'lumot oldingiz.",
          "ru": "На этой неделе вы обратились к нам с вопросом об удалении зуба мудрости и столкнулись с отеком в области вмешательства.",
          "en": "This week you asked about wisdom tooth removal and reported having swelling after extracting one of your wisdom teeth.\n\nSwelling after a tooth extraction is a normal part of the healing process, but if left unmonitored or unmanaged, it can sometimes indicate an infection or prolonged inflammation that requires professional dental intervention.\n\nYou should apply cold compresses, keep your head elevated, and consult a Stomatolog to properly evaluate your recovery and the cause of the swelling."
        },
        "updatedAt": "2026-08-21T12:24:15.391957+05:00"
      }
    },
    "department": "production",
    "wellness": {
      "recovery": 83,
      "sleepScore": 85,
      "met": 5.6,
      "activityScore": 71,
      "stressScore": 25
    }
  },
  {
    "id": "6a07cb46-eb84-44b1-8af9-250012049c0d",
    "firstName": "Nodirbek",
    "lastName": "Abdushokirov",
    "age": 15,
    "sex": "male",
    "region": "Mirzo Ulug‘bek",
    "phone": "+998977642618",
    "enrolledAt": "2026-07-23T10:33:01.770588+05:00",
    "photoUrl": "/photos/6a07cb46-eb84-44b1-8af9-250012049c0d.jpg",
    "job": "Not specified",
    "description": "Not specified",
    "insuranceNumber": null,
    "assessed": true,
    "measurements": {
      "bmi": 16.9
    },
    "domains": {
      "diabetes": {
        "domain": "diabetes",
        "method": "CANRISK",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Sizda so'nggi hafta davomida hech qanday chat faolligi yoki faollik o'zgarishlari qayd etilmadi, haftangiz xotirjam o'tdi. Shunga qaramay, sizning tana vazn indeksingiz 16.9 ni tashkil etib, yetishmovchilik holatini ko'rsatmoqda, shuning uchun ovqatlanish ratsioningizga e'tibor qaratishingiz muhim.\n\nTana vaznining pastligi va vazn yetishmovchiligi organizmda quvvat yetishmasligiga, immunitetning pasayishiga hamda umumiy jismoniy zaiflikka olib kelishi mumkin.\n\nSiz kunlik kaloriya miqdorini oshirib, oqsil va uglevodlarga boy oziq-ovqatlarni ko'proq iste'mol qilishingiz kerak. Ovqatlanish rejimini yaxshilash va vazn muammolari bo'yicha maslahat olish uchun [Dietologga](sinoai://open?path=doctors&speciality_id=129&speciality_name=Dietolog) murojaat qiling.",
          "ru": "На этой неделе вы не обращались к нам в чат и у нас нет данных о вашей физической активности или показателях здоровья с фитнес-трекера. Учитывая ваш подростковый возраст и низкий индекс массы тела, стоит обратить внимание на полноценное питание и набор здорового веса.\n\nНедостаточная масса тела и дефицит массы могут приводить к хронической усталости, снижению иммунитета и замедлению физического развития у подростков.\n\nСтарайтесь регулярно полноценно питаться, следите за достаточным количеством калорий и обратитесь к [терапевту](sinoai://open?path=doctors&speciality_id=17&speciality_name=%D0%A2%D0%B5%D1%80%D0%B0%D0%BF%D0%B5%D0%B2%D1%82) для оценки общего состояния здоровья и составления плана питания.",
          "en": "Since you had no chat activity and no wearable data recorded this week, your week was entirely quiet, but we should keep an eye on your very low body mass index of 16.9 kg/m².\n\nBeing underweight with a low BMI can lead to nutritional deficiencies, decreased immune function, fatigue, and potential developmental concerns during adolescence.\n\nYou should focus on eating nutrient-dense, calorie-rich meals throughout the day and consult a [Terapevt](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) to evaluate your weight and ensure healthy development."
        },
        "analysisSummary": {
          "uz": "Sizda so'nggi hafta davomida hech qanday chat faolligi yoki faollik o'zgarishlari qayd etilmadi, haftangiz xotirjam o'tdi.",
          "ru": "На этой неделе вы не обращались к нам в чат и у нас нет данных о вашей физической активности или показателях здоровья с фитнес-трекера.",
          "en": "Since you had no chat activity and no wearable data recorded this week, your week was entirely quiet, but we should keep an eye on your very low body mass index of 16.9 kg/m².\n\nBeing underweight with a low BMI can lead to nutritional deficiencies, decreased immune function, fatigue, and potential developmental concerns during adolescence.\n\nYou should focus on eating nutrient-dense, calorie-rich meals throughout the day and consult a [Terapevt](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) to evaluate your weight and ensure healthy development."
        },
        "updatedAt": "2026-08-21T12:24:23.449379+05:00",
        "factors": []
      },
      "cvd": {
        "domain": "cvd",
        "method": "SCORE2",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Sizda so'nggi hafta davomida hech qanday chat faolligi yoki faollik o'zgarishlari qayd etilmadi, haftangiz xotirjam o'tdi. Shunga qaramay, sizning tana vazn indeksingiz 16.9 ni tashkil etib, yetishmovchilik holatini ko'rsatmoqda, shuning uchun ovqatlanish ratsioningizga e'tibor qaratishingiz muhim.\n\nTana vaznining pastligi va vazn yetishmovchiligi organizmda quvvat yetishmasligiga, immunitetning pasayishiga hamda umumiy jismoniy zaiflikka olib kelishi mumkin.\n\nSiz kunlik kaloriya miqdorini oshirib, oqsil va uglevodlarga boy oziq-ovqatlarni ko'proq iste'mol qilishingiz kerak. Ovqatlanish rejimini yaxshilash va vazn muammolari bo'yicha maslahat olish uchun [Dietologga](sinoai://open?path=doctors&speciality_id=129&speciality_name=Dietolog) murojaat qiling.",
          "ru": "На этой неделе вы не обращались к нам в чат и у нас нет данных о вашей физической активности или показателях здоровья с фитнес-трекера. Учитывая ваш подростковый возраст и низкий индекс массы тела, стоит обратить внимание на полноценное питание и набор здорового веса.\n\nНедостаточная масса тела и дефицит массы могут приводить к хронической усталости, снижению иммунитета и замедлению физического развития у подростков.\n\nСтарайтесь регулярно полноценно питаться, следите за достаточным количеством калорий и обратитесь к [терапевту](sinoai://open?path=doctors&speciality_id=17&speciality_name=%D0%A2%D0%B5%D1%80%D0%B0%D0%BF%D0%B5%D0%B2%D1%82) для оценки общего состояния здоровья и составления плана питания.",
          "en": "Since you had no chat activity and no wearable data recorded this week, your week was entirely quiet, but we should keep an eye on your very low body mass index of 16.9 kg/m².\n\nBeing underweight with a low BMI can lead to nutritional deficiencies, decreased immune function, fatigue, and potential developmental concerns during adolescence.\n\nYou should focus on eating nutrient-dense, calorie-rich meals throughout the day and consult a [Terapevt](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) to evaluate your weight and ensure healthy development."
        },
        "analysisSummary": {
          "uz": "Sizda so'nggi hafta davomida hech qanday chat faolligi yoki faollik o'zgarishlari qayd etilmadi, haftangiz xotirjam o'tdi.",
          "ru": "На этой неделе вы не обращались к нам в чат и у нас нет данных о вашей физической активности или показателях здоровья с фитнес-трекера.",
          "en": "Since you had no chat activity and no wearable data recorded this week, your week was entirely quiet, but we should keep an eye on your very low body mass index of 16.9 kg/m².\n\nBeing underweight with a low BMI can lead to nutritional deficiencies, decreased immune function, fatigue, and potential developmental concerns during adolescence.\n\nYou should focus on eating nutrient-dense, calorie-rich meals throughout the day and consult a [Terapevt](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) to evaluate your weight and ensure healthy development."
        },
        "updatedAt": "2026-08-21T12:24:23.449379+05:00",
        "factors": []
      },
      "oncology": {
        "domain": "oncology",
        "method": "SIGNAL_COUNT",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "sites": [
          {
            "id": "stomach",
            "label": {
              "uz": "Oshqozon saratoni xavf omillari",
              "ru": "Факторы риска рака желудка",
              "en": "Stomach cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          },
          {
            "id": "prostate",
            "label": {
              "uz": "Prostata saratoni xavf omillari",
              "ru": "Факторы риска рака простаты",
              "en": "Prostate cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          }
        ],
        "analysis": {
          "uz": "Sizda so'nggi hafta davomida hech qanday chat faolligi yoki faollik o'zgarishlari qayd etilmadi, haftangiz xotirjam o'tdi. Shunga qaramay, sizning tana vazn indeksingiz 16.9 ni tashkil etib, yetishmovchilik holatini ko'rsatmoqda, shuning uchun ovqatlanish ratsioningizga e'tibor qaratishingiz muhim.\n\nTana vaznining pastligi va vazn yetishmovchiligi organizmda quvvat yetishmasligiga, immunitetning pasayishiga hamda umumiy jismoniy zaiflikka olib kelishi mumkin.\n\nSiz kunlik kaloriya miqdorini oshirib, oqsil va uglevodlarga boy oziq-ovqatlarni ko'proq iste'mol qilishingiz kerak. Ovqatlanish rejimini yaxshilash va vazn muammolari bo'yicha maslahat olish uchun [Dietologga](sinoai://open?path=doctors&speciality_id=129&speciality_name=Dietolog) murojaat qiling.",
          "ru": "На этой неделе вы не обращались к нам в чат и у нас нет данных о вашей физической активности или показателях здоровья с фитнес-трекера. Учитывая ваш подростковый возраст и низкий индекс массы тела, стоит обратить внимание на полноценное питание и набор здорового веса.\n\nНедостаточная масса тела и дефицит массы могут приводить к хронической усталости, снижению иммунитета и замедлению физического развития у подростков.\n\nСтарайтесь регулярно полноценно питаться, следите за достаточным количеством калорий и обратитесь к [терапевту](sinoai://open?path=doctors&speciality_id=17&speciality_name=%D0%A2%D0%B5%D1%80%D0%B0%D0%BF%D0%B5%D0%B2%D1%82) для оценки общего состояния здоровья и составления плана питания.",
          "en": "Since you had no chat activity and no wearable data recorded this week, your week was entirely quiet, but we should keep an eye on your very low body mass index of 16.9 kg/m².\n\nBeing underweight with a low BMI can lead to nutritional deficiencies, decreased immune function, fatigue, and potential developmental concerns during adolescence.\n\nYou should focus on eating nutrient-dense, calorie-rich meals throughout the day and consult a [Terapevt](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) to evaluate your weight and ensure healthy development."
        },
        "analysisSummary": {
          "uz": "Sizda so'nggi hafta davomida hech qanday chat faolligi yoki faollik o'zgarishlari qayd etilmadi, haftangiz xotirjam o'tdi.",
          "ru": "На этой неделе вы не обращались к нам в чат и у нас нет данных о вашей физической активности или показателях здоровья с фитнес-трекера.",
          "en": "Since you had no chat activity and no wearable data recorded this week, your week was entirely quiet, but we should keep an eye on your very low body mass index of 16.9 kg/m².\n\nBeing underweight with a low BMI can lead to nutritional deficiencies, decreased immune function, fatigue, and potential developmental concerns during adolescence.\n\nYou should focus on eating nutrient-dense, calorie-rich meals throughout the day and consult a [Terapevt](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) to evaluate your weight and ensure healthy development."
        },
        "updatedAt": "2026-08-21T12:24:23.449379+05:00"
      }
    },
    "department": "logistics",
    "wellness": {
      "recovery": 88,
      "sleepScore": 90,
      "met": 6.2,
      "activityScore": 77,
      "stressScore": 20
    }
  },
  {
    "id": "daedfe05-f9d7-4ab6-8d92-c4b9d3b85539",
    "firstName": "Samadjon",
    "lastName": "Sayfullayev",
    "age": 19,
    "sex": "male",
    "region": "Chilonzor",
    "phone": "+998992703106",
    "enrolledAt": "2026-06-08T14:24:40.116795+05:00",
    "photoUrl": "/photos/daedfe05-f9d7-4ab6-8d92-c4b9d3b85539.jpg",
    "job": "Not specified",
    "description": "Not specified",
    "insuranceNumber": null,
    "sinoaiUserId": "sinoai-19f7c2b4",
    "assessed": true,
    "measurements": {
      "bmi": 19.2
    },
    "domains": {
      "diabetes": {
        "domain": "diabetes",
        "method": "CANRISK",
        "percent": 37,
        "band": "high",
        "applicable": true,
        "analysis": {
          "uz": "Siz bu hafta chatda hech qanday yangi shikoyatlar yozmadingiz va haftangiz tinch o'tdi. Shunga qaramay, sizda mavjud bo'lgan 2-tur qandli diabet va gipertoniya kabi holatlarni nazorat qilish muhimligicha qolmoqda.\n\nQandli diabet va gipertoniya kabi surunkali kasalliklar o'z vaqtida davolanmasa va qon shakar hamda qon bosimi doimiy nazorat qilinmasa, yurak-qon tomir tizimi va buyraklar faoliyatining jiddiy zararlanishiga olib kelishi mumkin.\n\nSiz endokrinologga murojaat qiling, shuningdek, metformin dori vositasini shifokor ko'rsatmasiga ko'ra o'z vaqtida ichishni va qon shakaringizni muntazam o'lchab borishni unutmang.",
          "ru": "Bu hafta sizdan hech qanday yangi xabarlar yoki shikoyatlar kelib tushmadi. O'tgan haftalardagi tashxislar va jarrohlik amaliyotlaridan so'ng, asosiy e'tiborni surunkali kasalliklaringizdan biri bo'lgan gipertoniyaga qaratishimiz muhim.\n\nGipertoniya o'z vaqtida nazorat qilinmasa, yurak-qon tomir tizimiga ortiqcha yuklama berib, insult yoki yurak xuruji kabi jiddiy asoratlarni keltirib chiqarishi mumkin.",
          "en": "This week has been quiet with no new chat messages or wearable activity updates recorded, but it is important to keep a close eye on your type 2 diabetes management while taking metformin.\n\nUnmanaged blood glucose levels in type 2 diabetes can lead to microvascular and macrovascular complications, including nerve damage, kidney strain, and cardiovascular issues over time.\n\nYou should continue monitoring your blood glucose regularly, maintain your prescribed medication routine with metformin, and consult an endokrinolog to review your metabolic control."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta chatda hech qanday yangi shikoyatlar yozmadingiz va haftangiz tinch o'tdi.",
          "ru": "Bu hafta sizdan hech qanday yangi xabarlar yoki shikoyatlar kelib tushmadi.",
          "en": "This week has been quiet with no new chat messages or wearable activity updates recorded, but it is important to keep a close eye on your type 2 diabetes management while taking metformin.\n\nUnmanaged blood glucose levels in type 2 diabetes can lead to microvascular and macrovascular complications, including nerve damage, kidney strain, and cardiovascular issues over time.\n\nYou should continue monitoring your blood glucose regularly, maintain your prescribed medication routine with metformin, and consult an endokrinolog to review your metabolic control."
        },
        "updatedAt": "2026-08-20T16:18:06.768068+05:00",
        "factors": []
      },
      "cvd": {
        "domain": "cvd",
        "method": "SCORE2",
        "percent": 22,
        "band": "moderate",
        "applicable": true,
        "analysis": {
          "uz": "Siz bu hafta chatda hech qanday yangi shikoyatlar yozmadingiz va haftangiz tinch o'tdi. Shunga qaramay, sizda mavjud bo'lgan 2-tur qandli diabet va gipertoniya kabi holatlarni nazorat qilish muhimligicha qolmoqda.\n\nQandli diabet va gipertoniya kabi surunkali kasalliklar o'z vaqtida davolanmasa va qon shakar hamda qon bosimi doimiy nazorat qilinmasa, yurak-qon tomir tizimi va buyraklar faoliyatining jiddiy zararlanishiga olib kelishi mumkin.\n\nSiz endokrinologga murojaat qiling, shuningdek, metformin dori vositasini shifokor ko'rsatmasiga ko'ra o'z vaqtida ichishni va qon shakaringizni muntazam o'lchab borishni unutmang.",
          "ru": "Bu hafta sizdan hech qanday yangi xabarlar yoki shikoyatlar kelib tushmadi. O'tgan haftalardagi tashxislar va jarrohlik amaliyotlaridan so'ng, asosiy e'tiborni surunkali kasalliklaringizdan biri bo'lgan gipertoniyaga qaratishimiz muhim.\n\nGipertoniya o'z vaqtida nazorat qilinmasa, yurak-qon tomir tizimiga ortiqcha yuklama berib, insult yoki yurak xuruji kabi jiddiy asoratlarni keltirib chiqarishi mumkin.",
          "en": "This week has been quiet with no new chat messages or wearable activity updates recorded, but it is important to keep a close eye on your type 2 diabetes management while taking metformin.\n\nUnmanaged blood glucose levels in type 2 diabetes can lead to microvascular and macrovascular complications, including nerve damage, kidney strain, and cardiovascular issues over time.\n\nYou should continue monitoring your blood glucose regularly, maintain your prescribed medication routine with metformin, and consult an endokrinolog to review your metabolic control."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta chatda hech qanday yangi shikoyatlar yozmadingiz va haftangiz tinch o'tdi.",
          "ru": "Bu hafta sizdan hech qanday yangi xabarlar yoki shikoyatlar kelib tushmadi.",
          "en": "This week has been quiet with no new chat messages or wearable activity updates recorded, but it is important to keep a close eye on your type 2 diabetes management while taking metformin.\n\nUnmanaged blood glucose levels in type 2 diabetes can lead to microvascular and macrovascular complications, including nerve damage, kidney strain, and cardiovascular issues over time.\n\nYou should continue monitoring your blood glucose regularly, maintain your prescribed medication routine with metformin, and consult an endokrinolog to review your metabolic control."
        },
        "updatedAt": "2026-08-20T16:18:06.768068+05:00",
        "factors": []
      },
      "oncology": {
        "domain": "oncology",
        "method": "SIGNAL_COUNT",
        "percent": 4,
        "band": "low",
        "applicable": true,
        "sites": [
          {
            "id": "stomach",
            "label": {
              "uz": "Oshqozon saratoni xavf omillari",
              "ru": "Факторы риска рака желудка",
              "en": "Stomach cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          },
          {
            "id": "prostate",
            "label": {
              "uz": "Prostata saratoni xavf omillari",
              "ru": "Факторы риска рака простаты",
              "en": "Prostate cancer risk factors"
            },
            "percent": 4,
            "band": "low",
            "factors": []
          }
        ],
        "analysis": {
          "uz": "Siz bu hafta chatda hech qanday yangi shikoyatlar yozmadingiz va haftangiz tinch o'tdi. Shunga qaramay, sizda mavjud bo'lgan 2-tur qandli diabet va gipertoniya kabi holatlarni nazorat qilish muhimligicha qolmoqda.\n\nQandli diabet va gipertoniya kabi surunkali kasalliklar o'z vaqtida davolanmasa va qon shakar hamda qon bosimi doimiy nazorat qilinmasa, yurak-qon tomir tizimi va buyraklar faoliyatining jiddiy zararlanishiga olib kelishi mumkin.\n\nSiz endokrinologga murojaat qiling, shuningdek, metformin dori vositasini shifokor ko'rsatmasiga ko'ra o'z vaqtida ichishni va qon shakaringizni muntazam o'lchab borishni unutmang.",
          "ru": "Bu hafta sizdan hech qanday yangi xabarlar yoki shikoyatlar kelib tushmadi. O'tgan haftalardagi tashxislar va jarrohlik amaliyotlaridan so'ng, asosiy e'tiborni surunkali kasalliklaringizdan biri bo'lgan gipertoniyaga qaratishimiz muhim.\n\nGipertoniya o'z vaqtida nazorat qilinmasa, yurak-qon tomir tizimiga ortiqcha yuklama berib, insult yoki yurak xuruji kabi jiddiy asoratlarni keltirib chiqarishi mumkin.",
          "en": "This week has been quiet with no new chat messages or wearable activity updates recorded, but it is important to keep a close eye on your type 2 diabetes management while taking metformin.\n\nUnmanaged blood glucose levels in type 2 diabetes can lead to microvascular and macrovascular complications, including nerve damage, kidney strain, and cardiovascular issues over time.\n\nYou should continue monitoring your blood glucose regularly, maintain your prescribed medication routine with metformin, and consult an endokrinolog to review your metabolic control."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta chatda hech qanday yangi shikoyatlar yozmadingiz va haftangiz tinch o'tdi.",
          "ru": "Bu hafta sizdan hech qanday yangi xabarlar yoki shikoyatlar kelib tushmadi.",
          "en": "This week has been quiet with no new chat messages or wearable activity updates recorded, but it is important to keep a close eye on your type 2 diabetes management while taking metformin.\n\nUnmanaged blood glucose levels in type 2 diabetes can lead to microvascular and macrovascular complications, including nerve damage, kidney strain, and cardiovascular issues over time.\n\nYou should continue monitoring your blood glucose regularly, maintain your prescribed medication routine with metformin, and consult an endokrinolog to review your metabolic control."
        },
        "updatedAt": "2026-08-20T16:18:06.768068+05:00"
      }
    },
    "department": "production",
    "wellness": {
      "recovery": 39,
      "sleepScore": 46,
      "met": 3.1,
      "activityScore": 33,
      "stressScore": 71
    }
  },
  {
    "id": "6a0684d8-4cf1-427b-adec-e9c6cfbbf82e",
    "firstName": "Boburmirzo",
    "lastName": "Khudoyberdiev",
    "age": 24,
    "sex": "male",
    "region": "Sirg‘ali",
    "phone": "+998950503555",
    "enrolledAt": "2026-07-04T17:19:56.296683+05:00",
    "photoUrl": "/photos/6a0684d8-4cf1-427b-adec-e9c6cfbbf82e.jpg",
    "job": "Not specified",
    "description": "Not specified",
    "insuranceNumber": null,
    "assessed": true,
    "measurements": {
      "bmi": 35.3
    },
    "domains": {
      "diabetes": {
        "domain": "diabetes",
        "method": "CANRISK",
        "percent": 14,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Bu hafta suhbatda yangi shikoyat bildirmadingiz va o'zingizni xotirjam tutdingiz. Shunga qaramay, oldingi haftalardagi bel og'rig'i va 35.3 ga teng bo'lgan yuqori tana vazni indeksi e'tiborni talab qiladi.\n\nOrtiqcha tana vazni bel va bo'g'imlarga ortiqcha yuklama berib, ularning erta eskirishiga hamda surunkali og'riqlarning kuchayishiga olib kelishi mumkin.\n\nVazningizni nazorat qilish uchun sog'lom ovqatlanish tartibiga amal qiling va [terapevtga](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) murojaat qiling.",
          "ru": "На этой неделе вы не обращались к нам с новыми жалобами и не вели чат с ассистентом. При этом у вас сохраняется избыточный вес с индексом массы тела 35.3, который создает дополнительную нагрузку на опорно-двигательный аппарат.\n\nИзбыточная масса тела увеличивает нагрузку на суставы и позвоночник, что может способствовать развитию хронических болей в спине и ускоренному износу суставных хрящей. Отсутствие контроля веса повышает риск метаболических нарушений и заболеваний сердечно-сосудистой системы.\n\nВам стоит проконсультироваться с врачом-[терапевтом](sinoai://open?path=doctors&speciality_id=17&speciality_name=%D0%A2%D0%B5%D1%80%D0%B0%D0%BF%D0%B5%D0%B2%D1%82) для оценки общего состояния здоровья и составления безопасного плана снижения веса. Постарайтесь постепенно увеличивать уровень повседневной физической активности и пересмотреть свой рацион в пользу менее калорийных продуктов.",
          "en": "This week was quiet with no new chat messages or wearable activity data recorded, but your ongoing lower back pain from earlier this month remains an issue that needs attention.\n\nUnresolved lower back pain and mechanical soft tissue strain can lead to chronic spinal discomfort, restricted mobility, and altered posture if the underlying joint or muscular issues are not properly evaluated and managed.\n\nYou should consult an [Ortoped](sinoai://open?path=doctors&speciality_id=10&speciality_name=Ortoped) to get a proper evaluation of your lower back pain and ensure you haven't completed any of your recommended follow-up tasks from last week."
        },
        "analysisSummary": {
          "uz": "Bu hafta suhbatda yangi shikoyat bildirmadingiz va o'zingizni xotirjam tutdingiz.",
          "ru": "На этой неделе вы не обращались к нам с новыми жалобами и не вели чат с ассистентом.",
          "en": "This week was quiet with no new chat messages or wearable activity data recorded, but your ongoing lower back pain from earlier this month remains an issue that needs attention.\n\nUnresolved lower back pain and mechanical soft tissue strain can lead to chronic spinal discomfort, restricted mobility, and altered posture if the underlying joint or muscular issues are not properly evaluated and managed.\n\nYou should consult an [Ortoped](sinoai://open?path=doctors&speciality_id=10&speciality_name=Ortoped) to get a proper evaluation of your lower back pain and ensure you haven't completed any of your recommended follow-up tasks from last week."
        },
        "updatedAt": "2026-08-21T12:24:40.758168+05:00",
        "factors": []
      },
      "cvd": {
        "domain": "cvd",
        "method": "SCORE2",
        "percent": 10,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Bu hafta suhbatda yangi shikoyat bildirmadingiz va o'zingizni xotirjam tutdingiz. Shunga qaramay, oldingi haftalardagi bel og'rig'i va 35.3 ga teng bo'lgan yuqori tana vazni indeksi e'tiborni talab qiladi.\n\nOrtiqcha tana vazni bel va bo'g'imlarga ortiqcha yuklama berib, ularning erta eskirishiga hamda surunkali og'riqlarning kuchayishiga olib kelishi mumkin.\n\nVazningizni nazorat qilish uchun sog'lom ovqatlanish tartibiga amal qiling va [terapevtga](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) murojaat qiling.",
          "ru": "На этой неделе вы не обращались к нам с новыми жалобами и не вели чат с ассистентом. При этом у вас сохраняется избыточный вес с индексом массы тела 35.3, который создает дополнительную нагрузку на опорно-двигательный аппарат.\n\nИзбыточная масса тела увеличивает нагрузку на суставы и позвоночник, что может способствовать развитию хронических болей в спине и ускоренному износу суставных хрящей. Отсутствие контроля веса повышает риск метаболических нарушений и заболеваний сердечно-сосудистой системы.\n\nВам стоит проконсультироваться с врачом-[терапевтом](sinoai://open?path=doctors&speciality_id=17&speciality_name=%D0%A2%D0%B5%D1%80%D0%B0%D0%BF%D0%B5%D0%B2%D1%82) для оценки общего состояния здоровья и составления безопасного плана снижения веса. Постарайтесь постепенно увеличивать уровень повседневной физической активности и пересмотреть свой рацион в пользу менее калорийных продуктов.",
          "en": "This week was quiet with no new chat messages or wearable activity data recorded, but your ongoing lower back pain from earlier this month remains an issue that needs attention.\n\nUnresolved lower back pain and mechanical soft tissue strain can lead to chronic spinal discomfort, restricted mobility, and altered posture if the underlying joint or muscular issues are not properly evaluated and managed.\n\nYou should consult an [Ortoped](sinoai://open?path=doctors&speciality_id=10&speciality_name=Ortoped) to get a proper evaluation of your lower back pain and ensure you haven't completed any of your recommended follow-up tasks from last week."
        },
        "analysisSummary": {
          "uz": "Bu hafta suhbatda yangi shikoyat bildirmadingiz va o'zingizni xotirjam tutdingiz.",
          "ru": "На этой неделе вы не обращались к нам с новыми жалобами и не вели чат с ассистентом.",
          "en": "This week was quiet with no new chat messages or wearable activity data recorded, but your ongoing lower back pain from earlier this month remains an issue that needs attention.\n\nUnresolved lower back pain and mechanical soft tissue strain can lead to chronic spinal discomfort, restricted mobility, and altered posture if the underlying joint or muscular issues are not properly evaluated and managed.\n\nYou should consult an [Ortoped](sinoai://open?path=doctors&speciality_id=10&speciality_name=Ortoped) to get a proper evaluation of your lower back pain and ensure you haven't completed any of your recommended follow-up tasks from last week."
        },
        "updatedAt": "2026-08-21T12:24:40.758168+05:00",
        "factors": []
      },
      "oncology": {
        "domain": "oncology",
        "method": "SIGNAL_COUNT",
        "percent": 2,
        "band": "low",
        "applicable": true,
        "sites": [
          {
            "id": "stomach",
            "label": {
              "uz": "Oshqozon saratoni xavf omillari",
              "ru": "Факторы риска рака желудка",
              "en": "Stomach cancer risk factors"
            },
            "percent": 2,
            "band": "low",
            "factors": []
          },
          {
            "id": "prostate",
            "label": {
              "uz": "Prostata saratoni xavf omillari",
              "ru": "Факторы риска рака простаты",
              "en": "Prostate cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          }
        ],
        "analysis": {
          "uz": "Bu hafta suhbatda yangi shikoyat bildirmadingiz va o'zingizni xotirjam tutdingiz. Shunga qaramay, oldingi haftalardagi bel og'rig'i va 35.3 ga teng bo'lgan yuqori tana vazni indeksi e'tiborni talab qiladi.\n\nOrtiqcha tana vazni bel va bo'g'imlarga ortiqcha yuklama berib, ularning erta eskirishiga hamda surunkali og'riqlarning kuchayishiga olib kelishi mumkin.\n\nVazningizni nazorat qilish uchun sog'lom ovqatlanish tartibiga amal qiling va [terapevtga](sinoai://open?path=doctors&speciality_id=17&speciality_name=Terapevt) murojaat qiling.",
          "ru": "На этой неделе вы не обращались к нам с новыми жалобами и не вели чат с ассистентом. При этом у вас сохраняется избыточный вес с индексом массы тела 35.3, который создает дополнительную нагрузку на опорно-двигательный аппарат.\n\nИзбыточная масса тела увеличивает нагрузку на суставы и позвоночник, что может способствовать развитию хронических болей в спине и ускоренному износу суставных хрящей. Отсутствие контроля веса повышает риск метаболических нарушений и заболеваний сердечно-сосудистой системы.\n\nВам стоит проконсультироваться с врачом-[терапевтом](sinoai://open?path=doctors&speciality_id=17&speciality_name=%D0%A2%D0%B5%D1%80%D0%B0%D0%BF%D0%B5%D0%B2%D1%82) для оценки общего состояния здоровья и составления безопасного плана снижения веса. Постарайтесь постепенно увеличивать уровень повседневной физической активности и пересмотреть свой рацион в пользу менее калорийных продуктов.",
          "en": "This week was quiet with no new chat messages or wearable activity data recorded, but your ongoing lower back pain from earlier this month remains an issue that needs attention.\n\nUnresolved lower back pain and mechanical soft tissue strain can lead to chronic spinal discomfort, restricted mobility, and altered posture if the underlying joint or muscular issues are not properly evaluated and managed.\n\nYou should consult an [Ortoped](sinoai://open?path=doctors&speciality_id=10&speciality_name=Ortoped) to get a proper evaluation of your lower back pain and ensure you haven't completed any of your recommended follow-up tasks from last week."
        },
        "analysisSummary": {
          "uz": "Bu hafta suhbatda yangi shikoyat bildirmadingiz va o'zingizni xotirjam tutdingiz.",
          "ru": "На этой неделе вы не обращались к нам с новыми жалобами и не вели чат с ассистентом.",
          "en": "This week was quiet with no new chat messages or wearable activity data recorded, but your ongoing lower back pain from earlier this month remains an issue that needs attention.\n\nUnresolved lower back pain and mechanical soft tissue strain can lead to chronic spinal discomfort, restricted mobility, and altered posture if the underlying joint or muscular issues are not properly evaluated and managed.\n\nYou should consult an [Ortoped](sinoai://open?path=doctors&speciality_id=10&speciality_name=Ortoped) to get a proper evaluation of your lower back pain and ensure you haven't completed any of your recommended follow-up tasks from last week."
        },
        "updatedAt": "2026-08-21T12:24:40.758168+05:00"
      }
    },
    "department": "warehouse",
    "wellness": {
      "recovery": 64,
      "sleepScore": 60,
      "met": 4.3,
      "activityScore": 56,
      "stressScore": 48
    }
  },
  {
    "id": "3d51baf3-f109-4359-aa85-0e44295554bd",
    "firstName": "Alisher",
    "lastName": "Akmaljonov",
    "age": 27,
    "sex": "male",
    "region": "Yunusobod",
    "phone": "+998977045076",
    "enrolledAt": "2025-11-19T17:47:32.685442+05:00",
    "photoUrl": "/photos/3d51baf3-f109-4359-aa85-0e44295554bd.jpg",
    "job": "Not specified",
    "description": "Not specified",
    "insuranceNumber": null,
    "sinoaiUserId": "sinoai-4d82e1a0",
    "assessed": true,
    "measurements": {
      "bmi": 26.1
    },
    "domains": {
      "diabetes": {
        "domain": "diabetes",
        "method": "CANRISK",
        "percent": 40,
        "band": "high",
        "applicable": true,
        "analysis": {
          "uz": "Siz bu hafta chatda pastki belingiz og'riyotgani, bu og'riq asta-sekin boshlanib ma'lum bir holatda turganda kuchayishi va mushak spazmlari bilan birga kelishini aytdingiz. Shuningdek, oldingi haftalardan qolgan gormonlar darajasini tekshirish va shifokor ko'rigidan o'tish vazifalarini hali bajarmadingiz.\n\nBel qismidagi davomiy og'riqlar va mushak spazmlari e'tiborsiz qoldirilsa, umurtqa pog'onasi va mushak-skelet tizimidagi muammolar yanada kuchayishi hamda kundalik harakatlanish faoliyatingizni cheklab qo'yishi mumkin.\n\nSiz ortopedga murojaat qiling va belingizdagi yuklamani kamaytirib, mushaklarni bo'shashtiruvchi mashqlarga e'tibor bering. Shuningdek, o'tgan haftalardan bajarilmay qolgan gormonlar tahlilini topshirishni unutmang.",
          "ru": "На этой неделе вы обратились с жалобами на появление боли в нижней части спины, которая развивается постепенно, усиливается в определенных позах и сопровождается болезненными мышечными спазмами.\n\nНелеченные миофасциальные боли и мышечные спазмы в поясничном отделе могут привести к хронизации болевого синдрома, ограничению подвижности позвоночника и вторичному нарушению осанки.\n\nВам следует записаться к ортопеду для детального обследования позвоночника и исключения межпозвоночных грыж или серьезных патологий. Избегайте резких движений, длительного пребывания в неудобных позах и постарайтесь обеспечить полноценный отдых мышцам спины.",
          "en": "This week, you chatted with us about lower back pain that has been developing gradually, worsening in certain postures, and accompanied by muscle spasms. Since you also have a high cardiovascular risk profile and recently looked up Validol, it is important to monitor how these symptoms intersect with your overall well-being.\n\nLower back pain accompanied by muscle spasms and postural aggravation can lead to chronic musculoskeletal discomfort, restricted mobility, and secondary joint stress if underlying spinal or muscular issues remain unaddressed.\n\nYou should consult an Ortoped to evaluate your lower back pain and muscle spasms. Apply gentle stretching, avoid prolonged awkward postures, and consider consulting a specialist promptly."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta chatda pastki belingiz og'riyotgani, bu og'riq asta-sekin boshlanib ma'lum bir holatda turganda kuchayishi va mushak spazmlari bilan birga kelishini aytdingiz.",
          "ru": "На этой неделе вы обратились с жалобами на появление боли в нижней части спины, которая развивается постепенно, усиливается в определенных позах и сопровождается болезненными мышечными спазмами.\n\nНелеченные миофасциальные боли и мышечные спазмы в поясничном отделе могут привести к хронизации болевого синдрома, ограничению подвижности позвоночника и вторичному нарушению осанки.\n\nВам следует записаться к ортопеду для детального обследования позвоночника и исключения межпозвоночных грыж или серьезных патологий.",
          "en": "This week, you chatted with us about lower back pain that has been developing gradually, worsening in certain postures, and accompanied by muscle spasms."
        },
        "updatedAt": "2026-08-25T13:29:37.987222+05:00",
        "factors": []
      },
      "cvd": {
        "domain": "cvd",
        "method": "SCORE2",
        "percent": 24,
        "band": "moderate",
        "applicable": true,
        "analysis": {
          "uz": "Siz bu hafta chatda pastki belingiz og'riyotgani, bu og'riq asta-sekin boshlanib ma'lum bir holatda turganda kuchayishi va mushak spazmlari bilan birga kelishini aytdingiz. Shuningdek, oldingi haftalardan qolgan gormonlar darajasini tekshirish va shifokor ko'rigidan o'tish vazifalarini hali bajarmadingiz.\n\nBel qismidagi davomiy og'riqlar va mushak spazmlari e'tiborsiz qoldirilsa, umurtqa pog'onasi va mushak-skelet tizimidagi muammolar yanada kuchayishi hamda kundalik harakatlanish faoliyatingizni cheklab qo'yishi mumkin.\n\nSiz ortopedga murojaat qiling va belingizdagi yuklamani kamaytirib, mushaklarni bo'shashtiruvchi mashqlarga e'tibor bering. Shuningdek, o'tgan haftalardan bajarilmay qolgan gormonlar tahlilini topshirishni unutmang.",
          "ru": "На этой неделе вы обратились с жалобами на появление боли в нижней части спины, которая развивается постепенно, усиливается в определенных позах и сопровождается болезненными мышечными спазмами.\n\nНелеченные миофасциальные боли и мышечные спазмы в поясничном отделе могут привести к хронизации болевого синдрома, ограничению подвижности позвоночника и вторичному нарушению осанки.\n\nВам следует записаться к ортопеду для детального обследования позвоночника и исключения межпозвоночных грыж или серьезных патологий. Избегайте резких движений, длительного пребывания в неудобных позах и постарайтесь обеспечить полноценный отдых мышцам спины.",
          "en": "This week, you chatted with us about lower back pain that has been developing gradually, worsening in certain postures, and accompanied by muscle spasms. Since you also have a high cardiovascular risk profile and recently looked up Validol, it is important to monitor how these symptoms intersect with your overall well-being.\n\nLower back pain accompanied by muscle spasms and postural aggravation can lead to chronic musculoskeletal discomfort, restricted mobility, and secondary joint stress if underlying spinal or muscular issues remain unaddressed.\n\nYou should consult an Ortoped to evaluate your lower back pain and muscle spasms. Apply gentle stretching, avoid prolonged awkward postures, and consider consulting a specialist promptly."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta chatda pastki belingiz og'riyotgani, bu og'riq asta-sekin boshlanib ma'lum bir holatda turganda kuchayishi va mushak spazmlari bilan birga kelishini aytdingiz.",
          "ru": "На этой неделе вы обратились с жалобами на появление боли в нижней части спины, которая развивается постепенно, усиливается в определенных позах и сопровождается болезненными мышечными спазмами.\n\nНелеченные миофасциальные боли и мышечные спазмы в поясничном отделе могут привести к хронизации болевого синдрома, ограничению подвижности позвоночника и вторичному нарушению осанки.\n\nВам следует записаться к ортопеду для детального обследования позвоночника и исключения межпозвоночных грыж или серьезных патологий.",
          "en": "This week, you chatted with us about lower back pain that has been developing gradually, worsening in certain postures, and accompanied by muscle spasms."
        },
        "updatedAt": "2026-08-25T13:29:37.987222+05:00",
        "factors": []
      },
      "oncology": {
        "domain": "oncology",
        "method": "SIGNAL_COUNT",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "sites": [
          {
            "id": "stomach",
            "label": {
              "uz": "Oshqozon saratoni xavf omillari",
              "ru": "Факторы риска рака желудка",
              "en": "Stomach cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          },
          {
            "id": "prostate",
            "label": {
              "uz": "Prostata saratoni xavf omillari",
              "ru": "Факторы риска рака простаты",
              "en": "Prostate cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          }
        ],
        "analysis": {
          "uz": "Siz bu hafta chatda pastki belingiz og'riyotgani, bu og'riq asta-sekin boshlanib ma'lum bir holatda turganda kuchayishi va mushak spazmlari bilan birga kelishini aytdingiz. Shuningdek, oldingi haftalardan qolgan gormonlar darajasini tekshirish va shifokor ko'rigidan o'tish vazifalarini hali bajarmadingiz.\n\nBel qismidagi davomiy og'riqlar va mushak spazmlari e'tiborsiz qoldirilsa, umurtqa pog'onasi va mushak-skelet tizimidagi muammolar yanada kuchayishi hamda kundalik harakatlanish faoliyatingizni cheklab qo'yishi mumkin.\n\nSiz ortopedga murojaat qiling va belingizdagi yuklamani kamaytirib, mushaklarni bo'shashtiruvchi mashqlarga e'tibor bering. Shuningdek, o'tgan haftalardan bajarilmay qolgan gormonlar tahlilini topshirishni unutmang.",
          "ru": "На этой неделе вы обратились с жалобами на появление боли в нижней части спины, которая развивается постепенно, усиливается в определенных позах и сопровождается болезненными мышечными спазмами.\n\nНелеченные миофасциальные боли и мышечные спазмы в поясничном отделе могут привести к хронизации болевого синдрома, ограничению подвижности позвоночника и вторичному нарушению осанки.\n\nВам следует записаться к ортопеду для детального обследования позвоночника и исключения межпозвоночных грыж или серьезных патологий. Избегайте резких движений, длительного пребывания в неудобных позах и постарайтесь обеспечить полноценный отдых мышцам спины.",
          "en": "This week, you chatted with us about lower back pain that has been developing gradually, worsening in certain postures, and accompanied by muscle spasms. Since you also have a high cardiovascular risk profile and recently looked up Validol, it is important to monitor how these symptoms intersect with your overall well-being.\n\nLower back pain accompanied by muscle spasms and postural aggravation can lead to chronic musculoskeletal discomfort, restricted mobility, and secondary joint stress if underlying spinal or muscular issues remain unaddressed.\n\nYou should consult an Ortoped to evaluate your lower back pain and muscle spasms. Apply gentle stretching, avoid prolonged awkward postures, and consider consulting a specialist promptly."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta chatda pastki belingiz og'riyotgani, bu og'riq asta-sekin boshlanib ma'lum bir holatda turganda kuchayishi va mushak spazmlari bilan birga kelishini aytdingiz.",
          "ru": "На этой неделе вы обратились с жалобами на появление боли в нижней части спины, которая развивается постепенно, усиливается в определенных позах и сопровождается болезненными мышечными спазмами.\n\nНелеченные миофасциальные боли и мышечные спазмы в поясничном отделе могут привести к хронизации болевого синдрома, ограничению подвижности позвоночника и вторичному нарушению осанки.\n\nВам следует записаться к ортопеду для детального обследования позвоночника и исключения межпозвоночных грыж или серьезных патологий.",
          "en": "This week, you chatted with us about lower back pain that has been developing gradually, worsening in certain postures, and accompanied by muscle spasms."
        },
        "updatedAt": "2026-08-25T13:29:37.987222+05:00"
      }
    },
    "department": "logistics",
    "wellness": {
      "recovery": 35,
      "sleepScore": 41,
      "met": 2.9,
      "activityScore": 29,
      "stressScore": 74
    }
  },
  {
    "id": "91bd69cf-428b-4b77-8e7e-ca983fe74c02",
    "firstName": "Mohlaroy",
    "lastName": "Tolibjonova",
    "age": 22,
    "sex": "female",
    "region": "Yunusobod",
    "phone": "+998946862206",
    "enrolledAt": "2026-05-14T20:40:06.039731+05:00",
    "photoUrl": "/photos/91bd69cf-428b-4b77-8e7e-ca983fe74c02.jpg",
    "job": "Not specified",
    "description": "Not specified",
    "insuranceNumber": null,
    "assessed": true,
    "measurements": {
      "bmi": 20.0
    },
    "domains": {
      "diabetes": {
        "domain": "diabetes",
        "method": "CANRISK",
        "percent": 6,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Siz bu hafta qorin og'rig'i, qusish va biroz tana haroratining ko'tarilishi kabi alomatlar hamda tanangizda kattalashib borayotgan qichimaydigan toshma haqida murojaat qildingiz. Shuningdek, uyqusizlik va kam suv ichish odatingiz davom etmoqda, bu esa umumiy ahvolingizga o'z ta'sirini ko'rsatishi mumkin.\n\nQorinning pastki qismidagi doimiy og'riq va qusish oshqozon-ichak trakti yoki qorin bo'shlig'i a'zolarida yallig'lanish jarayonlari mavjudligidan dalolat berishi mumkin. Davolanmasa, bu holat suvsizlanishga va kasallikning kuchayishiga olib kelishi mumkin, shuningdek, teridagi o'zgaruvchan toshma ham dermatologik nazoratni talab qiladi.\n\nSiz darhol gastroenterologga murojaat qilib, qorin og'rig'i va qusish sabablarini tekshirishingiz zarur. Kun davomida yetarli miqdorda toza suv ichishni unutmang va ratsional parhezga amal qiling. Agar alomatlar kuchaysa yoki yangi belgilar qo'shilsa, shifokor ko'rigini kechiktirmang.",
          "ru": "На этой неделе вы обратились с жалобами на постоянную боль в нижней части живота, которая усиливается до еды, сопровождается рвотой и небольшим повышением температуры, а также на появившуюся более трех дней назад сыпь на теле без зуда, но с увеличивающимися элементами.\n\nПодобные симптомы со стороны желудочно-кишечного тракта в сочетании с кожными проявлениями могут указывать на воспалительные процессы или инфекции, которые без своевременной диагностики способны привести к ухудшению общего состояния и осложнениям.\n\nВам необходимо обратиться к гастроэнтерологу для обследования органов брюшной полости, а также старайтесь соблюдать щадящую диету и поддерживать водный баланс до визита к врачу.",
          "en": "This week, you reported experiencing lower abdominal pain accompanied by vomiting and a slight fever, and you also noted a non-itchy skin rash on one area of your body that has grown in size over the past three days. As you are currently taking vitamin D, magnesium, and iron supplements, these acute symptoms warrant careful attention. Additionally, your ongoing struggle with insomnia and low fluid intake continue to impact your overall well-being.\n\nPersistent lower abdominal pain combined with vomiting and fever can indicate significant gastrointestinal inflammation, infection, or other acute abdominal conditions that require medical evaluation. Furthermore, an enlarging skin rash that persists for several days may point to a localized dermatological issue or inflammatory process needing professional diagnosis to prevent complications.\n\nYou should consult a dermatolog promptly to evaluate the changing skin rash, and you should also speak with a gastroenterolog or therapist regarding your abdominal pain and vomiting. Ensure you stay well-hydrated and focus on getting adequate rest while monitoring your symptoms closely."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta qorin og'rig'i, qusish va biroz tana haroratining ko'tarilishi kabi alomatlar hamda tanangizda kattalashib borayotgan qichimaydigan toshma haqida murojaat qildingiz.",
          "ru": "На этой неделе вы обратились с жалобами на постоянную боль в нижней части живота, которая усиливается до еды, сопровождается рвотой и небольшим повышением температуры, а также на появившуюся более трех дней назад сыпь на теле без зуда, но с увеличивающимися элементами.\n\nПодобные симптомы со стороны желудочно-кишечного тракта в сочетании с кожными проявлениями могут указывать на воспалительные процессы или инфекции, которые без своевременной диагностики способны привести к ухудшению общего состояния и осложнениям.\n\nВам необходимо обратиться к гастроэнтерологу для обследования органов брюшной полости, а также старайтесь соблюдать щадящую диету и поддерживать водный баланс до визита к врачу.",
          "en": "This week, you reported experiencing lower abdominal pain accompanied by vomiting and a slight fever, and you also noted a non-itchy skin rash on one area of your body that has grown in size over the past three days."
        },
        "updatedAt": "2026-08-25T13:29:53.370309+05:00",
        "factors": []
      },
      "cvd": {
        "domain": "cvd",
        "method": "SCORE2",
        "percent": 9,
        "band": "low",
        "applicable": true,
        "analysis": {
          "uz": "Siz bu hafta qorin og'rig'i, qusish va biroz tana haroratining ko'tarilishi kabi alomatlar hamda tanangizda kattalashib borayotgan qichimaydigan toshma haqida murojaat qildingiz. Shuningdek, uyqusizlik va kam suv ichish odatingiz davom etmoqda, bu esa umumiy ahvolingizga o'z ta'sirini ko'rsatishi mumkin.\n\nQorinning pastki qismidagi doimiy og'riq va qusish oshqozon-ichak trakti yoki qorin bo'shlig'i a'zolarida yallig'lanish jarayonlari mavjudligidan dalolat berishi mumkin. Davolanmasa, bu holat suvsizlanishga va kasallikning kuchayishiga olib kelishi mumkin, shuningdek, teridagi o'zgaruvchan toshma ham dermatologik nazoratni talab qiladi.\n\nSiz darhol gastroenterologga murojaat qilib, qorin og'rig'i va qusish sabablarini tekshirishingiz zarur. Kun davomida yetarli miqdorda toza suv ichishni unutmang va ratsional parhezga amal qiling. Agar alomatlar kuchaysa yoki yangi belgilar qo'shilsa, shifokor ko'rigini kechiktirmang.",
          "ru": "На этой неделе вы обратились с жалобами на постоянную боль в нижней части живота, которая усиливается до еды, сопровождается рвотой и небольшим повышением температуры, а также на появившуюся более трех дней назад сыпь на теле без зуда, но с увеличивающимися элементами.\n\nПодобные симптомы со стороны желудочно-кишечного тракта в сочетании с кожными проявлениями могут указывать на воспалительные процессы или инфекции, которые без своевременной диагностики способны привести к ухудшению общего состояния и осложнениям.\n\nВам необходимо обратиться к гастроэнтерологу для обследования органов брюшной полости, а также старайтесь соблюдать щадящую диету и поддерживать водный баланс до визита к врачу.",
          "en": "This week, you reported experiencing lower abdominal pain accompanied by vomiting and a slight fever, and you also noted a non-itchy skin rash on one area of your body that has grown in size over the past three days. As you are currently taking vitamin D, magnesium, and iron supplements, these acute symptoms warrant careful attention. Additionally, your ongoing struggle with insomnia and low fluid intake continue to impact your overall well-being.\n\nPersistent lower abdominal pain combined with vomiting and fever can indicate significant gastrointestinal inflammation, infection, or other acute abdominal conditions that require medical evaluation. Furthermore, an enlarging skin rash that persists for several days may point to a localized dermatological issue or inflammatory process needing professional diagnosis to prevent complications.\n\nYou should consult a dermatolog promptly to evaluate the changing skin rash, and you should also speak with a gastroenterolog or therapist regarding your abdominal pain and vomiting. Ensure you stay well-hydrated and focus on getting adequate rest while monitoring your symptoms closely."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta qorin og'rig'i, qusish va biroz tana haroratining ko'tarilishi kabi alomatlar hamda tanangizda kattalashib borayotgan qichimaydigan toshma haqida murojaat qildingiz.",
          "ru": "На этой неделе вы обратились с жалобами на постоянную боль в нижней части живота, которая усиливается до еды, сопровождается рвотой и небольшим повышением температуры, а также на появившуюся более трех дней назад сыпь на теле без зуда, но с увеличивающимися элементами.\n\nПодобные симптомы со стороны желудочно-кишечного тракта в сочетании с кожными проявлениями могут указывать на воспалительные процессы или инфекции, которые без своевременной диагностики способны привести к ухудшению общего состояния и осложнениям.\n\nВам необходимо обратиться к гастроэнтерологу для обследования органов брюшной полости, а также старайтесь соблюдать щадящую диету и поддерживать водный баланс до визита к врачу.",
          "en": "This week, you reported experiencing lower abdominal pain accompanied by vomiting and a slight fever, and you also noted a non-itchy skin rash on one area of your body that has grown in size over the past three days."
        },
        "updatedAt": "2026-08-25T13:29:53.370309+05:00",
        "factors": []
      },
      "oncology": {
        "domain": "oncology",
        "method": "SIGNAL_COUNT",
        "percent": 0,
        "band": "low",
        "applicable": true,
        "sites": [
          {
            "id": "stomach",
            "label": {
              "uz": "Oshqozon saratoni xavf omillari",
              "ru": "Факторы риска рака желудка",
              "en": "Stomach cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          },
          {
            "id": "breast",
            "label": {
              "uz": "Ko'krak bezi saratoni xavf omillari",
              "ru": "Факторы риска рака молочной железы",
              "en": "Breast cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          },
          {
            "id": "uterine",
            "label": {
              "uz": "Bachadon saratoni xavf omillari",
              "ru": "Факторы риска рака матки",
              "en": "Uterine cancer risk factors"
            },
            "percent": 0,
            "band": "low",
            "factors": []
          }
        ],
        "analysis": {
          "uz": "Siz bu hafta qorin og'rig'i, qusish va biroz tana haroratining ko'tarilishi kabi alomatlar hamda tanangizda kattalashib borayotgan qichimaydigan toshma haqida murojaat qildingiz. Shuningdek, uyqusizlik va kam suv ichish odatingiz davom etmoqda, bu esa umumiy ahvolingizga o'z ta'sirini ko'rsatishi mumkin.\n\nQorinning pastki qismidagi doimiy og'riq va qusish oshqozon-ichak trakti yoki qorin bo'shlig'i a'zolarida yallig'lanish jarayonlari mavjudligidan dalolat berishi mumkin. Davolanmasa, bu holat suvsizlanishga va kasallikning kuchayishiga olib kelishi mumkin, shuningdek, teridagi o'zgaruvchan toshma ham dermatologik nazoratni talab qiladi.\n\nSiz darhol gastroenterologga murojaat qilib, qorin og'rig'i va qusish sabablarini tekshirishingiz zarur. Kun davomida yetarli miqdorda toza suv ichishni unutmang va ratsional parhezga amal qiling. Agar alomatlar kuchaysa yoki yangi belgilar qo'shilsa, shifokor ko'rigini kechiktirmang.",
          "ru": "На этой неделе вы обратились с жалобами на постоянную боль в нижней части живота, которая усиливается до еды, сопровождается рвотой и небольшим повышением температуры, а также на появившуюся более трех дней назад сыпь на теле без зуда, но с увеличивающимися элементами.\n\nПодобные симптомы со стороны желудочно-кишечного тракта в сочетании с кожными проявлениями могут указывать на воспалительные процессы или инфекции, которые без своевременной диагностики способны привести к ухудшению общего состояния и осложнениям.\n\nВам необходимо обратиться к гастроэнтерологу для обследования органов брюшной полости, а также старайтесь соблюдать щадящую диету и поддерживать водный баланс до визита к врачу.",
          "en": "This week, you reported experiencing lower abdominal pain accompanied by vomiting and a slight fever, and you also noted a non-itchy skin rash on one area of your body that has grown in size over the past three days. As you are currently taking vitamin D, magnesium, and iron supplements, these acute symptoms warrant careful attention. Additionally, your ongoing struggle with insomnia and low fluid intake continue to impact your overall well-being.\n\nPersistent lower abdominal pain combined with vomiting and fever can indicate significant gastrointestinal inflammation, infection, or other acute abdominal conditions that require medical evaluation. Furthermore, an enlarging skin rash that persists for several days may point to a localized dermatological issue or inflammatory process needing professional diagnosis to prevent complications.\n\nYou should consult a dermatolog promptly to evaluate the changing skin rash, and you should also speak with a gastroenterolog or therapist regarding your abdominal pain and vomiting. Ensure you stay well-hydrated and focus on getting adequate rest while monitoring your symptoms closely."
        },
        "analysisSummary": {
          "uz": "Siz bu hafta qorin og'rig'i, qusish va biroz tana haroratining ko'tarilishi kabi alomatlar hamda tanangizda kattalashib borayotgan qichimaydigan toshma haqida murojaat qildingiz.",
          "ru": "На этой неделе вы обратились с жалобами на постоянную боль в нижней части живота, которая усиливается до еды, сопровождается рвотой и небольшим повышением температуры, а также на появившуюся более трех дней назад сыпь на теле без зуда, но с увеличивающимися элементами.\n\nПодобные симптомы со стороны желудочно-кишечного тракта в сочетании с кожными проявлениями могут указывать на воспалительные процессы или инфекции, которые без своевременной диагностики способны привести к ухудшению общего состояния и осложнениям.\n\nВам необходимо обратиться к гастроэнтерологу для обследования органов брюшной полости, а также старайтесь соблюдать щадящую диету и поддерживать водный баланс до визита к врачу.",
          "en": "This week, you reported experiencing lower abdominal pain accompanied by vomiting and a slight fever, and you also noted a non-itchy skin rash on one area of your body that has grown in size over the past three days."
        },
        "updatedAt": "2026-08-25T13:29:53.370309+05:00"
      }
    },
    "department": "management",
    "wellness": {
      "recovery": 72,
      "sleepScore": 76,
      "met": 3.8,
      "activityScore": 45,
      "stressScore": 36
    }
  }
]
