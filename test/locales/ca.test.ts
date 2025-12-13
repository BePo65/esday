/**
 * Test for locale 'Catalan [ca]'
 */

import type { EsDay } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/ca'
import type { CalendarSpecValFunction, MonthNamesStandaloneFormat } from '~/plugins/locale'

describe('locale ca', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('ca')
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

  it('should have a method named "ordinal"', () => {
    expect(locale.ordinal).toBeDefined()
    expect(locale.ordinal).toBeTypeOf('function')
  })

  it.each([
    { value: 1, expected: '1r' },
    { value: 2, expected: '2n' },
    { value: 3, expected: '3r' },
    { value: 4, expected: '4t' },
    { value: 5, expected: '5è' },
  ])('should convert "$value" to ordinal', ({ value, expected }) => {
    expect(locale.ordinal(value)).toBe(expected)
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
    { hour: 0, expected: '[avui a les] LT' },
    { hour: 1, expected: '[avui a la] LT' },
  ])('should format sameDay with calendar for hour "$hour"', ({ hour, expected }) => {
    const referenceDate = { hour: () => hour } as EsDay
    const sameDay = locale.calendar.sameDay as CalendarSpecValFunction

    expect(sameDay.call(referenceDate)).toBe(expected)
  })

  it.each([
    { hour: 0, expected: '[demà a les] LT' },
    { hour: 1, expected: '[demà a la] LT' },
  ])('should format nextDay with calendar for hour "$hour"', ({ hour, expected }) => {
    const referenceDate = { hour: () => hour } as EsDay
    const nextDay = locale.calendar.nextDay as CalendarSpecValFunction

    expect(nextDay.call(referenceDate)).toBe(expected)
  })

  it.each([
    { hour: 0, expected: 'dddd [a les] LT' },
    { hour: 1, expected: 'dddd [a la] LT' },
  ])('should format nextWeek with calendar for hour "$hour"', ({ hour, expected }) => {
    const referenceDate = { hour: () => hour } as EsDay
    const nextWeek = locale.calendar.nextWeek as CalendarSpecValFunction

    expect(nextWeek.call(referenceDate)).toBe(expected)
  })

  it.each([
    { hour: 0, expected: '[ahir a les] LT' },
    { hour: 1, expected: '[ahir a la] LT' },
  ])('should format lastDay with calendar for hour "$hour"', ({ hour, expected }) => {
    const referenceDate = { hour: () => hour } as EsDay
    const lastDay = locale.calendar.lastDay as CalendarSpecValFunction

    expect(lastDay.call(referenceDate)).toBe(expected)
  })

  it.each([
    { hour: 0, expected: '[el] dddd [passat a les] LT' },
    { hour: 1, expected: '[el] dddd [passat a la] LT' },
  ])('should format lastWeek with calendar for hour "$hour"', ({ hour, expected }) => {
    const referenceDate = { hour: () => hour } as EsDay
    const lastWeek = locale.calendar.lastWeek as CalendarSpecValFunction

    expect(lastWeek.call(referenceDate)).toBe(expected)
  })

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
