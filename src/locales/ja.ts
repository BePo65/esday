/**
 * Japanese [ja]
 *
 * This locale requires the week plugin, when the calendar property
 * is used (e.g. in the calendar plugin).
 */

import type { EsDay } from 'esday'
import type { Locale } from '~/plugins/locale'

declare module 'esday' {
  interface EsDay {
    week(): number
    week(newWeek: number): EsDay
  }
}

const localeJa: Readonly<Locale> = {
  name: 'ja',
  weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
  weekdaysMin: ['日', '月', '火', '水', '木', '金', '土'],
  months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthsShort: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  ordinal: (n) => `${n}日`,
  weekStart: 0, // Sunday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY/MM/DD',
    LL: 'YYYY年M月D日',
    LLL: 'YYYY年M月D日 HH:mm',
    LLLL: 'YYYY年M月D日 dddd HH:mm',
    l: 'YYYY/MM/DD',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日(ddd) HH:mm',
  },
  calendar: {
    sameDay: '[今日] LT',
    nextDay: '[明日] LT',
    nextWeek(this: EsDay, refDate?: EsDay) {
      if (refDate?.week?.() !== this.week?.()) {
        return '[来週]dddd LT'
      }
      return 'dddd LT'
    },
    lastDay: '[昨日] LT',
    lastWeek(this: EsDay, refDate?: EsDay) {
      if (this.week?.() !== refDate?.week?.()) {
        return '[先週]dddd LT'
      }
      return 'dddd LT'
    },
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s後',
    past: '%s前',
    s: '数秒',
    ss: '%d秒',
    m: '1分',
    mm: '%d分',
    h: '1時間',
    hh: '%d時間',
    d: '1日',
    dd: '%d日',
    w: '1週間後',
    ww: '%d週間後',
    M: '1ヶ月',
    MM: '%dヶ月',
    y: '1年',
    yy: '%d年',
  },
  meridiem: (hour) => (hour < 12 ? '午前' : '午後'),
}

export default localeJa
