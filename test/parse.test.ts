import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { esday } from '~/core'

describe('parse', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234Z'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('parses ISO8601 string with date, time and zone', () => {
    const time = '2024-04-24T16:27:38.456Z'
    const resultTimestamp = new Date(time).valueOf()

    expect(esday(time).valueOf()).toBe(resultTimestamp)
  })

  it('parses ISO8601 string with unlimited milliseconds', () => {
    const time = '2024-04-24T06:41:32.999999999Z'
    const resultTimestamp = new Date(time).valueOf()

    expect(esday(time).valueOf()).toBe(resultTimestamp)
  })

  it('parses RFC2822 string with date, time and zone', () => {
    const time = 'Sun, 11 Feb 2024 09:46:50 GMT+1'
    const resultTimestamp = new Date(time).valueOf()

    expect(esday(time).valueOf()).toBe(resultTimestamp)
  })

  it('parses ECMAScript string with date, time and zone', () => {
    // should parse dates formatted in ECMA script format
    // see https://www.ecma-international.org/ecma-262/9.0/index.html#sec-date.prototype.tostring
    const time = 'Sun Feb 11 2024 09:46:50 GMT+0100 (Mitteleuropäische Normalzeit)'
    const resultTimestamp = new Date(time).valueOf()

    expect(esday(time).valueOf()).toBe(resultTimestamp)
  })

  it('parses number (unix timestamp as milliseconds)', () => {
    const timestamp = 1_722_173_696_234
    const resultTimeAsString = '2024-07-28T13:34:56.234Z'

    expect(esday(timestamp).valueOf()).toBe(new Date(resultTimeAsString).valueOf())
  })

  it('parses number (unix timestamp as seconds)', () => {
    const timestamp = 1_722_173_696
    const resultTimeAsString = '2024-07-28T13:34:56Z'
    const resultAsTimestamp = Math.floor(new Date(resultTimeAsString).valueOf() / 1000)

    expect(esday(timestamp).valueOf()).toBe(resultAsTimestamp)
  })

  it('parses number (special value 0)', () => {
    const timestamp = 0
    const resultAsTimestamp = new Date(timestamp).valueOf()

    expect(esday(timestamp).valueOf()).toBe(resultAsTimestamp)
  })

  it('parses number (special value 1)', () => {
    const timestamp = 1
    const resultAsTimestamp = new Date(timestamp).valueOf()

    expect(esday(timestamp).valueOf()).toBe(resultAsTimestamp)
  })

  it('parses Date object', () => {
    const timestamp = new Date('2024-04-24T16:27:38.456Z')
    const resultAsTimestamp = timestamp.valueOf()

    expect(esday(timestamp).valueOf()).toBe(resultAsTimestamp)
  })

  it('parses EsDay instance', () => {
    const timestampString = '2024-04-24T16:27:38.456Z'
    const timestamp = esday(timestampString)
    const resultAsTimestamp = new Date(timestampString).valueOf()

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

    expect(parsedDate.year()).toBe(dateArray[0] || 0)
    expect(parsedDate.month()).toBe(dateArray[1] || 0)
    expect(parsedDate.date()).toBe(dateArray[2] || 1)
    expect(parsedDate.hour()).toBe(dateArray[3] || 0)
    expect(parsedDate.minute()).toBe(dateArray[4] || 0)
    expect(parsedDate.second()).toBe(dateArray[5] || 0)
    expect(parsedDate.millisecond()).toBe(dateArray[6] || 0)
  })

  it('parses empty elements', () => {
    const nowAsIsoString = new Date(fakeTimeAsString).toISOString()

    expect(esday({}).toISOString()).toBe(nowAsIsoString)
    expect(esday([]).toISOString()).toBe(nowAsIsoString)
    expect(esday().toISOString()).toBe(nowAsIsoString)
    expect(esday(undefined).toISOString()).toBe(nowAsIsoString)
  })

  it('rejects invalid values', () => {
    expect(esday(Number.POSITIVE_INFINITY).isValid()).toBeFalsy()
    expect(esday(Number.NaN).isValid()).toBeFalsy()
    expect(esday('otherString').isValid()).toBeFalsy()
    expect(esday(null).isValid()).toBeFalsy()
  })
})
