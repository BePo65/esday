/**
 * Test for locale 'Konkani Latin script [gom-LATN]'
 */

import { describe, expect, it } from 'vitest'
import locale from '~/locales/gom-latn'
import type { MonthNamesStandaloneFormat, RelativeTimeElementFunction } from '~/plugins/locale'

describe('locale gom-LATN', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('gom-LATN')
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

    const rtFunctionSeconds = locale.relativeTime.ss as RelativeTimeElementFunction
    expect(rtFunctionSeconds(4, false, 'ss', false)).toBe('4 sekond')
    expect(rtFunctionSeconds(4, false, 'ss', true)).toBe('4 sekondamni')
  })

  it('should have a method named "meridiem"', () => {
    expect(locale.meridiem).toBeDefined()
    expect(locale.meridiem).toBeTypeOf('function')
    expect(locale.meridiem(1, 0, false)).toBe('rati')
    expect(locale.meridiem(11, 0, true)).toBe('sokallim')
    expect(locale.meridiem(15, 0, false)).toBe('donparam')
    expect(locale.meridiem(19, 0, true)).toBe('sanje')
    expect(locale.meridiem(23, 0, true)).toBe('rati')
  })
})
