/**
 * Test for locale 'Ukrainian [uk]'
 */

import type { EsDay } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/uk'
import type {
  CalendarSpecValFunction,
  MonthNamesStandaloneFormat,
  RelativeTimeElementFunction,
  RelativeTimeKeys,
} from '~/plugins/locale'

describe('locale uk', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('uk')
  })

  it('should have 7 weekday names', () => {
    expect(locale.weekdays).toBeDefined()
    if (Array.isArray(locale.weekdays)) {
      expect(locale.weekdays.length).toBe(7)
    } else {
      expect(locale.weekdays).toBeTypeOf('function')
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
    const months = locale.months as MonthNamesStandaloneFormat

    expect(months).toBeDefined()
    expect(months).toBeTypeOf('object')
    expect(months.standalone).toBeDefined()
    expect(months.standalone.length).toBe(12)
    expect(months.format).toBeDefined()
    expect(months.format.length).toBe(12)
  })

  it('should have 12 short month names', () => {
    expect(locale.monthsShort).toBeDefined()
    if (Array.isArray(locale.monthsShort)) {
      expect(locale.monthsShort.length).toBe(12)
    } else {
      expect(locale.monthsShort).toBeTypeOf('function')
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
    { currentHour: 0, expected: '[Сьогодні о] LT' },
    { currentHour: 1, expected: '[Сьогодні о] LT' },
    { currentHour: 11, expected: '[Сьогодні об] LT' },
    { currentHour: 12, expected: '[Сьогодні о] LT' },
  ])('should format sameDay with calendar for hour "$currentHour"', ({ currentHour, expected }) => {
    const referenceDate = { hour: () => currentHour } as EsDay
    const sameDay = locale.calendar.sameDay as CalendarSpecValFunction

    expect(sameDay.call(referenceDate)).toBe(expected)
  })

  it.each([
    { currentHour: 0, expected: '[Завтра о] LT' },
    { currentHour: 1, expected: '[Завтра о] LT' },
    { currentHour: 11, expected: '[Завтра об] LT' },
    { currentHour: 12, expected: '[Завтра о] LT' },
  ])('should format nextDay with calendar for hour "$currentHour"', ({ currentHour, expected }) => {
    const referenceDate = { hour: () => currentHour } as EsDay
    const nextDay = locale.calendar.nextDay as CalendarSpecValFunction

    expect(nextDay.call(referenceDate)).toBe(expected)
  })

  it.each([
    { currentHour: 0, expected: '[Вчора о] LT' },
    { currentHour: 1, expected: '[Вчора о] LT' },
    { currentHour: 11, expected: '[Вчора об] LT' },
    { currentHour: 12, expected: '[Вчора о] LT' },
  ])('should format lastDay with calendar for hour "$currentHour"', ({ currentHour, expected }) => {
    const referenceDate = { hour: () => currentHour } as EsDay
    const lastDay = locale.calendar.lastDay as CalendarSpecValFunction

    expect(lastDay.call(referenceDate)).toBe(expected)
  })

  it.each([
    { currentHour: 0, expected: '[У] dddd [о] LT' },
    { currentHour: 1, expected: '[У] dddd [о] LT' },
    { currentHour: 11, expected: '[У] dddd [об] LT' },
    { currentHour: 12, expected: '[У] dddd [о] LT' },
  ])(
    'should format nextWeek with calendar for hour "$currentHour"',
    ({ currentHour, expected }) => {
      const referenceDate = { hour: () => currentHour } as EsDay
      const nextWeek = locale.calendar.nextWeek as CalendarSpecValFunction

      expect(nextWeek.call(referenceDate)).toBe(expected)
    },
  )

  it.each([
    { weekday: 0, currentHour: 1, expected: '[Минулої] dddd [о] LT' },
    { weekday: 0, currentHour: 11, expected: '[Минулої] dddd [об] LT' },
    { weekday: 1, currentHour: 1, expected: '[Минулого] dddd [о] LT' },
    { weekday: 1, currentHour: 11, expected: '[Минулого] dddd [об] LT' },
    { weekday: 2, currentHour: 1, expected: '[Минулого] dddd [о] LT' },
    { weekday: 2, currentHour: 11, expected: '[Минулого] dddd [об] LT' },
    { weekday: 3, currentHour: 1, expected: '[Минулої] dddd [о] LT' },
    { weekday: 3, currentHour: 11, expected: '[Минулої] dddd [об] LT' },
    { weekday: 4, currentHour: 1, expected: '[Минулого] dddd [о] LT' },
    { weekday: 4, currentHour: 11, expected: '[Минулого] dddd [об] LT' },
    { weekday: 5, currentHour: 1, expected: '[Минулої] dddd [о] LT' },
    { weekday: 5, currentHour: 11, expected: '[Минулої] dddd [об] LT' },
    { weekday: 6, currentHour: 1, expected: '[Минулої] dddd [о] LT' },
    { weekday: 6, currentHour: 11, expected: '[Минулої] dddd [об] LT' },
    { weekday: 7, currentHour: 11, expected: '' },
  ])(
    'should format lastWeek with calendar for weekday "$weekday"',
    ({ weekday, currentHour, expected }) => {
      const referenceDate = {
        hour: () => currentHour,
        day: () => weekday,
      } as EsDay
      const lastWeek = locale.calendar.lastWeek as CalendarSpecValFunction

      expect(lastWeek.call(referenceDate)).toBe(expected)
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
      expected: '2 секунди',
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
      future: false,
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
      future: true,
      expected: '2 секунди',
    },
    {
      token: 'ss',
      value: 15,
      noSuffix: true,
      key: 'ss',
      future: false,
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
      expected: 'хвилину',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: false,
      expected: 'хвилина',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: true,
      expected: 'хвилину',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: true,
      expected: 'хвилина',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '1 хвилину',
    },
    {
      token: 'mm',
      value: 2,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '2 хвилини',
    },
    {
      token: 'mm',
      value: 15,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '15 хвилин',
    },
    {
      token: 'mm',
      value: 36,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '36 хвилин',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '1 хвилина',
    },
    {
      token: 'mm',
      value: 2,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '2 хвилини',
    },
    {
      token: 'mm',
      value: 15,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '15 хвилин',
    },
    {
      token: 'mm',
      value: 36,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '36 хвилин',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: false,
      expected: 'годину',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: false,
      expected: 'година',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: true,
      expected: 'годину',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: true,
      expected: 'година',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '1 годину',
    },
    {
      token: 'hh',
      value: 2,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '2 години',
    },
    {
      token: 'hh',
      value: 15,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: '15 годин',
    },
    {
      token: 'hh',
      value: 23,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '23 години',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: '1 година',
    },
    {
      token: 'hh',
      value: 2,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '2 години',
    },
    {
      token: 'hh',
      value: 15,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '15 годин',
    },
    {
      token: 'hh',
      value: 23,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '23 години',
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
      expected: '2 дні',
    },
    {
      token: 'dd',
      value: 15,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: '15 днів',
    },
    {
      token: 'dd',
      value: 23,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '23 дні',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '1 місяць',
    },
    {
      token: 'MM',
      value: 2,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '2 місяці',
    },
    {
      token: 'MM',
      value: 15,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '15 місяців',
    },
    {
      token: 'MM',
      value: 23,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '23 місяці',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '1 рік',
    },
    {
      token: 'yy',
      value: 2,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '2 роки',
    },
    {
      token: 'yy',
      value: 15,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '15 років',
    },
    {
      token: 'yy',
      value: 23,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '23 роки',
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
    expect(locale.meridiem(10, 0, false)).toBe('AM')
    expect(locale.meridiem(10, 0, true)).toBe('am')
    expect(locale.meridiem(20, 0, false)).toBe('PM')
    expect(locale.meridiem(20, 0, true)).toBe('pm')
  })
})
