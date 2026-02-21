import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { expect, it } from 'vitest'
import durationPlugin from '~/plugins/duration'
import { objectResultsAsJson } from '../util'
import { expectSameDuration } from './duration-test-util'

esday.extend(durationPlugin)

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

it('expectSameDuration without duration', () => {
  // @ts-expect-error as test should handle wrong input type
  expectSameDuration((esday) => esday())
})
