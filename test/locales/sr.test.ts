/**
 * Test for locale 'Serbian [sr]'
 */

import type { EsDay } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/sr'
import type {
  CalendarSpecValFunction,
  RelativeTimeElementFunction,
  RelativeTimeKeys,
} from '~/plugins/locale'

describe('locale sr', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('sr')
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
    { weekday: 0, expected: '[u] [nedelju] [u] LT' },
    { weekday: 1, expected: '[u] dddd [u] LT' },
    { weekday: 2, expected: '[u] dddd [u] LT' },
    { weekday: 3, expected: '[u] [sredu] [u] LT' },
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
    { weekday: 0, expected: '[prošle] [nedelje] [u] LT' },
    { weekday: 1, expected: '[prošlog] [ponedeljka] [u] LT' },
    { weekday: 2, expected: '[prošlog] [utorka] [u] LT' },
    { weekday: 3, expected: '[prošle] [srede] [u] LT' },
    { weekday: 4, expected: '[prošlog] [četvrtka] [u] LT' },
    { weekday: 5, expected: '[prošlog] [petka] [u] LT' },
    { weekday: 6, expected: '[prošle] [subote] [u] LT' },
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
      expected: 'sekunda',
    },
    {
      token: 'ss',
      value: 2,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: 'sekunde',
    },
    {
      token: 'ss',
      value: 5,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: 'sekundi',
    },
    {
      token: 'ss',
      value: 11,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: 'sekundi',
    },
    {
      token: 'ss',
      value: 22,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: 'sekunde',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: false,
      expected: 'jednog minuta',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: false,
      expected: 'jedan minut',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: true,
      expected: 'jedan minut',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: true,
      expected: 'jedan minut',
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
      expected: '2 minuta',
    },
    {
      token: 'mm',
      value: 5,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '5 minuta',
    },
    {
      token: 'mm',
      value: 11,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '11 minuta',
    },
    {
      token: 'mm',
      value: 22,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '22 minuta',
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
      value: 1,
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
      expected: 'jedan sat',
    },
    {
      token: 'h',
      value: 1,
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
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: '2 sata',
    },
    {
      token: 'hh',
      value: 5,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: '5 sati',
    },
    {
      token: 'hh',
      value: 11,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '11 sati',
    },
    {
      token: 'hh',
      value: 22,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '22 sata',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: false,
      expected: 'jednog dana',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: false,
      expected: 'jedan dan',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: true,
      expected: 'jedan dan',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: true,
      expected: 'jedan dan',
    },
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
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: '2 dana',
    },
    {
      token: 'dd',
      value: 5,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: '5 dana',
    },
    {
      token: 'dd',
      value: 11,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '11 dana',
    },
    {
      token: 'dd',
      value: 22,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '22 dana',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: false,
      expected: 'jednog meseca',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: false,
      expected: 'jedan mesec',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: true,
      expected: 'jedan mesec',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: true,
      expected: 'jedan mesec',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '1 mesec',
    },
    {
      token: 'MM',
      value: 2,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '2 meseca',
    },
    {
      token: 'MM',
      value: 5,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '5 meseci',
    },
    {
      token: 'MM',
      value: 11,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '11 meseci',
    },
    {
      token: 'MM',
      value: 22,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '22 meseca',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: false,
      expected: 'jedne godine',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: false,
      expected: 'jedna godina',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: true,
      expected: 'jednu godinu',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: true,
      expected: 'jedna godina',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '1 godinu',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '1 godina',
    },
    {
      token: 'yy',
      value: 2,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '2 godine',
    },
    {
      token: 'yy',
      value: 5,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '5 godina',
    },
    {
      token: 'yy',
      value: 11,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '11 godina',
    },
    {
      token: 'yy',
      value: 22,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '22 godine',
    },
  ])('should format relativeTime for "$token" with "$value", "$key", "$noSuffix", "$future"', ({
    token,
    value,
    noSuffix,
    key,
    future,
    expected,
  }) => {
    const tokenKey = token as keyof RelativeTimeElementFunction
    const rtFunction: RelativeTimeElementFunction = locale.relativeTime[tokenKey]

    expect(rtFunction(value, noSuffix, key as RelativeTimeKeys, future)).toBe(expected)
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
