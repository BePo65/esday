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

import type {
  DateType,
  EsDay,
  EsDayPlugin,
  SimpleType,
  UnitsObjectTypeAddSub,
  UnitTypeAddSub,
} from 'esday'
import { C, isObject } from '~/common'
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

    // Does 'input' contain an offset (e.g. +08:00)?
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

    if (result['$conf'].localeName !== undefined && parsedInput['$conf'].localeName !== undefined) {
      result['$conf'].localeName = parsedInput['$conf'].localeName
    }

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

    // If that gives us the local time we want, we're done (fixes fall back overlap)
    const offsetGuess2 = tzOffset(utcGuess, tz)
    if (offsetGuess1 === offsetGuess2) {
      return [utcGuess, offsetGuess1]
    }

    // If it's still different, we're in a DST spring forward gap and we don't adjust the time
    return [
      originalTimestamp - Math.min(offsetGuess1, offsetGuess2) * 60 * 1000,
      Math.max(offsetGuess1, offsetGuess2),
    ]
  }

  const proto = dayClass.prototype

  // @ts-expect-error "implement tz method"
  proto.tz = function (timezone?: string, keepLocalTime?: boolean) {
    // Getter for timezone of EsDay instance
    if (timezone === undefined) {
      return this['$conf'].timezone
    }

    // convert EsDay instance to timezone
    const oldOffset = this.utcOffset()
    const thisDate = this.toDate()
    const target = thisDate.toLocaleString('en-US', { timeZone: timezone })

    // 'esdayFactory(target)' works without plugin AdvancedParse and without available locale 'en-US',
    // as the spec for 'Date()' does not require support for the format produced by toLocaleString().
    // However, major engines all try to support toLocaleString("en-US") format.
    const targetDate = new Date(target)
    const diff = Math.round((thisDate.valueOf() - targetDate.valueOf()) / 1000 / 60)
    const offset = -Math.round(thisDate.getTimezoneOffset()) - diff
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
      return this.clone()
    }

    if (this['$conf'].timezone) {
      const timezone = this['$conf']['timezone'] as string

      // TODO replace variable names
      // TODO use .utcOffset instead of ['$conf'].utcOffset?
      // @ts-expect-error always requires 3 args, as  UnitsObjectTypeAddSub is covered by plugin ObjectSupport
      const z = oldAdd.call(this, value, unit)
      const zTzOffset1 = tzOffset(z.valueOf(), timezone)
      const zUtcOffset1 = z.utcOffset()
      const timestamp1 = z.valueOf()

      if (zTzOffset1 !== zUtcOffset1) {
        // new date is behind a DST gap or overlap or in an overlap or gap;
        // we have to fix the date
        const timestamp2 = timestamp1 - (zTzOffset1 - zUtcOffset1) * 60 * 1000
        const zTzOffset2 = tzOffset(timestamp2, timezone)

        if (zTzOffset2 === zTzOffset1) {
          // new date is behind a DST gap or overlap or in an overlap
          // TODO use "+ ()" or "- Math.abs()"?
          const timestamp3 = timestamp1 + (zTzOffset1 - zUtcOffset1) * 60 * 1000
          const zTzOffset3 = tzOffset(timestamp3, timezone)

          // use new timezone offset as utcOffset and therefore move valueOf too
          z['$conf'].utcOffset = zTzOffset2
          z['$conf'].utc = zTzOffset2 === 0

          if (zTzOffset3 !== zTzOffset2) {
            // new date is in a DST overlap;
            // use original timezone offset as utcOffset without moving valueOf
            z['$d'].setUTCMinutes(z['$d'].getUTCMinutes() - (zTzOffset3 - zTzOffset2))
          } else if (!this['$conf'].utc && z['$conf'].utc) {
            // switched to utc in DST overlap : don't change valueOf
            z['$d'].setUTCMinutes(z['$d'].getUTCMinutes() + zUtcOffset1)
            // TODO is this solved by .utc()?
            delete z['$conf'].utcOffset
            delete z['$conf'].localOffset
          } else if (this['$conf'].utc && !z['$conf'].utc) {
            // switched out of utc in DST overlap : don't change valueOf
            const localOffset = z.toDate().getTimezoneOffset()
            // TODO is this solved by .utc()?
            z['$conf'].utcOffset = zTzOffset3
            z['$conf'].localOffset = localOffset
            z['$d'].setUTCMinutes(z['$d'].getUTCMinutes() + localOffset)
          }
        } else {
          // new date is in a DST gap
          z['$conf'].utc = zTzOffset1 === 0
          if (this['$conf'].utc && !z['$conf'].utc) {
            // TODO when switching out of utc we need $conf.localOffset too
            // TODO is this solved by .utc()?
            z['$conf'].utcOffset = zTzOffset1
            const localOffset = z.toDate().getTimezoneOffset()
            z['$conf'].localOffset = localOffset
            z['$d'].setUTCMinutes(z['$d'].getUTCMinutes() + (zTzOffset1 + localOffset))
          } else {
            // use original timezone offset as utcOffset without moving valueOf
            z['$d'].setUTCMinutes(z['$d'].getUTCMinutes() - (zTzOffset2 - zTzOffset1))
            z['$conf'].utcOffset = zTzOffset1
          }
        }
      }

      return z
    }

    // @ts-expect-error always requires 3 args, as  UnitsObjectTypeAddSub is covered by plugin ObjectSupport
    return oldAdd.call(this, value, unit)
  }
}

export default timezonePLugin
