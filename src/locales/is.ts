/**
 * Icelandic [is]
 */

import type { Locale, RelativeTimeElementFunction } from '~/plugins/locale'

function plural(value: number) {
  if (value % 100 === 11) {
    return true
  }
  if (value % 10 === 1) {
    return false
  }
  return true
}

const relativeTimeFormatter: RelativeTimeElementFunction = (
  timeValue: string | number,
  withoutSuffix: boolean,
  token: string,
  isFuture: boolean,
) => {
  const timeValueAsNumber = +timeValue
  const result = `${timeValueAsNumber} `
  switch (token) {
    case 's':
      return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum'
    case 'ss':
      if (plural(timeValueAsNumber)) {
        return `${result}${withoutSuffix || isFuture ? 'sekúndur' : 'sekúndum'}`
      }
      return `${result}sekúnda`
    case 'm':
      return withoutSuffix ? 'mínúta' : 'mínútu'
    case 'mm':
      if (plural(timeValueAsNumber)) {
        return `${result}${withoutSuffix || isFuture ? 'mínútur' : 'mínútum'}`
      }
      if (withoutSuffix) {
        return `${result}mínúta`
      }
      return `${result}mínútu`
    case 'h':
      return withoutSuffix ? 'klukkustund' : 'klukkustund'
    case 'hh':
      if (plural(timeValueAsNumber)) {
        return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum')
      }
      return `${result}klukkustund`
    case 'd':
      if (withoutSuffix) {
        return 'dagur'
      }
      return isFuture ? 'dag' : 'degi'
    case 'dd':
      if (plural(timeValueAsNumber)) {
        if (withoutSuffix) {
          return `${result}dagar`
        }
        return `${result}${isFuture ? 'daga' : 'dögum'}`
      }
      if (withoutSuffix) {
        return `${result}dagur`
      }
      return `${result}${isFuture ? 'dag' : 'degi'}`
    case 'w':
      if (withoutSuffix) {
        return 'vika'
      }
      return isFuture ? 'viku' : 'viku'
    case 'ww':
      if (plural(timeValueAsNumber)) {
        if (withoutSuffix) {
          return `${result}vikur`
        }
        return `${result}${isFuture ? 'vikur' : 'vikum'}`
      }
      if (withoutSuffix) {
        return `${result}vikur`
      }
      return `${result}${isFuture ? 'viku' : 'viku'}`
    case 'M':
      if (withoutSuffix) {
        return 'mánuður'
      }
      return isFuture ? 'mánuð' : 'mánuði'
    case 'MM':
      if (plural(timeValueAsNumber)) {
        if (withoutSuffix) {
          return `${result}mánuðir`
        }
        return `${result}${isFuture ? 'mánuði' : 'mánuðum'}`
      }
      if (withoutSuffix) {
        return `${result}mánuður`
      }
      return `${result}${isFuture ? 'mánuð' : 'mánuði'}`
    case 'y':
      return withoutSuffix || isFuture ? 'ár' : 'ári'
    case 'yy':
      if (plural(timeValueAsNumber)) {
        return `${result}${withoutSuffix || isFuture ? 'ár' : 'árum'}`
      }
      return `${result}${withoutSuffix || isFuture ? 'ár' : 'ári'}`
    default:
      return ''
  }
}

const localeIs: Readonly<Locale> = {
  name: 'is',
  weekdays: [
    'sunnudagur',
    'mánudagur',
    'þriðjudagur',
    'miðvikudagur',
    'fimmtudagur',
    'föstudagur',
    'laugardagur',
  ],
  weekdaysShort: ['sun', 'mán', 'þri', 'mið', 'fim', 'fös', 'lau'],
  weekdaysMin: ['Su', 'Má', 'Þr', 'Mi', 'Fi', 'Fö', 'La'],
  months: [
    'janúar',
    'febrúar',
    'mars',
    'apríl',
    'maí',
    'júní',
    'júlí',
    'ágúst',
    'september',
    'október',
    'nóvember',
    'desember',
  ],
  monthsShort: ['jan', 'feb', 'mar', 'apr', 'maí', 'jún', 'júl', 'ágú', 'sep', 'okt', 'nóv', 'des'],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY [kl.] H:mm',
    LLLL: 'dddd, D. MMMM YYYY [kl.] H:mm',
    l: 'DD.MM.YYYY',
    ll: 'D. MMMM YYYY',
    lll: 'D. MMMM YYYY [kl.] H:mm',
    llll: 'dddd, D. MMMM YYYY [kl.] H:mm',
  },
  calendar: {
    sameDay: '[í dag kl.] LT',
    nextDay: '[á morgun kl.] LT',
    nextWeek: 'dddd [kl.] LT',
    lastDay: '[í gær kl.] LT',
    lastWeek: '[síðasta] dddd [kl.] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'eftir %s',
    past: 'fyrir %s síðan',
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
    // Icelandic doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeIs
