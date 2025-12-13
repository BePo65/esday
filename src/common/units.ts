import {
  DAY,
  DAY_OF_MONTH,
  HOUR,
  ISOWEEK,
  MIN,
  MONTH,
  MS,
  QUARTER,
  SECOND,
  WEEK,
  YEAR,
} from './constants'

const UNIT_MAP_SHORT_TO_LONG = {
  y: YEAR,
  Q: QUARTER,
  M: MONTH,
  w: WEEK,
  W: ISOWEEK,
  D: DAY_OF_MONTH,
  d: DAY,
  h: HOUR,
  m: MIN,
  s: SECOND,
  ms: MS,
} as const

const UNIT_MAP_PLURAL_TO_LONG = {
  years: 'year',
  quarters: 'quarter',
  months: 'month',
  weeks: 'week',
  isoWeeks: 'isoWeek',
  dates: 'date',
  days: 'day',
  hours: 'hour',
  minutes: 'minute',
  seconds: 'second',
  milliseconds: 'millisecond',
} as const

const UNIT_MAP_SHORT_TO_PLURAL = {
  y: 'years',
  Q: 'quarters',
  M: 'months',
  w: 'weeks',
  W: 'isoWeeks',
  D: 'dates',
  d: 'days',
  h: 'hours',
  m: 'minutes',
  s: 'seconds',
  ms: 'milliseconds',
} as const

const UNIT_MAP_LONG_TO_PLURAL = {
  year: 'years',
  quarter: 'quarters',
  month: 'months',
  week: 'weeks',
  isoWeek: 'isoWeeks',
  date: 'dates',
  day: 'days',
  hour: 'hours',
  minute: 'minutes',
  second: 'seconds',
  millisecond: 'milliseconds',
} as const

export type ShortUnit = keyof typeof UNIT_MAP_SHORT_TO_LONG
export type LongUnit = (typeof UNIT_MAP_SHORT_TO_LONG)[ShortUnit]
export type LongUnitPlurals = `${(typeof UNIT_MAP_SHORT_TO_LONG)[ShortUnit]}${'s'}`

export type UnitType = ShortUnit | LongUnit
export type UnitTypePlurals = UnitType | LongUnitPlurals
export type UnitTypeCore = Exclude<UnitType, UnitWeek | UnitIsoWeek | UnitQuarter>
export type UnitTypeAddSub = Exclude<UnitTypePlurals, UnitIsoWeeks>
export type UnitTypeGetSet = Exclude<UnitTypePlurals, UnitIsoWeeks>

// Type as long unit from short or long unit (e.g. 'y' -> 'year')
export type PrettyUnitAsSingular<T extends UnitType> = T extends ShortUnit
  ? (typeof UNIT_MAP_SHORT_TO_LONG)[T]
  : T

// Type as long unit from short, long or plural unit (e.g. 'years' -> 'year')
export type PrettyUnitFromPlurals<T extends UnitTypePlurals> = T extends ShortUnit
  ? `${(typeof UNIT_MAP_SHORT_TO_LONG)[T]}`
  : T extends LongUnitPlurals
    ? `${(typeof UNIT_MAP_PLURAL_TO_LONG)[T]}`
    : T

// Type as plural long unit from short, long or plural unit (e.g. 'year' -> 'years')
export type PrettyUnitAsPlural<T extends UnitTypePlurals> = T extends ShortUnit
  ? `${(typeof UNIT_MAP_SHORT_TO_LONG)[T]}s`
  : T extends LongUnit
    ? `${(typeof UNIT_MAP_LONG_TO_PLURAL)[T]}`
    : T

type UnionUnitSingular<T extends ShortUnit> = T | PrettyUnitAsSingular<T>
type UnionUnitPlural<T extends ShortUnit> = UnionUnitSingular<T> | PrettyUnitAsPlural<T>
export type UnitYear = UnionUnitSingular<'y'>
export type UnitYears = UnionUnitPlural<'y'>
export type UnitQuarter = UnionUnitSingular<'Q'>
export type UnitQuarters = UnionUnitPlural<'Q'>
export type UnitMonth = UnionUnitSingular<'M'>
export type UnitMonths = UnionUnitPlural<'M'>
export type UnitWeek = UnionUnitSingular<'w'>
export type UnitWeeks = UnionUnitPlural<'w'>
export type UnitIsoWeek = UnionUnitSingular<'W'>
export type UnitIsoWeeks = UnionUnitPlural<'W'>
export type UnitDate = UnionUnitSingular<'D'>
export type UnitDates = UnionUnitPlural<'D'>
export type UnitDay = UnionUnitSingular<'d'>
export type UnitDays = UnionUnitPlural<'d'>
export type UnitHour = UnionUnitSingular<'h'>
export type UnitHours = UnionUnitPlural<'h'>
export type UnitMin = UnionUnitSingular<'m'>
export type UnitMins = UnionUnitPlural<'m'>
export type UnitSecond = UnionUnitSingular<'s'>
export type UnitSeconds = UnionUnitPlural<'s'>
export type UnitMs = UnionUnitSingular<'ms'>
export type UnitMss = UnionUnitPlural<'ms'>

// Convert any unit (without plural forms) to its long form (e.g. 'y' or 'year' -> 'year')
export function normalizeUnit<T extends UnitType>(unit: T): LongUnit {
  let normalizedUnit = UNIT_MAP_SHORT_TO_LONG[unit as ShortUnit]
  // is unit not a ShortUnit?
  if (normalizedUnit === undefined) {
    const unitAsLongUnit = unit as LongUnit
    const isPluralUnit = UNIT_MAP_LONG_TO_PLURAL[unitAsLongUnit]
    normalizedUnit = (isPluralUnit ? unitAsLongUnit : normalizedUnit) as LongUnit
  }
  return normalizedUnit
}

// Convert any unit (incl. plural form) to its long form (without plural)
// (e.g. 'y' or 'year' or 'years' -> 'year')
export function normalizeUnitWithPlurals<T extends UnitTypePlurals>(unit: T): LongUnit {
  let normalizedUnit = UNIT_MAP_SHORT_TO_LONG[unit as ShortUnit]
  // is unit not a ShortUnit?
  if (normalizedUnit === undefined) {
    // no long unit ends with 's'; therefore removing a trailing 's' will
    // make a long unit from a plural one or keep the long unit unchanged
    const singularUnit = unit?.replace?.(/s$/, '')
    const isLongUnit = UNIT_MAP_LONG_TO_PLURAL.hasOwnProperty(singularUnit)
    normalizedUnit = (isLongUnit ? singularUnit : normalizedUnit) as LongUnit
  }
  return normalizedUnit
}

// Convert any unit (incl. plural form) to its long form (without plural)
// (e.g. 'y' or 'year' or 'years' -> 'year')
export function normalizeUnitWithPluralsToPlural<T extends UnitTypePlurals>(
  unit: T,
): LongUnitPlurals {
  let normalizedUnit = UNIT_MAP_SHORT_TO_PLURAL[unit as ShortUnit]
  // is unit not a ShortUnit?
  if (normalizedUnit === undefined) {
    const unitAsPluralUnit = unit as LongUnitPlurals
    const isPluralUnit = UNIT_MAP_PLURAL_TO_LONG[unitAsPluralUnit]
    const unitFromLongUnit = UNIT_MAP_LONG_TO_PLURAL[unit as LongUnit]
    normalizedUnit = (isPluralUnit ? unitAsPluralUnit : unitFromLongUnit) as LongUnitPlurals
  }
  return normalizedUnit
}
