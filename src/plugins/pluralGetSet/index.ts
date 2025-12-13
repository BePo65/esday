/**
 * PluralGetSet plugin
 *
 * This plugin adds plural getter & setter APIs to EsDay:
 * .milliseconds(), .seconds(), .minutes(), .hours(), .days(),
 * .dates(), .months() and .years()
 */

import type { EsDayPlugin } from 'esday'

declare module 'esday' {
  interface EsDay {
    years: (() => number) & ((year: number, month?: number, date?: number) => EsDay)
    months: (() => number) & ((month: number, date?: number) => EsDay)
    dates: (() => number) & ((date: number) => EsDay) // day of month
    days: (() => number) & ((day: number) => EsDay) // day of week
    hours: (() => number) & ((hours: number, min?: number, sec?: number, ms?: number) => EsDay)
    minutes: (() => number) & ((min: number, sec?: number, ms?: number) => EsDay)
    seconds: (() => number) & ((sec: number, ms?: number) => EsDay)
    milliseconds: (() => number) & ((ms: number) => EsDay)
  }
}

const pluralGetSetPlugin: EsDayPlugin<{}> = (_, dayClass, _dayFactory) => {
  const proto = dayClass.prototype

  proto.years = proto.year
  proto.months = proto.month
  proto.dates = proto.date
  proto.days = proto.day
  proto.hours = proto.hour
  proto.minutes = proto.minute
  proto.seconds = proto.second
  proto.milliseconds = proto.millisecond
}

export default pluralGetSetPlugin
