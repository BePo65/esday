/**
 * Test for locale 'Chinese [zh]'
 */

import { type EsDay, esday } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/zh'
import type { CalendarSpecValFunction } from '~/plugins/locale'
import localePlugin from '~/plugins/locale'
import { expectSameValue } from '../util'

esday.extend(localePlugin).registerLocale(locale)

describe('locale zh', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('zh')
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
  })

  it.each([
    { value: 2, period: 'd', expected: '2日' },
    { value: 3, period: 'D', expected: '3日' },
    { value: 4, period: 'DDD', expected: '4日' },
    { value: 5, period: 'M', expected: '5月' },
    { value: 2, period: 'w', expected: '2周' },
    { value: 2, period: 'W', expected: '2周' },
    { value: 3, period: 'MM', expected: '3' },
    { value: 3, period: undefined, expected: '3' },
  ])('should format "$value" with period "$period" using "ordinal"', ({
    value,
    period,
    expected,
  }) => {
    expect(locale.ordinal(value, period)).toBe(expected)
    // moment.js returns number if period does not require an pending string
    expectSameValue((_) => locale.ordinal(value, period).toString())
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
    { thisWeek: 0, refWeek: 1, expected: '[下]dddLT' },
    { thisWeek: 0, refWeek: 0, expected: '[本]dddLT' },
  ])('should format nextWeek with calendar for weekday "$weekday"', ({
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
    { thisWeek: 0, refWeek: 1, expected: '[上]dddLT' },
    { thisWeek: 0, refWeek: 0, expected: '[本]dddLT' },
  ])('should format lastWeek with calendar for weekday "$weekday"', ({
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
    expect(locale.meridiem(5, 59, false)).toBe('凌晨')
    expect(locale.meridiem(8, 59, true)).toBe('早上')
    expect(locale.meridiem(10, 59, false)).toBe('上午')
    expect(locale.meridiem(12, 59, false)).toBe('中午')
    expect(locale.meridiem(17, 59, true)).toBe('下午')
    expect(locale.meridiem(18, 0, true)).toBe('晚上')
  })
})
