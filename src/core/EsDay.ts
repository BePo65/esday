import {
  C,
  isEmptyObject,
  isObject,
  isUndefined,
  isValidDate,
  normalizeUnitWithPlurals,
} from '~/common'
import type { UnitForGetDate, UnitForSetDate } from '~/common/date-fields'
import { getUnitInDate, prettyUnitsDate, setUnitInDate } from '~/common/date-fields'
import type {
  UnitDates,
  UnitDays,
  UnitHours,
  UnitMins,
  UnitMonths,
  UnitMss,
  UnitQuarters,
  UnitSeconds,
  UnitWeeks,
  UnitYears,
} from '~/common/units'
import type {
  DateType,
  UnitsObjectTypeAddSub,
  UnitsObjectTypeSet,
  UnitType,
  UnitTypeAddSub,
  UnitTypeGetSet,
} from '~/types'
import type { SimpleObject } from '~/types/util-types'
import { esday } from '.'
import { addImpl } from './Impl/add'
import { diffImpl } from './Impl/diff'
import { formatImpl } from './Impl/format'
import { parseArrayToDate } from './Impl/parse'
import { startOfImpl } from './Impl/startOf'

export declare interface EsDay {
  year: (() => number) & ((year: number, month?: number, date?: number) => EsDay)
  month: (() => number) & ((month: number, date?: number) => EsDay)
  date: (() => number) & ((date: number) => EsDay) // day of month
  day: (() => number) & ((day: number) => EsDay) // day of week
  hour: (() => number) & ((hours: number, min?: number, sec?: number, ms?: number) => EsDay)
  minute: (() => number) & ((min: number, sec?: number, ms?: number) => EsDay)
  second: (() => number) & ((sec: number, ms?: number) => EsDay)
  millisecond: (() => number) & ((ms: number) => EsDay)
}

export class EsDay {
  protected $d!: Date

  /**
   * mainly for plugin compatibility
   * store data such as locale name, utc mode, etc.
   */
  private $conf: SimpleObject = {}

  constructor(d: Exclude<DateType, EsDay>, conf?: SimpleObject) {
    if (!isUndefined(conf)) {
      this.$conf = structuredClone<SimpleObject>(conf)
    }
    this.$parse(d)
  }

  protected $parse(d: Exclude<DateType, EsDay>) {
    this.$d = this.#parseImpl(d)
  }

  /**
   * Create a Date object from the date components (year, month, ...).
   * The month is 1 based (1..12).
   * Potential hook for plugins to change the details of Date creation.
   * @param Y - year of date to create
   * @param M - year of date to create (1..12)
   * @param D - year of date to create
   * @param h - year of date to create
   * @param m - year of date to create
   * @param s - year of date to create
   * @param ms - year of date to create
   * @param offsetMs - offset from utc in milliseconds
   * @returns Date object created from input parameters
   */
  protected dateFromDateComponents(
    Y: number | undefined,
    M: number | undefined,
    D: number | undefined,
    h: number | undefined,
    m: number | undefined,
    s: number | undefined,
    ms: number | undefined,
    offsetMs?: number,
  ) {
    const parsedYearOrDefault = Y ?? new Date().getFullYear()
    const parsedMonthOrDefault = M ?? (Y !== undefined ? 1 : new Date().getMonth() + 1)
    const dateComponents = {
      Y: parsedYearOrDefault,
      M: parsedMonthOrDefault - 1,
      D: D ?? 1,
      h: h ?? 0,
      m: m ?? 0,
      s: s ?? 0,
      ms: ms ?? 0,
    }

    const yearWithoutCentury = Math.abs(parsedYearOrDefault) < 100
    let overflowed = false
    let result = new Date(
      dateComponents.Y,
      dateComponents.M,
      dateComponents.D,
      dateComponents.h,
      dateComponents.m,
      dateComponents.s,
      dateComponents.ms,
    )

    // Account for single digit years
    if (yearWithoutCentury) {
      result.setFullYear(dateComponents.Y)
    }

    overflowed =
      (M !== undefined && M - 1 !== result.getMonth()) ||
      (D !== undefined && D !== result.getDate()) ||
      (h !== undefined && h !== result.getHours()) ||
      (m !== undefined && m !== result.getMinutes()) ||
      (s !== undefined && s !== result.getSeconds())

    if (overflowed) {
      result = C.INVALID_DATE
    } else if (!isUndefined(offsetMs)) {
      const currentOffsetMin = result.getTimezoneOffset()
      const newMs = result.getMilliseconds() - (currentOffsetMin * 60_000 + offsetMs)
      result.setMilliseconds(newMs)
    }

    return result
  }

