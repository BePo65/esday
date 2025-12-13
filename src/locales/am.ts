/**
 * Amharic [am]
 */

import type { Locale } from '~/plugins/locale'

const localeAm: Readonly<Locale> = {
  name: 'am',
  weekdays: ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ'],
  weekdaysShort: ['እሑድ', 'ሰኞ', 'ማክሰ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ'],
  weekdaysMin: ['እሑ', 'ሰኞ', 'ማክ', 'ረቡ', 'ሐሙ', 'አር', 'ቅዳ'],
  months: [
    'ጃንዋሪ',
    'ፌብሯሪ',
    'ማርች',
    'ኤፕሪል',
    'ሜይ',
    'ጁን',
    'ጁላይ',
    'ኦገስት',
    'ሴፕቴምበር',
    'ኦክቶበር',
    'ኖቬምበር',
    'ዲሴምበር',
  ],
  monthsShort: ['ጃንዋ', 'ፌብሯ', 'ማርች', 'ኤፕሪ', 'ሜይ', 'ጁን', 'ጁላይ', 'ኦገስ', 'ሴፕቴ', 'ኦክቶ', 'ኖቬም', 'ዲሴም'],
  ordinal: (n) => `${n}ኛ`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'MMMM D ፣ YYYY',
    LLL: 'MMMM D ፣ YYYY HH:mm',
    LLLL: 'dddd ፣ MMMM D ፣ YYYY HH:mm',
    l: 'DD/MM/YYYY',
    ll: 'MMMM D ፣ YYYY',
    lll: 'MMMM D ፣ YYYY HH:mm',
    llll: 'dddd ፣ MMMM D ፣ YYYY HH:mm',
  },
  calendar: {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'በ%s',
    past: '%s በፊት',
    s: 'ጥቂት ሰከንዶች',
    ss: '%d ሰከንዶች',
    m: 'አንድ ደቂቃ',
    mm: '%d ደቂቃዎች',
    h: 'አንድ ሰዓት',
    hh: '%d ሰዓታት',
    d: 'አንድ ቀን',
    dd: '%d ቀናት',
    w: 'አንድ ሳምንት',
    ww: '%d ሳምንታት',
    M: 'አንድ ወር',
    MM: '%d ወራት',
    y: 'አንድ ዓመት',
    yy: '%d ዓመታት',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Amharic doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeAm
