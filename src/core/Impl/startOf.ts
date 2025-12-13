import type { EsDay } from 'esday'
import { C, normalizeUnit } from '~/common'
import type { UnitType, UnitTypeCore } from '~/types'

export function startOfImpl(that: EsDay, unit: UnitType, reverse = false) {
  const result = that.clone()

  // for performance , $set can change inst itself
  const setterFunc = result['$set']

  const instanceFactorySet = (method: UnitTypeCore, slice: number) => {
    const argumentStart = [0, 0, 0, 0]
    const argumentEnd = [23, 59, 59, 999]
    const argument = reverse ? argumentEnd.slice(slice) : argumentStart.slice(slice)
    setterFunc.call(result, method, argument)
  }

  const instanceFactory = (date: number, month: number) => {
    setterFunc.call(result, C.MONTH, [month, date])
  }

  const $month = result.month()

  switch (normalizeUnit(unit)) {
    case C.YEAR:
      reverse ? instanceFactory(31, 11) : instanceFactory(1, 0)
      instanceFactorySet(C.HOUR, 0)
      break
    case C.MONTH:
      reverse ? instanceFactory(0, $month + 1) : instanceFactory(1, $month)
      instanceFactorySet(C.HOUR, 0)
      break
    case C.DAY:
    case C.DAY_OF_MONTH:
      instanceFactorySet(C.HOUR, 0)
      break
    case C.HOUR:
      instanceFactorySet(C.MIN, 1)
      break
    case C.MIN:
      instanceFactorySet(C.SECOND, 2)
      break
    case C.SECOND:
      instanceFactorySet(C.MS, 3)
      break
    default:
      // unknown units are ignored
      break
  }

  return result
}
