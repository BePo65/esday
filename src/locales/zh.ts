/**
 * Chinese [zh]
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

const localeZh: Readonly<Locale> = {
  name: 'zh',
  weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  weekdaysMin: ['日', '一', '二', '三', '四', '五', '六'],
  months: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ],
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
  ordinal: (number: number, period?: string) => {
    const p = period ?? ''
    switch (p) {
      case 'd':
      case 'D':
      case 'DDD':
        return `${number}日`
      case 'M':
        return `${number}月`
      case 'w':
      case 'W':
        return `${number}周`
      default:
        return number.toString()
    }
  },
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY/MM/DD',
    LL: 'YYYY年M月D日',
    LLL: 'YYYY年M月D日Ah点mm分',
    LLLL: 'YYYY年M月D日ddddAh点mm分',
    l: 'YYYY/M/D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm',
  },
  calendar: {
    sameDay: '[今天]LT',
    nextDay: '[明天]LT',
    nextWeek(this: EsDay, refDate?: EsDay) {
      if (refDate?.week?.() !== this.week?.()) {
        return '[下]dddLT'
      }
      return '[本]dddLT'
    },
    lastDay: '[昨天]LT',
    lastWeek(this: EsDay, refDate?: EsDay) {
      if (this.week?.() !== refDate?.week?.()) {
        return '[上]dddLT'
      }
      return '[本]dddLT'
    },
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '几秒',
    ss: '%d 秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    w: '1 周',
    ww: '%d 周',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年',
  },
  meridiem: (hour, minute) => {
    const hm = hour * 100 + minute
    if (hm < 600) {
      return '凌晨'
    }
    if (hm < 900) {
      return '早上'
    }
    if (hm < 1100) {
      return '上午'
    }
    if (hm < 1300) {
      return '中午'
    }
    if (hm < 1800) {
      return '下午'
    }
    return '晚上'
  },
}

export default localeZh
