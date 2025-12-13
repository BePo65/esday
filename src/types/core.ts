import type { EsDay } from '~/core'
import type { SimpleType } from './util-types'

export type EsDayFactoryParserFn = (
  d?: DateType,
  ...others: (SimpleType | string[] | { [key: string]: SimpleType })[]
) => EsDay
export interface EsDayFactory {
  (...args: Parameters<EsDayFactoryParserFn>): ReturnType<EsDayFactoryParserFn>
  extend: <T extends {}>(plugin: EsDayPlugin<T>, option?: T) => EsDayFactory
  addFormatTokenDefinitions: (newTokens: FormattingTokenDefinitions) => void
}
export type EsDayPlugin<T extends {} = {}> = (
  option: Partial<T>,
  esdayClass: typeof EsDay,
  esday: EsDayFactory,
) => void
export type DateType = EsDay | Date | string | number | number[] | null | undefined | object

// Signature of internal function that creates a Date from date components
export type DateFromDateComponents = (
  Y: number | undefined,
  M: number | undefined,
  D: number | undefined,
  h: number | undefined,
  m: number | undefined,
  s: number | undefined,
  ms: number | undefined,
  offsetMs?: number,
) => Date

// Types for for formatting
export type FormattingTokenDefinitions = Record<
  string,
  (sourceDate: EsDay, formatStr?: string) => string
>

// Type for defining multiple values in add, subtract
export type UnitsObjectTypeAddSub = {
  years?: number
  quarters?: number
  months?: number
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
}

// Type for defining multiple values in set
export type UnitsObjectTypeSet = {
  year?: number
  quarter?: number
  month?: number
  week?: number
  day?: number // day-of-week
  date?: number // day-of-month
  hour?: number
  minute?: number
  second?: number
  millisecond?: number
}

// Types for using multiple values in parsing with esday(objectValue)
export type ParsingObjectShort = {
  y?: number | string
  M?: number | string
  d?: number | string // day-of-month
  D?: number | string // day-of-month
  h?: number | string
  m?: number | string
  s?: number | string
  ms?: number | string
}
export type ParsingObjectLong = {
  year?: number | string
  month?: number | string
  day?: number | string // day-of-month
  date?: number | string // day-of-month
  hour?: number | string
  minute?: number | string
  second?: number | string
  millisecond?: number | string
}
export type ParsingObjectPlurals = {
  years?: number | string
  months?: number | string
  days?: number | string // day-of-month
  dates?: number | string // day-of-month
  hours?: number | string
  minutes?: number | string
  seconds?: number | string
  milliseconds?: number | string
}
export type ParsingObject = ParsingObjectShort | ParsingObjectLong | ParsingObjectPlurals
