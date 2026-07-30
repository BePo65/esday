/**
 * Test for locale 'Croatian [hr]'
 */

import type { EsDay } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/hr'
import type {
  CalendarSpecValFunction,
  MonthNamesFunction,
  RelativeTimeElementFunction,
  RelativeTimeKeys,
} from '~/plugins/locale'

describe('locale hr', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('hr')
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
    expect(months(instanceDate, 'D MMMM')).toBe('ožujka')
    expect(months(instanceDate, 'MM-DD')).toBe('ožujak')

    expect(months.standalone).toBeDefined()
    expect(months.standalone.length).toBe(12)
    expect(months.format).toBeDefined()
    expect(months.format.length).toBe(12)
  })

  it.each([
    { month: 1, format: 'DD MMMM', expected: 'veljače' },
    { month: 1, format: 'yyyy-MM-DD', expected: 'veljača' },
  ])('should return name of month "$month" for "$format"', ({ month, format, expected }) => {
    const months = locale.months as MonthNamesFunction
    const referenceDate = { month: () => month } as EsDay

    expect(months).toBeDefined()
    expect(months).toBeTypeOf('function')
    expect(months(referenceDate, format)).toBe(expected)
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
    { weekday: 0, expected: '[u] [nedjelju] [u] LT' },
    { weekday: 1, expected: '[u] dddd [u] LT' },
    { weekday: 2, expected: '[u] dddd [u] LT' },
    { weekday: 3, expected: '[u] [srijedu] [u] LT' },
    { weekday: 4, expected: '[u] dddd [u] LT' },
    { weekday: 5, expected: '[u] dddd [u] LT' },
    { weekday: 6, expected: '[u] [subotu] [u] LT' },
    { weekday: 7, expected: '' },
  ])('should format nextWeek with calendar for weekday "$weekday"', ({ weekday, expected }) => {
    const referenceDate = { day: () => weekday } as EsDay
    const nextWeek = locale.calendar.nextWeek as CalendarSpecValFunction

    expect(nextWeek.call(referenceDate)).toBe(expected)
  })

  it.each([
    { weekday: 0, expected: '[prošlu] [nedjelju] [u] LT' },
    { weekday: 1, expected: '[prošli] dddd [u] LT' },
    { weekday: 2, expected: '[prošli] dddd [u] LT' },
    { weekday: 3, expected: '[prošlu] [srijedu] [u] LT' },
    { weekday: 4, expected: '[prošli] dddd [u] LT' },
    { weekday: 5, expected: '[prošli] dddd [u] LT' },
    { weekday: 6, expected: '[prošle] [subote] [u] LT' },
    { weekday: 7, expected: '' },
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
      value: 11,
      noSuffix: false,
      key: 's',
      future: false,
      expected: '',
    }, // test for unknown token
    {
      token: 'ss',
      value: 1,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '1 sekunda',
    },
    {
      token: 'ss',
      value: 2,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '2 sekunde',
    },
    {
      token: 'ss',
      value: 5,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '5 sekundi',
    },
    {
      token: 'ss',
      value: 11,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: '11 sekundi',
    },
    {
      token: 'ss',
      value: 25,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: '25 sekundi',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: false,
      expected: 'jedne minute',
    },
    {
      token: 'm',
      value: 2,
      noSuffix: false,
      key: 'm',
      future: false,
      expected: 'jedne minute',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: false,
      expected: 'jedna minuta',
    },
    {
      token: 'm',
      value: 2,
      noSuffix: true,
      key: 'm',
      future: true,
      expected: 'jedna minuta',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '1 minuta',
    },
    {
      token: 'mm',
      value: 2,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '2 minute',
    },
    {
      token: 'mm',
      value: 5,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '5 minuta',
    },
    {
      token: 'mm',
      value: 11,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '11 minuta',
    },
    {
      token: 'mm',
      value: 24,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '24 minuta',
    },
    {
      token: 'mm',
      value: 36,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '36 minuta',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: false,
      expected: 'jednog sata',
    },
    {
      token: 'h',
      value: 2,
      noSuffix: true,
      key: 'h',
      future: false,
      expected: 'jedan sat',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: true,
      expected: 'jednog sata',
    },
    {
      token: 'h',
      value: 3,
      noSuffix: true,
      key: 'h',
      future: true,
      expected: 'jedan sat',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '1 sat',
    },
    {
      token: 'hh',
      value: 2,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '2 sata',
    },
    {
      token: 'hh',
      value: 5,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '5 sati',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: '1 sat',
    },
    {
      token: 'hh',
      value: 2,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: '2 sata',
    },
    {
      token: 'hh',
      value: 6,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '6 sati',
    },
    {
      token: 'dd',
      value: 11,
      noSuffix: false,
      key: 'd',
      future: false,
      expected: '',
    }, // test for unknown token
    {
      token: 'dd',
      value: 1,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: '1 dan',
    },
    {
      token: 'dd',
      value: 2,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: '2 dana',
    },
    {
      token: 'dd',
      value: 5,
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: '5 dana',
    },
    {
      token: 'dd',
      value: 1,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: '1 dan',
    },
    {
      token: 'dd',
      value: 4,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '4 dana',
    },
    {
      token: 'ww',
      value: 11,
      noSuffix: false,
      key: 'w',
      future: false,
      expected: '',
    }, // test for unknown token
    {
      token: 'ww',
      value: 1,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: '1 tjedan',
    },
    {
      token: 'ww',
      value: 2,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: '2 tjedna',
    },
    {
      token: 'ww',
      value: 5,
      noSuffix: true,
      key: 'ww',
      future: false,
      expected: '5 tjedana',
    },
    {
      token: 'ww',
      value: 1,
      noSuffix: false,
      key: 'ww',
      future: true,
      expected: '1 tjedan',
    },
    {
      token: 'ww',
      value: 4,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: '4 tjedna',
    },
    {
      token: 'MM',
      value: 3,
      noSuffix: false,
      key: 'M',
      future: false,
      expected: '',
    }, // test for unknown token
    {
      token: 'MM',
      value: 1,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '1 mjesec',
    },
    {
      token: 'MM',
      value: 2,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '2 mjeseca',
    },
    {
      token: 'MM',
      value: 3,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '3 mjeseca',
    },
    {
      token: 'MM',
      value: 4,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '4 mjeseca',
    },
    {
      token: 'MM',
      value: 5,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '5 mjeseci',
    },
    {
      token: 'MM',
      value: 6,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '6 mjeseci',
    },
    {
      token: 'MM',
      value: 7,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '7 mjeseci',
    },
    {
      token: 'MM',
      value: 8,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '8 mjeseci',
    },
    {
      token: 'MM',
      value: 19,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '19 mjeseci',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: false,
      expected: '',
    }, // test for unknown token
    {
      token: 'yy',
      value: 1,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '1 godina',
    },
    {
      token: 'yy',
      value: 2,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '2 godine',
    },
    {
      token: 'yy',
      value: 3,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '3 godine',
    },
    {
      token: 'yy',
      value: 4,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '4 godine',
    },
    {
      token: 'yy',
      value: 5,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '5 godina',
    },
    {
      token: 'yy',
      value: 6,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '6 godina',
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
