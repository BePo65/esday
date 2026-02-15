import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { expect, it } from 'vitest'
import { objectResultsAsJson } from './util'

it('objectResultsAsJson with valid date', () => {
  const timestamp = '2024-04-24T16:27:38.456Z'
  const d = esday(timestamp)
  const dResults = objectResultsAsJson(d)
  const m = moment(timestamp)
  const mResults = objectResultsAsJson(m)

  expect(dResults).toEqual(mResults)
})

it('objectResultsAsJson with invalid date', () => {
  const timestamp = Number.NaN
  const d = esday(timestamp)
  const dResults = objectResultsAsJson(d)
  const m = moment(timestamp)
  const mResults = objectResultsAsJson(m)

  expect(dResults).toEqual(mResults)
})
