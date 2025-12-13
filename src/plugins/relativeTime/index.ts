/**
 * RelativeTime adds .from .to .fromNow .toNow APIs to formats date to relative time strings (e.g. 3 hours ago).
 * RelativeTime adds also relativeTimeThreshold and relativeTimeRounding getter / setter
 *
 * Time from now .fromNow(withoutSuffix?: boolean)
 * Returns the string of relative time from now.
 *
 * Time from X .from(compared: Dayjs, withoutSuffix?: boolean)
 * Returns the string of relative time from X.
 *
 * Time to now .toNow(withoutSuffix?: boolean)
 * Returns the string of relative time to now.
 *
 * Time to X .to(compared: Dayjs, withoutSuffix?: boolean)
 * Returns the string of relative time to X.
 */
import type { DateType, EsDay, EsDayPlugin, UnitTypeAddSub } from 'esday'
import { C, createInstanceFromExist } from '~/common'
import type { Locale, RelativeTimeKeys } from '../locale'

declare module 'esday' {
  interface EsDay {
    to: (referenceDate: DateType, withoutSuffix?: boolean) => string
    from: (referenceDate: DateType, withoutSuffix?: boolean) => string
    toNow: (withoutSuffix?: boolean) => string
    fromNow: (withoutSuffix?: boolean) => string
  }

  interface EsDayFactory {
    relativeTimeThreshold(unit: ThresholdRelativeTimeKeys): boolean | number | null
    relativeTimeThreshold(unit: ThresholdRelativeTimeKeys, limit: number | null): boolean
    relativeTimeRounding(): RelativeTimeRound
    relativeTimeRounding(roundingFunction: RelativeTimeRound): boolean
    formatDifference: (
      diffAsUnits: DiffAsUnit,
      withoutSuffix: boolean,
      locale: Locale,
      thresholds?: ThresholdRelativeTime,
    ) => string
    defaultThresholds: () => ThresholdRelativeTime
    globalThresholds: () => ThresholdRelativeTime
  }
}

export type ThresholdRelativeTime = {
  ss?: number | null
  s?: number | null
  m?: number | null
  h?: number | null
  d?: number | null
  w?: number | null
  M?: number | null
}

export type DiffAsUnit = {
  s: number
  m: number
  h: number
  d: number
  w: number
  M: number
  y: number
}
export type ThresholdRelativeTimeKeys = keyof ThresholdRelativeTime

export type RelativeTimeRound = (value: number) => number

