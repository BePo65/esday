/**
 * Test for locale 'Arabic [ar]'.
 */

import { describe, expect, it } from 'vitest'
import locale from '~/locales/ar'
import type { RelativeTimeElementFunction } from '~/plugins'

describe('locale ar', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('ar')
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

  it('should have an object named "relativeTime" with functions', () => {
    expect(locale.relativeTime).toBeDefined()
    expect(locale.relativeTime).toBeTypeOf('object')
    expect(Object.keys(locale.relativeTime ?? {}).length).toBe(14)

    const rtFunctionSecond = locale.relativeTime.s as RelativeTimeElementFunction
    expect(rtFunctionSecond(0, false, '', false)).toBe('أقل من ثانية')
    expect(rtFunctionSecond(102, false, '', false)).toBe('102 ثانية')
    expect(rtFunctionSecond(2, false, '', false)).toBe('ثانيتين')
    expect(rtFunctionSecond(2, true, '', false)).toBe('ثانيتان')
  })

  it('should have a method named "meridiem"', () => {
    expect(locale.meridiem).toBeDefined()
    expect(locale.meridiem).toBeTypeOf('function')
    expect(locale.meridiem(10, 0, false)).toBe('ص')
    expect(locale.meridiem(20, 0, true)).toBe('م')
  })

  it('should have a method named "preParse"', () => {
    expect(locale.preParse).toBeDefined()
    expect(locale.preParse).toBeTypeOf('function')
    expect(locale.preParse?.('١٢٣٤٥٦٧٨٩٠')).toBe('1234567890')
  })

  it('should have a method named "postFormat"', () => {
    expect(locale.postFormat).toBeDefined()
    expect(locale.postFormat).toBeTypeOf('function')
    expect(locale.postFormat?.('1234567890')).toBe('١٢٣٤٥٦٧٨٩٠')
  })
})
