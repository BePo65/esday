/**
 * Test for locale 'Icelandic [is]'
 */

import { describe, expect, it } from 'vitest'
import locale from '~/locales/is'
import type { RelativeTimeElementFunction, RelativeTimeKeys } from '~/plugins/locale'

describe('locale is', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('is')
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
      expected: 'nokkrum sekúndum',
    },
    {
      token: 's',
      value: 1,
      noSuffix: true,
      key: 's',
      future: false,
      expected: 'nokkrar sekúndur',
    },
    {
      token: 's',
      value: 1,
      noSuffix: false,
      key: 's',
      future: true,
      expected: 'nokkrar sekúndur',
    },
    {
      token: 's',
      value: 1,
      noSuffix: true,
      key: 's',
      future: true,
      expected: 'nokkrar sekúndur',
    },
    {
      token: 'ss',
      value: 1,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '1 sekúnda',
    },
    {
      token: 'ss',
      value: 1,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: '1 sekúnda',
    },
    {
      token: 'ss',
      value: 11,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: '11 sekúndum',
    },
    {
      token: 'ss',
      value: 11,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: '11 sekúndur',
    },
    {
      token: 'ss',
      value: 11,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: '11 sekúndur',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: false,
      expected: 'mínútu',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: false,
      expected: 'mínúta',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: false,
      key: 'm',
      future: true,
      expected: 'mínútu',
    },
    {
      token: 'm',
      value: 1,
      noSuffix: true,
      key: 'm',
      future: true,
      expected: 'mínúta',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '1 mínútu',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '1 mínúta',
    },
    {
      token: 'mm',
      value: 11,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: '11 mínútum',
    },
    {
      token: 'mm',
      value: 11,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: '11 mínútur',
    },
    {
      token: 'mm',
      value: 11,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: '11 mínútur',
    },
    {
      token: 'mm',
      value: 11,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: '11 mínútur',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: false,
      expected: 'klukkustund',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: false,
      expected: 'klukkustund',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: false,
      key: 'h',
      future: true,
      expected: 'klukkustund',
    },
    {
      token: 'h',
      value: 1,
      noSuffix: true,
      key: 'h',
      future: true,
      expected: 'klukkustund',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '1 klukkustund',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '1 klukkustund',
    },
    {
      token: 'hh',
      value: 11,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: '11 klukkustundum',
    },
    {
      token: 'hh',
      value: 11,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: '11 klukkustundir',
    },
    {
      token: 'hh',
      value: 11,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: '11 klukkustundir',
    },
    {
      token: 'hh',
      value: 11,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: '11 klukkustundir',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: false,
      expected: 'degi',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: false,
      expected: 'dagur',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: false,
      key: 'd',
      future: true,
      expected: 'dag',
    },
    {
      token: 'd',
      value: 1,
      noSuffix: true,
      key: 'd',
      future: true,
      expected: 'dagur',
    },
    {
      token: 'dd',
      value: 1,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: '1 degi',
    },
    {
      token: 'dd',
      value: 1,
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: '1 dagur',
    },
    {
      token: 'dd',
      value: 1,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: '1 dag',
    },
    {
      token: 'dd',
      value: 1,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '1 dagur',
    },
    {
      token: 'dd',
      value: 4,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: '4 dögum',
    },
    {
      token: 'dd',
      value: 4,
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: '4 dagar',
    },
    {
      token: 'dd',
      value: 4,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: '4 daga',
    },
    {
      token: 'dd',
      value: 4,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: '4 dagar',
    },

    {
      token: 'w',
      value: 1,
      noSuffix: false,
      key: 'w',
      future: false,
      expected: 'viku',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: true,
      key: 'w',
      future: false,
      expected: 'vika',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: false,
      key: 'w',
      future: true,
      expected: 'viku',
    },
    {
      token: 'w',
      value: 1,
      noSuffix: true,
      key: 'w',
      future: true,
      expected: 'vika',
    },
    {
      token: 'ww',
      value: 1,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: '1 viku',
    },
    {
      token: 'ww',
      value: 1,
      noSuffix: true,
      key: 'ww',
      future: false,
      expected: '1 vikur',
    },
    {
      token: 'ww',
      value: 1,
      noSuffix: false,
      key: 'ww',
      future: true,
      expected: '1 viku',
    },
    {
      token: 'ww',
      value: 1,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: '1 vikur',
    },
    {
      token: 'ww',
      value: 4,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: '4 vikum',
    },
    {
      token: 'ww',
      value: 4,
      noSuffix: true,
      key: 'ww',
      future: false,
      expected: '4 vikur',
    },
    {
      token: 'ww',
      value: 4,
      noSuffix: false,
      key: 'ww',
      future: true,
      expected: '4 vikur',
    },
    {
      token: 'ww',
      value: 4,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: '4 vikur',
    },

    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: false,
      expected: 'mánuði',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: false,
      expected: 'mánuður',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: false,
      key: 'M',
      future: true,
      expected: 'mánuð',
    },
    {
      token: 'M',
      value: 1,
      noSuffix: true,
      key: 'M',
      future: true,
      expected: 'mánuður',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '1 mánuði',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '1 mánuður',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '1 mánuð',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '1 mánuður',
    },
    {
      token: 'MM',
      value: 4,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: '4 mánuðum',
    },
    {
      token: 'MM',
      value: 4,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: '4 mánuðir',
    },
    {
      token: 'MM',
      value: 4,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: '4 mánuði',
    },
    {
      token: 'MM',
      value: 4,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: '4 mánuðir',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: false,
      expected: 'ári',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: false,
      expected: 'ár',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: false,
      key: 'y',
      future: true,
      expected: 'ár',
    },
    {
      token: 'y',
      value: 1,
      noSuffix: true,
      key: 'y',
      future: true,
      expected: 'ár',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '1 ári',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '1 ár',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '1 ár',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '1 ár',
    },
    {
      token: 'yy',
      value: 11,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: '11 árum',
    },
    {
      token: 'yy',
      value: 11,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: '11 ár',
    },
    {
      token: 'yy',
      value: 11,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: '11 ár',
    },
    {
      token: 'yy',
      value: 11,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: '11 ár',
    },
    {
      token: 'yy',
      value: 11,
      noSuffix: true,
      key: 'ab',
      future: true,
      expected: '',
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
    expect(locale.meridiem(10, 0, false)).toBe('AM')
    expect(locale.meridiem(10, 0, true)).toBe('am')
    expect(locale.meridiem(20, 0, false)).toBe('PM')
    expect(locale.meridiem(20, 0, true)).toBe('pm')
  })
})
