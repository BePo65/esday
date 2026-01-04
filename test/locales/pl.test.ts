/**
 * Test for locale 'Polish [pl]'
 */

import type { EsDay } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/pl'
import type {
  CalendarSpecValFunction,
  MonthNamesFunction,
  RelativeTimeElementFunction,
  RelativeTimeKeys,
} from '~/plugins/locale'

describe('locale pl', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('pl')
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
    const instanceMonth = 2
    const instanceDate = { month: () => instanceMonth } as EsDay
    const months = locale.months as MonthNamesFunction

    expect(months).toBeDefined()
    expect(months).toBeTypeOf('function')
    expect(months(instanceDate, 'D MMMM')).toBe('marca')
    expect(months(instanceDate, 'MM-DD')).toBe('marzec')

    expect(months.standalone).toBeDefined()
    expect(months.standalone.length).toBe(12)
    expect(months.format).toBeDefined()
    expect(months.format.length).toBe(12)
  })

  it('should have 12 short month names', () => {
    const months = locale.months as MonthNamesFunction

    expect(months).toBeDefined()
    expect(months).toBeTypeOf('function')
    expect(months.standalone).toBeDefined()
    expect(months.standalone.length).toBe(12)
    expect(months.format).toBeDefined()
    expect(months.format.length).toBe(12)
  })

  it('should have a property named "dayOfMonthOrdinalParse"', () => {
    expect(locale.dayOfMonthOrdinalParse).toBeDefined()
    expect(locale.dayOfMonthOrdinalParse).toBeInstanceOf(RegExp)
  })

  it('should have a method named "ordinal"', () => {
    expect(locale.ordinal).toBeDefined()
    expect(locale.ordinal).toBeTypeOf('function')
    expect(locale.ordinal(2)).toBe('2.')
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
    { weekday: 0, expected: '[W niedzielę o] LT' },
    { weekday: 1, expected: '[W] dddd [o] LT' },
    { weekday: 2, expected: '[We wtorek o] LT' },
    { weekday: 3, expected: '[W środę o] LT' },
    { weekday: 4, expected: '[W] dddd [o] LT' },
    { weekday: 5, expected: '[W] dddd [o] LT' },
    { weekday: 6, expected: '[W sobotę o] LT' },
    { weekday: 7, expected: '[W] dddd [o] LT' },
  ])('should format nextWeek with calendar for weekday "$weekday"', ({ weekday, expected }) => {
    const referenceDate = { day: () => weekday } as EsDay
    const nextWeek = locale.calendar.nextWeek as CalendarSpecValFunction

    expect(nextWeek.call(referenceDate)).toBe(expected)
  })

  it.each([
    { weekday: 0, expected: '[W zeszłą niedzielę o] LT' },
    { weekday: 1, expected: '[W zeszły] dddd [o] LT' },
    { weekday: 2, expected: '[W zeszły] dddd [o] LT' },
    { weekday: 3, expected: '[W zeszłą środę o] LT' },
    { weekday: 4, expected: '[W zeszły] dddd [o] LT' },
    { weekday: 5, expected: '[W zeszły] dddd [o] LT' },
    { weekday: 6, expected: '[W zeszłą sobotę o] LT' },
    { weekday: 7, expected: '[W zeszły] dddd [o] LT' },
  ])('should format lastWeek with calendar for weekday "$weekday"', ({ weekday, expected }) => {
    const referenceDate = { day: () => weekday } as EsDay
    const lastWeek = locale.calendar.lastWeek as CalendarSpecValFunction

    expect(lastWeek.call(referenceDate)).toBe(expected)
  })

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
      expected: '1 sekund',
    },
    {
      token: 'ss',
      value: 2,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: '2 sekundy',
    },
    {
      token: 'ss',
      value: 11,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: '11 sekund',
    },
    {
      token: 'ss',
      value: 22,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: '22 sekundy',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: false,
      expected: 'minutę',
    },
    {
      token: 'm',
      value: 2,
      noSuffix: true,
      key: 'm',
      future: false,
      expected: 'minuta',
    },
    {
      token: 'm',
      value: 11,
      noSuffix: false,
      key: 'm',
      future: true,
      expected: 'minutę',
    },
    {
      token: 'm',
      value: 22,
      noSuffix: true,
      key: 'm',
      future: true,
      expected: 'minuta',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '1 minut',
    },
    {
      token: 'mm',
      value: 2,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '2 minuty',
    },
    {
      token: 'mm',
      value: 11,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '11 minut',
    },
    {
      token: 'mm',
      value: 22,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '22 minuty',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: false,
      expected: 'godzinę',
    },
    {
      token: 'h',
      value: 2,
      noSuffix: true,
      key: 'h',
      future: false,
      expected: 'godzina',
    },
    {
      token: 'h',
      value: 11,
      noSuffix: false,
      key: 'h',
      future: true,
      expected: 'godzinę',
    },
    {
      token: 'h',
      value: 22,
      noSuffix: true,
      key: 'h',
      future: true,
      expected: 'godzina',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '1 godzin',
    },
    {
      token: 'hh',
      value: 2,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: '2 godziny',
    },
    {
      token: 'hh',
      value: 11,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: '11 godzin',
    },
    {
      token: 'hh',
      value: 22,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '22 godziny',
    },
    {
      token: 'ww',
      value: 1,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: '1 tygodni',
    },
    {
      token: 'ww',
      value: 2,
      noSuffix: true,
      key: 'ww',
      future: false,
      expected: '2 tygodnie',
    },
    {
      token: 'ww',
      value: 11,
      noSuffix: false,
      key: 'ww',
      future: true,
      expected: '11 tygodni',
    },
    {
      token: 'ww',
      value: 22,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: '22 tygodnie',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '1 miesięcy',
    },
    {
      token: 'MM',
      value: 2,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '2 miesiące',
    },
    {
      token: 'MM',
      value: 11,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '11 miesięcy',
    },
    {
      token: 'MM',
      value: 22,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '22 miesiące',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '1 lat',
    },
    {
      token: 'yy',
      value: 2,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '2 lata',
    },
    {
      token: 'yy',
      value: 11,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '11 lat',
    },
    {
      token: 'yy',
      value: 22,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '22 lata',
    },
    {
      token: 'yy',
      value: 11,
      noSuffix: true,
      key: 'ab',
      future: true,
      expected: '',
    }, // test for unknown token
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
