import { C, isUndefined, prettyUnit } from '~/common'
import type { EsDay } from '~/core'
import type { UnitType } from '~/types'

/**
 * get difference between 2 dates as months
 * @param a - date 1
 * @param b - date 2
 * @returns b - a in months
 */
function monthDiff(a: EsDay, b: EsDay): number {
  // taken from moment.js for compatibility
  if (a.date() < b.date()) return -monthDiff(b, a)
  const wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month())
  const anchor: EsDay = a.clone().add(wholeMonthDiff, C.MONTH)

  // is wholeMonthDiff too large?
  const c = b.valueOf() - anchor.valueOf() < 0

  // if so then subtract 1 month else add 1 month
  const anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), C.MONTH)
  return +(
    -(
      wholeMonthDiff +
      (b.valueOf() - anchor.valueOf()) /
        (c ? anchor.valueOf() - anchor2.valueOf() : anchor2.valueOf() - anchor.valueOf())
    ) || 0
  )
}

/**
 * Drop fractional part of a number.
 * @param n - number to inspect
 * @returns n without fractional part
 */
function absFloor(n: number): number {
  return n < 0 ? Math.ceil(n) || 0 : Math.floor(n)
}

/**
 * Get the utcOffset of date in minutes.
 * Use the utcOffset method from the utc plugin if that is loaded;
 * otherwise get it from the javascript Date object of date.
 * @param date - EsDay instance to inspect
 * @returns utcOffset of date in minutes
 */
function utcOffset(date: EsDay): number {
  const defaultOffset = -Math.round(date['$d'].getTimezoneOffset()) || 0
  return 'utcOffset' in date ? date.utcOffset() : defaultOffset
}

export function diffImpl(that: EsDay, date: EsDay, units?: UnitType, asFloat = false): number {
  const diffInMs = that.valueOf() - date.valueOf()
  const diffInMonths = monthDiff(that, date)
  const zoneDelta = (utcOffset(that) - utcOffset(date)) * C.MILLISECONDS_A_MINUTE
  let result: number

  if (!isUndefined(units)) {
    const unit = prettyUnit(units)
    switch (unit) {
      case C.YEAR:
        result = diffInMonths / 12
        break
      case C.MONTH:
        result = diffInMonths
        break
      case C.QUARTER:
        result = diffInMonths / 3
        break
      case C.WEEK:
        result = (diffInMs + zoneDelta) / C.MILLISECONDS_A_WEEK
        break
      case C.DAY:
        result = (diffInMs + zoneDelta) / C.MILLISECONDS_A_DAY
        break
      case C.HOUR:
        result = diffInMs / C.MILLISECONDS_A_HOUR
        break
      case C.MIN:
        result = diffInMs / C.MILLISECONDS_A_MINUTE
        break
      case C.SECOND:
        result = diffInMs / C.MILLISECONDS_A_SECOND
        break
      default:
        result = diffInMs // milliseconds
        break
    }
  } else {
    result = diffInMs // milliseconds
  }

  return asFloat ? result : absFloor(result)
}
