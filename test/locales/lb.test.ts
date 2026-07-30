/**
 * Test for locale 'Luxembourgish [lb]'
 */

import type { EsDay } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/lb'
import type {
  CalendarSpecValFunction,
  RelativeTimeElementFunction,
  RelativeTimeKeys,
} from '~/plugins/locale'

describe('locale lb', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('lb')
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
    expect(locale.months).toBeDefined()
    if (Array.isArray(locale.months)) {
      expect(locale.months.length).toBe(12)
    } else {
      expect(locale.months).toBeTypeOf('function')
    }
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
    { weekday: 0, expected: '[Leschte] dddd [um] LT' },
    { weekday: 1, expected: '[Leschte] dddd [um] LT' },
    { weekday: 2, expected: '[Leschten] dddd [um] LT' },
    { weekday: 3, expected: '[Leschte] dddd [um] LT' },
    { weekday: 4, expected: '[Leschten] dddd [um] LT' },
    { weekday: 5, expected: '[Leschte] dddd [um] LT' },
    { weekday: 6, expected: '[Leschte] dddd [um] LT' },
    { weekday: 7, expected: '[Leschte] dddd [um] LT' },
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
      token: 'future',
      value: Number.NaN,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'an NaN',
    },
    {
      token: 'future',
      value: -1,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'a -1',
    },
    {
      token: 'future',
      value: 1,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'an 1',
    },
    {
      token: 'future',
      value: 4,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'a 4',
    },
    {
      token: 'future',
      value: 8,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'an 8',
    },
    {
      token: 'future',
      value: 70,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'a 70',
    },
    {
      token: 'future',
      value: 71,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'an 71',
    },
    {
      token: 'future',
      value: 123,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'an 123',
    },
    {
      token: 'future',
      value: 1234,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'an 1234',
    },
    {
      token: 'future',
      value: '12 34',
      noSuffix: false,
      key: '',
      future: false,
      expected: 'an 12 34',
    },
    {
      token: 'future',
      value: 12_345,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'an 12345',
    },
    {
      token: 'past',
      value: -1,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'viru -1',
    },
    {
      token: 'past',
      value: 1,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'virun 1',
    },
    {
      token: 'past',
      value: 4,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'viru 4',
    },
    {
      token: 'past',
      value: 8,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'virun 8',
    },
    {
      token: 'past',
      value: 70,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'viru 70',
    },
    {
      token: 'past',
      value: 71,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'virun 71',
    },
    {
      token: 'past',
      value: 123,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'virun 123',
    },
    {
      token: 'past',
      value: 1234,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'virun 1234',
    },
    {
      token: 'past',
      value: '12 34',
      noSuffix: false,
      key: '',
      future: false,
      expected: 'virun 12 34',
    },
    {
      token: 'past',
      value: 12_345,
      noSuffix: false,
      key: '',
      future: false,
      expected: 'virun 12345',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: false,
      expected: '1enger Minutt',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: false,
      expected: '1eng Minutt',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: true,
      expected: '1enger Minutt',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: true,
      expected: '1eng Minutt',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: false,
      expected: '1enger Stonn',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: false,
      expected: '1eng Stonn',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: true,
      expected: '1enger Stonn',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: true,
      expected: '1eng Stonn',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: false,
      expected: '1engem Dag',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: false,
      expected: '1een Dag',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: true,
      expected: '1engem Dag',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: true,
      expected: '1een Dag',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: false,
      expected: '1engem Mount',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: false,
      expected: '1ee Mount',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: true,
      expected: '1engem Mount',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: true,
      expected: '1ee Mount',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: false,
      expected: '1engem Joer',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: false,
      expected: '1ee Joer',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: true,
      expected: '1engem Joer',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: true,
      expected: '1ee Joer',
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
