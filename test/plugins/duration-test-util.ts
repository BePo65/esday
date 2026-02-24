import type { EsDayFactory } from 'esday'
import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { expect } from 'vitest'
import type { Duration } from '~/plugins/duration'

/**
 * Call a given function with esday and moment and
 * check, if the resulting Duration objects are the same.
 * To be used in a vitest test file.
 * Example:
 * expectSameDuration((esday) => esday.duration())
 * @param fn function whose return value is to be checked
 */
export function expectSameDuration(fn: (instance: EsDayFactory) => Duration | moment.Duration) {
  const d = fn(esday)
  // call fn with moment; type casting avoids error from tsc
  const m = fn(moment as unknown as EsDayFactory)
  expect(esday.isDuration(d)).toBe(moment.isDuration(m))
  if (esday.isDuration(d)) {
    expect(d.isValid()).toBe(m.isValid())
    // use '+ 0' to avoid *-0' returned by some getters
    const esdayValues = {
      ms: d.milliseconds() + 0,
      s: d.seconds() + 0,
      m: d.minutes() + 0,
      h: d.hours() + 0,
      D: d.days() + 0,
      w: d.weeks() + 0,
      M: d.months() + 0,
      y: d.years() + 0,
    }
    const momentValues = {
      ms: m.milliseconds() + 0,
      s: m.seconds() + 0,
      m: m.minutes() + 0,
      h: m.hours() + 0,
      D: m.days() + 0,
      w: m.weeks() + 0,
      M: m.months() + 0,
      y: m.years() + 0,
    }
    expect(esdayValues).toEqual(momentValues)
    expect(d.toISOString()).toBe(m.toISOString())
    // esday result conforms to moment.js documentation, not the
    // moment.js implementation (which returns result of 'toISOString()')!
    expect(d.toJSON()).toBe(m.toJSON())
    expect(d.valueOf()).toBe(m.valueOf())
  }
}
