/**
 * Map units to fields of a javascript Date object.
 */

import { isArray } from './is'
import type {
  PrettyUnitFromPlurals,
  UnitDays,
  UnitIsoWeek,
  UnitQuarter,
  UnitQuarters,
  UnitTypeGetSet,
  UnitTypePlurals,
  UnitWeek,
  UnitWeeks,
} from './units'
import { normalizeUnitWithPlurals } from './units'

const UNIT_FIELD_MAP = {
  year: 'FullYear',
  month: 'Month',
  date: 'Date',
  day: 'Day',
  hour: 'Hours',
  minute: 'Minutes',
  second: 'Seconds',
  millisecond: 'Milliseconds',
} as const

type DateUnit = keyof typeof UNIT_FIELD_MAP
type DateField<T extends DateUnit> = (typeof UNIT_FIELD_MAP)[T]

export type UnitForGetDate = Exclude<UnitTypeGetSet, UnitWeeks | UnitQuarters>
export type UnitForSetDate = Exclude<UnitForGetDate, UnitDays>

export type PrettyUnitForSetDate<T extends UnitTypePlurals> = Exclude<
  PrettyUnitFromPlurals<T>,
  UnitWeek | UnitIsoWeek | UnitQuarter
>

export const prettyUnitsDate = Object.keys(UNIT_FIELD_MAP) as DateUnit[]

function unitToField<T extends UnitForGetDate>(unit: T): DateField<PrettyUnitForSetDate<T>> {
  const p = normalizeUnitWithPlurals(unit) as PrettyUnitForSetDate<T>
  return UNIT_FIELD_MAP[p]
}

export function getUnitInDate(date: Date, unit: UnitForGetDate): number {
  const field = unitToField(unit)
  const method = `get${field}` as `get${typeof field}`
  return date[method]()
}

export function getUnitInDateUTC(date: Date, unit: UnitForGetDate): number {
  const field = unitToField(unit)
  return date[`getUTC${field}` as `getUTC${typeof field}`]()
}

export function setUnitInDate(date: Date, unit: UnitForSetDate, value: number | number[]): Date {
  const field = unitToField(unit)
  const method = `set${field}` as `set${typeof field}`
  date[method](...((isArray(value) ? value : [value]) as [number]))
  return date
}

export function setUnitInDateUTC(date: Date, unit: UnitForSetDate, value: number | number[]): Date {
  const field = unitToField(unit)
  const method = `setUTC${field}` as `setUTC${typeof field}`
  date[method](...((isArray(value) ? value : [value]) as [number]))
  return date
}
