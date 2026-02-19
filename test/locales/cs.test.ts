/**
 * Test for locale 'Czech [cs]'
 */

import type { EsDay } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/cs'
import type {
  CalendarSpecValFunction,
  MonthNamesStandaloneFormat,
  RelativeTimeElementFunction,
  RelativeTimeKeys,
} from '~/plugins/locale'

describe('locale cs', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('cs')
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
    expect(months.isFormat).toBeDefined()
    expect(months.isFormat).toBeInstanceOf(RegExp)
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
    { weekday: 0, expected: '[v neděli v] LT' },
    { weekday: 1, expected: '[v] dddd [v] LT' },
    { weekday: 2, expected: '[v] dddd [v] LT' },
    { weekday: 3, expected: '[ve středu v] LT' },
    { weekday: 4, expected: '[ve čtvrtek v] LT' },
    { weekday: 5, expected: '[v pátek v] LT' },
    { weekday: 6, expected: '[v sobotu v] LT' },
    { weekday: 7, expected: '' },
  ])('should format nextWeek with calendar for weekday "$weekday"', ({ weekday, expected }) => {
    const referenceDate = { day: () => weekday } as EsDay
    const nextWeek = locale.calendar.nextWeek as CalendarSpecValFunction

    expect(nextWeek.call(referenceDate)).toBe(expected)
  })

  it.each([
    { weekday: 0, expected: '[minulou neděli v] LT' },
    { weekday: 1, expected: '[minulé] dddd [v] LT' },
    { weekday: 2, expected: '[minulé] dddd [v] LT' },
    { weekday: 3, expected: '[minulou středu v] LT' },
    { weekday: 4, expected: '[minulý] dddd [v] LT' },
    { weekday: 5, expected: '[minulý] dddd [v] LT' },
    { weekday: 6, expected: '[minulou sobotu v] LT' },
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
      value: 4,
      noSuffix: false,
      key: 's',
      future: false,
      expected: 'pár sekundami',
    },
    {
      token: 's',
      value: 4,
      noSuffix: true,
      key: 's',
      future: false,
      expected: 'pár sekund',
    },
    {
      token: 's',
      value: 4,
      noSuffix: false,
      key: 's',
      future: true,
      expected: 'pár sekund',
    },
    {
      token: 's',
      value: 4,
      noSuffix: true,
      key: 's',
      future: true,
      expected: 'pár sekund',
    },
    {
      token: 'ss',
      value: 4,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '4 sekundami',
    },
    {
      token: 'ss',
      value: 1,
      noSuffix: true,
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
      value: 4,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: '4 sekundy',
    },
    {
      token: 'ss',
      value: 5,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: '5 sekund',
    },
    {
      token: 'm',
      value: 4,
      noSuffix: false,
      key: 'm',
      future: false,
      expected: 'minutou',
    },
    {
      token: 'm',
      value: 4,
      noSuffix: true,
      key: 'm',
      future: false,
      expected: 'minuta',
    },
    {
      token: 'm',
      value: 4,
      noSuffix: false,
      key: 'm',
      future: true,
      expected: 'minutu',
    },
    {
      token: 'm',
      value: 4,
      noSuffix: true,
      key: 'm',
      future: true,
      expected: 'minuta',
    },
    {
      token: 'mm',
      value: 4,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '4 minutami',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: true,
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
      value: 4,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '4 minuty',
    },
    {
      token: 'mm',
      value: 5,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '5 minut',
    },
    {
      token: 'h',
      value: 4,
      noSuffix: false,
      key: 'h',
      future: false,
      expected: 'hodinou',
    },
    {
      token: 'h',
      value: 4,
      noSuffix: true,
      key: 'h',
      future: false,
      expected: 'hodina',
    },
    {
      token: 'h',
      value: 4,
      noSuffix: false,
      key: 'h',
      future: true,
      expected: 'hodinu',
    },
    {
      token: 'h',
      value: 4,
      noSuffix: true,
      key: 'h',
      future: true,
      expected: 'hodina',
    },
    {
      token: 'hh',
      value: 4,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '4 hodinami',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: '1 hodin',
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
      value: 4,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: '4 hodiny',
    },
    {
      token: 'hh',
      value: 5,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '5 hodin',
    },
    {
      token: 'd',
      value: 4,
      noSuffix: false,
      key: 'd',
      future: false,
      expected: 'dnem',
    },
    {
      token: 'd',
      value: 4,
      noSuffix: true,
      key: 'd',
      future: false,
      expected: 'den',
    },
    {
      token: 'd',
      value: 4,
      noSuffix: false,
      key: 'd',
      future: true,
      expected: 'den',
    },
    {
      token: 'd',
      value: 4,
      noSuffix: true,
      key: 'd',
      future: true,
      expected: 'den',
    },
    {
      token: 'dd',
      value: 4,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: '4 dny',
    },
    {
      token: 'dd',
      value: 1,
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: '1 dní',
    },
    {
      token: 'dd',
      value: 2,
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: '2 dny',
    },
    {
      token: 'dd',
      value: 4,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: '4 dny',
    },
    {
      token: 'dd',
      value: 5,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '5 dní',
    },
    {
      token: 'w',
      value: 4,
      noSuffix: false,
      key: 'w',
      future: false,
      expected: 'týdnem',
    },
    {
      token: 'w',
      value: 4,
      noSuffix: true,
      key: 'w',
      future: false,
      expected: 'týden',
    },
    {
      token: 'w',
      value: 4,
      noSuffix: false,
      key: 'w',
      future: true,
      expected: 'týden',
    },
    {
      token: 'w',
      value: 4,
      noSuffix: true,
      key: 'w',
      future: true,
      expected: 'týden',
    },
    {
      token: 'ww',
      value: 4,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: '4 týdny',
    },
    {
      token: 'ww',
      value: 1,
      noSuffix: true,
      key: 'ww',
      future: false,
      expected: '1 týdnů',
    },
    {
      token: 'ww',
      value: 2,
      noSuffix: true,
      key: 'ww',
      future: false,
      expected: '2 týdny',
    },
    {
      token: 'ww',
      value: 4,
      noSuffix: false,
      key: 'ww',
      future: true,
      expected: '4 týdny',
    },
    {
      token: 'ww',
      value: 5,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: '5 týdnů',
    },
    {
      token: 'M',
      value: 4,
      noSuffix: false,
      key: 'M',
      future: false,
      expected: 'měsícem',
    },
    {
      token: 'M',
      value: 4,
      noSuffix: true,
      key: 'M',
      future: false,
      expected: 'měsíc',
    },
    {
      token: 'M',
      value: 4,
      noSuffix: false,
      key: 'M',
      future: true,
      expected: 'měsíc',
    },
    {
      token: 'M',
      value: 4,
      noSuffix: true,
      key: 'M',
      future: true,
      expected: 'měsíc',
    },
    {
      token: 'MM',
      value: 4,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '4 měsíci',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '1 měsíců',
    },
    {
      token: 'MM',
      value: 2,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '2 měsíce',
    },
    {
      token: 'MM',
      value: 4,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '4 měsíce',
    },
    {
      token: 'MM',
      value: 5,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '5 měsíců',
    },
    {
      token: 'y',
      value: 4,
      noSuffix: false,
      key: 'y',
      future: false,
      expected: 'rokem',
    },
    {
      token: 'y',
      value: 4,
      noSuffix: true,
      key: 'y',
      future: false,
      expected: 'rok',
    },
    {
      token: 'y',
      value: 4,
      noSuffix: false,
      key: 'y',
      future: true,
      expected: 'rok',
    },
    {
      token: 'y',
      value: 4,
      noSuffix: true,
      key: 'y',
      future: true,
      expected: 'rok',
    },
    {
      token: 'yy',
      value: 4,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '4 lety',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '1 let',
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
      value: 4,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '4 roky',
    },
    {
      token: 'yy',
      value: 5,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '5 let',
    },
    {
      token: 'yy',
      value: 11,
      noSuffix: true,
      key: 'ab',
      future: true,
      expected: '',
    }, // test for unknown token
  ])('should format relativeTime for "$token" with "$value", "$noSuffix", "$key", "$future"', ({
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

  it('should format unknown token as relativeTime', () => {
    const rtFunctionToken = locale.relativeTime.s as RelativeTimeElementFunction
    expect(rtFunctionToken(4, false, 'x' as RelativeTimeKeys, false)).toBe('')
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
