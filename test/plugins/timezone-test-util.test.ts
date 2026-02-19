import { esday } from 'esday'
import moment from 'moment-timezone'
import { describe, expect, it } from 'vitest'
import timezonePLugin from '~/plugins/timezone'
import utcPlugin from '~/plugins/utc'
import { expectSameTimestampTz, objectResultsAsJsonTz } from './timezone-test-util'

esday.extend(utcPlugin).extend(timezonePLugin)

describe('timezone-test-util', () => {
  it('expectSameTimestampTz with invalid date', () => {
    const esdayDate = esday.tz(Number.NaN)
    const momentDate = moment(Number.NaN)

    expectSameTimestampTz(esdayDate, momentDate)
  })

  it('objectResultsAsJsonTz with invalid date', () => {
    const esdayDate = esday.tz(Number.NaN)
    const esdayDateResults = objectResultsAsJsonTz(esdayDate)

    expect(esdayDateResults.isValid).toBeFalsy()
    expect(esdayDateResults.valueOf).toBeUndefined()
    expect(esdayDateResults.millisecond).toBeUndefined()
    expect(esdayDateResults.toDate).toBeUndefined()
    expect(esdayDateResults.toISOString).toBeUndefined()
    expect(esdayDateResults.toJSON).toBeUndefined()
    expect(esdayDateResults.format).toBeUndefined()
    expect(esdayDateResults.utcOffset).toBeUndefined()
    expect(esdayDateResults.isUTC).toBeUndefined()
    expect(esdayDateResults.tz).toBeUndefined()
  })
})
