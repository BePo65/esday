/**
 * Test for locale 'Klingon [tlh]'
 */

import { describe, expect, it } from 'vitest'
import locale from '~/locales/tlh'
import type { RelativeTimeElementFunction, RelativeTimeKeys } from '~/plugins/locale'

describe('locale tlh', () => {
  it('should have the correct name', () => {
    expect(locale.name).toBe('tlh')
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

    // test for unknown token
    const tokenKey = 'yy' as keyof RelativeTimeElementFunction
    const rtFunction: RelativeTimeElementFunction = locale.relativeTime[tokenKey]

    expect(rtFunction(11, false, 'ab' as RelativeTimeKeys, true)).toBe('')
  })

  it.each([
    {
      token: 'future',
      value: 'wej jaj',
      noSuffix: false,
      key: '',
      future: false,
      expected: 'wej leS',
    },
    {
      token: 'future',
      value: 'wej jar',
      noSuffix: false,
      key: '',
      future: false,
      expected: 'wej waQ',
    },
    {
      token: 'future',
      value: 'wej DIS',
      noSuffix: false,
      key: '',
      future: false,
      expected: 'wej nem',
    },
    {
      token: 'future',
      value: 'wej tup',
      noSuffix: false,
      key: '',
      future: false,
      expected: 'wej tup pIq',
    },
    {
      token: 'future',
      value: 'wej',
      noSuffix: false,
      key: '',
      future: false,
      expected: 'wej pIq',
    },
  ])('should format relativeTime for "future" with "$value", "$key", "$noSuffix", "$future"', ({
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

  it.each([
    {
      token: 'past',
      value: 'wej jaj',
      noSuffix: false,
      key: '',
      future: false,
      expected: 'wej Hu’',
    },
    {
      token: 'past',
      value: 'wej jar',
      noSuffix: false,
      key: '',
      future: false,
      expected: 'wej wen',
    },
    {
      token: 'past',
      value: 'wej DIS',
      noSuffix: false,
      key: '',
      future: false,
      expected: 'wej ben',
    },
    {
      token: 'past',
      value: 'wej tup',
      noSuffix: false,
      key: '',
      future: false,
      expected: 'wej tup ret',
    },
    {
      token: 'past',
      value: 'wej',
      noSuffix: false,
      key: '',
      future: false,
      expected: 'wej ret',
    },
  ])('should format relativeTime for "past" with "$value", "$key", "$noSuffix", "$future"', ({
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

  it.each([
    {
      token: 'ss',
      value: 0,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: 'pagh lup',
    },
    {
      token: 'ss',
      value: 1,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: 'wa’ lup',
    },
    {
      token: 'ss',
      value: 2,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: 'cha’ lup',
    },
    {
      token: 'ss',
      value: 3,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: 'wej lup',
    },
    {
      token: 'ss',
      value: 4,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: 'loS lup',
    },
    {
      token: 'ss',
      value: 5,
      noSuffix: false,
      key: 'ss',
      future: false,
      expected: 'vagh lup',
    },
    {
      token: 'ss',
      value: 6,
      noSuffix: true,
      key: 'ss',
      future: false,
      expected: 'jav lup',
    },
    {
      token: 'ss',
      value: 7,
      noSuffix: false,
      key: 'ss',
      future: true,
      expected: 'Soch lup',
    },
    {
      token: 'ss',
      value: 8,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: 'chorgh lup',
    },
    {
      token: 'ss',
      value: 9,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: 'Hut lup',
    },
    {
      token: 'ss',
      value: 10,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: 'wa’maH lup',
    },
    {
      token: 'ss',
      value: 11,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: 'wa’maH wa’ lup',
    },
    {
      token: 'ss',
      value: 110,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: 'wa’vatlh wa’maH lup',
    },
    {
      token: 'ss',
      value: 111,
      noSuffix: true,
      key: 'ss',
      future: true,
      expected: 'wa’vatlh wa’maH wa’ lup',
    },
  ])('should format relativeTime for "ss" with "$value", "$key", "$noSuffix", "$future"', ({
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

  it.each([
    {
      token: 'mm',
      value: 0,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: 'pagh tup',
    },
    {
      token: 'mm',
      value: 1,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: 'wa’ tup',
    },
    {
      token: 'mm',
      value: 2,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: 'cha’ tup',
    },
    {
      token: 'mm',
      value: 3,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: 'wej tup',
    },
    {
      token: 'mm',
      value: 4,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: 'loS tup',
    },
    {
      token: 'mm',
      value: 5,
      noSuffix: false,
      key: 'mm',
      future: false,
      expected: 'vagh tup',
    },
    {
      token: 'mm',
      value: 6,
      noSuffix: true,
      key: 'mm',
      future: false,
      expected: 'jav tup',
    },
    {
      token: 'mm',
      value: 7,
      noSuffix: false,
      key: 'mm',
      future: true,
      expected: 'Soch tup',
    },
    {
      token: 'mm',
      value: 8,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: 'chorgh tup',
    },
    {
      token: 'mm',
      value: 9,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: 'Hut tup',
    },
    {
      token: 'mm',
      value: 10,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: 'wa’maH tup',
    },
    {
      token: 'mm',
      value: 11,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: 'wa’maH wa’ tup',
    },
    {
      token: 'mm',
      value: 110,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: 'wa’vatlh wa’maH tup',
    },
    {
      token: 'mm',
      value: 111,
      noSuffix: true,
      key: 'mm',
      future: true,
      expected: 'wa’vatlh wa’maH wa’ tup',
    },
  ])('should format relativeTime for "mm" with "$value", "$key", "$noSuffix", "$future"', ({
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

  it.each([
    {
      token: 'hh',
      value: 0,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: 'pagh rep',
    },
    {
      token: 'hh',
      value: 1,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: 'wa’ rep',
    },
    {
      token: 'hh',
      value: 2,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: 'cha’ rep',
    },
    {
      token: 'hh',
      value: 3,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: 'wej rep',
    },
    {
      token: 'hh',
      value: 4,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: 'loS rep',
    },
    {
      token: 'hh',
      value: 5,
      noSuffix: false,
      key: 'hh',
      future: false,
      expected: 'vagh rep',
    },
    {
      token: 'hh',
      value: 6,
      noSuffix: true,
      key: 'hh',
      future: false,
      expected: 'jav rep',
    },
    {
      token: 'hh',
      value: 7,
      noSuffix: false,
      key: 'hh',
      future: true,
      expected: 'Soch rep',
    },
    {
      token: 'hh',
      value: 8,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: 'chorgh rep',
    },
    {
      token: 'hh',
      value: 9,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: 'Hut rep',
    },
    {
      token: 'hh',
      value: 10,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: 'wa’maH rep',
    },
    {
      token: 'hh',
      value: 11,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: 'wa’maH wa’ rep',
    },
    {
      token: 'hh',
      value: 110,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: 'wa’vatlh wa’maH rep',
    },
    {
      token: 'hh',
      value: 111,
      noSuffix: true,
      key: 'hh',
      future: true,
      expected: 'wa’vatlh wa’maH wa’ rep',
    },
  ])('should format relativeTime for "hh" with "$value", "$key", "$noSuffix", "$future"', ({
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

  it.each([
    {
      token: 'dd',
      value: 0,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: 'pagh jaj',
    },
    {
      token: 'dd',
      value: 1,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: 'wa’ jaj',
    },
    {
      token: 'dd',
      value: 2,
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: 'cha’ jaj',
    },
    {
      token: 'dd',
      value: 3,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: 'wej jaj',
    },
    {
      token: 'dd',
      value: 4,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: 'loS jaj',
    },
    {
      token: 'dd',
      value: 5,
      noSuffix: false,
      key: 'dd',
      future: false,
      expected: 'vagh jaj',
    },
    {
      token: 'dd',
      value: 6,
      noSuffix: true,
      key: 'dd',
      future: false,
      expected: 'jav jaj',
    },
    {
      token: 'dd',
      value: 7,
      noSuffix: false,
      key: 'dd',
      future: true,
      expected: 'Soch jaj',
    },
    {
      token: 'dd',
      value: 8,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: 'chorgh jaj',
    },
    {
      token: 'dd',
      value: 9,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: 'Hut jaj',
    },
    {
      token: 'dd',
      value: 10,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: 'wa’maH jaj',
    },
    {
      token: 'dd',
      value: 11,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: 'wa’maH wa’ jaj',
    },
    {
      token: 'dd',
      value: 110,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: 'wa’vatlh wa’maH jaj',
    },
    {
      token: 'dd',
      value: 111,
      noSuffix: true,
      key: 'dd',
      future: true,
      expected: 'wa’vatlh wa’maH wa’ jaj',
    },
  ])('should format relativeTime for "dd" with "$value", "$key", "$noSuffix", "$future"', ({
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
  it.each([
    {
      token: 'ww',
      value: 0,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: 'pagh puj',
    },
    {
      token: 'ww',
      value: 1,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: 'wa’ puj',
    },
    {
      token: 'ww',
      value: 2,
      noSuffix: true,
      key: 'ww',
      future: false,
      expected: 'cha’ puj',
    },
    {
      token: 'ww',
      value: 3,
      noSuffix: false,
      key: 'ww',
      future: true,
      expected: 'wej puj',
    },
    {
      token: 'ww',
      value: 4,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: 'loS puj',
    },
    {
      token: 'ww',
      value: 5,
      noSuffix: false,
      key: 'ww',
      future: false,
      expected: 'vagh puj',
    },
    {
      token: 'ww',
      value: 6,
      noSuffix: true,
      key: 'ww',
      future: false,
      expected: 'jav puj',
    },
    {
      token: 'ww',
      value: 7,
      noSuffix: false,
      key: 'ww',
      future: true,
      expected: 'Soch puj',
    },
    {
      token: 'ww',
      value: 8,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: 'chorgh puj',
    },
    {
      token: 'ww',
      value: 9,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: 'Hut puj',
    },
    {
      token: 'ww',
      value: 10,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: 'wa’maH puj',
    },
    {
      token: 'ww',
      value: 11,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: 'wa’maH wa’ puj',
    },
    {
      token: 'ww',
      value: 110,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: 'wa’vatlh wa’maH puj',
    },
    {
      token: 'ww',
      value: 111,
      noSuffix: true,
      key: 'ww',
      future: true,
      expected: 'wa’vatlh wa’maH wa’ puj',
    },
  ])('should format relativeTime for "ww" with "$value", "$key", "$noSuffix", "$future"', ({
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

  it.each([
    {
      token: 'MM',
      value: 0,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: 'pagh jar',
    },
    {
      token: 'MM',
      value: 1,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: 'wa’ jar',
    },
    {
      token: 'MM',
      value: 2,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: 'cha’ jar',
    },
    {
      token: 'MM',
      value: 3,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: 'wej jar',
    },
    {
      token: 'MM',
      value: 4,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: 'loS jar',
    },
    {
      token: 'MM',
      value: 5,
      noSuffix: false,
      key: 'MM',
      future: false,
      expected: 'vagh jar',
    },
    {
      token: 'MM',
      value: 6,
      noSuffix: true,
      key: 'MM',
      future: false,
      expected: 'jav jar',
    },
    {
      token: 'MM',
      value: 7,
      noSuffix: false,
      key: 'MM',
      future: true,
      expected: 'Soch jar',
    },
    {
      token: 'MM',
      value: 8,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: 'chorgh jar',
    },
    {
      token: 'MM',
      value: 9,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: 'Hut jar',
    },
    {
      token: 'MM',
      value: 10,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: 'wa’maH jar',
    },
    {
      token: 'MM',
      value: 11,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: 'wa’maH wa’ jar',
    },
    {
      token: 'MM',
      value: 110,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: 'wa’vatlh wa’maH jar',
    },
    {
      token: 'MM',
      value: 111,
      noSuffix: true,
      key: 'MM',
      future: true,
      expected: 'wa’vatlh wa’maH wa’ jar',
    },
  ])('should format relativeTime for "MM" with "$value", "$key", "$noSuffix", "$future"', ({
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

  it.each([
    {
      token: 'yy',
      value: 0,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: 'pagh DIS',
    },
    {
      token: 'yy',
      value: 1,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: 'wa’ DIS',
    },
    {
      token: 'yy',
      value: 2,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: 'cha’ DIS',
    },
    {
      token: 'yy',
      value: 3,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: 'wej DIS',
    },
    {
      token: 'yy',
      value: 4,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: 'loS DIS',
    },
    {
      token: 'yy',
      value: 5,
      noSuffix: false,
      key: 'yy',
      future: false,
      expected: 'vagh DIS',
    },
    {
      token: 'yy',
      value: 6,
      noSuffix: true,
      key: 'yy',
      future: false,
      expected: 'jav DIS',
    },
    {
      token: 'yy',
      value: 7,
      noSuffix: false,
      key: 'yy',
      future: true,
      expected: 'Soch DIS',
    },
    {
      token: 'yy',
      value: 8,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: 'chorgh DIS',
    },
    {
      token: 'yy',
      value: 9,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: 'Hut DIS',
    },
    {
      token: 'yy',
      value: 10,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: 'wa’maH DIS',
    },
    {
      token: 'yy',
      value: 11,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: 'wa’maH wa’ DIS',
    },
    {
      token: 'yy',
      value: 110,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: 'wa’vatlh wa’maH DIS',
    },
    {
      token: 'yy',
      value: 111,
      noSuffix: true,
      key: 'yy',
      future: true,
      expected: 'wa’vatlh wa’maH wa’ DIS',
    },
  ])('should format relativeTime for "yy" with "$value", "$key", "$noSuffix", "$future"', ({
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
    expect(locale.meridiem(10, 0, false)).toBe('AM')
    expect(locale.meridiem(10, 0, true)).toBe('am')
    expect(locale.meridiem(20, 0, false)).toBe('PM')
    expect(locale.meridiem(20, 0, true)).toBe('pm')
  })
})
