/**
 * Test for locale 'Slovak [sk]'
 */

import type { EsDay } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/sk'
import type {
  CalendarSpecValFunction,
  RelativeTimeElementFunction,
  RelativeTimeKeys,
} from '~/plugins/locale'

describe('locale sk', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('sk')
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
    { weekday: 0, expected: '[v nedeľu o] LT' },
    { weekday: 1, expected: '[v] dddd [o] LT' },
    { weekday: 2, expected: '[v] dddd [o] LT' },
    { weekday: 3, expected: '[v stredu o] LT' },
    { weekday: 4, expected: '[vo štvrtok o] LT' },
    { weekday: 5, expected: '[v piatok o] LT' },
    { weekday: 6, expected: '[v sobotu o] LT' },
    { weekday: 7, expected: '' },
  ])('should format nextWeek with calendar for weekday "$weekday"', ({ weekday, expected }) => {
    const referenceDate = { day: () => weekday } as EsDay
    const nextWeek = locale.calendar.nextWeek as CalendarSpecValFunction

    expect(nextWeek.call(referenceDate)).toBe(expected)
  })

  it.each([
    { weekday: 0, expected: '[minulú nedeľu o] LT' },
    { weekday: 1, expected: '[minulý] dddd [o] LT' },
    { weekday: 2, expected: '[minulý] dddd [o] LT' },
    { weekday: 3, expected: '[minulú stredu o] LT' },
    { weekday: 4, expected: '[minulý] dddd [o] LT' },
    { weekday: 5, expected: '[minulý] dddd [o] LT' },
    { weekday: 6, expected: '[minulú sobotu o] LT' },
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
      token: 's',
      value: 1,
      noSuffix: false,
      key: 's',
      future: false,
      expected: 'pár sekundami',
    },
    {
      token: 's',
      value: 1,
      noSuffix: true,
      key: 's',
      future: false,
      expected: 'pár sekúnd',
    },
    {
      token: 's',
      value: 1,
      noSuffix: false,
      key: 's',
      future: true,
      expected: 'pár sekúnd',
    },
    {
      token: 's',
      value: 1,
      noSuffix: true,
      key: 's',
      future: true,
      expected: 'pár sekúnd',
    },
    {
      token: 'ss',
      value: 1,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '1 sekundami',
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
      expected: '11 sekúnd',
    },
    {
      token: 'ss',
      value: 12,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: '12 sekúnd',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: false,
      expected: 'minútou',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: false,
      expected: 'minúta',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: true,
      expected: 'minútu',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: true,
      expected: 'minúta',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '1 minútami',
    },
    {
      token: 'mm',
      value: 2,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '2 minúty',
    },
    {
      token: 'mm',
      value: 11,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '11 minút',
    },
    {
      token: 'mm',
      value: 12,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '12 minút',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: false,
      expected: 'hodinou',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: false,
      expected: 'hodina',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: true,
      expected: 'hodinu',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: true,
      expected: 'hodina',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '1 hodinami',
    },
    {
      token: 'hh',
      value: 2,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: '2 hodiny',
    },
    {
      token: 'hh',
      value: 11,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: '11 hodín',
    },
    {
      token: 'hh',
      value: 12,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '12 hodín',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: false,
      expected: 'dňom',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: false,
      expected: 'deň',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: true,
      expected: 'deň',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: true,
      expected: 'deň',
    },
    {
      token: 'dd',
      value: 1,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: '1 dňami',
    },
    {
      token: 'dd',
      value: 2,
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: '2 dni',
    },
    {
      token: 'dd',
      value: 11,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: '11 dní',
    },
    {
      token: 'dd',
      value: 12,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '12 dní',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: false,
      key: 'w',
      future: false,
      expected: 'týždňom',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: true,
      key: 'w',
      future: false,
      expected: 'týždeň',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: false,
      key: 'w',
      future: true,
      expected: 'týždeň',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: true,
      key: 'w',
      future: true,
      expected: 'týždeň',
    },
    {
      token: 'ww',
      value: 1,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: '1 týždňami',
    },
    {
      token: 'ww',
      value: 2,
      noSuffix: true,
      key: 'ww',
      future: false,
      expected: '2 týždňov',
    },
    {
      token: 'ww',
      value: 11,
      noSuffix: false,
      key: 'ww',
      future: true,
      expected: '11 týždňov',
    },
    {
      token: 'ww',
      value: 12,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: '12 týždňov',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: false,
      expected: 'mesiacom',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: false,
      expected: 'mesiac',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: true,
      expected: 'mesiac',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: true,
      expected: 'mesiac',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '1 mesiacmi',
    },
    {
      token: 'MM',
      value: 2,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '2 mesiace',
    },
    {
      token: 'MM',
      value: 11,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '11 mesiacov',
    },
    {
      token: 'MM',
      value: 12,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '12 mesiacov',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: false,
      expected: 'rokom',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: false,
      expected: 'rok',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: true,
      expected: 'rok',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: true,
      expected: 'rok',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '1 rokmi',
    },
    {
      token: 'yy',
      value: 2,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '2 roky',
    },
    {
      token: 'yy',
      value: 11,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '11 rokov',
    },
    {
      token: 'yy',
      value: 12,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '12 rokov',
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
