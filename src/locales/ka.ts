/**
 * Georgian [ka]
 */

import type { DayNames, DayNamesStandaloneFormat, Locale } from '~/plugins/locale'

const dayNamesFormat: DayNames = [
  'კვირას',
  'ორშაბათს',
  'სამშაბათს',
  'ოთხშაბათს',
  'ხუთშაბათს',
  'პარასკევს',
  'შაბათს',
]
const dayNamesStandalone: DayNames = [
  'კვირა',
  'ორშაბათი',
  'სამშაბათი',
  'ოთხშაბათი',
  'ხუთშაბათი',
  'პარასკევი',
  'შაბათი',
]
const weekdays: DayNamesStandaloneFormat = {
  standalone: dayNamesStandalone,
  format: dayNamesFormat,
  isFormat: /(წინა|შემდეგ)/,
}

const localeKa: Readonly<Locale> = {
  name: 'ka',
  weekdays,
  weekdaysShort: ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
  weekdaysMin: ['კვ', 'ორ', 'სა', 'ოთ', 'ხუ', 'პა', 'შა'],
  months: [
    'იანვარი',
    'თებერვალი',
    'მარტი',
    'აპრილი',
    'მაისი',
    'ივნისი',
    'ივლისი',
    'აგვისტო',
    'სექტემბერი',
    'ოქტომბერი',
    'ნოემბერი',
    'დეკემბერი',
  ],
  monthsShort: ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
  ordinal: (n) => {
    if (n === 0) {
      return `${n}`
    }
    if (n === 1) {
      return `${n}-ლი`
    }
    if (n < 20 || (n <= 100 && n % 20 === 0) || n % 100 === 0) {
      return `მე-${n}`
    }
    return `${n}-ე`
  },
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'dddd, D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[დღეს] LT[-ზე]',
    nextDay: '[ხვალ] LT[-ზე]',
    lastDay: '[გუშინ] LT[-ზე]',
    nextWeek: '[შემდეგ] dddd LT[-ზე]',
    lastWeek: '[წინა] dddd LT[-ზე]',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s შემდეგ',
    past: '%s წინ',
    s: 'წამი',
    ss: '%d წამი',
    m: 'წუთი',
    mm: '%d წუთი',
    h: 'საათი',
    hh: '%d საათის',
    d: 'დღეს',
    dd: '%d დღის განმავლობაში',
    w: 'დღეს',
    ww: '%d კვირის',
    M: 'თვის',
    MM: '%d თვის',
    y: 'წელი',
    yy: '%d წლის',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Georgian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeKa
