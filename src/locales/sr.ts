//
/**
 * Serbian [sr]
 */

import type { EsDay } from 'esday'
import type { Locale, RelativeTimeElementFunction } from '~/plugins/locale'

const calendar = {
  sameDay: '[danas u] LT',
  nextDay: '[sutra u] LT',
  nextWeek(this: EsDay) {
    switch (this.day()) {
      case 0:
        return '[u] [nedelju] [u] LT'
      case 3:
        return '[u] [sredu] [u] LT'
      case 6:
        return '[u] [subotu] [u] LT'
      case 1:
      case 2:
      case 4:
      case 5:
        return '[u] dddd [u] LT'
      default:
        return ''
    }
  },
  lastDay: '[juče u] LT',
  lastWeek(this: EsDay) {
    const lastWeekDays = [
      '[prošle] [nedelje] [u] LT',
      '[prošlog] [ponedeljka] [u] LT',
      '[prošlog] [utorka] [u] LT',
      '[prošle] [srede] [u] LT',
      '[prošlog] [četvrtka] [u] LT',
      '[prošlog] [petka] [u] LT',
      '[prošle] [subote] [u] LT',
    ]
    return lastWeekDays[this.day()]
  },
  sameElse: 'L',
}

function plural(timeValue: number, formats: string[]) {
  if (
    timeValue % 10 >= 1 &&
    timeValue % 10 <= 4 &&
    (timeValue % 100 < 10 || timeValue % 100 >= 20)
  ) {
    return timeValue % 10 === 1 ? formats[0] : formats[1]
  }
  return formats[2]
}
const relativeTimeFormatter: RelativeTimeElementFunction = (
  timeValue: string | number,
  withoutSuffix: boolean,
  token: string,
  isFuture: boolean,
) => {
  const formatsAll = {
    ss: ['sekunda', 'sekunde', 'sekundi'],
    m: ['jedan minut', 'jednog minuta'],
    mm: ['%d minut', '%d minuta', '%d minuta'],
    h: ['jedan sat', 'jednog sata'],
    hh: ['%d sat', '%d sata', '%d sati'],
    d: ['jedan dan', 'jednog dana'],
    dd: ['%d dan', '%d dana', '%d dana'],
    w: ['јedan nedeљu', 'јednoq nedeљa'],
    ww: ['%d dan', '%d dana', '%d dana'],
    M: ['jedan mesec', 'jednog meseca'],
    MM: ['%d mesec', '%d meseca', '%d meseci'],
    y: ['jednu godinu', 'jedne godine'],
    yy: ['%d godinu', '%d godine', '%d godina'],
  }

  const formatsForToken = formatsAll[token as keyof typeof formatsAll]

  if (token.length === 1) {
    // Nominativ
    if (token === 'y' && withoutSuffix) return 'jedna godina'
    return isFuture || withoutSuffix ? formatsForToken[0] : formatsForToken[1]
  }

  const format = plural(+timeValue, formatsForToken)
  // Nominativ
  if (token === 'yy' && withoutSuffix && format === '%d godinu') {
    return `${timeValue} godina`
  }

  return format.replace('%d', timeValue.toString())
}

const localeSr: Readonly<Locale> = {
  name: 'sr',
  weekdays: ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'],
  weekdaysShort: ['Ned.', 'Pon.', 'Uto.', 'Sre.', 'Čet.', 'Pet.', 'Sub.'],
  weekdaysMin: ['ne', 'po', 'ut', 'sr', 'če', 'pe', 'su'],
  months: [
    'Januar',
    'Februar',
    'Mart',
    'April',
    'Maj',
    'Jun',
    'Jul',
    'Avgust',
    'Septembar',
    'Oktobar',
    'Novembar',
    'Decembar',
  ],
  monthsShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'Maj',
    'Jun',
    'Jul',
    'Avg.',
    'Sep.',
    'Okt.',
    'Nov.',
    'Dec.',
  ],
  ordinal: (n) => `${n}.`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'D. M. YYYY.',
    LL: 'D. MMMM YYYY.',
    LLL: 'D. MMMM YYYY. H:mm',
    LLLL: 'dddd, D. MMMM YYYY. H:mm',
    l: 'D. M. YYYY.',
    ll: 'D. MMMM YYYY.',
    lll: 'D. MMMM YYYY. H:mm',
    llll: 'dddd, D. MMMM YYYY. H:mm',
  },
  calendar,
  relativeTime: {
    future: 'za %s',
    past: 'pre %s',
    s: 'nekoliko sekundi',
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
    // Serbian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeSr
