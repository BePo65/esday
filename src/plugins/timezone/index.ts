/**
 * timezone plugin
 *
 * This plugin adds the 'tz' method to the EsDay class.
 * This plugin adds the 'tz' method/object to the esday class with the methods 'setDefault',  'getDefault' and 'guess'.
 *
 * This plugin adds 'quarter' and the formatting tokens 'z' and 'Z' to EsDay.
 *
 * This plugin requires the 'utc' plugin.
 * This plugin can handle the 'locale' plugin.
 *
 * esday parameters in '$conf' defined in timezone plugin:
 *   timezone    name of the timezone of this instance
 */

import type { DateType, EsDay, EsDayPlugin, SimpleType } from 'esday'
import { C } from '~/common'
import { getDateTimeFormat } from './getDateTimeFormat'

/**
 * Generate formatted date parts for a given timestamp and timezone.
 *
 * This function creates a Date object from the given timestamp,
 * retrieves a cached or new Intl.DateTimeFormat instance using
 * the provided timezone and returns the formatted parts.
 *
 * @param timestamp - The timestamp in milliseconds since the Unix epoch.
 * @param timezone - The IANA timezone identifier (e.g., "Asia/Shanghai").
 * @returns An array of formatted date parts.
 */
const makeFormatParts = (timestamp: number, timezone: string): Intl.DateTimeFormatPart[] => {
  const options = {}
  const date = new Date(timestamp)
  const dtf = getDateTimeFormat(timezone, options)
  return dtf.formatToParts(date)
}

const typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5,
} as Record<string, number>

// parsing without a format string requires at least a complete date as input string ('1111-11-11')
const matchOffset = /^(\d{4})[-/](\d{1,2})[-/](\d{0,2}).*(([+-]\d\d:?(\d\d)?)$|Z$)/

