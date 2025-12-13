/**
 * Serbian Cyrillic [sr-CYRL]
 */

import type { EsDay } from 'esday'
import localeSr from '~/locales/sr'
import type { RelativeTimeElementFunction } from '~/plugins/locale'
import { cloneLocale, setLocaleProperty } from '~/plugins/locale'

const localeSrCyrl = cloneLocale(localeSr)

const weekdays = ['Недеља', 'Понедељак', 'Уторак', 'Среда', 'Четвртак', 'Петак', 'Субота']
const weekdaysShort = ['Нед.', 'Пон.', 'Уто.', 'Сре.', 'Чет.', 'Пет.', 'Суб.']
const weekdaysMin = ['не', 'по', 'ут', 'ср', 'че', 'пе', 'су']
const months = [
  'Јануар',
  'Фебруар',
  'Март',
  'Април',
  'Мај',
  'Јун',
  'Јул',
  'Август',
  'Септембар',
  'Октобар',
  'Новембар',
  'Децембар',
]
const monthsShort = [
  'Јан.',
  'Феб.',
  'Мар.',
  'Апр.',
  'Мај',
  'Јун',
  'Јул',
  'Авг.',
  'Сеп.',
  'Окт.',
  'Нов.',
  'Дец.',
]

const calendar = {
  sameDay: '[данас у] LT',
  nextDay: '[сутра у] LT',
  nextWeek(this: EsDay) {
    switch (this.day()) {
      case 0:
        return '[у] [недељу] [у] LT'
      case 3:
        return '[у] [среду] [у] LT'
      case 6:
        return '[у] [суботу] [у] LT'
      case 1:
      case 2:
      case 4:
      case 5:
        return '[у] dddd [у] LT'
      default:
        return ''
    }
  },
  lastDay: '[јуче у] LT',
  lastWeek(this: EsDay) {
    const lastWeekDays = [
      '[прошле] [недеље] [у] LT',
      '[прошлог] [понедељка] [у] LT',
      '[прошлог] [уторка] [у] LT',
      '[прошле] [среде] [у] LT',
      '[прошлог] [четвртка] [у] LT',
      '[прошлог] [петка] [у] LT',
      '[прошле] [суботе] [у] LT',
    ]
    return lastWeekDays[this.day()]
  },
  sameElse: 'L',
}

function plural(timeValue: number, wordKey: string[]) {
  if (
    timeValue % 10 >= 1 &&
    timeValue % 10 <= 4 &&
    (timeValue % 100 < 10 || timeValue % 100 >= 20)
  ) {
    return timeValue % 10 === 1 ? wordKey[0] : wordKey[1]
  }
  return wordKey[2]
}
const relativeTimeFormatter: RelativeTimeElementFunction = (
  timeValue: string | number,
  withoutSuffix: boolean,
  token: string,
  isFuture: boolean,
) => {
  const formats = {
    ss: ['%d секунди', '%d секунде', '%d секунди'],
    m: ['један минут', 'једног минута'],
    mm: ['%d минут', '%d минута', '%d минута'],
    h: ['један сат', 'једног сата'],
    hh: ['%d сат', '%d сата', '%d сати'],
    d: ['један дан', 'једног дана'],
    dd: ['%d дан', '%d дана', '%d дана'],
    w: ['један недељу', 'једног недеља'],
    ww: ['%d недељу', '%d недеља', '%d недеља'],
    M: ['један месец', 'једног месеца'],
    MM: ['%d месец', '%d месеца', '%d месеци'],
    y: ['једну годину', 'једне године'],
    yy: ['%d годину', '%d године', '%d година'],
  }

  const wordKey = formats[token as keyof typeof formats]

  if (token.length === 1) {
    // Nominativ
    if (token === 'y' && withoutSuffix) return 'једна година'
    return isFuture || withoutSuffix ? wordKey[0] : wordKey[1]
  }

  const word = plural(+timeValue, wordKey)
  // Nominativ
  if (token === 'yy' && withoutSuffix && word === '%d годину') return `${timeValue} година`

  return word.replace('%d', timeValue.toString())
}
const relativeTime = {
  future: 'за %s',
  past: 'пре %s',
  s: 'неколико секунди',
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
}

// Use 'setLocaleProperty' as all properties are 'readonly'
setLocaleProperty(localeSrCyrl, 'name', 'sr-CYRL')
setLocaleProperty(localeSrCyrl, 'weekdays', weekdays)
setLocaleProperty(localeSrCyrl, 'weekdaysShort', weekdaysShort)
setLocaleProperty(localeSrCyrl, 'weekdaysMin', weekdaysMin)
setLocaleProperty(localeSrCyrl, 'months', months)
setLocaleProperty(localeSrCyrl, 'monthsShort', monthsShort)
setLocaleProperty(localeSrCyrl, 'calendar', calendar)
setLocaleProperty(localeSrCyrl, 'relativeTime', relativeTime)

export default localeSrCyrl
