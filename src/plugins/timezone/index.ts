/**
 * timezone plugin
 *
 * This plugin adds the 'tz' method to the EsDay class.
 * This plugin adds the 'tz' method/object to the esday class with the methods 'setDefault',  'getDefault' and 'guess'.
 *
 * This plugin adds the formatting tokens 'z' and 'Z' to EsDay.
 *
 * This plugin requires the 'utc' plugin.
 * When parsing with a locale then the 'advancedParse' plugin, the 'localizedParse' plugin
 *   and at least one registered locale.
 * This plugin can handle the 'locale' plugin.
 *
 * esday parameters in '$conf' defined in timezone plugin:
 *   timezone    name of the timezone of this instance
 */

import {
  type DateType,
  type EsDay,
  type EsDayPlugin,
  esday,
  type FormattingTokenDefinitions,
  type SimpleType,
  type UnitsObjectTypeAddSub,
  type UnitsObjectTypeSet,
  type UnitTypeAddSub,
  type UnitTypeGetSet,
} from 'esday'
import { C, isEmptyObject, isObject, normalizeUnitWithPlurals } from '~/common'
import { getDateTimeFormat, getTimezoneNameFormat } from './timezone-util'

const UNIT_ARRAY_MAP = {
  year: 0,
  month: 1,
  date: 2,
  hour: 3,
  minute: 4,
  second: 5,
} as const

// maximum time difference for DST - 2h
const maxDstDiff = 2 * 60 * 60 * 1000

const typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5,
} as Record<string, number>

// parsing without a format string requires at least a complete date as input string ('1111-11-11')
const matchContainsOffset = /^(\d{4})[-/](\d{1,2})[-/](\d{0,2}).*(([+-]\d\d:?(\d\d)?)$|Z$)/

/**
 * Generate formatted date parts for a given timestamp and timezone.
 *
 * This function creates a Date object from the given timestamp,
 * retrieves a cached or new Intl.DateTimeFormat instance using
 * the provided timezone and returns the formatted parts
 * (year, month, day-of-month, hour, minute, second, weekday)
 *
 * @param timestamp - The timestamp in milliseconds since the Unix epoch.
 * @param timezone - The IANA timezone identifier (e.g., "Asia/Shanghai").
 * @returns An array of formatted date parts.
 */
function makeFormatPartsDateTime(timestamp: number, timezone: string): Intl.DateTimeFormatPart[] {
  const dtf = getDateTimeFormat(timezone)
  const date = new Date(timestamp)
  return dtf.formatToParts(date)
}

/**
 * Do we have to convert parsed instance to another timezone?
 * @param input - input value to be parsed by plugin timezone
 * @returns true: result of parsing of input value must be converted to timezone
 */
function convertRequired(input: DateType) {
  const requiresObjectSupport =
    // biome-ignore lint/suspicious/noExplicitAny: any is required for instanceOf operator
    isObject(input) && !((input as any) instanceof Date) && input !== null && !isEmptyObject(input)
  return typeof input !== 'string' && !Array.isArray(input) && !requiresObjectSupport
}

/**
 * Convert en-US short weekday names to a number using values like Date.getDay() does.
 * @param shortWeekdayName - short weekday name (in locale en-US)
 * @returns - number indicating the weekday (0=Sunday, 1=Monday, ...)
 */
function weekdayNameToNumber(shortWeekdayName: string) {
  switch (shortWeekdayName) {
    case 'Sun':
      return 0
    case 'Mon':
      return 1
    case 'Tue':
      return 2
    case 'Wed':
      return 3
    case 'Thu':
      return 4
    case 'Fri':
      return 5
    case 'Sat':
      return 6
    /* istanbul ignore next line */
    default:
      return -1
  }
}

/**
 * Get the date components (year, month, day ...) of the given timestamp,
 * if formatted in the given timezone.
 * The function returns an array with the values for
 * [year, month, day-of-month, hour, minute, second, weekday].
 * 'month' is 1..12; 'day-of-month' is 1..31, 'weekday' is 0..6.
 * @param timestamp - timestamp to convert
 * @param timezone - timezone to use for formatting
 * @returns array of numbers with the date components of the timestamp in the timezone
 */
