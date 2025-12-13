/**
 * Korean [ko]
 */

import type { Locale } from '~/plugins/locale'

const localeKo: Readonly<Locale> = {
  name: 'ko',
  weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
  weekdaysMin: ['일', '월', '화', '수', '목', '금', '토'],
  months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthsShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  ordinal: (n) => `${n}일`,
  weekStart: 0, // Sunday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'A h:mm',
    LTS: 'A h:mm:ss',
    L: 'YYYY.MM.DD.',
    LL: 'YYYY년 MMMM D일',
    LLL: 'YYYY년 MMMM D일 A h:mm',
    LLLL: 'YYYY년 MMMM D일 dddd A h:mm',
    l: 'YYYY.MM.DD.',
    ll: 'YYYY년 MMMM D일',
    lll: 'YYYY년 MMMM D일 A h:mm',
    llll: 'YYYY년 MMMM D일 dddd A h:mm',
  },
  calendar: {
    sameDay: '오늘 LT',
    nextDay: '내일 LT',
    nextWeek: 'dddd LT',
    lastDay: '어제 LT',
    lastWeek: '지난주 dddd LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s 후',
    past: '%s 전',
    s: '몇 초',
    ss: '%d초',
    m: '1분',
    mm: '%d분',
    h: '한 시간',
    hh: '%d시간',
    d: '하루',
    dd: '%d주후',
    w: '일주일',
    ww: '%d일',
    M: '한 달',
    MM: '%d달',
    y: '일 년',
    yy: '%d년',
  },
  // eslint-disable-next-line  unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => {
    return hour < 12 ? '오전' : '오후'
  },
}

export default localeKo
