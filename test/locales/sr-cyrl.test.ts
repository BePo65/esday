/**
 * Test for locale 'Serbian Cyrillic [sr-CYRL]'
 */

import type { EsDay } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/sr-cyrl'
import type {
  CalendarSpecValFunction,
  RelativeTimeElementFunction,
  RelativeTimeKeys,
} from '~/plugins/locale'

describe('locale sr-CYRL', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('sr-CYRL')
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
    { weekday: 0, expected: '[у] [недељу] [у] LT' },
    { weekday: 1, expected: '[у] dddd [у] LT' },
    { weekday: 2, expected: '[у] dddd [у] LT' },
    { weekday: 3, expected: '[у] [среду] [у] LT' },
    { weekday: 4, expected: '[у] dddd [у] LT' },
    { weekday: 5, expected: '[у] dddd [у] LT' },
    { weekday: 6, expected: '[у] [суботу] [у] LT' },
    { weekday: 7, expected: '' },
  ])('should format nextWeek with calendar for weekday "$weekday"', ({ weekday, expected }) => {
    const referenceDate = { day: () => weekday } as EsDay
    const nextWeek = locale.calendar.nextWeek as CalendarSpecValFunction

    expect(nextWeek.call(referenceDate)).toBe(expected)
  })

  it.each([
    { weekday: 0, expected: '[прошле] [недеље] [у] LT' },
    { weekday: 1, expected: '[прошлог] [понедељка] [у] LT' },
    { weekday: 2, expected: '[прошлог] [уторка] [у] LT' },
    { weekday: 3, expected: '[прошле] [среде] [у] LT' },
    { weekday: 4, expected: '[прошлог] [четвртка] [у] LT' },
    { weekday: 5, expected: '[прошлог] [петка] [у] LT' },
    { weekday: 6, expected: '[прошле] [суботе] [у] LT' },
  ])('should format lastWeek with calendar for weekday "$weekday"', ({ weekday, expected }) => {
    const referenceDate = { day: () => weekday } as EsDay
    const lastWeek = locale.calendar.lastWeek as CalendarSpecValFunction

    expect(lastWeek.call(referenceDate)).toBe(expected)
  })

  it.each([
    {
      token: 'ss',
      value: 1,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '1 секунди',
    },
    {
      token: 'ss',
      value: 2,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: '2 секунде',
    },
    {
      token: 'ss',
      value: 5,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: '5 секунди',
    },
    {
      token: 'ss',
      value: 11,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: '11 секунди',
    },
    {
      token: 'ss',
      value: 22,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: '22 секунде',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: false,
      expected: 'једног минута',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: false,
      expected: 'један минут',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: true,
      expected: 'један минут',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: true,
      expected: 'један минут',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '1 минут',
    },
    {
      token: 'mm',
      value: 2,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '2 минута',
    },
    {
      token: 'mm',
      value: 5,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '5 минута',
    },
    {
      token: 'mm',
      value: 11,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '11 минута',
    },
    {
      token: 'mm',
      value: 22,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '22 минута',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: false,
      expected: 'једног сата',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: false,
      expected: 'један сат',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: true,
      expected: 'један сат',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: true,
      expected: 'један сат',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '1 сат',
    },
    {
      token: 'hh',
      value: 2,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: '2 сата',
    },
    {
      token: 'hh',
      value: 5,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: '5 сати',
    },
    {
      token: 'hh',
      value: 11,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '11 сати',
    },
    {
      token: 'hh',
      value: 22,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '22 сата',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: false,
      expected: 'једног дана',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: false,
      expected: 'један дан',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: true,
      expected: 'један дан',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: true,
      expected: 'један дан',
    },
    {
      token: 'dd',
      value: 1,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: '1 дан',
    },
    {
      token: 'dd',
      value: 2,
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: '2 дана',
    },
    {
      token: 'dd',
      value: 5,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: '5 дана',
    },
    {
      token: 'dd',
      value: 11,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '11 дана',
    },
    {
      token: 'dd',
      value: 22,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '22 дана',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: false,
      expected: 'једног месеца',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: false,
      expected: 'један месец',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: true,
      expected: 'један месец',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: true,
      expected: 'један месец',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '1 месец',
    },
    {
      token: 'MM',
      value: 2,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '2 месеца',
    },
    {
      token: 'MM',
      value: 5,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '5 месеци',
    },
    {
      token: 'MM',
      value: 11,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '11 месеци',
    },
    {
      token: 'MM',
      value: 22,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '22 месеца',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: false,
      expected: 'једне године',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: false,
      expected: 'једна година',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: true,
      expected: 'једну годину',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: true,
      expected: 'једна година',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '1 годину',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '1 година',
    },
    {
      token: 'yy',
      value: 2,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '2 године',
    },
    {
      token: 'yy',
      value: 5,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '5 година',
    },
    {
      token: 'yy',
      value: 11,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '11 година',
    },
    {
      token: 'yy',
      value: 22,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '22 године',
    },
  ])(
    'should format relativeTime for "$token" with "$value", "$key", "$noSuffix", "$future"',
    ({ token, value, noSuffix, key, future, expected }) => {
      const tokenKey = token as keyof RelativeTimeElementFunction
      const rtFunction: RelativeTimeElementFunction = locale.relativeTime[tokenKey]

      expect(rtFunction(value, noSuffix, key as RelativeTimeKeys, future)).toBe(expected)
    },
  )

  it('should have an object named "relativeTime"', () => {
    expect(locale.relativeTime).toBeDefined()
    expect(locale.relativeTime).toBeTypeOf('object')
    expect(Object.keys(locale.relativeTime ?? {}).length).toBe(16)
  })

  it('should have a method named "meridiem"', () => {
    expect(locale.meridiem).toBeDefined()
    expect(locale.meridiem).toBeTypeOf('function')
    expect(locale.meridiem(10, 0, false)).toBe('AM')
    expect(locale.meridiem(10, 0, true)).toBe('am')
    expect(locale.meridiem(20, 0, false)).toBe('PM')
    expect(locale.meridiem(20, 0, true)).toBe('pm')
  })
})
