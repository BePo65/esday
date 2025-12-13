import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { describe, expect, it } from 'vitest'
import toArrayPlugin from '~/plugins/toArray'

esday.extend(toArrayPlugin)

describe('toArray plugin', () => {
  it.each([
    '2025-01-06T12:34:56.789Z',
    '2000-02-29T23:59:59.999Z', // Leap year edge case
    '1999-12-31T00:00:00.000Z',
  ])('should correctly convert "%s" to an array', (dateString) => {
    const esDayInstance = esday(dateString)
    const momentInstance = moment(dateString)

    const esDayArray = esDayInstance.toArray()
    const momentArray = momentInstance.toArray()

    expect(esDayArray).toEqual(momentArray)
  })

  it('should handle invalid dates gracefully', () => {
    const invalidEsDay = esday('invalid-date')
    const invalidMoment = moment('invalid-date')

    expect(invalidEsDay.toArray()).toEqual(invalidMoment.toArray())
  })

  it('should correctly handle edge cases', () => {
    // Edge case: Unix epoch
    const unixEpoch = esday(0)
    const momentEpoch = moment(0)

    expect(unixEpoch.toArray()).toEqual(momentEpoch.toArray())

    // Edge case: Large future date
    const largeFutureDate = esday('9999-12-31T23:59:59.999Z')
    const momentLargeFutureDate = moment('9999-12-31T23:59:59.999Z')

    expect(largeFutureDate.toArray()).toEqual(momentLargeFutureDate.toArray())
  })
})
