import { type EsDay, type EsDayFactory, esday } from 'esday'
import moment, { type Moment } from 'moment-timezone'
import { expect } from 'vitest'

/**
 * Call a given function with esday and moment-timezone and
 * check, if the resulting date objects are the same.
 * To be used in a vitest test file.
 * This is a clone of 'expectSameResult' using 'moment-timezone'
 * instead of 'moment'.
 * Example:
 * expectSameResultTz((esday) => esday().utc().utcOffset(100, true))
 * @param fn function whose return value is to be checked
 */
export const expectSameResultTz = (fn: (instance: EsDayFactory) => EsDay | Moment) => {
  const d = fn(esday)
  // call fn with moment; type casting avoids error from tsc
  const m = fn(moment as unknown as EsDayFactory)
  expect(d.isValid()).toBe(m.isValid())
  if (d.isValid()) {
    expect(d.toISOString()).toBe(m.toISOString())
    expect(d.valueOf()).toBe(m.valueOf())
    expect(d.millisecond()).toBe(m.millisecond())
    expect(d.toDate()).toEqual(m.toDate())
    expect(d.toJSON()).toBe(m.toJSON())
    expect(d.utcOffset()).toBe(m.utcOffset())
    expect(d.isUTC()).toBe(m.isUTC())
  } else {
    expect(d.toString().toLowerCase()).toBe(m.toString().toLowerCase())
  }
}

/**
 * Call a given function with esday and moment and
 * check, if the resulting values are the same.
 * To be used in a vitest test file.
 * Example:
 * expectSame((esday) => esday().format())
 * @param fn function whose return value is to be checked
 */
// biome-ignore lint/suspicious/noExplicitAny: this method checks arbitrary methods of esday / moment
export const expectSameTz = (fn: (instance: EsDayFactory) => any) => {
  const d = fn(esday)
  // call fn with moment; type casting avoids error from tsc
  const m = fn(moment as unknown as EsDayFactory)
  expect(d).toBe(m)
}

/**
 * Compare an instance of EsDay with an instance of Moment
 * and check, if the most important values of the 2 date
 * objects are the same.
 * Example:
 * expectSameTimestamp(esdayTs, momentTs)
 * @param d - an EsDay instance
 * @param m - a Moment instance
 */
export const expectSameTimestamp = (d: EsDay, m: Moment) => {
  expect(d.isValid()).toBe(m.isValid())
  expect(d.toISOString()).toBe(m.toISOString())
  expect(d.valueOf()).toBe(m.valueOf())
  expect(d.millisecond()).toBe(m.millisecond())
  expect(d.toDate()).toEqual(m.toDate())
  expect(d.toJSON()).toBe(m.toJSON())
  expect(d.format()).toBe(m.format())
}
