/**
 * Test for locale 'Breton [br]'
 */

import { type EsDay, esday } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/br'
import localePlugin, {
  type CalendarSpecValFunction,
  type RelativeTimeElementFunction,
} from '~/plugins/locale'

esday.extend(localePlugin)
esday.registerLocale(locale)

describe('locale br', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('br')
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
    { weekday: 0, expected: '[prošlu] dddd [u] LT' },
    { weekday: 1, expected: '[prošli] dddd [u] LT' },
    { weekday: 2, expected: '[prošli] dddd [u] LT' },
    { weekday: 3, expected: '[prošlu] dddd [u] LT' },
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

    const rtFunctionSeconds = locale.relativeTime.ss as RelativeTimeElementFunction
    expect(rtFunctionSeconds(4, false, 'ss', false)).toBe('4 eilenn')

    const rtFunctionMinutes = locale.relativeTime.mm as RelativeTimeElementFunction
    expect(rtFunctionMinutes(0, false, 'mm', false)).toBe('0 munutenn')
    expect(rtFunctionMinutes(2, false, 'mm', false)).toBe('2 vunutenn')

    const rtFunctionYears = locale.relativeTime.yy as RelativeTimeElementFunction
    expect(rtFunctionYears(0, false, 'yy', false)).toBe('0 vloaz')
    expect(rtFunctionYears(1, false, 'yy', false)).toBe('1 bloaz')
    expect(rtFunctionYears(12, false, 'yy', false)).toBe('12 vloaz')
  })

  it('should have a method named "meridiem"', () => {
    expect(locale.meridiem).toBeDefined()
    expect(locale.meridiem).toBeTypeOf('function')
    expect(locale.meridiem(10, 0, false)).toBe('a.m.')
    expect(locale.meridiem(10, 0, true)).toBe('a.m.')
    expect(locale.meridiem(20, 0, false)).toBe('g.m.')
    expect(locale.meridiem(20, 0, true)).toBe('g.m.')
  })
})
