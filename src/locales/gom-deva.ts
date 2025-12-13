/**
 * Konkani Devanagari script [gom-DEVA]
 */

import type {
  Locale,
  MonthNames,
  MonthNamesStandaloneFormat,
  RelativeTimeElementFunction,
} from '~/plugins/locale'

const monthFormat: MonthNames = [
  'जानेवारीच्या',
  'फेब्रुवारीच्या',
  'मार्चाच्या',
  'एप्रीलाच्या',
  'मेयाच्या',
  'जूनाच्या',
  'जुलयाच्या',
  'ऑगस्टाच्या',
  'सप्टेंबराच्या',
  'ऑक्टोबराच्या',
  'नोव्हेंबराच्या',
  'डिसेंबराच्या',
]
const monthStandalone: MonthNames = [
  'जानेवारी',
  'फेब्रुवारी',
  'मार्च',
  'एप्रील',
  'मे',
  'जून',
  'जुलय',
  'ऑगस्ट',
  'सप्टेंबर',
  'ऑक्टोबर',
  'नोव्हेंबर',
  'डिसेंबर',
]
const months: MonthNamesStandaloneFormat = {
  standalone: monthStandalone,
  format: monthFormat,
  isFormat: /MMMM(\s)+D[oD]?/,
}

const processRelativeTime: RelativeTimeElementFunction = (
  timeValue: string | number,
  _withoutSuffix: boolean,
  token: string,
  isFuture: boolean,
) => {
  const relativeTimeFormatStrings = {
    s: ['थोडया सॅकंडांनी', 'थोडे सॅकंड'],
    ss: [`${timeValue} सॅकंडांनी`, `${timeValue} सॅकंड`],
    m: ['एका मिणटान', 'एक मिनूट'],
    mm: [`${timeValue} मिणटांनी`, `${timeValue} मिणटां`],
    h: ['एका वरान', 'एक वर'],
    hh: [`${timeValue} वरांनी`, `${timeValue} वरां`],
    d: ['एका दिसान', 'एक दीस'],
    dd: [`${timeValue} दिसांनी`, `${timeValue} दीस`],
    w: ['एका सप्तकांत', 'एक दीस'],
    ww: [`${timeValue} सप्तकांत`, `${timeValue} सप्तकांत`],
    M: ['एका म्हयन्यान', 'एक म्हयनो'],
    MM: [`${timeValue} म्हयन्यानी`, `${timeValue} म्हयने`],
    y: ['एका वर्सान', 'एक वर्स'],
    yy: [`${timeValue} वर्सांनी`, `${timeValue} वर्सां`],
  }
  return isFuture
    ? relativeTimeFormatStrings[token as keyof typeof relativeTimeFormatStrings][0]
    : relativeTimeFormatStrings[token as keyof typeof relativeTimeFormatStrings][1]
}

const localeGomLatn: Readonly<Locale> = {
  name: 'gom-DEVA',
  weekdays: ['आयतार', 'सोमार', 'मंगळार', 'बुधवार', 'बिरेस्तार', 'सुक्रार', 'शेनवार'],
  weekdaysShort: ['आयत.', 'सोम.', 'मंगळ.', 'बुध.', 'ब्रेस्त.', 'सुक्र.', 'शेन.'],
  weekdaysMin: ['आ', 'सो', 'मं', 'बु', 'ब्रे', 'सु', 'शे'],
  months,
  monthsShort: [
    'जाने.',
    'फेब्रु.',
    'मार्च',
    'एप्री.',
    'मे',
    'जून',
    'जुल.',
    'ऑग.',
    'सप्टें.',
    'ऑक्टो.',
    'नोव्हें.',
    'डिसें.',
  ],
  ordinal: (n) => `${n}`,
  weekStart: 0, // Sunday is the first day of the week.
  yearStart: 4, // The week that contains Jan 3rd is the first week of the year.
  formats: {
    LT: 'A h:mm [vazta]',
    LTS: 'A h:mm:ss [vazta]',
    L: 'DD-MM-YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY A h:mm [vazta]',
    LLLL: 'dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]',
    l: 'DD-MM-YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY A h:mm [vazta]',
    llll: 'ddd, D MMM YYYY, A h:mm [vazta]',
  },
  calendar: {
    sameDay: '[आयज] LT',
    nextDay: '[फाल्यां] LT',
    nextWeek: '[फुडलो] dddd[,] LT',
    lastDay: '[काल] LT',
    lastWeek: '[फाटलो] dddd[,] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s',
    past: '%s adim',
    s: processRelativeTime,
    ss: processRelativeTime,
    m: processRelativeTime,
    mm: processRelativeTime,
    h: processRelativeTime,
    hh: processRelativeTime,
    d: processRelativeTime,
    dd: processRelativeTime,
    w: processRelativeTime,
    ww: processRelativeTime,
    M: processRelativeTime,
    MM: processRelativeTime,
    y: processRelativeTime,
    yy: processRelativeTime,
  },
  // eslint-disable-next-line  unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => {
    if (hour < 4) {
      return 'rati'
    }
    if (hour < 12) {
      return 'sokallim'
    }
    if (hour < 16) {
      return 'donparam'
    }
    if (hour < 20) {
      return 'sanje'
    }
    return 'rati'
  },
}

export default localeGomLatn
