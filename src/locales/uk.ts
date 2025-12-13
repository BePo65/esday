import type { EsDay } from 'esday'
import type {
  Locale,
  MonthNames,
  MonthNamesStandaloneFormat,
  RelativeTimeElementFunction,
} from '~/plugins/locale'

const monthFormat: MonthNames = [
  'січня',
  'лютого',
  'березня',
  'квітня',
  'травня',
  'червня',
  'липня',
  'серпня',
  'вересня',
  'жовтня',
  'листопада',
  'грудня',
]
const monthStandalone: MonthNames = [
  'січень',
  'лютий',
  'березень',
  'квітень',
  'травень',
  'червень',
  'липень',
  'серпень',
  'вересень',
  'жовтень',
  'листопад',
  'грудень',
]
const months: MonthNamesStandaloneFormat = {
  standalone: monthStandalone,
  format: monthFormat,
}

function processHoursFunction(prefix: string) {
  return function (this: EsDay) {
    return `${prefix}о${this.hour() === 11 ? 'б' : ''}] LT`
  }
}

function plural(timeStrings: string[], timeValue: number) {
  const forms = timeStrings
  return timeValue % 10 === 1 && timeValue % 100 !== 11
    ? forms[0]
    : timeValue % 10 >= 2 && timeValue % 10 <= 4 && (timeValue % 100 < 10 || timeValue % 100 >= 20)
      ? forms[1]
      : forms[2]
}
const relativeTimeFormatter: RelativeTimeElementFunction = (
  timeValue: string | number,
  withoutSuffix: boolean,
  token: string,
  _isFuture: boolean,
) => {
  const formats = {
    ss: withoutSuffix ? ['секунда', 'секунди', 'секунд'] : ['секунду', 'секунди', 'секунд'],
    mm: withoutSuffix ? ['хвилина', 'хвилини', 'хвилин'] : ['хвилину', 'хвилини', 'хвилин'],
    hh: withoutSuffix ? ['година', 'години', 'годин'] : ['годину', 'години', 'годин'],
    dd: ['день', 'дні', 'днів'],
    ww: ['тиждень', 'тижні', 'тижнів'],
    MM: ['місяць', 'місяці', 'місяців'],
    yy: ['рік', 'роки', 'років'],
  }
  if (token === 'm') {
    return withoutSuffix ? 'хвилина' : 'хвилину'
  }
  if (token === 'h') {
    return withoutSuffix ? 'година' : 'годину'
  }

  return `${timeValue} ${plural(formats[token as keyof typeof formats], +timeValue)}`
}

const localeUk: Readonly<Locale> = {
  name: 'uk',
  weekdays: ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п’ятниця', 'субота'],
  weekdaysShort: ['ндл', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
  weekdaysMin: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  months,
  monthsShort: [
    'січ',
    'лют',
    'бер',
    'квіт',
    'трав',
    'черв',
    'лип',
    'серп',
    'вер',
    'жовт',
    'лист',
    'груд',
  ],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY р.',
    LLL: 'D MMMM YYYY р., HH:mm',
    LLLL: 'dddd, D MMMM YYYY р., HH:mm',
    l: 'DD.MM.YYYY',
    ll: 'D MMMM YYYY р.',
    lll: 'D MMMM YYYY р., HH:mm',
    llll: 'dddd, D MMMM YYYY р., HH:mm',
  },
  calendar: {
    sameDay: processHoursFunction('[Сьогодні '),
    nextDay: processHoursFunction('[Завтра '),
    lastDay: processHoursFunction('[Вчора '),
    nextWeek: processHoursFunction('[У] dddd ['),
    lastWeek() {
      switch (this.day()) {
        case 0:
        case 3:
        case 5:
        case 6:
          return processHoursFunction('[Минулої] dddd [').call(this)
        case 1:
        case 2:
        case 4:
          return processHoursFunction('[Минулого] dddd [').call(this)
        default:
          return ''
      }
    },
    sameElse: 'L',
  },
  relativeTime: {
    future: 'за %s',
    past: '%s тому',
    s: 'декілька секунд',
    ss: relativeTimeFormatter,
    m: relativeTimeFormatter,
    mm: relativeTimeFormatter,
    h: relativeTimeFormatter,
    hh: relativeTimeFormatter,
    d: 'день',
    dd: relativeTimeFormatter,
    w: 'тиждень',
    ww: relativeTimeFormatter,
    M: 'місяць',
    MM: relativeTimeFormatter,
    y: 'рік',
    yy: relativeTimeFormatter,
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Ukrainian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeUk
