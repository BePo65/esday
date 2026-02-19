import type { EsDay, EsDayFactory } from 'esday'
import { esday } from 'esday'
import type { Moment } from 'moment'
import moment from 'moment/min/moment-with-locales'
import { expect } from 'vitest'

/**
 * Call a given function with esday and moment and
 * check, if the resulting values are the same.
 * To be used in a vitest test file.
 * Example:
 * expectSameValue((esday) => esday().format())
 * @param fn function whose return value is to be checked
 */
// biome-ignore lint/suspicious/noExplicitAny: this method checks arbitrary methods of esday / moment
export function expectSameValue(fn: (instance: EsDayFactory) => any) {
  const d = fn(esday)
  // call fn with moment; type casting avoids error from tsc
  const m = fn(moment as unknown as EsDayFactory)
  expect(d).toBe(m)
}

/**
 * Call a given function with esday and moment and
 * check, if the resulting date objects are the same.
 * To be used in a vitest test file.
 * Example:
 * expectSameObject((esday) => esday().utc().utcOffset(100, true))
 * @param fn function whose return value is to be checked
 */
export function expectSameObject(fn: (instance: EsDayFactory) => EsDay | Moment) {
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
  }
}