function timestampToDateTimeComponents(timestamp: number, timezone: string) {
  const formatResult = makeFormatPartsDateTime(timestamp, timezone)
  const filled = []
  let weekdayNumber = -1
  for (let i = 0; i < formatResult.length; i += 1) {
    const { type, value } = formatResult[i]

    if (type === 'weekday') {
      weekdayNumber = weekdayNameToNumber(value)
      continue
    }

    const pos = typeToPos[type]

    if (pos >= 0) {
      filled[pos] = Number.parseInt(value, 10)
    }

    filled[6] = weekdayNumber
  }

  return filled
}

/**
 * Get the formatted timezone name of the given timestamp, if formatted in
 * the given timezone.
 * The function returns the short name of the timezone using the given locale.
 * 'month' is 1..12; 'day-of-month' is 1..31, 'weekday' is 0..6.
 * @param timestamp - timestamp to convert
 * @param timezone - timezone to use for conversion
 * @param timezone - timezone to use for conversion
 * @returns array of numbers with the date components of the timestamp in the timezone
 */
function timestampToTimezoneName(timestamp: number, timezone: string, locale: string) {
  const dtf = getTimezoneNameFormat(timezone, locale)
  const date = new Date(timestamp)
  const formatResult = dtf.formatToParts(date)
  let timezoneNameShort = timezone

  // formatResult is [month, separator, year, separator, timeZoneName]
  /* istanbul ignore else -- @preserve */
  if (formatResult.length >= 4 && formatResult[4].type === 'timeZoneName') {
    timezoneNameShort = formatResult[4].value
  }

  return timezoneNameShort
}

/**
 * Calculate the new basic values for year, month etc. when using the "set" method.
 * These values must be adjusted to the current timezone.
 * @param dateComponents - array with the components of the formatted timestamp (year, month, ...)
 * @param currentMs - milliseconds of the current timestamp (0..999)
 * @param unit - normalized unit to set
 * @param values - value to set (or values, if applicable e.g. for year)
 * @returns literal object with year, month etc. after setting the new value(s)
 */
function calculateBaseComponentsForSet(
  dateComponents: number[],
  currentMs: number,
  unit: string,
  values: number[],
) {
  let year = dateComponents[0]
  let month = dateComponents[1] - 1
  let day = dateComponents[2]
  let hour = dateComponents[3]
  let minute = dateComponents[4]
  let second = dateComponents[5]
  let ms = currentMs

  const mainValue = values[0]

  if (unit === C.YEAR) {
    year = mainValue
    if (values.length > 1) month = values[1]
    if (values.length > 2) day = values[2]
  } else if (unit === C.MONTH) {
    month = mainValue
    if (values.length > 1) day = values[1]
  } else if (unit === C.DAY) {
    const currentWeekday = dateComponents[6]
    day += mainValue - currentWeekday
  } else if (unit === C.DAY_OF_MONTH) {
    day = mainValue
  } else if (unit === C.HOUR) {
    hour = mainValue
  } else if (unit === C.MIN) {
    minute = mainValue
  } else if (unit === C.SECOND) {
    second = mainValue
  } else {
    /* istanbul ignore else -- @preserve */
    if (unit === C.MS) ms = mainValue
  }

  if (unit === C.YEAR || unit === C.MONTH) {
    // Clamping day-of-month to last day of month (see https://momentjs.com/docs/#/get-set/month/)
    const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
    if (day > lastDay) day = lastDay
  }

  // Handle multiple values for setting hour, minute or second
  let valuesIndex = 1
  if (unit === C.HOUR && values.length > valuesIndex) minute = values[valuesIndex++]
  if ((unit === C.HOUR || unit === C.MIN) && values.length > valuesIndex)
    second = values[valuesIndex++]
  if ((unit === C.HOUR || unit === C.MIN || unit === C.SECOND) && values.length > valuesIndex)
    ms = values[valuesIndex++]

  return { year, month, day, hour, minute, second, ms }
}