const timezonePLugin: EsDayPlugin<{}> = (_, dayClass, esdayFactory) => {
  let defaultTimezone = ''

  const tzOffset = (timestamp: number, timezone: string) => {
    const formatResult = makeFormatParts(timestamp, timezone)
    const filled = []
    for (let i = 0; i < formatResult.length; i += 1) {
      const { type, value } = formatResult[i]
      const pos = typeToPos[type]

      if (pos >= 0) {
        filled[pos] = Number.parseInt(value, 10)
      }
    }
    const hour = filled[3]
    // we need midnight to be 00:xx:yy
    /* istanbul ignore next */
    const fixedHour = hour === 24 ? 0 : hour
    const utcString = `${filled[0]}-${filled[1]}-${filled[2]} ${fixedHour}:${filled[4]}:${filled[5]}:000`
    const utcTs = esdayFactory.utc(utcString).valueOf()
    let timestampAsEpoch = +timestamp
    const msOfTimestamp = timestampAsEpoch % 1000
    timestampAsEpoch -= msOfTimestamp
    return (utcTs - timestampAsEpoch) / (60 * 1000)
  }

  /**
   * Find the right offset a given local time.
   * The parameter originalOffset is our guess, which determines which
   * offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
   * Based on dayjs and https://github.com/moment/luxon/blob/master/src/datetime.js#L76
   * @param originalTimestamp - timestamp to fix the offset if necessary
   * @param originalOffset - tzOffset of the originalTimestamp
   * @param tz - timezone to use
   * @returns array with updated timestamp and fixed offset
   */
  const fixOffset = (originalTimestamp: number, originalOffset: number, tz: string) => {
    // Our UTC time is just a guess because our offset is just a guess
    let utcGuess = originalTimestamp - originalOffset * 60 * 1000

    // Test whether the zone matches the offset for this ts
    const offsetGuess1 = tzOffset(utcGuess, tz)

    // If offset didn't change, then we're done
    if (originalOffset === offsetGuess1) {
      return [utcGuess, originalOffset]
    }

    // If offset of guess is different, then change the timestamp by the differences of the offsets
    utcGuess -= (offsetGuess1 - originalOffset) * 60 * 1000

    // If that gives us the local time we want, we're done
    const offsetGuess2 = tzOffset(utcGuess, tz)
    if (offsetGuess1 === offsetGuess2) {
      return [utcGuess, offsetGuess1]
    }

    // If it's still different, we're in a DST gap and we don't adjust the time
    return [
      originalTimestamp - Math.min(offsetGuess1, offsetGuess2) * 60 * 1000,
      Math.max(offsetGuess1, offsetGuess2),
    ]
  }

  // @ts-expect-error "implement tz method"
  dayClass.prototype.tz = function (timezone?: string, keepLocalTime?: boolean) {
    // Getter for timezone of EsDay instance
    if (timezone === undefined) {
      return this['$conf'].timezone
    }

    // convert EsDay instance to timezone
    const oldOffset = this.utcOffset()
    const date = this.toDate()
    const target = date.toLocaleString('en-US', { timeZone: timezone })

    // 'esdayFactory(target)' works without plugin AdvancedParse and without available locale 'en-US',
    // as the spec for 'Date()' does not require support for the format produced by toLocaleString().
    // However, major engines all try to support toLocaleString("en-US") format.
    const diff = Math.round((date.valueOf() - esdayFactory(target).valueOf()) / 1000 / 60)
    const offset = -Math.round(date.getTimezoneOffset()) - diff
    const isUTC = offset === 0
    let result: EsDay

    if (isUTC) {
      // if utcOffset is 0, turn it to UTC mode
      result = this.utcOffset(0, keepLocalTime ?? false)
    } else {
      result = esdayFactory(target)
      if (this.locale !== undefined) {
        result = result.locale(this.locale())
      }
      result['$set'](C.MS, [this.millisecond()]).utcOffset(offset, true)
      if (keepLocalTime) {
        const newOffset = result.utcOffset()
        result = result.add(oldOffset - newOffset, C.MIN)
      }
    }
    result['$conf'].timezone = timezone
    return result
  }

  const oldStartOf = dayClass.prototype.startOf
  dayClass.prototype.startOf = function (units) {
    if (!this['$conf'] || !this['$conf']['$timezone']) {
      return oldStartOf.call(this, units)
    }

    const withoutTz = esdayFactory(this.format('YYYY-MM-DD HH:mm:ss:SSS')).locale(this.locale())
    const startOfWithoutTz = oldStartOf.call(withoutTz, units)
    return startOfWithoutTz.tz(this['$conf']['$timezone'] as string, true)
  }
  const oldEndOf = dayClass.prototype.endOf
  dayClass.prototype.endOf = function (units) {
    if (!this['$conf'] || !this['$conf']['$timezone']) {
      return oldEndOf.call(this, units)
    }

    const withoutTz = esdayFactory(this.format('YYYY-MM-DD HH:mm:ss:SSS')).locale(this.locale())
    const endOfWithoutTz = oldEndOf.call(withoutTz, units)
    return endOfWithoutTz.tz(this['$conf']['$timezone'] as string, true)
  }

  // @ts-expect-error "implement tz method"
  esdayFactory.tz = (
    input: DateType,
    ...others: (SimpleType | string[] | { [key: string]: SimpleType })[]
  ) => {
    let originalTimezone: string | undefined
    let timezone = defaultTimezone
    if (others.length > 0) {
      // last parameter is timezone
      timezone = others.pop() as string
      originalTimezone = timezone
    }

    const parsedInput = esdayFactory(input, ...others)
    if (!parsedInput.isValid()) {
      return parsedInput
    }
    const offsetParsedInput = tzOffset(parsedInput.valueOf(), timezone)
    if (typeof input !== 'string' || matchOffset.test(input)) {
      const result = parsedInput.tz(timezone)
      // moment treats GMT as UTC
      const isGmtOrUtc = ['GMT', 'UTC'].includes(timezone.toUpperCase())
      if (parsedInput['$conf']['utc'] === undefined && !isGmtOrUtc) {
        delete result['$conf']['utc']
      } else {
        result['$conf']['utc'] = true
      }
      return result
    }
    const parsedAsUtc = esdayFactory.utc(input, ...others).valueOf()
    const [targetTimestamp, targetOffset] = fixOffset(parsedAsUtc, offsetParsedInput, timezone)
    const result = esdayFactory(targetTimestamp, ...others).utcOffset(targetOffset)
    result['$conf'].timezone = originalTimezone
    return result
  }

  esdayFactory.tz.guess = () => Intl.DateTimeFormat().resolvedOptions().timeZone

  esdayFactory.tz.setDefault = (timezone: string = '') => {
    defaultTimezone = timezone
  }
  esdayFactory.tz.getDefault = () => {
    return defaultTimezone
  }
}

export default timezonePLugin
