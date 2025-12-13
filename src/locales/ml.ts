/*
 * Malayalam [ml]
 */
import type { Locale } from '~/plugins/locale'

const mlLocale: Readonly<Locale> = {
  name: 'ml',
  weekdays: ['ഞായറാഴ്ച', 'തിങ്കളാഴ്ച', 'ചൊവ്വാഴ്ച', 'ബുധനാഴ്ച', 'വ്യാഴാഴ്ച', 'വെള്ളിയാഴ്ച', 'ശനിയാഴ്ച'],
  weekdaysShort: ['ഞായർ', 'തിങ്കൾ', 'ചൊവ്വ', 'ബുധൻ', 'വ്യാഴം', 'വെള്ളി', 'ശനി'],
  weekdaysMin: ['ഞാ', 'തി', 'ചൊ', 'ബു', 'വ്യാ', 'വെ', 'ശ'],
  months: [
    'ജനുവരി',
    'ഫെബ്രുവരി',
    'മാർച്ച്',
    'ഏപ്രിൽ',
    'മേയ്',
    'ജൂൺ',
    'ജൂലൈ',
    'ഓഗസ്റ്റ്',
    'സെപ്റ്റംബർ',
    'ഒക്ടോബർ',
    'നവംബർ',
    'ഡിസംബർ',
  ],
  monthsShort: [
    'ജനു.',
    'ഫെബ്രു.',
    'മാർ.',
    'ഏപ്രി.',
    'മേയ്',
    'ജൂൺ',
    'ജൂലൈ.',
    'ഓഗ.',
    'സെപ്റ്റ.',
    'ഒക്ടോ.',
    'നവം.',
    'ഡിസം.',
  ],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'A h:mm -നു',
    LTS: 'A h:mm:ss -നു',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm -നു',
    LLLL: 'dddd, D MMMM YYYY, A h:mm -നു',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY, A h:mm -നു',
    llll: 'dddd, D MMMM YYYY, A h:mm -നു',
  },
  calendar: {
    sameDay: '[ഇന്ന്] LT',
    nextDay: '[നാളെ] LT',
    nextWeek: 'dddd, LT',
    lastDay: '[ഇന്നലെ] LT',
    lastWeek: '[കഴിഞ്ഞ] dddd, LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s കഴിഞ്ഞ്',
    past: '%s മുൻപ്',
    s: 'അൽപ നിമിഷങ്ങൾ',
    ss: '%d സെക്കൻഡ്',
    m: 'ഒരു മിനിറ്റ്',
    mm: '%d മിനിറ്റ്',
    h: 'ഒരു മണിക്കൂർ',
    hh: '%d മണിക്കൂർ',
    d: 'ഒരു ദിവസം',
    dd: '%d ദിവസം',
    w: 'ഒരു ആഴ്ച',
    ww: '%d ആഴ്ച',
    M: 'ഒരു മാസം',
    MM: '%d മാസം',
    y: 'ഒരു വർഷം',
    yy: '%d വർഷം',
  },
  // eslint-disable-next-line  unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => {
    if (hour < 4) {
      return 'രാത്രി'
    }
    if (hour < 12) {
      return 'രാവിലെ'
    }
    if (hour < 17) {
      return 'ഉച്ച കഴിഞ്ഞ്'
    }
    if (hour < 20) {
      return 'വൈകുന്നേരം'
    }
    return 'രാത്രി'
  },
}

export default mlLocale
