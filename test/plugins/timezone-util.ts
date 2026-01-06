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
export const expectSameObjectTz = (fn: (instance: EsDayFactory) => EsDay | Moment) => {
  const d = fn(esday)
  // call fn with moment; type casting avoids error from tsc
  const m = fn(moment as unknown as EsDayFactory)
  expect(d.isValid()).toBe(m.isValid())
  if (d.isValid()) {
    const dResults = objectResultsAsJson(d)
    const mResults = objectResultsAsJson(m)
    expect(dResults).toEqual(mResults)
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
export const expectSameValueTz = (fn: (instance: EsDayFactory) => any) => {
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

/**
 * Create a literal object with the results of all important methods
 * of an esday / moment.js instance.
 * If the instance is not valid, then 'undefined' is returned as result
 * of all methods.
 * @param instance - instance to be used
 * @returns object literal with all detailed results
 */
export const objectResultsAsJson = (instance: EsDay | Moment) => {
  const isValid = instance.isValid()

  return {
    isValid,
    toISOString: isValid ? instance.toISOString() : undefined,
    valueOf: isValid ? instance.valueOf() : undefined,
    millisecond: isValid ? instance.millisecond() : undefined,
    toDate: isValid ? instance.toDate() : undefined,
    toJSON: isValid ? instance.toJSON() : undefined,
    utcOffset: isValid ? instance.utcOffset() : undefined,
    isUTC: isValid ? instance.isUTC() : undefined,
    tz: isValid ? instance.tz() : undefined,
  }
}
