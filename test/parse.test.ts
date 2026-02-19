import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { esday } from '~/core'
import { expectSameObject } from './util'

describe('parse', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234Z'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('parses ISO8601 string with date only', () => {
    const sourceString = '2024-04-24'

    expectSameObject((esday) => esday(sourceString))
    expect(esday(sourceString).isValid()).toBeTruthy()
  })

  it('parses ISO8601 string with date and time', () => {
    const sourceString = '2024-04-24T16:27:38.456'

    expectSameObject((esday) => esday(sourceString))
    expect(esday(sourceString).isValid()).toBeTruthy()
  })

  it('parses ISO8601 string with date, time and offset with minutes', () => {
    const sourceString = '2024-04-24T16:27:38.456+01:25'

    expectSameObject((esday) => esday(sourceString))
    expect(esday(sourceString).isValid()).toBeTruthy()
  })

  it('parses ISO8601 string with date, time and offset with seconds', () => {
    const sourceString = '2024-04-24T16:27:38.456+01:25:36'

    expectSameObject((esday) => esday(sourceString))
    expect(esday(sourceString).isValid()).toBeFalsy()
  })

  it('parses ISO8601 string with leading spaces', () => {
    const sourceString = ' 2024-04-24T16:27:38.456'

    expectSameObject((esday) => esday(sourceString))
    expect(esday(sourceString).isValid()).toBeTruthy()
  })

  it('parses ISO8601 string with trailing spaces', () => {
    const sourceString = '2024-04-24T16:27:38.456 '

    expect(esday(sourceString).isValid()).toBeFalsy()
  })

  it('parses ISO8601 string with date, time and zone', () => {
    const sourceString = '2024-04-24T16:27:38.456Z'

    expectSameObject((esday) => esday(sourceString))
    expect(esday(sourceString).isValid()).toBeTruthy()
  })

  it('parses ISO8601 string with date, time and zone and leading spaces', () => {
    const sourceString = ' 2024-04-24T16:27:38.456Z'

    expectSameObject((esday) => esday(sourceString))
    expect(esday(sourceString).isValid()).toBeTruthy()
  })

  it('parses ISO8601 string with date, time and zone and trailing spaces', () => {
    const sourceString = '2024-04-24T16:27:38.456Z '

    expect(esday(sourceString).isValid()).toBeFalsy()
  })

  it('parses ISO8601 string with unlimited milliseconds', () => {
    // This test will fail on webkit, as this browser overflows ms to seconds
    const sourceString = '2024-04-24T06:41:32.999999999'

    expectSameObject((esday) => esday(sourceString))
    expect(esday(sourceString).isValid()).toBeTruthy()
  })

  it('parses ISO8601 string with zone and unlimited milliseconds', () => {
    const sourceString = '2024-04-24T06:41:32.999999999Z'

    expectSameObject((esday) => esday(sourceString))
    expect(esday(sourceString).isValid()).toBeTruthy()
  })

  it('parses RFC2822 string with date, time and zone', () => {
    const sourceString = 'Sun, 11 Feb 2024 09:46:50 GMT+1'

    expectSameObject((esday) => esday(sourceString))
    expect(esday(sourceString).isValid()).toBeTruthy()
  })

  it('parses ECMAScript string with date, time and zone', () => {
    // should parse dates formatted in ECMA script format
    // see https://www.ecma-international.org/ecma-262/9.0/index.html#sec-date.prototype.tostring
    const sourceString = 'Sun Feb 11 2024 09:46:50 GMT+0100 (Mitteleuropäische Normalzeit)'

    expectSameObject((esday) => esday(sourceString))
    expect(esday(sourceString).isValid()).toBeTruthy()
  })

  it('parses en-US date and time string', () => {
    // should parse dates formatted in .toLocaleString("en-US") format
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#description
    const sourceString = '3/11/2022, 11:29:26 AM'

    expectSameObject((esday) => esday(sourceString))
    expect(esday(sourceString).isValid()).toBeTruthy()
  })

  it('parses number (unix timestamp as milliseconds)', () => {
    const sourceString = 1_722_173_696_234

    expectSameObject((esday) => esday(sourceString))
    expect(esday(sourceString).isValid()).toBeTruthy()
  })

  it('parses number (unix timestamp as seconds)', () => {
    const sourceString = 1_722_173_696

    expectSameObject((esday) => esday(sourceString))
    expect(esday(sourceString).isValid()).toBeTruthy()
  })

  it('parses number (special value 0)', () => {
    const timestamp = 0

    expectSameObject((esday) => esday(timestamp))
    expect(esday(timestamp).isValid()).toBeTruthy()
  })

  it('parses number (special value 1)', () => {
    const timestamp = 1

    expectSameObject((esday) => esday(timestamp))
    expect(esday(timestamp).isValid()).toBeTruthy()
  })

  it('parses Date object', () => {
    const timestamp = new Date('2024-04-24T16:27:38.456Z')

    expectSameObject((esday) => esday(timestamp))
    expect(esday(timestamp).isValid()).toBeTruthy()
  })

  it('parses EsDay instance', () => {
    const timestampString = '2024-04-24T16:27:38.456Z'
    const timestamp = esday(timestampString)
    const resultAsTimestamp = new Date(timestampString).valueOf()

    expect(esday(timestamp).isValid()).toBeTruthy()
    expect(esday(timestamp).valueOf()).toBe(resultAsTimestamp)
  })

  it.each([
    { dateArray: [2024] },
    { dateArray: [2024, 5] },
    { dateArray: [2024, 5, 1] },
    { dateArray: [2024, 5, 1, 13] },
    { dateArray: [2024, 5, 1, 13, 52] },
    { dateArray: [2024, 5, 1, 13, 52, 44] },
    { dateArray: [2024, 5, 1, 13, 14, 15, 99] },
  ])('parses $dateArray to date', ({ dateArray }) => {
    const parsedDate = esday(dateArray)

    expectSameObject((esday) => esday(dateArray))
    expect(parsedDate.isValid()).toBeTruthy()
    expect(parsedDate.year()).toBe(dateArray[0] || 0)
    expect(parsedDate.month()).toBe(dateArray[1] || 0)
    expect(parsedDate.date()).toBe(dateArray[2] || 1)
    expect(parsedDate.hour()).toBe(dateArray[3] || 0)
    expect(parsedDate.minute()).toBe(dateArray[4] || 0)
    expect(parsedDate.second()).toBe(dateArray[5] || 0)
    expect(parsedDate.millisecond()).toBe(dateArray[6] || 0)
  })

  it.each([
    { dateArray: [2024, undefined, 1] },
    { dateArray: [2024, 5, 1, undefined, 52] },
    { dateArray: [2024, 5, 1, 13, undefined, 44] },
    { dateArray: [2024, 5, 1, 13, undefined, undefined] },
    { dateArray: [2024, 5, 1, 13, 14, 15, undefined] },
  ])('difference to moment - parses $dateArray to date', ({ dateArray }) => {
    const parsedDate = esday(dateArray)

    expect(parsedDate.isValid()).toBeTruthy()
    expect(parsedDate.year()).toBe(dateArray[0] || 0)
    expect(parsedDate.month()).toBe(dateArray[1] || 0)
    expect(parsedDate.date()).toBe(dateArray[2] || 1)
    expect(parsedDate.hour()).toBe(dateArray[3] || 0)
    expect(parsedDate.minute()).toBe(dateArray[4] || 0)
    expect(parsedDate.second()).toBe(dateArray[5] || 0)
    expect(parsedDate.millisecond()).toBe(dateArray[6] || 0)
  })

  it.each([{ timestamp: {} }, { timestamp: [] }])('parses "$value" as empty element', ({
    timestamp,
  }) => {
    const nowAsIsoString = new Date(fakeTimeAsString).toISOString()

    expectSameObject((esday) => esday(timestamp))
    expect(esday(timestamp).isValid()).toBeTruthy()
    expect(esday(timestamp).toISOString()).toBe(nowAsIsoString)
  })

  it('parses without input parameter', () => {
    const nowAsIsoString = new Date(fakeTimeAsString).toISOString()

    expectSameObject((esday) => esday())
    expect(esday().isValid()).toBeTruthy()
    expect(esday().toISOString()).toBe(nowAsIsoString)
  })

  it('parses undefined input', () => {
    const nowAsIsoString = new Date(fakeTimeAsString).toISOString()

    expectSameObject((esday) => esday(undefined))
    expect(esday(undefined).isValid()).toBeTruthy()
    expect(esday(undefined).toISOString()).toBe(nowAsIsoString)
  })

  it('rejects invalid values', () => {
    expect(esday(Number.POSITIVE_INFINITY).isValid()).toBeFalsy()
    expect(esday(Number.NaN).isValid()).toBeFalsy()
    expect(esday('otherString').isValid()).toBeFalsy()
    expect(esday(null).isValid()).toBeFalsy()
  })
})
