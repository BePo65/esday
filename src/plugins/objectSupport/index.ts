/**
 * ObjectSupport plugin
 *
 * This plugin extends 'esday()', 'esday.utc()', '.set(), '.add() and '.subtract() in EsDay
 * to support an object argument.
 *
 * This will also work when using the plugin Utc. In that case the plugin Utc must be
 * loaded ('extend()') before loading the plugin ObjectSupport.
 */

import type { EsDay, EsDayPlugin } from 'esday'
import {
  C,
  createInstanceFromExist,
  isEmptyObject,
  isObject,
  normalizeUnitWithPlurals,
} from '~/common'
import type { UnitTypePlurals } from '~/common/units'
import type {
  DateType,
  UnitsObjectTypeAddSub,
  UnitsObjectTypeSet,
  UnitTypeAddSub,
  UnitTypeGetSet,
} from '~/types'
import type { Tuple } from '~/types/util-types'

const objectSupportPlugin: EsDayPlugin<{}> = (_, dayClass, _dayFactory) => {
  const proto = dayClass.prototype

  // implement esday(Object)
  const oldParse = proto['$parse']
  proto['$parse'] = function (date?: Exclude<DateType, EsDay>) {
    if (
      isObject(date) &&
      !(date instanceof Date) &&
      date !== null &&
      !isEmptyObject(date) &&
      !Array.isArray(date)
    ) {
      const dateKeys = Object.keys(date)

      // the default values are: the current year; January, date 1 and time 0
      const now = createInstanceFromExist(new Date(), this)
      const dateArrayTuple: Tuple<number, 7> = [now.year(), 1, 1, 0, 0, 0, 0]

      const dateIncludesYear =
        dateKeys.includes('y') || dateKeys.includes(C.YEAR) || dateKeys.includes(`${C.YEAR}s`)

      const dateIncludesMonth =
        dateKeys.includes('M') || dateKeys.includes(C.MONTH) || dateKeys.includes(`${C.MONTH}s`)

      const dateIncludesDay =
        dateKeys.includes('D') ||
        dateKeys.includes(C.DAY_OF_MONTH) ||
        dateKeys.includes(`${C.DAY_OF_MONTH}s`) ||
        dateKeys.includes('d') ||
        dateKeys.includes(C.DAY) ||
        dateKeys.includes(`${C.DAY}s`)

      if (dateIncludesDay && !dateIncludesMonth && !dateIncludesYear) {
        dateArrayTuple[1] = now.month() + 1
      }

      for (const stringKey of dateKeys) {
        const key = normalizeUnitWithPlurals(stringKey as UnitTypePlurals)
        switch (key) {
          case C.YEAR:
            dateArrayTuple[0] = Number(date[stringKey])
            break
          case C.MONTH:
            dateArrayTuple[1] = Number(date[stringKey]) + 1
            break
          case C.DAY:
          case C.DAY_OF_MONTH:
            dateArrayTuple[2] = Number(date[stringKey])
            break
          case C.HOUR:
            dateArrayTuple[3] = Number(date[stringKey])
            break
          case C.MIN:
            dateArrayTuple[4] = Number(date[stringKey])
            break
          case C.SECOND:
            dateArrayTuple[5] = Number(date[stringKey])
            break
          case C.MS:
            dateArrayTuple[6] = Number(date[stringKey])
            break
        }
      }
      this['$d'] = this.dateFromDateComponents(...dateArrayTuple)
    } else {
      oldParse.call(this, date)
    }
  }

  const old$set = proto['$set']
  proto['$set'] = function (unit: UnitTypeGetSet | UnitsObjectTypeSet, values: number[]) {
    if (isObject(unit)) {
      const keys = Object.keys(unit)
      const valuesToSet = unit as UnitsObjectTypeSet
      let result = this
      for (const stringKey of keys) {
        const key = stringKey as keyof UnitsObjectTypeSet
        const valueToSet = valuesToSet[key]
        // @ts-expect-error it's compatible with the overload
        result = old$set.call(result, key, [valueToSet])
      }
      return result
    }
    return old$set.call(this, unit, values)
  }

  const oldAdd = proto.add
  proto.add = function (value: number | UnitsObjectTypeAddSub, unit?: UnitTypeAddSub) {
    if (isObject(value)) {
      const keys = Object.keys(value)
      let result = this
      for (const stringKey of keys) {
        const key = stringKey as keyof UnitsObjectTypeAddSub
        const valueToAdd = value[key]
        // @ts-expect-error it's compatible with the overload
        result = oldAdd.call(result, valueToAdd, key)
      }
      return result
    }

    // @ts-expect-error it's compatible with the overload
    return oldAdd.call(this, value, unit)
  }

  const oldSubtract = proto.subtract
  proto.subtract = function (value: number | UnitsObjectTypeAddSub, unit?: UnitTypeAddSub) {
    if (isObject(value)) {
      let result = this
      const keys = Object.keys(value)
      for (const stringKey of keys) {
        const key = stringKey as keyof UnitsObjectTypeAddSub
        const valueToSubtract = value[key]
        // @ts-expect-error it's compatible with the overload
        result = oldSubtract.call(result, valueToSubtract, key)
      }
      return result
    }

    // @ts-expect-error it's compatible with the overload
    return oldSubtract.call(this, value, unit)
  }
}

export default objectSupportPlugin
