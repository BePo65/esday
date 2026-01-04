/**
 * Kyrgyz [ky]
 */

import type { Locale } from '~/plugins/locale'

const localeKy: Readonly<Locale> = {
  name: 'ky',
  weekdays: ['Жекшемби', 'Дүйшөмбү', 'Шейшемби', 'Шаршемби', 'Бейшемби', 'Жума', 'Ишемби'],
  weekdaysShort: ['Жек', 'Дүй', 'Шей', 'Шар', 'Бей', 'Жум', 'Ише'],
  weekdaysMin: ['Жк', 'Дй', 'Шй', 'Шр', 'Бй', 'Жм', 'Иш'],
  months: [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ],
  monthsShort: [
    'янв',
    'фев',
    'март',
    'апр',
    'май',
    'июнь',
    'июль',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ],
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  dayOfMonthOrdinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
  ordinal: (n) => `${n}`,
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
    sameDay: '[Бүгүн саат] LT',
    nextDay: '[Эртең саат] LT',
    nextWeek: 'dddd [саат] LT',
    lastDay: '[Кечээ саат] LT',
    lastWeek: '[Өткөн аптанын] dddd [күнү] [саат] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s ичинде',
    past: '%s мурун',
    s: 'бирнече секунд',
    ss: '%d секунд',
    m: 'бир мүнөт',
    mm: '%d мүнөт',
    h: 'бир саат',
    hh: '%d саат',
    d: 'бир күн',
    dd: '%d күн',
    w: 'бир жумада',
    ww: '%d аптада',
    M: 'бир ай',
    MM: '%d ай',
    y: 'бир жыл',
    yy: '%d жыл',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Kyrgyz doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeKy
