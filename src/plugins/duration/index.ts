/** = 0:
 * Duration plugin
 *
 * This plugin adds 'duration' and 'isDuration' to the esday factory.
 *
 * To use the humanize method or any of the locale methods, the plugin Locale,
 * a loaded locale and the plugin RelativeTime are required.
 */

import { type EsDayPlugin, esday } from 'esday'
import { isObject, isUndefined, normalizeUnitWithPlurals, padStart } from '~/common'
import { INVALID_DATE_STRING } from '~/common/constants'
import {
  type LongUnitPlurals,
  normalizeUnitWithPluralsToPlural,
  type UnitDates,
  type UnitIsoWeeks,
  type UnitTypePlurals,
} from '~/common/units'
import type { Locale } from '../locale'
import type { DiffAsUnit, ThresholdRelativeTime } from '../relativeTime'

declare module 'esday' {
  interface EsDayFactory {
    duration(): Duration
    duration(input: string): Duration
    duration(input: string, unit: UnitTypeDuration): Duration
    duration(input: number): Duration
    duration(input: number, unit: UnitTypeDuration): Duration
    duration(input: Duration): Duration
    duration(input: object): Duration
    duration(input: string | number | object | Duration | null, unit?: UnitTypeDuration): Duration
    // biome-ignore lint/suspicious/noExplicitAny: we want to test any type
    isDuration(d?: any): d is Duration
  }
}

export type UnitTypeDuration = Exclude<UnitTypePlurals, UnitIsoWeeks | UnitDates>

// Type for defining multiple values in Duration class
export type UnitsObjectTypeDuration = {
  years?: number | string
  quarters?: number | string
  months?: number | string
  weeks?: number | string
  days?: number | string
  hours?: number | string
  minutes?: number | string
  seconds?: number | string
  milliseconds?: number | string
}

export type DurationBase = {
  milliseconds: number
  days: number
  months: number
}
export interface Duration {
  clone(): Duration
  humanize(): string
  humanize(withSuffix: boolean): string
  humanize(thresholds: ThresholdRelativeTime): string
  humanize(withSuffix: boolean, thresholds: ThresholdRelativeTime): string
  as(unit: UnitTypeDuration): number
  get(unit: UnitTypeDuration): number
  milliseconds(): number
  asMilliseconds(): number
  seconds(): number
  asSeconds(): number
  minutes(): number
  asMinutes(): number
  hours(): number
  asHours(): number
  days(): number
  asDays(): number
  weeks(): number
  asWeeks(): number
  months(): number
  asMonths(): number
  quarters(): number
  asQuarters(): number
  years(): number
  asYears(): number
  add(input: number | UnitsObjectTypeDuration | Duration, unit?: UnitTypeDuration): Duration
  subtract(input: number | UnitsObjectTypeDuration | Duration, unit?: UnitTypeDuration): Duration
  locale(): string
  locale(locale: string): Duration
  localeObject(): Locale
  valueOf(): number
  durationBase(): DurationBase
  format(formatStr?: string): string
  toString(): string
  toISOString(): string
  toJSON(): string
  asStringifiedJSON(): string
  isValid(): boolean
}

type DurationDetailsKeys = Exclude<LongUnitPlurals, UnitIsoWeeks | UnitDates>
type DurationDetails = {
  years: number
  quarters: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

class DurationImpl implements Duration {
  readonly #defaultLocale = 'en'

  #localeName: string
  #detailsCache: DurationDetails = {
    years: 0,
    quarters: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  }

  // Contains the time part of the duration
  #timeAsMs = 0

  // Because of add / subtract treats 24 hours as different from a
  // day when working around DST, we need to store the day separately
  #days = 0

  // It is impossible to translate months into days without knowing
  // which months you are are talking about, so we have to store
  // it separately.
  #months = 0

  #isValid: boolean

  constructor(
    value?: string | number | object | Duration | null,
    unit?: UnitTypeDuration,
    localeName?: string,
  ) {
    const numbersOnlyRegex = /^\d+$/gs
    const iso8601Regex =
      /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/

    const aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/

    this.#localeName = localeName ?? this.#defaultLocale
    const normalizedUnit = normalizeUnitWithPluralsToPlural(
      unit as UnitTypePlurals,
    ) as DurationDetailsKeys

    const parsedInputRaw: Partial<DurationDetails> = {}
    const parsedInput: DurationDetails = {
      years: 0,
      quarters: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }

    if (value === undefined || value === null) {
      parsedInputRaw.milliseconds = 0
    } else if (value instanceof DurationImpl) {
      const baseValues = value.durationBase()
      parsedInputRaw.milliseconds = baseValues.milliseconds
      parsedInputRaw.days = baseValues.days
      parsedInputRaw.months = baseValues.months
    } else if (isObject(value)) {
      // normalizeInputObject also removes all additional keys!
      value = this.normalizeInputObject(value)

      // create Duration from object with unit values (h, m, s ...)
      const keys = Object.keys(value)
      for (const stringKey of keys) {
        const key = stringKey as keyof UnitsObjectTypeDuration
        parsedInputRaw[key as keyof DurationDetails] = +value[key as keyof typeof value]
      }
    } else if (typeof value === 'number') {
      if (isUndefined(normalizedUnit)) {
        parsedInputRaw.milliseconds = value
      } else {
        parsedInputRaw[this.toKeyOfDurationCache(normalizedUnit)] = value
      }
    } else if (typeof value === 'string') {
      let parsedIso: RegExpExecArray | null
      let parsedAsp: RegExpExecArray | null
      if (numbersOnlyRegex.test(value)) {
        if (isUndefined(normalizedUnit)) {
          parsedInputRaw.milliseconds = +value
        } else {
          parsedInputRaw[this.toKeyOfDurationCache(normalizedUnit)] = +value
        }
        // biome-ignore lint/suspicious/noAssignInExpressions: "avoid unnecessary evaluation of regex"
      } else if ((parsedIso = iso8601Regex.exec(value))) {
        // this is an ISO 8601 string
        const sign = parsedIso[1] === '-' ? -1 : 1
        const durationDetailsKeys = [
          'years',
          'months',
          'weeks',
          'days',
          'hours',
          'minutes',
          'seconds',
          'milliseconds',
        ]

        const durationParts = parsedIso.slice(2)
        for (let i = 0; i < durationParts.length; ++i) {
          // moment.js handles comma and dot in numbers as decimal separators
          if (
            !isUndefined(durationParts[i]) &&
            Number.isFinite(Number(durationParts[i].replace(',', '.')))
          ) {
            parsedInputRaw[durationDetailsKeys[i] as keyof DurationDetails] =
              Number(durationParts[i].replace(',', '.')) * sign
          }
        }

        // biome-ignore lint/suspicious/noAssignInExpressions: "avoid unnecessary evaluation of regex"
      } else if ((parsedAsp = aspNetRegex.exec(value))) {
        // this is a ASP.NET style time span string
        const sign = parsedAsp[1] === '-' ? -1 : 1

        const durationParts = parsedAsp.slice(2).map((value, index) => {
          let valueAsNumber = 0
          if (!isUndefined(value) && Number.isFinite(Number(value))) {
            if (index !== 4) {
              valueAsNumber = this.absFloor(Number(value)) * sign
            } else {
              // the millisecond decimal point is included in the match
              valueAsNumber = Math.round(Number(value) * 1000) * sign
            }
          }

          return valueAsNumber
        })

        ;[
          parsedInputRaw.days,
          parsedInputRaw.hours,
          parsedInputRaw.minutes,
          parsedInputRaw.seconds,
          parsedInputRaw.milliseconds,
        ] = durationParts
      }
    } else {
      // make result the same as moment.js
      parsedInputRaw.milliseconds = 1
    }

    this.#isValid = this.isDurationValid(parsedInputRaw)
    Object.assign(parsedInput, parsedInputRaw)
    this.setTimeDaysMonths(parsedInput)
    this.setDetailsCache()
  }

  isValid() {
    return this.#isValid
  }

  clone() {
    return new DurationImpl(this.durationBase(), undefined, this.#localeName)
  }

  /**
   * Format Duration as ISO string.
   * For ISO strings we do not use the normal bubbling rules:
   *  * milliseconds bubble up until they become hours
   *  * days do not bubble at all
   *  * months bubble up until they become years
   * This is because there is no context-free conversion between
   * hours and days (think of clock changes) and also not between
   * days and months (28-31 days per month)
   * @returns Duration formatted as ISO string
   */
  toISOString() {
    if (!this.isValid()) {
      return INVALID_DATE_STRING
    }

    let seconds = Math.abs(this.#timeAsMs) / 1000
    const days = Math.abs(this.#days)
    let months = Math.abs(this.#months)
    const total = this.asSeconds()

    if (!total) {
      return 'P0D'
    }

    // 3600 seconds -> 60 minutes -> 1 hour
    let minutes = this.absFloor(seconds / 60)
    const hours = this.absFloor(minutes / 60)
    seconds %= 60
    minutes %= 60

    // 12 months -> 1 year
    const years = this.absFloor(months / 12)
    months %= 12

    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    const s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : ''

    const totalSign = total < 0 ? '-' : ''
    const ymSign = this.sign(this.#months) !== this.sign(total) ? '-' : ''
    const daysSign = this.sign(this.#days) !== this.sign(total) ? '-' : ''
    const hmsSign = this.sign(this.#timeAsMs) !== this.sign(total) ? '-' : ''

    const result =
      totalSign +
      'P' +
      (years ? `${ymSign}${years}Y` : '') +
      (months ? `${ymSign}${months}M` : '') +
      (days ? `${daysSign}${days}D` : '') +
      (hours || minutes || seconds ? 'T' : '') +
      (hours ? `${hmsSign}${hours}H` : '') +
      (minutes ? `${hmsSign}${minutes}M` : '') +
      (seconds ? `${hmsSign}${s}S` : '')

    return result
  }

  toString() {
    return this.toISOString()
  }

  /**
   * Generate a value used by JSON.stringify to serialize Duration object
   * @returns same string as toISOString()
   */
  toJSON() {
    return this.toISOString()
  }

  /**
   * Stringify this instance as JSON.
   * Unit 'quarters' and 'weeks' are ignored, as they are only values derived from days / months / years.
   * @returns a string representation of this instance
   */
  asStringifiedJSON() {
    const { quarters, weeks, ...durationProperties } = this.#detailsCache
    return JSON.stringify(durationProperties)
  }

  valueOf() {
    return this.asMilliseconds()
  }

  /**
   * Format the duration as a comprehensive string.
   * @param formatStr - format to use for formatting
   * @returns formatted duration
   */
  format(formatStr?: string) {
    const REGEX_FORMAT = /\[([^\]]+)]|YYYY|Y{1,2}|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS/g
    const str = formatStr || 'YYYY-MM-DDTHH:mm:ss.SSS'
    const matches = {
      Y: this.#detailsCache.years,
      YY: padStart(this.#detailsCache.years, 2, '0'),
      YYYY: padStart(this.#detailsCache.years, 4, '0'),
      M: this.#detailsCache.months,
      MM: padStart(this.#detailsCache.months, 2, '0'),
      D: this.#detailsCache.days,
      DD: padStart(this.#detailsCache.days, 2, '0'),
      H: this.#detailsCache.hours,
      HH: padStart(this.#detailsCache.hours, 2, '0'),
      m: this.#detailsCache.minutes,
      mm: padStart(this.#detailsCache.minutes, 2, '0'),
      s: this.#detailsCache.seconds,
      ss: padStart(this.#detailsCache.seconds, 2, '0'),
      SSS: padStart(this.#detailsCache.milliseconds, 3, '0'),
    }
    return str.replace(REGEX_FORMAT, (match) => String(matches[match as keyof typeof matches]))
  }

  humanize(): string
  humanize(withSuffix: boolean): string
  humanize(thresholds: ThresholdRelativeTime): string
  humanize(withSuffix: boolean, thresholds: ThresholdRelativeTime): string
  humanize(p1?: boolean | ThresholdRelativeTime, thresholds?: ThresholdRelativeTime) {
    if (!this.isValid()) {
      return INVALID_DATE_STRING
    }

    let withSuffix = false
    if (typeof p1 === 'boolean') {
      withSuffix = p1
    }

    let thresholdsToUse = Object.assign({}, esday.defaultThresholds(), thresholds)
    if (typeof p1 === 'object') {
      thresholdsToUse = Object.assign(thresholdsToUse, p1)
    }

    const locale = esday.getLocale(this.locale())
    const diffAsUnits: DiffAsUnit = {
      s: this.asSeconds(),
      m: this.asMinutes(),
      h: this.asHours(),
      d: this.asDays(),
      w: this.asWeeks(),
      M: this.asMonths(),
      y: this.asYears(),
    }
    return esday.formatDifference(diffAsUnits, !withSuffix, locale, thresholdsToUse)
  }

  add(input: number | UnitsObjectTypeDuration | Duration, unit?: UnitTypeDuration) {
    return this.addDurationImpl(input, unit)
  }

  subtract(input: number | UnitsObjectTypeDuration | Duration, unit?: UnitTypeDuration) {
    return this.addDurationImpl(input, unit, true)
  }

  locale(): string
  locale(locale: string): Duration
  locale(locale?: string) {
    // Getter
    if (isUndefined(locale)) {
      return this.#localeName
    }

    // Setter
    return new DurationImpl(this, undefined, locale) as Duration
  }

  localeObject() {
    return esday.getLocale(this.locale())
  }

  get(unit: UnitTypeDuration) {
    if (this.isValid()) {
      return this.#detailsCache[this.toKeyOfDurationCache(unit)]
    } else {
      return Number.NaN
    }
  }

  /**
   * Gets the duration calculated as 'unit' value
   * @param unit - unit to use to calculate the return value
   * @returns duration as unit
   */
  as(unit: UnitTypeDuration) {
    if (!this.isValid()) {
      return NaN
    }

    let days: number
    let months: number
    const milliseconds = this.#timeAsMs

    const units = normalizeUnitWithPlurals(unit)

    if (units === 'month' || units === 'quarter' || units === 'year') {
      days = this.#days + milliseconds / 864e5
      months = this.#months + this.daysToMonths(days)
      switch (units) {
        case 'month':
          return months
        case 'quarter':
          return months / 3
        case 'year':
          return months / 12
      }
    } else {
      // handle milliseconds separately because of floating point math errors (issue #1867)
      days = this.#days + Math.round(this.monthsToDays(this.#months))
      switch (units) {
        case 'week':
          return days / 7 + milliseconds / 6048e5
        case 'day':
          return days + milliseconds / 864e5
        case 'hour':
          return days * 24 + milliseconds / 36e5
        case 'minute':
          return days * 1440 + milliseconds / 6e4
        case 'second':
          return days * 86400 + milliseconds / 1000
        // Math.floor prevents floating point math errors here
        case 'millisecond':
          return Math.floor(days * 864e5) + milliseconds
        default:
          throw new Error(`Unknown unit ${units}`)
      }
    }
  }

  milliseconds() {
    return this.get('milliseconds')
  }
  asMilliseconds() {
    return this.as('milliseconds')
  }
  seconds() {
    return this.get('seconds')
  }
  asSeconds() {
    return this.as('seconds')
  }
  minutes() {
    return this.get('minutes')
  }
  asMinutes() {
    return this.as('minutes')
  }
  hours() {
    return this.get('hours')
  }
  asHours() {
    return this.as('hours')
  }
  days() {
    return this.get('days')
  }
  asDays() {
    return this.as('days')
  }
  weeks() {
    return this.absFloor(this.days() / 7)
  }
  asWeeks() {
    return this.as('weeks')
  }
  months() {
    return this.get('months')
  }
  asMonths() {
    return this.as('months')
  }
  quarters() {
    return this.get('quarters')
  }
  asQuarters() {
    return this.as('quarters')
  }
  years() {
    return this.get('years')
  }
  asYears() {
    return this.as('years')
  }

  /**
   * Get an object literal with the internal data to recreate a clone of
   * a duration instance (milliseconds, days, months). These values are different
   * from the values returned by e.g. durationInstance.days().
   * @description for use in Duration plugin to generate a Duration object from a Duration object
   * @returns an object literal with the internal data of a duration object
   */
  durationBase() {
    return { milliseconds: this.#timeAsMs, days: this.#days, months: this.#months }
  }

  private absFloor = (number: number) => (number < 0 ? Math.ceil(number) || 0 : Math.floor(number))
  private absCeil = (number: number) => (number < 0 ? Math.floor(number) : Math.ceil(number))

  /**
   * Get sign of number.
   * @returns -1 (number is negative, 0 (number is 0, +1 (number is positive)))
   */
  private sign = (number: number) => Number(number > 0) - Number(number < 0) || +number

  private toKeyOfDurationCache(unit: UnitTypeDuration) {
    const normalizedUnitPlural = normalizeUnitWithPluralsToPlural(unit)
    return normalizedUnitPlural as keyof DurationDetails
  }

  /**
   * Do the given input values represent a valid duration?
   * @param parsedInput - object containing all values found in input string
   * @returns true=input defines a valid duration
   */
  private isDurationValid(parsedInput: Partial<DurationDetails>) {
    const ordering = [
      'years',
      'quarters',
      'months',
      'weeks',
      'days',
      'hours',
      'minutes',
      'seconds',
      'milliseconds',
    ]

    // check for illegal property names in input and values null and NaN
    for (const key in parsedInput) {
      const value = parsedInput[key as keyof DurationDetails]
      if (ordering.indexOf(key) === -1 || value === null || Number.isNaN(value)) {
        return false
      }
    }

    // check for non-integers (only allowed for smallest unit in input string)
    let unitHasDecimal = false
    const orderLen = ordering.length
    for (let i = 0; i < orderLen; ++i) {
      const value = parsedInput[ordering[i] as keyof DurationDetails]
      if (!isUndefined(value)) {
        if (unitHasDecimal) {
          return false // there already was a unit with non-integers
        }
        if (!Number.isInteger(value)) {
          unitHasDecimal = true
        }
      }
    }

    return true
  }

  /**
   * Normalize the keys in the object defining a duration.
   * @param input - object containing duration definition with short, long or plural keys
   * @returns object containing duration definition with plural keys
   */
  private normalizeInputObject(input: object) {
    const normalizedInput = {} as UnitsObjectTypeDuration
    let normalizedProp: DurationDetailsKeys

    for (const prop in input) {
      normalizedProp = normalizeUnitWithPluralsToPlural(
        prop as UnitTypeDuration,
      ) as DurationDetailsKeys
      if (!isUndefined(normalizedProp)) {
        normalizedInput[normalizedProp] = input[prop as keyof typeof input]
      }
    }

    return normalizedInput
  }

  /**
   * Calculate #timeAsMs, #days and #months from parsed input
   */
  private setTimeDaysMonths(parsedInput: DurationDetails) {
    this.#timeAsMs =
      parsedInput.milliseconds +
      parsedInput.seconds * 1_000 +
      parsedInput.minutes * 1_000 * 60 +
      parsedInput.hours * 1_000 * 60 * 60
    //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978

    this.#days = parsedInput.days + parsedInput.weeks * 7
    this.#months = parsedInput.months + parsedInput.quarters * 3 + parsedInput.years * 12
  }

  /**
   * Update cached duration details (seconds, minutes, etc)
   * from #timeAsMs, #days and #months
   */
  private setDetailsCache() {
    // this.#detailsCache.years = this.roundToZero($ms / C.MILLISECONDS_A_YEAR)
    let milliseconds = this.#timeAsMs
    let days = this.#days
    let months = this.#months

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (
      !(
        (milliseconds >= 0 && days >= 0 && months >= 0) ||
        (milliseconds <= 0 && days <= 0 && months <= 0)
      )
    ) {
      milliseconds += this.absCeil(this.monthsToDays(months) + days) * 864e5
      days = 0
      months = 0
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    this.#detailsCache.milliseconds = milliseconds % 1000

    const seconds = this.absFloor(milliseconds / 1000)
    this.#detailsCache.seconds = seconds % 60

    const minutes = this.absFloor(seconds / 60)
    this.#detailsCache.minutes = minutes % 60

    const hours = this.absFloor(minutes / 60)
    this.#detailsCache.hours = hours % 24

    days += this.absFloor(hours / 24)

    // convert days to months
    const monthsFromDays = this.absFloor(this.daysToMonths(days))
    months += monthsFromDays
    days -= this.absCeil(this.monthsToDays(monthsFromDays))

    // 12 months -> 1 year
    const years = this.absFloor(months / 12)
    months %= 12

    this.#detailsCache.days = days
    this.#detailsCache.months = months
    this.#detailsCache.years = years

    // weeks are calculated from #days, as we don't use it
    // as a separate base unit (like time, days, months)
    // used by .get()
    this.#detailsCache.weeks = this.absFloor(days / 7)

    // quarters are calculated from #months, as we don't use it
    // as a separate base unit (like time, days, months)
    // used by .get()
    this.#detailsCache.quarters = this.absFloor(this.#detailsCache.months / 3)
  }

  /**
   * Convert days to months taking into account leap year rules:
   *   400 years have exactly 146097 days (no fractional part left)
   *   400 years have exactly 4800 months (12 months a year)
   * @param days - days to convert to months
   * @returns number of months
   */
  private daysToMonths(days: number) {
    return (days * 4800) / 146097
  }

  private monthsToDays(months: number) {
    // the reverse of daysToMonths
    return (months * 146097) / 4800
  }

  private addDurationImpl(
    value: number | UnitsObjectTypeDuration | Duration,
    unit?: UnitTypeDuration,
    isSubtract?: boolean,
  ) {
    let durationToAdd: Duration
    const direction = isSubtract ? -1 : 1

    if (typeof value === 'number') {
      durationToAdd = new DurationImpl(value, unit, this.locale())
    } else if (value instanceof DurationImpl) {
      durationToAdd = value
    } else {
      durationToAdd = new DurationImpl(value, undefined, this.locale())
    }

    const valuesToAdd = durationToAdd.durationBase()

    const newDurationBase = {
      milliseconds: this.#timeAsMs + direction * valuesToAdd.milliseconds,
      days: this.#days + direction * valuesToAdd.days,
      months: this.#months + direction * valuesToAdd.months,
    }

    return new DurationImpl(newDurationBase, undefined, this.locale())
  }
}

const durationPlugin: EsDayPlugin<{}> = (_, _dayClass, dayFactory) => {
  dayFactory.duration = (
    input?: string | number | object | Duration | null,
    unit?: UnitTypeDuration,
  ) => {
    const locale = dayFactory.locale?.()
    return new DurationImpl(input, unit, locale)
  }

  // biome-ignore lint/suspicious/noExplicitAny: we want to test any type
  dayFactory.isDuration = (d?: any) => {
    return d instanceof DurationImpl
  }
}

export default durationPlugin
