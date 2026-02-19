/**
 * Test for locale 'Japanese [ja]'
 */

import type { EsDay } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/ja'
import type { CalendarSpecValFunction } from '~/plugins/locale'

describe('locale ja', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('ja')
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
    expect(locale.ordinal(2)).toBe('2日')
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
    { thisWeek: 0, refWeek: 0, expected: 'dddd LT' },
    { thisWeek: 0, refWeek: 1, expected: '[来週]dddd LT' },
    { thisWeek: 1, refWeek: 1, expected: 'dddd LT' },
  ])('should format nextWeek with calendar for week "$thisWeek" and ref week "$refWeek"', ({
    thisWeek,
    refWeek,
    expected,
  }) => {
    const thisDate = { week: () => thisWeek } as EsDay
    const referenceDate = { week: () => refWeek } as EsDay
    const nextWeek = locale.calendar.nextWeek as CalendarSpecValFunction

    expect(nextWeek.call(thisDate, referenceDate)).toBe(expected)
  })

  it.each([
    { thisWeek: 0, refWeek: 0, expected: 'dddd LT' },
    { thisWeek: 0, refWeek: 1, expected: '[先週]dddd LT' },
    { thisWeek: 1, refWeek: 1, expected: 'dddd LT' },
  ])('should format lastWeek with calendar for week "$thisWeek" and ref week "$refWeek"', ({
    thisWeek,
    refWeek,
    expected,
  }) => {
    const thisDate = { week: () => thisWeek } as EsDay
    const referenceDate = { week: () => refWeek } as EsDay
    const lastWeek = locale.calendar.lastWeek as CalendarSpecValFunction

    expect(lastWeek.call(thisDate, referenceDate)).toBe(expected)
  })

  it('should have an object named "relativeTime"', () => {
    expect(locale.relativeTime).toBeDefined()
    expect(locale.relativeTime).toBeTypeOf('object')
    expect(Object.keys(locale.relativeTime ?? {}).length).toBe(16)
  })

  it('should have a method named "meridiem"', () => {
    expect(locale.meridiem).toBeDefined()
    expect(locale.meridiem).toBeTypeOf('function')
    expect(locale.meridiem(10, 0, false)).toBe('午前')
    expect(locale.meridiem(10, 0, true)).toBe('午前')
    expect(locale.meridiem(20, 0, false)).toBe('午後')
    expect(locale.meridiem(20, 0, true)).toBe('午後')
  })
})