const relativeTimePlugin: EsDayPlugin<{
  thresholds?: ThresholdRelativeTime
  rounding?: (valueToRound: number) => number
}> = (options, dayClass, dayFactory) => {
  // Use relativeTime definition from locales/en.ts as default
  const defaultRelativeTimeDef: Locale['relativeTime'] = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    w: 'a week',
    ww: '%d weeks',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  }

  const defaultThresholds: ThresholdRelativeTime = {
    ss: 44,
    s: 45,
    m: 45,
    h: 22,
    d: 26,
    w: null,
    M: 11,
  }
  dayFactory.defaultThresholds = () => structuredClone(defaultThresholds)

  const thresholds: ThresholdRelativeTime = options.thresholds ?? defaultThresholds
  dayFactory.globalThresholds = () => structuredClone(thresholds)

  /**
   * Format object containing a time difference as human readable length of time.
   * @param diffAsUnits - object containing the time difference calculated for different units
   * @param withoutSuffix - format without 'in ---' or '... ago'
   * @param locale - locale to use to get format definitions for relativeTime
   * @param thresholds - thresholds, which define when a unit is considered a minute, an hour and so on
   * @returns difference formatted as human string (e.g. 5 days ago)
   */
  function formatDifference(
    diffAsUnits: DiffAsUnit,
    withoutSuffix: boolean,
    locale: Locale,
    thresholds: ThresholdRelativeTime = defaultThresholds,
  ): string {
    const isFuture = diffAsUnits.s > 0
    const relativeTimeDef = locale?.relativeTime ?? defaultRelativeTimeDef
    let out = ''
    let selectedKeyAndValue: { key: string; value: number | undefined }

    // test all thresholds until we find the first threshold matching the
    // difference between the instance and the reference date
    selectedKeyAndValue = { key: '', value: 0 }
    if (rounding(abs(diffAsUnits.s)) <= (thresholds.ss ?? 0)) {
      selectedKeyAndValue.key = 's'
      selectedKeyAndValue.value = rounding(abs(diffAsUnits.s))
    } else if (rounding(abs(diffAsUnits.s)) < (thresholds.s ?? -1)) {
      selectedKeyAndValue.key = 'ss'
      selectedKeyAndValue.value = rounding(abs(diffAsUnits.s))
    } else if (rounding(abs(diffAsUnits.m)) <= 1) {
      selectedKeyAndValue.key = 'm'
      selectedKeyAndValue.value = undefined
    } else if (rounding(abs(diffAsUnits.m)) < (thresholds.m ?? -1)) {
      selectedKeyAndValue.key = 'mm'
      selectedKeyAndValue.value = rounding(abs(diffAsUnits.m))
    } else if (rounding(abs(diffAsUnits.h)) <= 1) {
      selectedKeyAndValue.key = 'h'
      selectedKeyAndValue.value = undefined
    } else if (rounding(abs(diffAsUnits.h)) < (thresholds.h ?? -1)) {
      selectedKeyAndValue.key = 'hh'
      selectedKeyAndValue.value = rounding(abs(diffAsUnits.h))
    } else if (rounding(abs(diffAsUnits.d)) <= 1) {
      selectedKeyAndValue.key = 'd'
      selectedKeyAndValue.value = undefined
    } else if (rounding(abs(diffAsUnits.d)) < (thresholds.d ?? -1)) {
      selectedKeyAndValue.key = 'dd'
      selectedKeyAndValue.value = rounding(abs(diffAsUnits.d))
    } else if (thresholds.w !== null && rounding(abs(diffAsUnits.w)) <= 1) {
      selectedKeyAndValue.key = 'w'
      selectedKeyAndValue.value = undefined
    } else if (thresholds.w !== null && rounding(abs(diffAsUnits.w)) < (thresholds.w ?? -1)) {
      selectedKeyAndValue.key = 'ww'
      selectedKeyAndValue.value = rounding(abs(diffAsUnits.w))
    } else if (rounding(abs(diffAsUnits.M)) <= 1) {
      selectedKeyAndValue.key = 'M'
      selectedKeyAndValue.value = undefined
    } else if (rounding(abs(diffAsUnits.M)) < (thresholds.M ?? -1)) {
      selectedKeyAndValue.key = 'MM'
      selectedKeyAndValue.value = rounding(abs(diffAsUnits.M))
    } else if (rounding(abs(diffAsUnits.y)) <= 1) {
      selectedKeyAndValue.key = 'y'
      selectedKeyAndValue.value = undefined
    } else {
      selectedKeyAndValue.key = 'yy'
      selectedKeyAndValue.value = rounding(abs(diffAsUnits.y))
    }

    const format = relativeTimeDef[selectedKeyAndValue.key as RelativeTimeKeys]
    const outputDiffAbs = rounding(abs(selectedKeyAndValue.value ?? 1))
    out =
      typeof format === 'string'
        ? format.replace('%d', `${outputDiffAbs}`)
        : format(
            outputDiffAbs,
            withoutSuffix,
            selectedKeyAndValue.key as RelativeTimeKeys,
            isFuture,
          )

    // transform the result to locale form
    const postFormat = locale?.postFormat
    if (postFormat) {
      out = postFormat(out)
    }

    if (withoutSuffix) return out

    const suffix = isFuture ? relativeTimeDef.future : relativeTimeDef.past
    return typeof suffix === 'function'
      ? suffix(out, withoutSuffix, isFuture ? 'future' : 'past', isFuture)
      : suffix.replace('%s', out)
  }
  dayFactory.formatDifference = formatDifference

  const proto = dayClass.prototype
  const abs = Math.abs
  let rounding: RelativeTimeRound = options.rounding ?? Math.round

  /**
   * Set a threshold for relative time strings
   * @param unit - unit of threshold to get / set (ss,s,m,h,d,w,M)
   * @param limit - new threshold value
   * @returns false=unknown unit; true=threshold successfully set; current threshold (number | null)
   */
  // @ts-expect-error function is compatible with its overload
  dayFactory.relativeTimeThreshold = (unit: keyof ThresholdRelativeTime, limit?: number | null) => {
    // Is unit valid?
    if (thresholds[unit] === undefined) {
      return false
    }

    // Getter
    if (limit === undefined) {
      return thresholds[unit]
    }

    // Setter
    thresholds[unit] = limit
    if (unit === 's') {
      if (limit !== null) {
        thresholds.ss = limit - 1
      } else {
        thresholds.ss = null
      }
    }

    return true
  }

  /**
   * Gets or sets the rounding function for relative time strings
   * @param roundingFunction - rounding function
   * @returns - the rounding function (getter) or true=rounding function successfully set
   */
  // @ts-expect-error function is compatible with its overload
  dayFactory.relativeTimeRounding = (roundingFunction?: RelativeTimeRound) => {
    if (roundingFunction === undefined) {
      return rounding
    }

    if (typeof roundingFunction === 'function') {
      rounding = roundingFunction
      return true
    }

    return false
  }

  /**
   * Calculate the difference between instance and referenceDate in given units
   * as fractional value for 'from' and 'to'
   * @param instance - date to calculate difference for
   * @param referenceDate - base date for calculating the difference
   * @param unit - unit of the difference
   * @param isFrom - difference for 'from'?
   * @returns difference as float
   */
  function differenceInUnits(
    instance: EsDay,
    referenceDate: EsDay,
    unit: UnitTypeAddSub,
    isFrom: boolean,
  ): number {
    return isFrom
      ? referenceDate.diff(instance, unit, true)
      : instance.diff(referenceDate, unit, true)
  }

  /**
   * Format instance date as relative to reference date as
   * human readable length of time.
   * @param reference - date the output relates to
   * @param withoutSuffix - format without 'in ---' or '... ago'
   * @param this - date to format
   * @param isFrom - format as 'from' or 'fromNow'
   * @returns difference formatted as human string (e.g. 5 days ago)
   */
  function fromToBase(
    this: EsDay,
    reference: DateType,
    withoutSuffix: boolean,
    isFrom: boolean,
  ): string {
    const referenceDate = dayFactory(reference)
    if (!(this.isValid() && referenceDate.isValid())) {
      return C.INVALID_DATE_STRING
    }

    const locale = this.localeObject?.()
    const diffAsUnits: DiffAsUnit = {
      s: differenceInUnits(this, referenceDate, 's', isFrom),
      m: differenceInUnits(this, referenceDate, 'm', isFrom),
      h: differenceInUnits(this, referenceDate, 'h', isFrom),
      d: differenceInUnits(this, referenceDate, 'd', isFrom),
      w: differenceInUnits(this, referenceDate, 'w', isFrom),
      M: differenceInUnits(this, referenceDate, 'M', isFrom),
      y: differenceInUnits(this, referenceDate, 'y', isFrom),
    }

    return formatDifference(diffAsUnits, withoutSuffix, locale, thresholds)
  }

  proto.to = function (this: EsDay, referenceDate: DateType, withoutSuffix?: boolean) {
    return fromToBase.call(this, referenceDate, withoutSuffix ?? false, true)
  }

  proto.from = function (this: EsDay, referenceDate: DateType, withoutSuffix?: boolean) {
    return fromToBase.call(this, referenceDate, withoutSuffix ?? false, false)
  }

  proto.toNow = function (this: EsDay, withoutSuffix?: boolean) {
    const now = createInstanceFromExist(new Date(), this)
    return this.to(now, withoutSuffix)
  }

  proto.fromNow = function (this: EsDay, withoutSuffix?: boolean) {
    const now = createInstanceFromExist(new Date(), this)
    return this.from(now, withoutSuffix)
  }
}

export default relativeTimePlugin