/**
 * Gets the timezone of the given date formatted in the short form (e.g. 'PST')
 * @param sourceDate - date to format the timezone for
 * @returns the short form of the timezone of the given sourceDate
 */
function formatTimezoneShort(sourceDate: EsDay) {
  const timezone = sourceDate.tz()

  // use locale of esday instance or global locale (or default value of parameter)
  const localeName = sourceDate.locale?.() ?? esday.locale?.()
  const timezoneNameShort = timestampToTimezoneName(sourceDate.valueOf(), timezone, localeName)

  return timezoneNameShort
}

const timezonePLugin: EsDayPlugin<{}> = (_, dayClass, esdayFactory) => {
  const noTimezone = '' // used for methods that do not allow undefined as a timezone
  let defaultTimezone: string | undefined

  /**
   * Get timezone offset for timestamp in given timezone
   * @param timestamp - timestamp to use
   * @param timezone - timezone to calculate offset for
   * @returns utc offset for timestamp in given timezone
   */
  const tzOffset = (timestamp: number, timezone: string) => {
    const filled = timestampToDateTimeComponents(timestamp, timezone)
    const utcString = `${filled[0]}-${filled[1]}-${filled[2]} ${filled[3]}:${filled[4]}:${filled[5]}:000`
    const utcTs = esdayFactory.utc(utcString).valueOf()
    let timestampAsEpoch = timestamp.valueOf()
    const msOfTimestamp = timestampAsEpoch % 1000
    timestampAsEpoch -= msOfTimestamp

    return (utcTs - timestampAsEpoch) / (60 * 1000)
  }

  /**
   * Move to the earlier date in an DST overlap, if we are in an overlap. Otherwise return input date.
   * The return value is an literal object in the form of {timestampFixed, tzOffsetFixed, isInOverlap}.
   * @param timestampOriginal - timestamp to be fixed
   * @param tzOffsetOriginal - tzOffset of timestampOriginal
   * @param timezone - timezone to use
   * @returns literal object containing fixed date (or original date, if we are not in an overlap)
   */
  const fixOverlap = (timestampOriginal: number, tzOffsetOriginal: number, timezone: string) => {
    let timestampFixed = timestampOriginal
    let tzOffsetFixed = tzOffsetOriginal
    let isInOverlap = false

    const tzOffsetPreDst = tzOffset(timestampOriginal - maxDstDiff, timezone)
    // tzOffsetPreDst === tzOffsetOriginal -> not around an overlap or gap
    // tzOffsetPreDst  <  tzOffsetOriginal -> around a gap (e.g. -5h -> -4h or +1 -> +2)
    // tzOffsetPreDst  >  tzOffsetOriginal -> around an overlap (e.g. -4h -> -5h or +2 -> +1)

    if (tzOffsetPreDst > tzOffsetOriginal) {
      // we moved over an overlap;
      // get difference of timezone offsets between DST and "standard time" (is > 0)
      const diffOffsets = tzOffsetPreDst - tzOffsetOriginal
      timestampFixed = timestampOriginal - diffOffsets * 60 * 1000
      tzOffsetFixed = tzOffset(timestampFixed, timezone)

      // maybe we were not in an overlap
      if (tzOffsetFixed === tzOffsetOriginal) {
        // maybe we were not in an overlap
        timestampFixed = timestampOriginal
        tzOffsetFixed = tzOffsetOriginal
      } else {
        isInOverlap = true
      }
    }

    return { timestampFixed, tzOffsetFixed, isInOverlap }
  }

  /**
   * Change the timestamp and timezone offset of a timestamp to change the timezone while keeping the time value.
   * @param timestampOriginal  - timestamp to fix the offset for, if necessary
   * @param tzOffsetSource - tzOffset of the originalTimestamp in the source timezone
   * @param tzOffsetTarget - tzOffset of the originalTimestamp in the target timezone
   * @param tzTarget - timezone to use
   * @returns array with updated timestamp and fixed offset
   */
  const fixOffsetConvert = (
    timestampOriginal: number,
    tzOffsetSource: number,
    tzOffsetTarget: number,
    tzTarget: string,
  ) => {
    // convert timestamp to the target timezone - 1st guess
    const timestampGuess1 = timestampOriginal - (tzOffsetTarget - tzOffsetSource) * 60 * 1000
    const tzOffsetGuess1 = tzOffset(timestampGuess1, tzTarget)

    if (tzOffsetGuess1 === tzOffsetTarget) {
      // we are not in a DST gap, but perhaps in an overlap
      // (later instance of time instead of earlier one)
      const { timestampFixed, tzOffsetFixed } = fixOverlap(
        timestampGuess1,
        tzOffsetGuess1,
        tzTarget,
      )
      return [timestampFixed, tzOffsetFixed]
    }

    // 2nd guess - try to compensate error in 1st guess
    const timestampGuess2 = timestampGuess1 - (tzOffsetGuess1 - tzOffsetTarget) * 60 * 1000
    const tzOffsetGuess2 = tzOffset(timestampGuess2, tzTarget)

    if (tzOffsetGuess2 === tzOffsetGuess1) {
      // we are before the start or after the end of a gap or overlap
      return [timestampGuess2, tzOffsetGuess2]
    } else {
      if (tzOffsetGuess1 < tzOffsetTarget) {
        // we converted into the gap (the target is in the west of the source)
        return [timestampGuess2, tzOffsetGuess2]
      } else {
        // we converted into the gap (the target is in the east of the source)
        return [timestampGuess1, tzOffsetGuess1]
      }
    }
  }

  // @ts-expect-error "implement tz method"
  esdayFactory.tz = (
    input: DateType,
    ...others: (SimpleType | string[] | { [key: string]: SimpleType })[]
  ) => {
    // get timezone from parameters (always is last parameter)
    let timezone: string | undefined = defaultTimezone
    if (others.length > 0) {
      timezone = others.pop() as string
    }

    const parsedInput = esdayFactory.utc(input, ...others)
    if (!parsedInput.isValid()) {
      return parsedInput
    }

    const offsetParsedInput = tzOffset(parsedInput.valueOf(), timezone ?? noTimezone)
    if (convertRequired(input) || (typeof input === 'string' && matchContainsOffset.test(input))) {
      // 'input' contains an offset (e.g. +08:00) or is not of type string / array
      const result = parsedInput.tz(timezone)
      return result
    }

    const [targetTimestamp, targetOffset] = fixOffsetConvert(
      parsedInput.valueOf(),
      0,
      offsetParsedInput,
      timezone ?? noTimezone,
    )

    const result = esdayFactory.utc(targetTimestamp, ...others)
    result['$conf'].utcOffset = targetOffset
    result['$conf'].localOffset = result.toDate().getTimezoneOffset()
    result['$conf'].utc = targetOffset === 0

    if (result['$conf'].localeName !== undefined && parsedInput['$conf'].localeName !== undefined) {
      result['$conf'].localeName = parsedInput['$conf'].localeName
    }

    result['$conf'].timezone = timezone
    return result
  }

  esdayFactory.tz.guess = () => Intl.DateTimeFormat().resolvedOptions().timeZone

  esdayFactory.tz.setDefault = (timezone: string | undefined) => {
    defaultTimezone = timezone
  }
  esdayFactory.tz.getDefault = () => {
    return defaultTimezone
  }

  const proto = dayClass.prototype

  // @ts-expect-error "implement tz method"
  proto.tz = function (timezone?: string, keepLocalTime?: boolean) {
    // Getter for timezone of EsDay instance
    if (timezone === undefined) {
      return this['$conf'].timezone
    }

    // Setter - convert EsDay instance to timezone
    const result = this.clone()
    const tzOffsetTarget = tzOffset(this.valueOf(), timezone)
    const localOffset = this.toDate().getTimezoneOffset()

    result['$conf'].localOffset = localOffset
    result['$conf'].utcOffset = tzOffsetTarget
    result['$conf'].utc = tzOffsetTarget === 0
    result['$conf'].timezone = timezone

    if (keepLocalTime) {
      const timestampSource = result.valueOf()

      // if source is in UTC mode then tzOffsetSource = 0
      let tzOffsetSource = 0
      if (!this['$conf'].utc) {
        tzOffsetSource = this['$conf'].timezone ? Number(this['$conf'].utcOffset) : -1 * localOffset
      }

      const [timestampFixed, tzOffsetFixed] = fixOffsetConvert(
        timestampSource,
        tzOffsetSource,
        tzOffsetTarget,
        timezone,
      )

      result['$conf'].utcOffset = tzOffsetFixed
      result['$conf'].utc = tzOffsetFixed === 0

      if (timestampSource !== timestampFixed) {
        result.$d = new Date(timestampFixed)
      }
    }

    return result
  }

  const oldValueOf = proto.valueOf
  proto.valueOf = function () {
    if (this['$conf']?.timezone) {
      return this.$d.valueOf()
    }
    return oldValueOf.call(this)
  }

  const oldGet = proto.get
  proto.get = function (unit: UnitTypeGetSet) {
    const normalizedUnit = normalizeUnitWithPlurals(unit)

    if (
      normalizedUnit === C.QUARTER ||
      normalizedUnit === C.WEEK ||
      normalizedUnit === C.ISOWEEK ||
      this['$conf']?.utc
    ) {
      // Units 'quarter', 'weeks' and 'isoWeeks' are implemented in the corresponding plugins
      return oldGet.call(this, unit)
    }

    if (this['$conf']?.timezone) {
      const timezone = this['$conf'].timezone as string
      const dateComponents = timestampToDateTimeComponents(this.valueOf(), timezone)

      if (normalizedUnit === C.MS) {
        return this['$d'].getUTCMilliseconds()
      } else if (normalizedUnit === C.MONTH) {
        // Change 1..12 to 0..11
        return dateComponents[1] - 1
      } else if (normalizedUnit === C.DAY) {
        // weekday must  be evaluated in current timezone
        return dateComponents[6]
      } else {
        const unitAsPosition = UNIT_ARRAY_MAP[normalizedUnit]
        return dateComponents[unitAsPosition]
      }
    }

    return oldGet.call(this, unit)
  }

  const old$set = proto['$set']
  proto['$set'] = function (unit: UnitTypeGetSet | UnitsObjectTypeSet, values: number[]) {
    if (isObject(unit)) {
      // UnitsObjectTypeSet is implemented in plugin ObjectSupport
      // therefore we ignore the request here.
      // 'this' is already a clone of the original esday object (see EsDay.set)
      return old$set.call(this, unit, values)
    }

    const timezone = this['$conf']?.timezone as string | undefined
    if (!timezone) {
      return old$set.call(this, unit, values)
    }

    const normalizedUnit = normalizeUnitWithPlurals(unit)
    const dateComponents = timestampToDateTimeComponents(this.valueOf(), timezone)
    const currentMs = this.valueOf() % 1000

    const { year, month, day, hour, minute, second, ms } = calculateBaseComponentsForSet(
      dateComponents,
      currentMs,
      normalizedUnit,
      values,
    )

    const utcAsLocal = Date.UTC(year, month, day, hour, minute, second, ms)

    // fix tzOffset
    const [timestampFixed, tzOffsetFixed] = fixOffsetConvert(
      utcAsLocal,
      0,
      tzOffset(utcAsLocal, timezone),
      timezone,
    )

    this.$d = new Date(timestampFixed)
    this['$conf'].utcOffset = tzOffsetFixed
    this['$conf'].localOffset = this.$d.getTimezoneOffset()
    this['$conf'].utc = tzOffsetFixed === 0

    return this
  }

  const oldStartOf = dayClass.prototype.startOf
  proto.startOf = function (units) {
    if (!this['$conf'] || !this['$conf']['timezone']) {
      return oldStartOf.call(this, units)
    }

    const withoutTz = esdayFactory(this.format('YYYY-MM-DD HH:mm:ss:SSS'))
    const startOfWithoutTz = oldStartOf.call(withoutTz, units)
    return startOfWithoutTz.tz(this['$conf']['timezone'] as string, true)
  }

  const oldEndOf = dayClass.prototype.endOf
  proto.endOf = function (units) {
    if (!this['$conf'] || !this['$conf']['timezone']) {
      return oldEndOf.call(this, units)
    }

    const withoutTz = esdayFactory(this.format('YYYY-MM-DD HH:mm:ss:SSS'))
    const endOfWithoutTz = oldEndOf.call(withoutTz, units)
    return endOfWithoutTz.tz(this['$conf']['timezone'] as string, true)
  }

  const oldAdd = proto.add
  proto.add = function (value: number | UnitsObjectTypeAddSub, unit?: UnitTypeAddSub) {
    if (isObject(value) || unit === undefined) {
      // using UnitsObjectTypeAddSub is implemented in plugin ObjectSupport
      // therefore we ignore the request here.
      // @ts-expect-error it's compatible with the overload
      return oldAdd.call(this, value, unit)
    }

    // @ts-expect-error always requires 3 args, as  UnitsObjectTypeAddSub is covered by plugin ObjectSupport
    const newValue = oldAdd.call(this, value, unit)

    if (!this['$conf'].timezone) {
      return newValue
    }

    const timezone = this['$conf']['timezone'] as string
    const timestamp = newValue.valueOf()
    const tzOldOffset = tzOffset(timestamp, timezone)
    const normalizedUnit = normalizeUnitWithPlurals(unit)
    const timeUnits: string[] = [C.HOUR, C.MIN, C.SECOND, C.MS]
    const { isInOverlap } = fixOverlap(timestamp, tzOldOffset, timezone)

    // moment.js does not fix time in overlap when adding time units
    if (timeUnits.includes(normalizedUnit) && isInOverlap) {
      newValue['$conf'].utcOffset = tzOldOffset
      newValue['$conf'].utc = tzOldOffset === 0
      return newValue
    }

    // fix tzOffset after adding value
    const [timestampFixed, tzOffsetFixed] = fixOffsetConvert(
      timestamp,
      tzOldOffset,
      tzOffset(timestamp, timezone),
      timezone,
    )

    newValue.$d = new Date(timestampFixed)
    newValue['$conf'].utcOffset = tzOffsetFixed
    newValue['$conf'].localOffset = newValue.$d.getTimezoneOffset()
    newValue['$conf'].utc = tzOffsetFixed === 0

    return newValue
  }

  const oldSubtract = proto.subtract
  proto.subtract = function (value: number | UnitsObjectTypeAddSub, unit?: UnitTypeAddSub) {
    if (isObject(value) || unit === undefined) {
      // using UnitsObjectTypeAddSub is implemented in plugin ObjectSupport
      // therefore we ignore the request here.
      // @ts-expect-error it's compatible with the overload
      return oldSubtract.call(this, value, unit)
    }

    if (this['$conf'].timezone) {
      // @ts-expect-error always requires 3 args, as  UnitsObjectTypeAddSub is covered by plugin ObjectSupport
      return proto.add.call(this, -value, unit)
    }

    // @ts-expect-error it's compatible with the overload
    return oldSubtract.call(this, value, unit)
  }

  // add new parsing tokens to existing list of parsing tokens
  const additionalTokens: FormattingTokenDefinitions = {
    z: formatTimezoneShort,
    zz: formatTimezoneShort,
  }
  esdayFactory.addFormatTokenDefinitions(additionalTokens)
}

export default timezonePLugin
