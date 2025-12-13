import { C, createInstanceFromExist, normalizeUnitWithPlurals } from '~/common'
import type { EsDay } from '~/core'
import type { UnitTypeAddSub } from '~/types'

export function addImpl(that: EsDay, value: number, units: UnitTypeAddSub) {
  const $d = that['$d']
  const unit = normalizeUnitWithPlurals(units)

  const instanceFactorySet = (multiplier: number) => {
    const newInstance = that.clone()
    newInstance['$d'].setDate($d.getDate() + Math.round(multiplier * value))
    return newInstance
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
