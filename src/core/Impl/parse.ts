import type { EsDay } from 'esday'
import type { Tuple } from '~/types/util-types'

/**
 * Create a Date object from an array of date components (year, month, ...).
 * The month is 0 based (0..11).
 * @param this - context to access the right function 'dateFromDateComponents'
 * @param dateArray - array with date components (y, M, D, h, m, s ms)
 * @returns Date object created from given array elements
 */
export function parseArrayToDate(this: EsDay, dateArray: number[]) {
  const dateArrayTuple: Tuple<number, 7> = [0, 1, 1, 0, 0, 0, 0]
  dateArray.forEach((value, index) => {
    if (value !== undefined) {
      // input: month=0..11; target: month=1..12
      dateArrayTuple[index] = index !== 1 ? value : value + 1
    }
  })
  return this.dateFromDateComponents(...dateArrayTuple)
}
