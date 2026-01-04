/*
 * Maori [mi]
 */
import type { Locale } from '~/plugins/locale'

const localeMi: Readonly<Locale> = {
  name: 'mi',
  weekdays: ['Rātapu', 'Mane', 'Tūrei', 'Wenerei', 'Tāite', 'Paraire', 'Hātarei'],
  weekdaysShort: ['Ta', 'Ma', 'Tū', 'We', 'Tāi', 'Pa', 'Hā'],
  weekdaysMin: ['Ta', 'Ma', 'Tū', 'We', 'Tāi', 'Pa', 'Hā'],
  months: [
    'Kohi-tāte',
    'Hui-tanguru',
    'Poutū-te-rangi',
    'Paenga-whāwhā',
    'Haratua',
    'Pipiri',
    'Hōngoingoi',
    'Here-turi-kōkā',
    'Mahuru',
    'Whiringa-ā-nuku',
    'Whiringa-ā-rangi',
    'Hakihea',
  ],
  monthsShort: [
    'Kohi',
    'Hui',
    'Pou',
    'Pae',
    'Hara',
    'Pipi',
    'Hōngoi',
    'Here',
    'Mahu',
    'Whi-nu',
    'Whi-ra',
    'Haki',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY [i] HH:mm',
    LLLL: 'dddd, D MMMM YYYY [i] HH:mm',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY [i] HH:mm',
    llll: 'dddd, D MMMM YYYY [i] HH:mm',
  },
  calendar: {
    sameDay: '[i teie mahana, i] LT',
    nextDay: '[apopo i] LT',
    nextWeek: 'dddd [i] LT',
    lastDay: '[inanahi i] LT',
    lastWeek: 'dddd [whakamutunga i] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'i roto i %s',
    past: '%s i mua',
    s: 'te hēkona ruarua',
    ss: '%d hēkona',
    m: 'he meneti',
    mm: '%d meneti',
    h: 'te haora',
    hh: '%d haora',
    d: 'he ra',
    dd: '%d ra',
    w: 'he wiki',
    ww: '%d wiki',
    M: 'he marama',
    MM: '%d marama',
    y: 'he tau',
    yy: '%d tau',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Maori doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeMi
