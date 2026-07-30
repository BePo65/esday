/**
 * Test for locale 'Russian [ru]'
 */

import type { EsDay } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/ru'
import type {
  CalendarSpecValFunction,
  RelativeTimeElementFunction,
  RelativeTimeKeys,
} from '~/plugins/locale'

describe('locale ru', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('ru')
  })

  it('should have 7 weekday names', () => {
    expect(locale.weekdays).toBeDefined()
    if (Array.isArray(locale.weekdays)) {
      expect(locale.weekdays.length).toBe(7)
    } else {
      expect(locale.weekdays).toBeTypeOf('object')
    }
  })

  it('should have 7 short weekday names', () => {
    expect(locale.weekdaysShort).toBeDefined()
    expect(locale.weekdaysShort?.length).toBe(7)
  })

  it('should have 7 minimal weekday names', () => {
    expect(locale.weekdaysMin).toBeDefined()
    expect(locale.weekdaysMin?.length).toBe(7)
  })

  it('should have 12 month names', () => {
    expect(locale.months).toBeDefined()
    if (Array.isArray(locale.months)) {
      expect(locale.months.length).toBe(12)
    } else {
      expect(locale.months).toBeTypeOf('object')
    }
  })

  it('should have 12 short month names', () => {
    expect(locale.monthsShort).toBeDefined()
    if (Array.isArray(locale.monthsShort)) {
      expect(locale.monthsShort.length).toBe(12)
    } else {
      expect(locale.monthsShort).toBeTypeOf('object')
    }
  })

  it('should have a property named "dayOfMonthOrdinalParse"', () => {
    expect(locale.dayOfMonthOrdinalParse).toBeDefined()
    expect(locale.dayOfMonthOrdinalParse).toBeInstanceOf(RegExp)
  })

  it('should have a method named "ordinal"', () => {
    expect(locale.ordinal).toBeDefined()
    expect(locale.ordinal).toBeTypeOf('function')
    expect(locale.ordinal(2)).toBe('2')
  })

  it('should have numeric property named weekStart', () => {
    expect(locale.weekStart).toBeDefined()
    expect(locale.weekStart).toBeTypeOf('number')
    expect(locale.weekStart).toSatisfy((value: number) => value >= 0 && value <= 6)
  })

  it('should have numeric property named yearStart', () => {
    expect(locale.yearStart).toBeDefined()
    expect(locale.yearStart).toBeTypeOf('number')
    expect(locale.yearStart).toSatisfy((value: number) => value >= 1 && value <= 7)
  })

  it('should have have an object named "formats" with 10 properties', () => {
    expect(locale.formats).toBeDefined()
    expect(locale.formats).toBeTypeOf('object')
    expect(Object.keys(locale.formats ?? {})).toHaveLength(10)
  })

  it('should have an object named "calendar"', () => {
    expect(locale.calendar).toBeDefined()
    expect(locale.calendar).toBeTypeOf('object')
    expect(Object.keys(locale.calendar ?? {}).length).toBe(6)
  })

  it.each([
    {
      thisWeek: 0,
      refWeek: 1,
      weekday: 0,
      expected: '[В следующее] dddd, [в] LT',
    },
    {
      thisWeek: 0,
      refWeek: 1,
      weekday: 1,
      expected: '[В следующий] dddd, [в] LT',
    },
    {
      thisWeek: 0,
      refWeek: 1,
      weekday: 2,
      expected: '[В следующий] dddd, [в] LT',
    },
    {
      thisWeek: 0,
      refWeek: 1,
      weekday: 3,
      expected: '[В следующую] dddd, [в] LT',
    },
    {
      thisWeek: 0,
      refWeek: 1,
      weekday: 4,
      expected: '[В следующий] dddd, [в] LT',
    },
    {
      thisWeek: 0,
      refWeek: 1,
      weekday: 5,
      expected: '[В следующую] dddd, [в] LT',
    },
    {
      thisWeek: 0,
      refWeek: 1,
      weekday: 6,
      expected: '[В следующую] dddd, [в] LT',
    },
    { thisWeek: 0, refWeek: 1, weekday: 7, expected: '' },
    { thisWeek: 0, refWeek: 0, weekday: 0, expected: '[В] dddd, [в] LT' },
    { thisWeek: 0, refWeek: 0, weekday: 2, expected: '[Во] dddd, [в] LT' },
  ])(
    'should format nextWeek with calendar for weekday "$weekday"',
    ({ thisWeek, refWeek, weekday, expected }) => {
      const thisDate = { week: () => thisWeek, day: () => weekday } as EsDay
      const referenceDate = {
        week: () => refWeek,
        day: () => weekday,
      } as EsDay
      const nextWeek = locale.calendar.nextWeek as CalendarSpecValFunction

      expect(nextWeek.call(thisDate, referenceDate)).toBe(expected)
    },
  )

  it.each([
    {
      thisWeek: 0,
      refWeek: 1,
      weekday: 0,
      expected: '[В прошлое] dddd, [в] LT',
    },
    {
      thisWeek: 0,
      refWeek: 1,
      weekday: 1,
      expected: '[В прошлый] dddd, [в] LT',
    },
    {
      thisWeek: 0,
      refWeek: 1,
      weekday: 2,
      expected: '[В прошлый] dddd, [в] LT',
    },
    {
      thisWeek: 0,
      refWeek: 1,
      weekday: 3,
      expected: '[В прошлую] dddd, [в] LT',
    },
    {
      thisWeek: 0,
      refWeek: 1,
      weekday: 4,
      expected: '[В прошлый] dddd, [в] LT',
    },
    {
      thisWeek: 0,
      refWeek: 1,
      weekday: 5,
      expected: '[В прошлую] dddd, [в] LT',
    },
    {
      thisWeek: 0,
      refWeek: 1,
      weekday: 6,
      expected: '[В прошлую] dddd, [в] LT',
    },
    { thisWeek: 0, refWeek: 1, weekday: 7, expected: '' },
    { thisWeek: 0, refWeek: 0, weekday: 0, expected: '[В] dddd, [в] LT' },
    { thisWeek: 0, refWeek: 0, weekday: 2, expected: '[Во] dddd, [в] LT' },
  ])(
    'should format lastWeek with calendar for weekday "$weekday"',
    ({ thisWeek, refWeek, weekday, expected }) => {
      const thisDate = { week: () => thisWeek, day: () => weekday } as EsDay
      const referenceDate = {
        week: () => refWeek,
        day: () => weekday,
      } as EsDay
      const lastWeek = locale.calendar.lastWeek as CalendarSpecValFunction

      expect(lastWeek.call(thisDate, referenceDate)).toBe(expected)
    },
  )

  it('should have an object named "relativeTime"', () => {
    expect(locale.relativeTime).toBeDefined()
    expect(locale.relativeTime).toBeTypeOf('object')
    expect(Object.keys(locale.relativeTime ?? {}).length).toBe(16)
  })

  it.each([
    {
      token: 'ss',
      value: 1,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '1 секунду',
    },
    {
      token: 'ss',
      value: 2,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '2 секунды',
    },
    {
      token: 'ss',
      value: 15,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: '15 секунд',
    },
    {
      token: 'ss',
      value: 36,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: '36 секунд',
    },
    {
      token: 'ss',
      value: 1,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: '1 секунда',
    },
    {
      token: 'ss',
      value: 2,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: '2 секунды',
    },
    {
      token: 'ss',
      value: 15,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: '15 секунд',
    },
    {
      token: 'ss',
      value: 36,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: '36 секунд',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: false,
      expected: 'минуту',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: false,
      expected: 'минута',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: true,
      expected: 'минуту',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: true,
      expected: 'минута',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '1 минуту',
    },
    {
      token: 'mm',
      value: 2,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '2 минуты',
    },
    {
      token: 'mm',
      value: 15,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '15 минут',
    },
    {
      token: 'mm',
      value: 36,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '36 минут',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '1 минута',
    },
    {
      token: 'mm',
      value: 2,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '2 минуты',
    },
    {
      token: 'mm',
      value: 15,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '15 минут',
    },
    {
      token: 'mm',
      value: 36,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '36 минут',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '1 час',
    },
    {
      token: 'hh',
      value: 2,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: '2 часа',
    },
    {
      token: 'hh',
      value: 5,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: '5 часов',
    },
    {
      token: 'hh',
      value: 11,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '11 часов',
    },
    {
      token: 'dd',
      value: 1,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: '1 день',
    },
    {
      token: 'dd',
      value: 2,
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: '2 дня',
    },
    {
      token: 'dd',
      value: 15,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: '15 дней',
    },
    {
      token: 'dd',
      value: 36,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '36 дней',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '1 месяц',
    },
    {
      token: 'MM',
      value: 2,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '2 месяца',
    },
    {
      token: 'MM',
      value: 5,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '5 месяцев',
    },
    {
      token: 'MM',
      value: 11,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '11 месяцев',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '1 год',
    },
    {
      token: 'yy',
      value: 2,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '2 года',
    },
    {
      token: 'yy',
      value: 15,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '15 лет',
    },
    {
      token: 'yy',
      value: 22,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '22 года',
    },
    {
      token: 'yy',
      value: 36,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '36 лет',
    },
  ])(
    'should format relativeTime for "$token" with "$value", "$key", "$noSuffix", "$future"',
    ({ token, value, noSuffix, key, future, expected }) => {
      const tokenKey = token as keyof RelativeTimeElementFunction
      const rtFunction: RelativeTimeElementFunction = locale.relativeTime[tokenKey]

      expect(rtFunction(value, noSuffix, key as RelativeTimeKeys, future)).toBe(expected)
    },
  )

  it('should have a method named "meridiem"', () => {
    expect(locale.meridiem).toBeDefined()
    expect(locale.meridiem).toBeTypeOf('function')
    expect(locale.meridiem(3, 0, false)).toBe('ночи')
    expect(locale.meridiem(11, 0, true)).toBe('утра')
    expect(locale.meridiem(16, 0, false)).toBe('дня')
    expect(locale.meridiem(20, 0, true)).toBe('вечера')
  })
})
