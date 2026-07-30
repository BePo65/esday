/**
 * Test for locale 'Mongolian [mn]'
 */

import { describe, expect, it } from 'vitest'
import locale from '~/locales/mn'
import type { RelativeTimeElementFunction, RelativeTimeKeys } from '~/plugins/locale'

describe('locale mn', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('mn')
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
      expected: 'хэдхэн секундын',
    },
    {
      token: 's',
      value: 1,
      noSuffix: true,
      key: 's',
      future: false,
      expected: 'хэдхэн секунд',
    },
    {
      token: 's',
      value: 1,
      noSuffix: false,
      key: 's',
      future: true,
      expected: 'хэдхэн секундын',
    },
    {
      token: 's',
      value: 1,
      noSuffix: true,
      key: 's',
      future: true,
      expected: 'хэдхэн секунд',
    },
    {
      token: 'ss',
      value: 1,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '1 секундын',
    },
    {
      token: 'ss',
      value: 2,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: '2 секунд',
    },
    {
      token: 'ss',
      value: 11,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: '11 секундын',
    },
    {
      token: 'ss',
      value: 12,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: '12 секунд',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: false,
      expected: '1 минутын',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: false,
      expected: '1 минут',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: true,
      expected: '1 минутын',
    },
    {
      token: 'm',
      value: 2,
      noSuffix: true,
      key: 'm',
      future: true,
      expected: '2 минут',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '1 минутын',
    },
    {
      token: 'mm',
      value: 2,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '2 минут',
    },
    {
      token: 'mm',
      value: 11,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '11 минутын',
    },
    {
      token: 'mm',
      value: 12,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '12 минут',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: false,
      expected: '1 цагийн',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: false,
      expected: '1 цаг',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: true,
      expected: '1 цагийн',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: true,
      expected: '1 цаг',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '1 цагийн',
    },
    {
      token: 'hh',
      value: 2,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: '2 цаг',
    },
    {
      token: 'hh',
      value: 11,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: '11 цагийн',
    },
    {
      token: 'hh',
      value: 12,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '12 цаг',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: false,
      expected: '1 өдрийн',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: false,
      expected: '1 өдөр',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: true,
      expected: '1 өдрийн',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: true,
      expected: '1 өдөр',
    },
    {
      token: 'dd',
      value: 1,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: '1 өдрийн',
    },
    {
      token: 'dd',
      value: 2,
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: '2 өдөр',
    },
    {
      token: 'dd',
      value: 11,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: '11 өдрийн',
    },
    {
      token: 'dd',
      value: 12,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '12 өдөр',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: false,
      expected: '1 сарын',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: false,
      expected: '1 сар',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: true,
      expected: '1 сарын',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: true,
      expected: '1 сар',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '1 сарын',
    },
    {
      token: 'MM',
      value: 2,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '2 сар',
    },
    {
      token: 'MM',
      value: 11,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '11 сарын',
    },
    {
      token: 'MM',
      value: 12,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '12 сар',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: false,
      key: 'w',
      future: false,
      expected: '1 хоногийн',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: true,
      key: 'w',
      future: false,
      expected: '1 долоо',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: false,
      key: 'w',
      future: true,
      expected: '1 хоногийн',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: true,
      key: 'w',
      future: true,
      expected: '1 долоо',
    },
    {
      token: 'ww',
      value: 1,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: '1 хоногийн',
    },
    {
      token: 'ww',
      value: 2,
      noSuffix: true,
      key: 'ww',
      future: false,
      expected: '2 долоо',
    },
    {
      token: 'ww',
      value: 11,
      noSuffix: false,
      key: 'ww',
      future: true,
      expected: '11 хоногийн',
    },
    {
      token: 'ww',
      value: 12,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: '12 долоо',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: false,
      expected: '1 сарын',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: false,
      expected: '1 сар',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: true,
      expected: '1 сарын',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: true,
      expected: '1 сар',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '1 сарын',
    },
    {
      token: 'MM',
      value: 2,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '2 сар',
    },
    {
      token: 'MM',
      value: 11,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '11 сарын',
    },
    {
      token: 'MM',
      value: 12,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '12 сар',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: false,
      expected: '1 жилийн',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: false,
      expected: '1 жил',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: true,
      expected: '1 жилийн',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: true,
      expected: '1 жил',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '1 жилийн',
    },
    {
      token: 'yy',
      value: 2,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '2 жил',
    },
    {
      token: 'yy',
      value: 11,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '11 жилийн',
    },
    {
      token: 'yy',
      value: 12,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '12 жил',
    },
    {
      token: 'yy',
      value: 11,
      noSuffix: true,
      key: 'ab',
      future: true,
      expected: '11',
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
    expect(locale.meridiem(10, 0, false)).toBe('ҮӨ')
    expect(locale.meridiem(10, 0, true)).toBe('ҮӨ')
    expect(locale.meridiem(20, 0, false)).toBe('ҮХ')
    expect(locale.meridiem(20, 0, true)).toBe('ҮХ')
  })
})
