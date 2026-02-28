/**
 * utc plugin
 *
 * when utc mode is enabled, get and set methods will use UTC time
 *
 * new esday parameters in '$conf':
 *   utc          utc mode (true / false)
 *   utcOffset    utcOffset to use for this esday instance
 *   localOffset  local timezone offset (as internal Date - $d - is always in local timezone)
 */

import type { EsDay } from 'esday'
import type { UnitForGetDate, UnitForSetDate } from '~/common'
import {
  C,
  createInstanceFromExist,
  getUnitInDateUTC,
  isObject,
  isUndefined,
  normalizeUnitWithPlurals,
  setUnitInDateUTC,
} from '~/common'
import type { UnitTypeAddSub, UnitTypeGetSet } from '~/common/units'
import type {
  DateType,
  EsDayPlugin,
  SimpleType,
  UnitsObjectTypeAddSub,
  UnitsObjectTypeSet,
} from '~/types'

const REGEX_VALID_OFFSET_FORMAT = /[+-]\d\d(?::?\d\d)?/g
const REGEX_OFFSET_HOURS_MINUTES_FORMAT = /[+-]|\d\d/g

declare module 'esday' {
  interface EsDay {
    utc: (keepLocalTime?: boolean) => EsDay
    local: () => EsDay
    isUTC: () => boolean
  }

  interface EsDayFactory {
    utc: (
      date?: DateType,
      ...others: (SimpleType | string[] | { [key: string]: SimpleType })[]
    ) => EsDay
  }
}

function offsetFromString(value = '') {
  const offset = value.match(REGEX_VALID_OFFSET_FORMAT)

  if (!offset) {
    return Number.NaN
  }

  const [indicator, hoursOffset, minutesOffset] = Object.assign(
    ['-', 0, 0],
    `${offset[0]}`.match(REGEX_OFFSET_HOURS_MINUTES_FORMAT),
  )
  const totalOffsetInMinutes = +hoursOffset * 60 + +minutesOffset

  if (totalOffsetInMinutes === 0) {
    return 0
  }

  return indicator === '+' ? totalOffsetInMinutes : -totalOffsetInMinutes
}

function utcOffsetGetImpl(that: EsDay, defaultValue = Number.NaN) {
  if (that['$conf'].utc) {
    return 0
  }
  if (that['$conf'].utcOffset !== undefined) {
    return Number(that['$conf'].utcOffset)
  }
  return defaultValue
}

function utcOffsetSetImpl(that: EsDay, offset: number | string, keepLocalTime?: boolean) {
  let offsetAsNumber: number

  if (typeof offset === 'string') {
    offsetAsNumber = offsetFromString(offset)
    if (Number.isNaN(offsetAsNumber)) {
      return that
    }
  } else {
    offsetAsNumber = offset
  }

  const offsetAsMinutes = Math.abs(offsetAsNumber) <= 16 ? offsetAsNumber * 60 : offsetAsNumber

  if (keepLocalTime) {
    // change point in time using offset and return new instance
    const localTimezoneOffset = that['$conf'].utc
      ? that.toDate().getTimezoneOffset()
      : -1 * that.utcOffset()

    let instance = that
    if (that['$conf'].utc) {
      instance = instance.add(localTimezoneOffset, C.MIN)
      instance['$conf'].utc = offsetAsMinutes === 0
    }

    instance['$conf'].utcOffset = offsetAsMinutes
    instance['$conf'].localOffset = localTimezoneOffset
    return instance
  }

  if (offsetAsNumber !== 0) {
    const localTimezoneOffset = that['$conf'].utc
      ? that.toDate().getTimezoneOffset()
      : -1 * that.utcOffset()

    // switch away from utc mode
    const instance = that.local().add(offsetAsMinutes + localTimezoneOffset, C.MIN)
    instance['$conf'].utcOffset = offsetAsMinutes
    instance['$conf'].localOffset = localTimezoneOffset
    return instance
  }
  return that.utc()
}

