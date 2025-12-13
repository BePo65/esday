/**
 * Test for locale 'Belarusian [be]'
 */

import { describe, expect, it } from 'vitest'
import locale from '~/locales/be'
import type {
  DayNamesStandaloneFormat,
  MonthNames,
  MonthNamesStandaloneFormat,
} from '~/plugins/locale'

describe('locale be', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('be')
  })

  it('should have 7 weekday names', () => {
    const weekdays = locale.weekdays as DayNamesStandaloneFormat

    expect(weekdays).toBeDefined()
    expect(weekdays).toBeTypeOf('object')
    expect(weekdays.standalone).toBeDefined()
    expect(weekdays.standalone.length).toBe(7)
    expect(weekdays.format).toBeDefined()
    expect(weekdays.format.length).toBe(7)
    expect(weekdays.isFormat).toBeDefined()
    expect(weekdays.isFormat).toBeInstanceOf(RegExp)
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
  })

  it('should have 12 short month names', () => {
    expect(locale.monthsShort).toBeDefined()
    expect((locale.monthsShort as MonthNames).length).toBe(12)
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
