/**
 * Esperanto [eo]
 */

import type { Locale } from '~/plugins/locale'

const localeEo: Readonly<Locale> = {
  name: 'eo',
  weekdays: ['dimanĉo', 'lundo', 'mardo', 'merkredo', 'ĵaŭdo', 'vendredo', 'sabato'],
  weekdaysShort: ['dim', 'lun', 'mard', 'merk', 'ĵaŭ', 'ven', 'sab'],
  weekdaysMin: ['di', 'lu', 'ma', 'me', 'ĵa', 've', 'sa'],
  months: [
    'januaro',
    'februaro',
    'marto',
    'aprilo',
    'majo',
    'junio',
    'julio',
    'aŭgusto',
    'septembro',
    'oktobro',
    'novembro',
    'decembro',
  ],
  monthsShort: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aŭg', 'sep', 'okt', 'nov', 'dec'],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'D[-a de] MMMM, YYYY',
    LLL: 'D[-a de] MMMM, YYYY HH:mm',
    LLLL: 'dddd, [la] D[-a de] MMMM, YYYY HH:mm',
    l: 'YYYY-MM-DD',
    ll: 'D[-a de] MMMM, YYYY',
    lll: 'D[-a de] MMMM, YYYY HH:mm',
    llll: 'dddd, [la] D[-a de] MMMM, YYYY HH:mm',
  },
  calendar: {
    sameDay: '[Hodiaŭ je] LT',
    nextDay: '[Morgaŭ je] LT',
    nextWeek: 'dddd[n je] LT',
    lastDay: '[Hieraŭ je] LT',
    lastWeek: '[pasintan] dddd[n je] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'post %s',
    past: 'antaŭ %s',
    s: 'sekundoj',
    ss: '%d sekundoj',
    m: 'minuto',
    mm: '%d minutoj',
    h: 'horo',
    hh: '%d horoj',
    d: 'tago',
    dd: '%d tagoj',
    w: 'semajno',
    ww: '%d semajnoj',
    M: 'monato',
    MM: '%d monatoj',
    y: 'jaro',
    yy: '%d jaroj',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Esperanto doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeEo
