/**
 * Klingon [tlh]
 */

import type { Locale, RelativeTimeElementFunction } from '~/plugins/locale'

const numbersNouns = ['pagh', 'wa’', 'cha’', 'wej', 'loS', 'vagh', 'jav', 'Soch', 'chorgh', 'Hut']

function numberAsNoun(n: number) {
  const hundred = Math.floor((n % 1000) / 100)
  const ten = Math.floor((n % 100) / 10)
  const one = n % 10
  let noun = ''
  if (hundred > 0) {
    noun += `${numbersNouns[hundred]}vatlh`
  }
  if (ten > 0) {
    noun += `${noun !== '' ? ' ' : ''}${numbersNouns[ten]}maH`
  }
  if (one > 0) {
    noun += (noun !== '' ? ' ' : '') + numbersNouns[one]
  }
  return noun === '' ? 'pagh' : noun
}

function translateFuture(timeValue: string | number) {
  const timeValueAsString = timeValue.toString()
  let time = timeValueAsString
  time = timeValueAsString.includes('jaj')
    ? `${time.slice(0, -3)}leS`
    : timeValueAsString.includes('jar')
      ? `${time.slice(0, -3)}waQ`
      : timeValueAsString.includes('DIS')
        ? `${time.slice(0, -3)}nem`
        : `${time} pIq`
  return time
}

function translatePast(timeValue: string | number) {
  const timeValueAsString = timeValue.toString()
  let time = timeValueAsString
  time = timeValueAsString.includes('jaj')
    ? `${time.slice(0, -3)}Hu’`
    : timeValueAsString.includes('jar')
      ? `${time.slice(0, -3)}wen`
      : timeValueAsString.includes('DIS')
        ? `${time.slice(0, -3)}ben`
        : `${timeValueAsString} ret`
  return time
}

// eslint-disable-next-line unused-imports/no-unused-vars
const relativeTimeFormatter: RelativeTimeElementFunction = (
  timeValue: string | number,
  _withoutSuffix: boolean,
  token: string,
  _isFuture: boolean,
) => {
  const numberNoun = numberAsNoun(+timeValue)
  switch (token) {
    case 'ss':
      return `${numberNoun} lup`
    case 'mm':
      return `${numberNoun} tup`
    case 'hh':
      return `${numberNoun} rep`
    case 'dd':
      return `${numberNoun} jaj`
    case 'ww':
      return `${numberNoun} puj`
    case 'MM':
      return `${numberNoun} jar`
    case 'yy':
      return `${numberNoun} DIS`
    default:
      return ''
  }
}

const localeTlh: Readonly<Locale> = {
  name: 'tlh',
  weekdays: ['lojmItjaj', 'DaSjaj', 'povjaj', 'ghItlhjaj', 'loghjaj', 'buqjaj', 'ghInjaj'],
  weekdaysShort: ['lojmItjaj', 'DaSjaj', 'povjaj', 'ghItlhjaj', 'loghjaj', 'buqjaj', 'ghInjaj'],
  weekdaysMin: ['lojmItjaj', 'DaSjaj', 'povjaj', 'ghItlhjaj', 'loghjaj', 'buqjaj', 'ghInjaj'],
  months: [
    'tera’ jar wa’',
    'tera’ jar cha’',
    'tera’ jar wej',
    'tera’ jar loS',
    'tera’ jar vagh',
    'tera’ jar jav',
    'tera’ jar Soch',
    'tera’ jar chorgh',
    'tera’ jar Hut',
    'tera’ jar wa’maH',
    'tera’ jar wa’maH wa’',
    'tera’ jar wa’maH cha’',
  ],
  monthsShort: [
    'jar wa’',
    'jar cha’',
    'jar wej',
    'jar loS',
    'jar vagh',
    'jar jav',
    'jar Soch',
    'jar chorgh',
    'jar Hut',
    'jar wa’maH',
    'jar wa’maH wa’',
    'jar wa’maH cha’',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm',
    l: 'DD.MM.YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'dddd, D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[DaHjaj] LT',
    nextDay: '[wa’leS] LT',
    nextWeek: 'LLL',
    lastDay: '[wa’Hu’] LT',
    lastWeek: 'LLL',
    sameElse: 'L',
  },
  relativeTime: {
    future: translateFuture,
    past: translatePast,
    s: 'puS lup',
    ss: relativeTimeFormatter,
    m: 'wa’ tup',
    mm: relativeTimeFormatter,
    h: 'wa’ rep',
    hh: relativeTimeFormatter,
    d: 'wa’ jaj',
    dd: relativeTimeFormatter,
    w: 'wa’ hogh',
    ww: relativeTimeFormatter,
    M: 'wa’ jar',
    MM: relativeTimeFormatter,
    y: 'wa’ DIS',
    yy: relativeTimeFormatter,
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Welsh doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeTlh
