/**
 * Hebrew [he]
 */

import type { Locale, RelativeTimeElementFunction } from '~/plugins/locale'

const relativeTimeFormatStrings = {
  s: 'מספר שניות',
  ss: '%d שניות',
  m: 'דקה',
  mm: '%d דקות',
  h: 'שעה',
  hh: '%d שעות',
  hh2: 'שעתיים',
  d: 'יום',
  dd: '%d ימים',
  dd2: 'יומיים',
  w: 'שבוע',
  ww: '%d שבועות',
  ww2: 'בשבועיים',
  M: 'חודש',
  MM: '%d חודשים',
  MM2: 'חודשיים',
  y: 'שנה',
  yy: '%d שנים',
  yy2: 'שנתיים',
}
const relativeTimeFormatter: RelativeTimeElementFunction = (
  timeValue: string | number,
  _withoutSuffix: boolean,
  token: string,
  _isFuture: boolean,
) => {
  const formatStringsIndex = (token +
    (+timeValue === 2 ? '2' : '')) as keyof typeof relativeTimeFormatStrings
  const text =
    relativeTimeFormatStrings[formatStringsIndex] ??
    relativeTimeFormatStrings[token as keyof typeof relativeTimeFormatStrings]
  return text.replace('%d', timeValue.toString())
}

const localeHe: Readonly<Locale> = {
  name: 'he',
  weekdays: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
  weekdaysShort: ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'],
  weekdaysMin: ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו', 'ש׳'],
  months: [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ],
  monthsShort: ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'],
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: (n) => `${n}`,
  weekStart: 0, // Sunday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [ב]MMMM YYYY',
    LLL: 'D [ב]MMMM YYYY HH:mm',
    LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
    l: 'D/M/YYYY',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY HH:mm',
    llll: 'ddd, D MMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[היום ב־]LT',
    nextDay: '[מחר ב־]LT',
    nextWeek: 'dddd [בשעה] LT',
    lastDay: '[אתמול ב־]LT',
    lastWeek: '[ביום] dddd [האחרון בשעה] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'בעוד %s',
    past: 'לפני %s',
    s: relativeTimeFormatter,
    ss: relativeTimeFormatter,
    m: relativeTimeFormatter,
    mm: relativeTimeFormatter,
    h: relativeTimeFormatter,
    hh: relativeTimeFormatter,
    d: relativeTimeFormatter,
    dd: relativeTimeFormatter,
    w: relativeTimeFormatter,
    ww: relativeTimeFormatter,
    M: relativeTimeFormatter,
    MM: relativeTimeFormatter,
    y: relativeTimeFormatter,
    yy: relativeTimeFormatter,
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Hebrew doesn't have AM/PM in the same way, but we add them for consistency with other languages
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeHe
