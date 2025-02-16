import type { EsDay } from '~/core'
import { beforeEach, describe, expect, it } from 'vitest'
import { esday } from '~/core'

describe('get', () => {
  const testYear = 2024
  const testMonth = 1
  const testDay = 3
  const testHour = 13
  const testMinute = 14
  const testSecond = 15
  const testMillisecond = 678
  const testDate = esday([testYear, testMonth, testDay, testHour, testMinute, testSecond, testMillisecond])

  it('year', () => {
    expect(testDate.year()).toBe(testYear)
    expect(testDate.get('year')).toBe(testYear)
    expect(testDate.get('y')).toBe(testYear)
  })

  it('month', () => {
    expect(testDate.month()).toBe(testMonth)
    expect(testDate.get('month')).toBe(testMonth)
    expect(testDate.get('M')).toBe(testMonth)
  })

  it('day of month', () => {
    expect(testDate.date()).toBe(testDay)
    expect(testDate.get('date')).toBe(testDay)
    expect(testDate.get('D')).toBe(testDay)
  })

  it('day of week', () => {
    const dayOfWeek = 6
    expect(testDate.day()).toBe(dayOfWeek)
    expect(testDate.get('day')).toBe(dayOfWeek)
  })

  it('hour', () => {
    expect(testDate.hour()).toBe(testHour)
    expect(testDate.get('hour')).toBe(testHour)
    expect(testDate.get('h')).toBe(testHour)
  })

  it('minute', () => {
    expect(testDate.minute()).toBe(testMinute)
    expect(testDate.get('minute')).toBe(testMinute)
    expect(testDate.get('m')).toBe(testMinute)
  })

  it('second', () => {
    expect(testDate.second()).toBe(testSecond)
    expect(testDate.get('second')).toBe(testSecond)
    expect(testDate.get('s')).toBe(testSecond)
  })

  it('millisecond', () => {
    expect(testDate.millisecond()).toBe(testMillisecond)
    expect(testDate.get('millisecond')).toBe(testMillisecond)
    expect(testDate.get('ms')).toBe(testMillisecond)
  })
})

describe('set', () => {
  const testYear = 2024
  const testMonth = 1
  const testDay = 3
  const testHour = 13
  const testMinute = 14
  const testSecond = 15
  const testMillisecond = 678
  let testDate: EsDay

  beforeEach(() => {
    testDate = esday([testYear, testMonth, testDay, testHour, testMinute, testSecond, testMillisecond])
  })

  describe('year', () => {
    const resultDateAsIso = esday([2025, testMonth, testDay, testHour, testMinute, testSecond, testMillisecond]).toISOString()

    it('using method', () => {
      const modifiedDate = testDate.year(2025)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - long form', () => {
      const modifiedDate = testDate.set('year', 2025)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - short form', () => {
      const modifiedDate = testDate.set('y', 2025)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })
  })

  describe('month', () => {
    const resultDateAsIso = esday([testYear, 5, testDay, testHour, testMinute, testSecond, testMillisecond]).toISOString()

    it('using method', () => {
      const modifiedDate = testDate.month(5)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - long form', () => {
      const modifiedDate = testDate.set('month', 5)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - short form', () => {
      const modifiedDate = testDate.set('M', 5)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })
  })

  describe('day of month', () => {
    const resultDateAsIso = esday([testYear, testMonth, 23, testHour, testMinute, testSecond, testMillisecond]).toISOString()

    it('using method', () => {
      const modifiedDate = testDate.date(23)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - long form', () => {
      const modifiedDate = testDate.set('date', 23)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - short form', () => {
      const modifiedDate = testDate.set('D', 23)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })
  })

  describe('day of week', () => {
    const resultDateAsIso = esday([testYear, 0, 30, testHour, testMinute, testSecond, testMillisecond]).toISOString()

    it('using method', () => {
      const modifiedDate = testDate.day(2)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - long form', () => {
      const modifiedDate = testDate.set('day', 2)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - short form', () => {
      const modifiedDate = testDate.set('d', 2)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })
  })

  describe('hour', () => {
    const resultDateAsIso = esday([testYear, testMonth, testDay, 21, testMinute, testSecond, testMillisecond]).toISOString()

    it('using method', () => {
      const modifiedDate = testDate.hour(21)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - long form', () => {
      const modifiedDate = testDate.set('hour', 21)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - short form', () => {
      const modifiedDate = testDate.set('h', 21)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })
  })

  describe('minute', () => {
    const resultDateAsIso = esday([testYear, testMonth, testDay, testHour, 43, testSecond, testMillisecond]).toISOString()

    it('using method', () => {
      const modifiedDate = testDate.minute(43)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - long form', () => {
      const modifiedDate = testDate.set('minute', 43)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - short form', () => {
      const modifiedDate = testDate.set('m', 43)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })
  })

  describe('second', () => {
    const resultDateAsIso = esday([testYear, testMonth, testDay, testHour, testMinute, 54, testMillisecond]).toISOString()

    it('using method', () => {
      const modifiedDate = testDate.second(54)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - long form', () => {
      const modifiedDate = testDate.set('s', 54)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - short form', () => {
      const modifiedDate = testDate.set('s', 54)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })
  })

  describe('millisecond', () => {
    const resultDateAsIso = esday([testYear, testMonth, testDay, testHour, testMinute, testSecond, 273]).toISOString()

    it('using method', () => {
      const modifiedDate = testDate.millisecond(273)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - long form', () => {
      const modifiedDate = testDate.set('millisecond', 273)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })

    it('using setter - short form', () => {
      const modifiedDate = testDate.set('ms', 273)

      expect(modifiedDate.toISOString()).toBe(resultDateAsIso)
    })
  })

  describe('returns new instance', () => {
    it('year', () => {
      const base = esday('2024-11-20T18:22:37.456Z')
      const year = base.year()
      const another = base.set('year', year + 1)

      expect(base.valueOf()).not.toBe(another.valueOf())
    })

    it('month', () => {
      const base = esday('2024-11-20T18:22:37.456Z')
      const month = base.month()
      const another = base.set('month', month + 1)

      expect(base.valueOf()).not.toBe(another.valueOf())
    })
  })
})
