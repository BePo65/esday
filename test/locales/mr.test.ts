/**
 * Test for locale 'Marathi [mr]'
 */

import { describe, expect, it } from 'vitest'
import locale from '~/locales/mr'
import type { RelativeTimeElementFunction, RelativeTimeKeys } from '~/plugins/locale'

describe('locale mr', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('mr')
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

  it.each([
    {
      token: 's',
      value: 1,
      noSuffix: false,
      key: 's',
      future: false,
      expected: 'काही सेकंदां',
    },
    {
      token: 's',
      value: 1,
      noSuffix: true,
      key: 's',
      future: false,
      expected: 'काही सेकंद',
    },
    {
      token: 's',
      value: 1,
      noSuffix: false,
      key: 's',
      future: true,
      expected: 'काही सेकंदां',
    },
    {
      token: 's',
      value: 1,
      noSuffix: true,
      key: 's',
      future: true,
      expected: 'काही सेकंद',
    },
    {
      token: 'ss',
      value: 1,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '1 सेकंदां',
    },
    {
      token: 'ss',
      value: 1,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: '1 सेकंद',
    },
    {
      token: 'ss',
      value: 11,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: '11 सेकंदां',
    },
    {
      token: 'ss',
      value: 11,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: '11 सेकंद',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: false,
      expected: 'एका मिनिटा',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: false,
      expected: 'एक मिनिट',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: true,
      expected: 'एका मिनिटा',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: true,
      expected: 'एक मिनिट',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '1 मिनिटां',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '1 मिनिटे',
    },
    {
      token: 'mm',
      value: 11,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '11 मिनिटां',
    },
    {
      token: 'mm',
      value: 11,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '11 मिनिटे',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: false,
      expected: 'एका तासा',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: false,
      expected: 'एक तास',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: true,
      expected: 'एका तासा',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: true,
      expected: 'एक तास',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '1 तासां',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: '1 तास',
    },
    {
      token: 'hh',
      value: 11,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: '11 तासां',
    },
    {
      token: 'hh',
      value: 11,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '11 तास',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: false,
      expected: 'एका दिवसा',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: false,
      expected: 'एक दिवस',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: true,
      expected: 'एका दिवसा',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: true,
      expected: 'एक दिवस',
    },
    {
      token: 'dd',
      value: 1,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: '1 दिवसां',
    },
    {
      token: 'dd',
      value: 1,
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: '1 दिवस',
    },
    {
      token: 'dd',
      value: 4,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: '4 दिवसां',
    },
    {
      token: 'dd',
      value: 1,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '1 दिवस',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: false,
      key: 'w',
      future: false,
      expected: 'एका आठवड्यात',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: true,
      key: 'w',
      future: false,
      expected: 'एक आठवडा',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: false,
      key: 'w',
      future: true,
      expected: 'एका आठवड्यात',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: true,
      key: 'w',
      future: true,
      expected: 'एक आठवडा',
    },
    {
      token: 'ww',
      value: 1,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: '1 आठवडे',
    },
    {
      token: 'ww',
      value: 1,
      noSuffix: true,
      key: 'ww',
      future: false,
      expected: '1 आठवडा',
    },
    {
      token: 'ww',
      value: 1,
      noSuffix: false,
      key: 'ww',
      future: true,
      expected: '1 आठवडे',
    },
    {
      token: 'ww',
      value: 1,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: '1 आठवडा',
    },

    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: false,
      expected: 'एका महिन्या',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: false,
      expected: 'एक महिना',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: true,
      expected: 'एका महिन्या',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: true,
      expected: 'एक महिना',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '1 महिन्यां',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '1 महिने',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '1 महिन्यां',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '1 महिने',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: false,
      expected: 'एका वर्षा',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: false,
      expected: 'एक वर्ष',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: true,
      expected: 'एका वर्षा',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: true,
      expected: 'एक वर्ष',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '1 वर्षां',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '1 वर्षे',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '1 वर्षां',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '1 वर्षे',
    },
  ])('should format relativeTime for "$token" with "$value", "$key", "$noSuffix", "$future"', ({
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

  it('should have a method named "meridiem"', () => {
    expect(locale.meridiem).toBeDefined()
    expect(locale.meridiem).toBeTypeOf('function')
    expect(locale.meridiem(0, 0, false)).toBe('पहाटे')
    expect(locale.meridiem(6, 0, false)).toBe('सकाळी')
    expect(locale.meridiem(12, 0, false)).toBe('दुपारी')
    expect(locale.meridiem(18, 0, false)).toBe('सायंकाळी')
    expect(locale.meridiem(20, 0, false)).toBe('रात्री')
  })

  it('should have a method named "preParse"', () => {
    expect(locale.preParse).toBeDefined()
    expect(locale.preParse).toBeTypeOf('function')
    expect(locale.preParse?.('१२३४५६७८९०')).toBe('1234567890')
  })

  it('should have a method named "postFormat"', () => {
    expect(locale.postFormat).toBeDefined()
    expect(locale.postFormat).toBeTypeOf('function')
    expect(locale.postFormat?.('1234567890')).toBe('१२३४५६७८९०')
  })
})
