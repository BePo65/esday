import { C, isUndefined, normalizeUnitWithPlurals } from '~/common'
import type { EsDay } from '~/core'
import type { UnitTypeAddSub } from '~/types'

/**
 * get difference between 2 dates as months.
 * As implemented by moment.js, the algorithm is optimized to ensure that two months
 * with the same date are always a whole number apart.
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
  return n < 0 ? Math.ceil(n) : Math.floor(n)
}

export function diffImpl(
  that: EsDay,
  date: EsDay,
  units?: UnitTypeAddSub,
  asFloat = false,
): number {
  const diffInMs = that.valueOf() - date.valueOf()
  const diffInMonths = monthDiff(that, date)
  const zoneDelta = (that.utcOffset() - date.utcOffset()) * C.MILLISECONDS_A_MINUTE
  let result: number

  if (isUndefined(units)) {
    result = diffInMs // milliseconds
  } else {
    const unit = normalizeUnitWithPlurals(units)
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
  }

  return asFloat ? result : absFloor(result)
}
