import type { UnitType } from 'esday'
import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { describe, expect, it } from 'vitest'
import isSameOrAfterPlugin from '~/plugins/isSameOrAfter'

esday.extend(isSameOrAfterPlugin)

describe('isSameOrAfter plugin', () => {
  it.each([
    { date1: '2025-01-06', date2: '2025-01-06', unit: 'day', expected: true },
    { date1: '2025-01-06', date2: '2025-01-05', unit: 'day', expected: true },
    { date1: '2025-01-05', date2: '2025-01-06', unit: 'day', expected: false },
    {
      date1: '2025-01-06T12:00:00',
      date2: '2025-01-06T11:59:59',
      unit: 'second',
      expected: true,
    },
    {
      date1: '2025-01-06T11:59:58',
      date2: '2025-01-06T11:59:59',
      unit: 'second',
      expected: false,
    },
  ])('should correctly determine if "$date1" is the same or after "$date2"', ({
    date1,
    date2,
    unit,
    expected,
  }) => {
    const esDayInstance = esday(date1)
    const momentInstance = moment(date1)

    const esDayResult = esDayInstance.isSameOrAfter(date2, unit as UnitType)
    const momentResult = momentInstance.isSameOrAfter(date2, unit as UnitType)

    expect(esDayResult).toBe(expected)
    expect(esDayResult).toBe(momentResult)
  })

  it('should handle invalid dates gracefully', () => {
    const invalidEsDay = esday('invalid-date')
    const validEsDay = esday('2025-01-06')
    const invalidMoment = moment.invalid()
    const validMoment = moment('2025-01-06')

    expect(invalidEsDay.isSameOrAfter(validEsDay)).toBe(invalidMoment.isSameOrAfter(validMoment))
    expect(invalidEsDay.isSameOrAfter(invalidEsDay)).toBe(
      invalidMoment.isSameOrAfter(invalidMoment),
    )
  })

  it('should handle edge cases', () => {
    // Unix epoch
    const unixEpochEsDay = esday(0)
    const unixEpochMoment = moment(0)
    const laterDate = esday('1970-01-02')
    const laterMoment = moment('1970-01-02')

    expect(unixEpochEsDay.isSameOrAfter(0)).toBe(unixEpochMoment.isSameOrAfter(0))
    expect(unixEpochEsDay.isSameOrAfter(laterDate)).toBe(unixEpochMoment.isSameOrAfter(laterMoment))
  })
})
