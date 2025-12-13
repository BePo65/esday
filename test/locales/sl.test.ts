/**
 * Test for locale 'Slovenian [sl]'
 */

import type { EsDay } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/sl'
import type {
  CalendarSpecValFunction,
  RelativeTimeElementFunction,
  RelativeTimeKeys,
} from '~/plugins/locale'

describe('locale sl', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('sl')
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
    { weekday: 0, expected: '[v] [nedeljo] [ob] LT' },
    { weekday: 1, expected: '[v] dddd [ob] LT' },
    { weekday: 2, expected: '[v] dddd [ob] LT' },
    { weekday: 3, expected: '[v] [sredo] [ob] LT' },
    { weekday: 4, expected: '[v] dddd [ob] LT' },
    { weekday: 5, expected: '[v] dddd [ob] LT' },
    { weekday: 6, expected: '[v] [soboto] [ob] LT' },
    { weekday: 7, expected: '' },
  ])('should format nextWeek with calendar for weekday "$weekday"', ({ weekday, expected }) => {
    const referenceDate = { day: () => weekday } as EsDay
    const nextWeek = locale.calendar.nextWeek as CalendarSpecValFunction

    expect(nextWeek.call(referenceDate)).toBe(expected)
  })

  it.each([
    { weekday: 0, expected: '[prejšnjo] [nedeljo] [ob] LT' },
    { weekday: 1, expected: '[prejšnji] dddd [ob] LT' },
    { weekday: 2, expected: '[prejšnji] dddd [ob] LT' },
    { weekday: 3, expected: '[prejšnjo] [sredo] [ob] LT' },
    { weekday: 4, expected: '[prejšnji] dddd [ob] LT' },
    { weekday: 5, expected: '[prejšnji] dddd [ob] LT' },
    { weekday: 6, expected: '[prejšnjo] [soboto] [ob] LT' },
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
      expected: 'nekaj sekundami',
    },
    {
      token: 's',
      value: 1,
      noSuffix: true,
      key: 's',
      future: false,
      expected: 'nekaj sekund',
    },
    {
      token: 's',
      value: 1,
      noSuffix: false,
      key: 's',
      future: true,
      expected: 'nekaj sekund',
    },
    {
      token: 's',
      value: 1,
      noSuffix: true,
      key: 's',
      future: true,
      expected: 'nekaj sekund',
    },
    {
      token: 'ss',
      value: 1,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '1 sekundi',
    },
    {
      token: 'ss',
      value: 1,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: '1 sekundo',
    },
    {
      token: 'ss',
      value: 1,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: '1 sekundi',
    },
    {
      token: 'ss',
      value: 1,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: '1 sekundo',
    },
    {
      token: 'ss',
      value: 2,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '2 sekundah',
    },
    {
      token: 'ss',
      value: 2,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: '2 sekundi',
    },
    {
      token: 'ss',
      value: 2,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: '2 sekundi',
    },
    {
      token: 'ss',
      value: 2,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: '2 sekundi',
    },
    {
      token: 'ss',
      value: 3,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '3 sekundah',
    },
    {
      token: 'ss',
      value: 3,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: '3 sekunde',
    },
    {
      token: 'ss',
      value: 3,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: '3 sekunde',
    },
    {
      token: 'ss',
      value: 3,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: '3 sekunde',
    },
    {
      token: 'ss',
      value: 5,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '5 sekund',
    },
    {
      token: 'ss',
      value: 5,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: '5 sekund',
    },
    {
      token: 'ss',
      value: 5,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: '5 sekund',
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
      value: 1,
      noSuffix: false,
      key: 'm',
      future: false,
      expected: 'eno minuto',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: false,
      expected: 'ena minuta',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: true,
      expected: 'eno minuto',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: true,
      expected: 'ena minuta',
    },
    {
      token: 'mm',
      value: 2,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '2 minutama',
    },
    {
      token: 'mm',
      value: 2,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '2 minuti',
    },
    {
      token: 'mm',
      value: 2,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '2 minuti',
    },
    {
      token: 'mm',
      value: 2,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '2 minuti',
    },
    {
      token: 'mm',
      value: 3,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '3 minutami',
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
      value: 3,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '3 minute',
    },
    {
      token: 'mm',
      value: 3,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '3 minute',
    },
    {
      token: 'mm',
      value: 3,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '3 minute',
    },
    {
      token: 'mm',
      value: 5,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '5 minutami',
    },
    {
      token: 'mm',
      value: 5,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '5 minut',
    },
    {
      token: 'mm',
      value: 5,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '5 minut',
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
      value: 1,
      noSuffix: false,
      key: 'h',
      future: false,
      expected: 'eno uro',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: false,
      expected: 'ena ura',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: true,
      expected: 'eno uro',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: true,
      expected: 'ena ura',
    },
    {
      token: 'hh',
      value: 2,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '2 urama',
    },
    {
      token: 'hh',
      value: 2,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: '2 uri',
    },
    {
      token: 'hh',
      value: 2,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: '2 uri',
    },
    {
      token: 'hh',
      value: 2,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '2 uri',
    },
    {
      token: 'hh',
      value: 3,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '3 urami',
    },
    {
      token: 'hh',
      value: 4,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '4 urami',
    },
    {
      token: 'hh',
      value: 3,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: '3 ure',
    },
    {
      token: 'hh',
      value: 3,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: '3 ure',
    },
    {
      token: 'hh',
      value: 3,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '3 ure',
    },
    {
      token: 'hh',
      value: 5,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '5 urami',
    },
    {
      token: 'hh',
      value: 5,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: '5 ur',
    },
    {
      token: 'hh',
      value: 5,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: '5 ur',
    },
    {
      token: 'hh',
      value: 5,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '5 ur',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: false,
      expected: 'enim dnem',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: false,
      expected: 'en dan',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: true,
      expected: 'en dan',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: true,
      expected: 'en dan',
    },
    {
      token: 'dd',
      value: 2,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: '2 dnevoma',
    },
    {
      token: 'dd',
      value: 2,
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: '2 dneva',
    },
    {
      token: 'dd',
      value: 2,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: '2 dneva',
    },
    {
      token: 'dd',
      value: 2,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '2 dneva',
    },
    {
      token: 'dd',
      value: 3,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: '3 dnevi',
    },
    {
      token: 'dd',
      value: 4,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: '4 dnevi',
    },
    {
      token: 'dd',
      value: 3,
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: '3 dni',
    },
    {
      token: 'dd',
      value: 3,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: '3 dni',
    },
    {
      token: 'dd',
      value: 3,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '3 dni',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: false,
      key: 'w',
      future: false,
      expected: 'enem tednu',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: true,
      key: 'w',
      future: false,
      expected: 'en teden',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: false,
      key: 'w',
      future: true,
      expected: 'en teden',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: true,
      key: 'w',
      future: true,
      expected: 'en teden',
    },
    {
      token: 'ww',
      value: 2,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: '2 tednoma',
    },
    {
      token: 'ww',
      value: 2,
      noSuffix: true,
      key: 'ww',
      future: false,
      expected: '2 tedna',
    },
    {
      token: 'ww',
      value: 2,
      noSuffix: false,
      key: 'ww',
      future: true,
      expected: '2 tedna',
    },
    {
      token: 'ww',
      value: 2,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: '2 tedna',
    },
    {
      token: 'ww',
      value: 3,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: '3 tedni',
    },
    {
      token: 'ww',
      value: 4,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: '4 tedni',
    },
    {
      token: 'ww',
      value: 3,
      noSuffix: true,
      key: 'ww',
      future: false,
      expected: '3 tednih',
    },
    {
      token: 'ww',
      value: 3,
      noSuffix: false,
      key: 'ww',
      future: true,
      expected: '3 tednih',
    },
    {
      token: 'ww',
      value: 3,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: '3 tednih',
    },
    {
      token: 'ww',
      value: 4,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: '4 tednih',
    },
    {
      token: 'ww',
      value: 5,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: '5 tedni',
    },
    {
      token: 'ww',
      value: 5,
      noSuffix: true,
      key: 'ww',
      future: false,
      expected: '5 tednih',
    },
    {
      token: 'ww',
      value: 5,
      noSuffix: false,
      key: 'ww',
      future: true,
      expected: '5 tednih',
    },
    {
      token: 'ww',
      value: 5,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: '5 tednih',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: false,
      expected: 'enim mesecem',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: false,
      expected: 'en mesec',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: true,
      expected: 'en mesec',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: true,
      expected: 'en mesec',
    },
    {
      token: 'MM',
      value: 2,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '2 mesecema',
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
      value: 2,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '2 meseca',
    },
    {
      token: 'MM',
      value: 2,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '2 meseca',
    },
    {
      token: 'MM',
      value: 3,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '3 meseci',
    },
    {
      token: 'MM',
      value: 4,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '4 meseci',
    },
    {
      token: 'MM',
      value: 3,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '3 mesece',
    },
    {
      token: 'MM',
      value: 3,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '3 mesece',
    },
    {
      token: 'MM',
      value: 3,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '3 mesece',
    },
    {
      token: 'MM',
      value: 4,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '4 mesece',
    },
    {
      token: 'MM',
      value: 5,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '5 meseci',
    },
    {
      token: 'MM',
      value: 5,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '5 mesecev',
    },
    {
      token: 'MM',
      value: 5,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '5 mesecev',
    },
    {
      token: 'MM',
      value: 5,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '5 mesecev',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: false,
      expected: 'enim letom',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: false,
      expected: 'eno leto',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: true,
      expected: 'eno leto',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: true,
      expected: 'eno leto',
    },
    {
      token: 'yy',
      value: 2,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '2 letoma',
    },
    {
      token: 'yy',
      value: 2,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '2 leti',
    },
    {
      token: 'yy',
      value: 2,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '2 leti',
    },
    {
      token: 'yy',
      value: 2,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '2 leti',
    },
    {
      token: 'yy',
      value: 3,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '3 leti',
    },
    {
      token: 'yy',
      value: 4,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '4 leti',
    },
    {
      token: 'yy',
      value: 3,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '3 leta',
    },
    {
      token: 'yy',
      value: 3,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '3 leta',
    },
    {
      token: 'yy',
      value: 3,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '3 leta',
    },
    {
      token: 'yy',
      value: 5,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '5 leti',
    },
    {
      token: 'yy',
      value: 35,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '35 leti',
    },
    {
      token: 'yy',
      value: 5,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '5 let',
    },
    {
      token: 'yy',
      value: 5,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '5 let',
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
      value: 55,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '55 let',
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