function addUtc(that: EsDay, value: number, units: UnitTypeAddSub) {
  const $d = that['$d']
  const unit = normalizeUnitWithPlurals(units)

  const instanceFactorySet = (multiplier: number) => {
    return that.set('date', that.get('date') + Math.round(multiplier * value))
  }

  switch (normalizeUnitWithPlurals(unit)) {
    case C.YEAR:
      return that.set('year', that.get('year') + value)
    case C.MONTH:
      return that.set('month', that.get('month') + value)
    case C.WEEK:
      return instanceFactorySet(7)
    case C.DAY:
    case C.DAY_OF_MONTH:
      return instanceFactorySet(1)
    case C.HOUR:
    case C.MIN:
    case C.SECOND:
    case C.MS: {
      // set multiplier to convert value to add to milliseconds (default '1')
      // @ts-expect-error default 1
      const step = { minute: 60 * 1000, hour: 60 * 60 * 1000, second: 1000 }[unit] || 1
      const nextTimeStamp = $d.getTime() + value * step
      return createInstanceFromExist(new Date(nextTimeStamp), that)
    }
    default:
      // ignore unsupported units
      return that.clone()
  }
}

const utcPlugin: EsDayPlugin<{}> = (_, dayClass, dayFactory) => {
  // parse a date as utc
  dayFactory.utc = (
    d?: DateType,
    ...others: (SimpleType | string[] | { [key: string]: SimpleType })[]
  ) => {
    const inst = dayFactory(d, ...others, { utc: true })
    return inst
  }

  const proto = dayClass.prototype

  // convert a date to utc
  proto.utc = function (keepLocalTime?: boolean) {
    const inst = this.clone()
    inst.$d = this.toDate()
    inst['$conf'].utc = true
    if (keepLocalTime) {
      return inst.add(this.utcOffset(), C.MIN)
    }
    return inst
  }

  proto.local = function () {
    const inst = this.clone()
    inst['$conf'].utc = false
    return inst
  }

  proto.isUTC = function () {
    return !!this['$conf'].utc
  }

  proto.toISOString = function () {
    if (this.isValid()) {
      return this.toDate().toISOString()
    }
    return C.INVALID_DATE_STRING
  }

  // @ts-expect-error function is compatible with its overload
  proto.utcOffset = function (offset?: number | string, keepLocalTime?: boolean) {
    if (offset === undefined) {
      // Getter
      const defaultOffset = -Math.round(this.$d.getTimezoneOffset())
      return utcOffsetGetImpl(this, defaultOffset)
    }

    // Setter
    return utcOffsetSetImpl(this, offset, keepLocalTime)
  }

  const oldValueOf = proto.valueOf
  proto.valueOf = function () {
    if (this['$conf'].utcOffset !== undefined) {
      const internalDate = this.$d
      const offsetToUse = Number(this['$conf'].localOffset ?? internalDate.getTimezoneOffset())
      const addedOffset = Number(this['$conf'].utcOffset) + offsetToUse
      return internalDate.valueOf() - addedOffset * C.MILLISECONDS_A_MINUTE
    }
    return oldValueOf.call(this)
  }

  const oldFormat = proto.format
  proto.format = function (formatStr) {
    const UTC_FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ss[Z]'
    const activeFormatString = formatStr || (this['$conf'].utc ? UTC_FORMAT_DEFAULT : '')
    return oldFormat.call(this, activeFormatString)
  }

  // change private method 'dateFromDateComponents' of EsDay
  const oldDateFromDateComponents = proto['dateFromDateComponents']
  proto['dateFromDateComponents'] = function (
    Y: number | undefined,
    M: number | undefined,
    D: number | undefined,
    h: number | undefined,
    m: number | undefined,
    s: number | undefined,
    ms: number | undefined,
    offsetMs?: number,
  ) {
    if (!this['$conf'].utc) {
      return oldDateFromDateComponents(Y, M, D, h, m, s, ms, offsetMs)
    }

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
    let result: Date
    let overflowed = false

    result = new Date(
      Date.UTC(
        dateComponents.Y,
        dateComponents.M,
        dateComponents.D,
        dateComponents.h,
        dateComponents.m,
        dateComponents.s,
        dateComponents.ms,
      ),
    )

    // Account for single digit years
    if (yearWithoutCentury) {
      result.setUTCFullYear(dateComponents.Y)
    }

    overflowed =
      (M !== undefined && M - 1 !== result.getUTCMonth()) ||
      (D !== undefined && D !== result.getUTCDate()) ||
      (h !== undefined && h !== result.getUTCHours()) ||
      (m !== undefined && m !== result.getUTCMinutes()) ||
      (s !== undefined && s !== result.getUTCSeconds())

    if (overflowed) {
      result = C.INVALID_DATE
    } else if (!isUndefined(offsetMs)) {
      result.setUTCMilliseconds(result.getUTCMilliseconds() - offsetMs)
    }

    return result
  }

  const oldGet = proto.get
  proto.get = function (unit: UnitTypeGetSet) {
    const normalizedUnit = normalizeUnitWithPlurals(unit)
    if (normalizedUnit === C.QUARTER || normalizedUnit === C.WEEK) {
      // Units 'quarter' and 'weeks' are implemented in the corresponding plugins
      return Number.NaN
    }

    if (this['$conf'].utc) {
      return getUnitInDateUTC(this.$d, unit as UnitForGetDate)
    }

    return oldGet.call(this, unit)
  }

  const old$set = proto['$set']
  proto['$set'] = function (unit: UnitTypeGetSet | UnitsObjectTypeSet, values: number[]) {
    const utc = !!this['$conf'].utc
    if (utc) {
      if (isObject(unit)) {
        // UnitsObjectTypeSet is implemented in plugin ObjectSupport
        // therefore we ignore the request here.
        return this
      }

      const $date = this.$d
      const normalizedUnit = normalizeUnitWithPlurals(unit)
      if (normalizedUnit === C.DAY) {
        // change date to the given day of week as setUnitInDate does not have a setDay() method
        setUnitInDateUTC($date, C.DAY_OF_MONTH, this.date() + (values[0] - this.day()))
      } else if (normalizedUnit === C.YEAR && values.length === 2) {
        // Setting year + month (without day-of-month)
        // Clamping day-of-month to last day of month (see https://momentjs.com/docs/#/get-set/month/)
        const originalDate = this.date()
        setUnitInDateUTC($date, C.YEAR, values)
        if (originalDate > 0 && this.date() !== originalDate) {
          // reset day-of-month to last day of previous month
          setUnitInDateUTC($date, C.DAY_OF_MONTH, 0)
        }
      } else if (normalizedUnit === C.MONTH) {
        // Clamping day-of-month to last day of month (see https://momentjs.com/docs/#/get-set/month/)
        const originalDate = values.length === 1 ? this.date() : values[1]
        setUnitInDateUTC($date, C.MONTH, values)
        if (originalDate > 0 && this.date() !== originalDate) {
          // reset day-of-month to last day of previous month
          setUnitInDateUTC($date, C.DAY_OF_MONTH, 0)
        }
      } else {
        /* istanbul ignore else -- @preserve */
        if (normalizedUnit !== C.QUARTER && normalizedUnit !== C.WEEK) {
          // Units 'quarter' and 'weeks' are implemented in the corresponding plugins
          const typedUnit = normalizedUnit as UnitForSetDate
          setUnitInDateUTC($date, typedUnit, values)
        }
      }

      return this
    }
    return old$set.call(this, unit, values)
  }

  const oldAdd = proto.add
  proto.add = function (value: number | UnitsObjectTypeAddSub, unit?: UnitTypeAddSub) {
    if (isObject(value) || unit === undefined) {
      // using UnitsObjectTypeAddSub is implemented in plugin ObjectSupport
      // therefore we ignore the request here.
      // @ts-expect-error it's compatible with the overload
      return oldAdd.call(this, value, unit)
    }

    if (this['$conf'].utc) {
      return addUtc(this, value, unit)
    }

    // @ts-expect-error always requires 3 args, as  UnitsObjectTypeAddSub is covered by plugin ObjectSupport
    return oldAdd.call(this, value, unit)
  }

  const oldSubtract = proto.subtract
  proto.subtract = function (value: number | UnitsObjectTypeAddSub, unit?: UnitTypeAddSub) {
    if (isObject(value) || unit === undefined) {
      // using UnitsObjectTypeAddSub is implemented in plugin ObjectSupport
      // therefore we ignore the request here.
      // @ts-expect-error it's compatible with the overload
      return oldSubtract.call(this, value, unit)
    }

    if (this['$conf'].utc) {
      return addUtc(this, -value, unit)
    }

    // @ts-expect-error always requires 3 args, as  UnitsObjectTypeAddSub is covered by plugin ObjectSupport
    return oldSubtract.call(this, value, unit)
  }
}

export default utcPlugin
