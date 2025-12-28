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

import type { EsDay, EsDayPlugin } from 'esday'
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
const enParseFormat = 'M/D/YYYY, h:mm:ss A'

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

  // TODO refactor variable names
  // find the right offset a given local time. The o input is our guess, which determines which
  // offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
  // https://github.com/moment/luxon/blob/master/src/datetime.js#L76
  const fixOffset = (localTS: number, offsetNow: number, tz: string) => {
    // Our UTC time is just a guess because our offset is just a guess
    let utcGuess = localTS - offsetNow * 60 * 1000
    // Test whether the zone matches the offset for this ts
    const offsetThen = tzOffset(utcGuess, tz)
    // If so, offset didn't change and we're done
    if (offsetNow === offsetThen) {
      return [utcGuess, offsetNow]
    }
    // If not, change the ts by the difference in the offset
    utcGuess -= (offsetThen - offsetNow) * 60 * 1000
    // If that gives us the local time we want, we're done
    const o3 = tzOffset(utcGuess, tz)
    if (offsetThen === o3) {
      return [utcGuess, offsetThen]
    }
    // If it's different, we're in a hole time.
    // The offset has changed, but the we don't adjust the time
    return [localTS - Math.min(offsetThen, o3) * 60 * 1000, Math.max(offsetThen, o3)]
  }

  dayClass.prototype.tz = function (timezone = defaultTimezone, keepLocalTime = false) {
    const oldOffset = this.utcOffset()
    const date = this.toDate()
    const target = date.toLocaleString('en-US', { timeZone: timezone })
    const diff = Math.round(
      (date.valueOf() - esdayFactory(target, enParseFormat).valueOf()) / 1000 / 60,
    )
    const offset = -Math.round(date.getTimezoneOffset()) - diff
    const isUTC = offset === 0
    let ins: EsDay

    if (isUTC) {
      // if utcOffset is 0, turn it to UTC mode
      ins = this.utcOffset(0, keepLocalTime)
    } else {
      ins = esdayFactory(target)
      if (this.locale !== undefined) {
        ins = ins.locale(this.locale())
      }
      ins['$set'](C.MS, [this.millisecond()]).utcOffset(offset, true)
      if (keepLocalTime) {
        const newOffset = ins.utcOffset()
        ins = ins.add(oldOffset - newOffset, C.MIN)
      }
    }
    ins['$conf'].timezone = timezone
    return ins
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
  esdayFactory.tz = (input: string, timezoneStr?: string) => {
    const timezone = timezoneStr || defaultTimezone
    const parsedInput = esdayFactory(input)
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
    const parsedAsUtc = esdayFactory.utc(input).valueOf()
    const [targetTimestamp, targetOffset] = fixOffset(parsedAsUtc, offsetParsedInput, timezone)
    const result = esdayFactory(targetTimestamp).utcOffset(targetOffset)
    result['$conf'].timezone = timezone
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