  /**
   * Convert a parsed element to a number | undefined;
   * empty strings are treated as undefined.
   * @param parsedElement - element to be converted
   * @returns parsed element as number
   */
  #toNumber(parsedElement: string | number | undefined) {
    if (
      parsedElement === undefined ||
      (typeof parsedElement === 'string' && parsedElement.trim().length === 0)
    ) {
      return
    }

    return Number(parsedElement)
  }

  /**
   * Convert a parsed milliseconds element to a number | undefined;
   * for milliseconds only the 1st 3 digits are considered;
   * empty strings are treated as '0'.
   * @param parsedElement - element to be converted
   * @returns parsed element as number
   */
  #toMsNumber(parsedElement: string | number | undefined) {
    if (parsedElement === undefined) {
      return
    }

    return Number(parsedElement.toString().slice(0, 3))
  }

  #parseImpl(date?: Exclude<DateType, EsDay>): Date {
    if (date instanceof Date) return new Date(date)
    if (date === null) return new Date(Number.NaN)
    if (isUndefined(date)) return new Date()
    if (isEmptyObject(date)) return new Date()
    if (Array.isArray(date)) return parseArrayToDate.call(this, date)
    if (typeof date === 'string') {
      const dateTrimmed = date.trimStart()
      if (!/Z$/i.test(dateTrimmed)) {
        const d = dateTrimmed.match(C.REGEX_PARSE_DEFAULT)
        if (d) {
          const Y = this.#toNumber(d[1])
          const M = this.#toNumber(d[2])
          const D = this.#toNumber(d[3])
          const h = this.#toNumber(d[4])
          const m = this.#toNumber(d[5])
          const s = this.#toNumber(d[6])
          const ms = this.#toMsNumber(d[7])
          return this.dateFromDateComponents(Y, M, D, h, m, s, ms)
        }
      } else {
        return new Date(dateTrimmed)
      }
    }

    return new Date(date)
  }

  isSame(that: DateType, units: UnitType = C.MS) {
    const other = esday(that)
    return this.startOf(units) <= other && other <= this.endOf(units)
  }

  isAfter(that: DateType, units: UnitType = C.MS) {
    return esday(that) < this.startOf(units)
  }

  isBefore(that: DateType, units: UnitType = C.MS) {
    return this.endOf(units) < esday(that)
  }

  // return this milliseconds
  valueOf() {
    // timezone(hour) * 60 * 60 * 1000 => ms
    return this.$d.getTime()
  }

  unix() {
    return Math.floor(this.valueOf() / 1000)
  }

  isValid() {
    return isValidDate(this.$d)
  }

  clone() {
    const newInst = new EsDay(this.$d)
    newInst.$conf = structuredClone(this.$conf)
    return newInst
  }

  format(formatStr?: string) {
    return formatImpl(this, formatStr)
  }

  startOf(units: UnitType) {
    return startOfImpl(this, units)
  }

  endOf(units: UnitType) {
    return startOfImpl(this, units, true)
  }

  // using an object as value to add is implemented in the plugin ObjectSupport.
  // As overloads cannot be added in another module, we have to define all
  // overloads here, even if they are implemented in a plugin.
  add(value: number, unit: UnitTypeAddSub): EsDay
  add(value: UnitsObjectTypeAddSub): EsDay
  add(value: number | UnitsObjectTypeAddSub, unit?: UnitTypeAddSub) {
    if (!isObject(value) && unit !== undefined) {
      return addImpl(this, value, unit)
    }
    // using UnitsObjectTypeAddSub is implemented in plugin ObjectSupport
    // therefore we ignore the request here.
    return this.clone()
  }

  // using an object as value to add is implemented in the plugin ObjectSupport.
  // As overloads cannot be added in another module, we have to define all
  // overloads here, even if they are implemented in a plugin.
  subtract(value: number, unit: UnitTypeAddSub): EsDay
  subtract(value: UnitsObjectTypeAddSub): EsDay
  subtract(value: number | UnitsObjectTypeAddSub, unit?: UnitTypeAddSub) {
    if (!isObject(value) && unit !== undefined) {
      return this.add(-value, unit as UnitTypeAddSub)
    }
    // using UnitsObjectTypeAddSub is implemented in plugin ObjectSupport
    // therefore we ignore the request here.
    return this.clone()
  }

  diff(date: EsDay, units?: UnitTypeAddSub, asFloat = false): number {
    return diffImpl(this, date, units, asFloat)
  }

  /**
   * Get the utcOffset of date in minutes.
   * "Proxy" implementation (getter only); the full functionality including
   * the setters is implemented in the plugin Utc.
   * @param offset - offset to be set
   * @param keepLocalTime - keep the current time when setting the offset
   * @returns utcOffset of date in minutes (getter) or invalid date (setter)
   */
  utcOffset(): number
  utcOffset(offset: number | string): EsDay
  utcOffset(offset: number | string, keepLocalTime?: boolean): EsDay
  utcOffset(offset?: number | string, _keepLocalTime?: boolean) {
    if (offset !== undefined) {
      // this is only here to satisfy the setter overload; setting the
      // utcOffset requires the plugin Utc
      return new EsDay(C.INVALID_DATE)
    }

    return -Math.round(this['$d'].getTimezoneOffset())
  }

  get(unit: UnitTypeGetSet) {
    const normalizedUnit = normalizeUnitWithPlurals(unit)
    if (normalizedUnit === C.QUARTER || normalizedUnit === C.WEEK) {
      // Units 'quarter' and 'weeks' are implemented in the corresponding plugins
      return Number.NaN
    }
    return getUnitInDate(this.$d, unit as UnitForGetDate)
  }

  set(unit: UnitYears, year: number, month?: number, date?: number): EsDay
  set(unit: UnitQuarters, quarter: number): EsDay
  set(unit: UnitMonths, month: number, date?: number): EsDay
  set(unit: UnitWeeks, week: number): EsDay
  set(unit: UnitDates, date: number): EsDay
  set(unit: UnitDays, day: number): EsDay
  set(unit: UnitHours, hours: number, min?: number, sec?: number, ms?: number): EsDay
  set(unit: UnitMins, min: number, sec?: number, ms?: number): EsDay
  set(unit: UnitSeconds, sec: number, ms?: number): EsDay
  set(unit: UnitMss, ms: number): EsDay
  set(unit: UnitTypeGetSet, ...values: number[]): EsDay // generic signature for all types from UnitTypeGetSet
  set(unit: UnitsObjectTypeSet): EsDay
  set(unit: UnitTypeGetSet | UnitsObjectTypeSet, ...values: number[]) {
    return this.clone().$set(unit, values)
  }

  toDate() {
    return new Date(this.valueOf())
  }

  toJSON() {
    return this.isValid() ? this.toISOString() : null
  }

  toISOString() {
    if (this.isValid()) {
      return this.$d.toISOString()
    }

    return C.INVALID_DATE_STRING
  }

  toString() {
    return this.$d.toUTCString()
  }

  protected $set(unit: UnitTypeGetSet | UnitsObjectTypeSet, values: number[]) {
    if (isObject(unit)) {
      // UnitsObjectTypeSet is implemented in plugin ObjectSupport
      // therefore we ignore the request here.
      return this.clone()
    }

    const normalizedUnit = normalizeUnitWithPlurals(unit)
    if (normalizedUnit === C.DAY) {
      // change date to the given day of week as setUnitInDate does not have a setDay() method
      setUnitInDate(this.$d, C.DAY_OF_MONTH, this.date() + (values[0] - this.day()))
    } else if (normalizedUnit === C.MONTH) {
      const originalDate = values.length === 1 ? this.date() : values[1]
      setUnitInDate(this.$d, C.MONTH, values)
      if (originalDate > 0 && this.date() !== originalDate) {
        // reset date to last day of previous month
        setUnitInDate(this.$d, C.DAY_OF_MONTH, 0)
      }
    } else if (normalizedUnit !== C.QUARTER && normalizedUnit !== C.WEEK) {
      // Units 'quarter' and 'weeks' are implemented in the corresponding plugins
      const typedUnit = normalizedUnit as UnitForSetDate
      setUnitInDate(this.$d, typedUnit, values)
    }

    return this
  }
}

/**
 * Getter / Setter for date components:
 * esday().year(...args)
 * esday().month(...args)
 * esday().date(...args)
 * esday().day(...args)
 * esday().hour(...args)
 * esday().minute(...args)
 * esday().second(...args)
 * esday().millisecond(...args)
 */
for (const key of prettyUnitsDate) {
  // @ts-expect-error it's compatible with the overload
  EsDay.prototype[key] = function (...args: number[]): EsDay | number {
    if (args?.length) {
      return this.set(key, ...(args as [number]))
    }
    return this.get(key)
  }
}
