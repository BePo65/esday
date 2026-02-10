/**
 * quarterOfYear plugin
 *
 * This plugin adds 'quarter' and the formatting token 'Q' to EsDay.
 */

import type { EsDay, EsDayPlugin, FormattingTokenDefinitions } from 'esday'
import { C, isObject, normalizeUnitWithPlurals } from '~/common'
import type {
  UnitsObjectTypeAddSub,
  UnitsObjectTypeSet,
  UnitType,
  UnitTypeAddSub,
  UnitTypeGetSet,
} from '~/types'

declare module 'esday' {
  interface EsDay {
    quarter(): number
    quarter(quarterNumber: number): EsDay
    quarters(): number
    quarters(quarterNumber: number): EsDay
  }
}

const quarterOfYearPlugin: EsDayPlugin<{}> = (_, dayClass, dayFactory) => {
  const proto = dayClass.prototype

  // @ts-expect-error function is compatible with its overload
  proto.quarter = function (quarterNumber?: number) {
    if (quarterNumber === undefined) {
      // Getter
      return Math.ceil((this.month() + 1) / 3)
    }

    // Setter
    return this.month((this.month() % 3) + (quarterNumber - 1) * 3)
  }

  proto.quarters = proto.quarter

  const oldAdd = proto.add
  proto.add = function (value: number | UnitsObjectTypeAddSub, unit?: UnitTypeAddSub) {
    if (!isObject(value) && unit !== undefined) {
      const unitLong = normalizeUnitWithPlurals(unit)
      if (unitLong === C.QUARTER) {
        return this.add(value * 3, C.MONTH)
      }
    }

    // @ts-expect-error it's compatible with the overload
    return oldAdd.call(this, value, unit)
  }

  const oldStartOf = proto.startOf
  proto.startOf = function (units: UnitType) {
    const unit = normalizeUnitWithPlurals(units)
    if (unit === C.QUARTER) {
      const quarter = this.quarter() - 1
      return this.month(quarter * 3)
        .startOf(C.MONTH)
        .startOf(C.DAY)
    }
    return oldStartOf.call(this, units)
  }

  const oldEndOf = proto.endOf
  proto.endOf = function (units: UnitType) {
    const unit = normalizeUnitWithPlurals(units)
    if (unit === C.QUARTER) {
      const quarter = this.quarter() - 1
      return this.month(quarter * 3 + 2)
        .endOf(C.MONTH)
        .endOf(C.DAY)
    }
    return oldEndOf.call(this, units)
  }

  const oldGet = proto.get
  proto.get = function (unit: UnitTypeGetSet) {
    const normalizedUnit = normalizeUnitWithPlurals(unit)
    if (normalizedUnit === C.QUARTER) {
      return this.quarter()
    }
    return oldGet.call(this, unit)
  }

  const old$set = proto['$set']
  proto['$set'] = function (unit: UnitTypeGetSet | UnitsObjectTypeSet, values: number[]) {
    if (isObject(unit)) {
      // UnitsObjectTypeSet is implemented in plugin ObjectSupport
      // therefore we ignore the request here.
      return this
    }

    const normalizedUnit = normalizeUnitWithPlurals(unit)
    if (normalizedUnit === C.QUARTER) {
      return this.quarter(values[0])
    }
    return old$set.call(this, unit, values)
  }

  // Add 'Q' for quarter to formatting tokens
  const additionalTokens: FormattingTokenDefinitions = {
    Q: (sourceDate: EsDay) => sourceDate.quarter().toString(),
  }
  dayFactory.addFormatTokenDefinitions(additionalTokens)
}

export default quarterOfYearPlugin
