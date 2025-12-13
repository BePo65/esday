import type { UnitType } from 'esday'
import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { describe, expect, it } from 'vitest'
import isSameOrBeforePlugin from '~/plugins/isSameOrBefore'

esday.extend(isSameOrBeforePlugin)

describe('isSameOrBefore plugin', () => {
  it.each([
    { date1: '2025-01-06', date2: '2025-01-06', unit: 'day', expected: true },
    { date1: '2025-01-06', date2: '2025-01-05', unit: 'day', expected: false },
    { date1: '2025-01-05', date2: '2025-01-06', unit: 'day', expected: true },
    {
      date1: '2025-01-06T12:00:00',
      date2: '2025-01-06T11:59:59',
      unit: 'second',
      expected: false,
    },
    {
      date1: '2025-01-06T11:59:58',
      date2: '2025-01-06T11:59:59',
      unit: 'second',
      expected: true,
    },
  ])(
    'should correctly determine if "$date1" is the same or before "date2"',
    ({ date1, date2, unit, expected }) => {
      const esDayInstance = esday(date1)
      const momentInstance = moment(date1)

      const esDayResult = esDayInstance.isSameOrBefore(date2, unit as UnitType)
      const momentResult = momentInstance.isSameOrBefore(date2, unit as UnitType)

      expect(esDayResult).toBe(expected)
      expect(esDayResult).toBe(momentResult)
    },
  )

  it('should handle invalid dates gracefully', () => {
    const invalidEsDay = esday('invalid-date')
    const validEsDay = esday('2025-01-06')
    const invalidMoment = moment.invalid()
    const validMoment = moment('2025-01-06')

    expect(invalidEsDay.isSameOrBefore(validEsDay)).toBe(invalidMoment.isSameOrBefore(validMoment))
    expect(invalidEsDay.isSameOrBefore(invalidEsDay)).toBe(
      invalidMoment.isSameOrBefore(invalidMoment),
    )
  })

  it('should handle edge cases', () => {
    // Unix epoch
    const unixEpochEsDay = esday(0)
    const unixEpochMoment = moment(0)
    const laterDate = esday('1970-01-02')
    const laterMoment = moment('1970-01-02')

    expect(unixEpochEsDay.isSameOrBefore(0)).toBe(unixEpochMoment.isSameOrBefore(0))
    expect(unixEpochEsDay.isSameOrBefore(laterDate)).toBe(
      unixEpochMoment.isSameOrBefore(laterMoment),
    )
  })
})
