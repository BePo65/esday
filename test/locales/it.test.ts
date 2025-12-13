/**
 * Test for locale 'Italian [it]'
 */

import type { EsDay } from 'esday'
import { describe, expect, it } from 'vitest'
import locale from '~/locales/it'
import type { CalendarSpecValFunction } from '~/plugins/locale'

describe('locale it', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('it')
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
    expect(locale.ordinal(2)).toBe('2º')
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
    { hour: 0, expected: '[Oggi a ]LT' },
    { hour: 1, expected: "[Oggi all']LT" },
    { hour: 2, expected: '[Oggi alle ]LT' },
  ])('should format sameDay with calendar for hour "$hour"', ({ hour, expected }) => {
    const referenceDate = { hour: () => hour } as EsDay
    const sameDay = locale.calendar.sameDay as CalendarSpecValFunction

    expect(sameDay.call(referenceDate)).toBe(expected)
  })

  it.each([
    { hour: 0, expected: '[Domani a ]LT' },
    { hour: 1, expected: "[Domani all']LT" },
    { hour: 2, expected: '[Domani alle ]LT' },
  ])('should format nextDay with calendar for hour "$hour"', ({ hour, expected }) => {
    const referenceDate = { hour: () => hour } as EsDay
    const nextDay = locale.calendar.nextDay as CalendarSpecValFunction

    expect(nextDay.call(referenceDate)).toBe(expected)
  })

  it.each([
    { hour: 0, expected: 'dddd [a ]LT' },
    { hour: 1, expected: "dddd [all']LT" },
    { hour: 2, expected: 'dddd [alle ]LT' },
  ])('should format nextWeek with calendar for hour "$hour"', ({ hour, expected }) => {
    const referenceDate = { hour: () => hour } as EsDay
    const nextWeek = locale.calendar.nextWeek as CalendarSpecValFunction

    expect(nextWeek.call(referenceDate)).toBe(expected)
  })

  it.each([
    { hour: 0, expected: '[Ieri a ]LT' },
    { hour: 1, expected: "[Ieri all']LT" },
    { hour: 2, expected: '[Ieri alle ]LT' },
  ])('should format lastDay with calendar for hour "$hour"', ({ hour, expected }) => {
    const referenceDate = { hour: () => hour } as EsDay
    const lastDay = locale.calendar.lastDay as CalendarSpecValFunction

    expect(lastDay.call(referenceDate)).toBe(expected)
  })

  it.each([
    { day: 0, hour: 0, expected: '[La scorsa] dddd [a ]LT' },
    { day: 0, hour: 1, expected: "[La scorsa] dddd [all']LT" },
    { day: 0, hour: 2, expected: '[La scorsa] dddd [alle ]LT' },
    { day: 1, hour: 0, expected: '[Lo scorso] dddd [a ]LT' },
    { day: 1, hour: 1, expected: "[Lo scorso] dddd [all']LT" },
    { day: 1, hour: 2, expected: '[Lo scorso] dddd [alle ]LT' },
  ])(
    'should format lastWeek with calendar for day "$day" and hour "$hour"',
    ({ day, hour, expected }) => {
      const referenceDate = { day: () => day, hour: () => hour } as EsDay
      const lastWeek = locale.calendar.lastWeek as CalendarSpecValFunction

      expect(lastWeek.call(referenceDate)).toBe(expected)
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
