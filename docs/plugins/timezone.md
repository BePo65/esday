# Timezone

Timezone adds methods to EsDay and esday to handle dates with timezones.

A DateType parameter can be parsed to an EsDay instance using `the tz` method and a given timezone. This method can also use a format string (optionally in strict mode) and a locale.

An EsDay instance can be converted to a specific timezone using the `tz` method . If the optional parameter `keepLocalTime` is true, then the local time is not changed (changing the point in Universal Time).

The `tz` method without parameters returns the timezone of the EsDay instance.

The `guess` method returns the (estimated) timezone of the runtime.

Using `getDefault` returns the default timezone of the runtime.
Using `setDefault` the default timezone of the runtime can be changed.

This plugin also adds the formatting tokens `z` and `zz` to EsDay; both return the abbreviated timezone name (e.g. `EST`, `PDT`, `CET`).

This plugin handles all cases of Daylight Savings Time (DST).

Usually DST advances the UTC offset of a timezone by e.g. 1h in spring leaving a 'gap' in the time (e.g. there is no time '01:30', when DST increases UTC offset by 1h at 01:00 in spring - '00:59:59-05:00' -> '02:00:00+04:00').

The UTC offset of a timezone is then reset to the 'standard value' in autumn creating an 'overlap' in the time (e.g. '01:30' exists twice, when DST resets UTC offset by 1h at 02:00 in autumn - '01:59:59-04:00' -> '01:00:00+05:00').

## Usage

### Dependencies
Timezone requires the `utc` plugin.

This plugin can handle the 'locale' plugin.

When parsing with a locale then the 'advancedParse' plugin, the 'localizedParse' plugin and at least one registered locale are required.

### Method signatures
Methods added to EsDay instances:
```signature
esday().tz(): string | undefined
esday().tz(timezone: string, keepLocalTime?: boolean): EsDay
```

| parameter     | description                   |
| ------------- | ----------------------------- |
| timezone      | timezone to use               |
| keepLocalTime | keep the existing time of day |

Methods added to esday:
```signature
esday.tz(date: DateType, timezone?: string): EsDay
esday.tz(date: DateType, format: string, timezone?: string): EsDay
esday.tz(date: DateType, format: string, strict: boolean, timezone?: string): EsDay
esday.tz(date: DateType, format: string, locale: string, timezone?: string): EsDay
esday.tz(date: DateType, format: string, locale: string, strict: boolean, timezone?: string): EsDay
esday.tz.guess(): string
esday.tz.setDefault(timezone?: string): void
esday.tz.getDefault(): string | undefined
```

| parameter     | description                              |
| ------------- | ---------------------------------------- |
| date          | element to parse as a date/time          |
| timezone      | timezone to use                          |
| format        | format string(s) used for parsing `date` |
| strict        | date string must match format exactly    |
| locale        | name of the locale to use (e.g. 'en-US') |

### Parsing tokens
| **Token** | **Example**   | **Description**                            |
| --------- | ------------- | ------------------------------------------ |
| z         | PST           | Short form of the timezone (same as 'zz')  |
| zz        | GMT+2         | Short form of the timezone (same as 'zz')  |

`z` and `zz`: both format the timezone in a "short" Version.

The formatting uses the javascript 'Intl' namespace object. The exact output of this formatting token depends on the available locale, as Intl only gives a specific string for the locale of the currently used runtime. E.g. for a runtime with the locale "de" the timezone "Europe/Berlin" is formatted as "MEZ" or "MESZ", while "Europe/Paris", which is in the same timezone, is formatted as "UTC+1" or "UTC+2". Besides this Intl returns always 'beautiful' timezone names for the timezone of continental USA (e.g. "PST" or "PDT").

## Differences to Day.js

This plugin solves the issues that exist in DayJs for dates with timezones using Daylight Savings Time (DST).

## Differences to Moment.js

- This plugin solves the issues that exist in Moment-Timezone for dates with timezones using Daylight Savings Time (DST).
- Using the default timezone makes moment(dateValue) use this timezone, but esday(dateValue) always uses the local timezone, even if esday.tz.setDefault is used; only esday.tz(dateValue) (without second parameter) uses the default timezone.
- This plugin does not support parsing alphabetic time zones in RFC 2822 date time format (see RFC 2822 specification), as these are outdated in Moment-Timezone.
- This plugin formats the UTC offset as numbers (+08:00) not as 'Z', even for timezone offset '0', as GMT is not UTC (see [timeanddate](https://www.timeanddate.com/time/gmt-utc-time.html)).
- For certain dates in or around "spring-forward-gap" or "fall-back-overlap" moment-timezone returns wrong results. EsDay follows the documentation of moment-timezone (see "https://momentjs.com/timezone/docs/#/using-timezones/parsing-ambiguous-inputs/").
- Parsing an array with undefined values returns a date with the lowest possible number for the corresponding date element (e.g. '1', if the 3rd element is 'undefined).
- Setting year/month or month using the `set` operator: if the new month does not have enough days to keep the current day of month (e.g. 31), day is clamped to the end of the target month (see [moment.js](https://momentjs.com/docs/#/manipulating/set/).
- Setting year, month or day-of-month using the `set` operator will keep the time part of the date by adjusting the UTC offset if required by the DST rules of the timezone used.

## Examples
```typescript
import { esday } from 'esday'
import utcPlugin from 'esday/plugins/utc'
import timezonePlugin from 'esday/plugins/timezone'

esday.extend(utcPlugin).extend(timezonePlugin)

esday.tz('2025-01-06 12:00', 'America/New_York')
// Returns esday for '2025-01-06T12:00:00-05:00' in America/New_York

esday('2025-01-06 12:00').tz('America/New_York')
// Converts existing esday object to America/New_York;
// the result depends on the timezone of the used runtime

esday.tz('2025-01-06 12:00', 'YYYY-MM-DD HH:mm', 'America/New_York')
// Parses with format in specific timezone

esday.tz('2025-01-06 12:00', 'America/New_York').tz()
// Returns 'America/New_York'

esday.tz.guess()
// Returns the estimated timezone of the user, e.g. "Europe/Berlin"

esday.tz.setDefault('America/New_York')
// sets the default timezone to America/New_York

esday.tz('2025-01-06 12:00')
// Returns esday for '2025-01-06T12:00:00-05:00' in America/New_York

esday.tz.setDefault()
// Unsets default timezone

esday.tz('2025-01-06 12:00', 'America/New_York').format('z')
// Returns 'EST' (depending on date and timezone)

esday.tz('2025-01-06 12:00', 'America/New_York').format('zz')
// Returns 'EST' (depending on date and timezone)

esday.tz('2025-01-06 12:00', 'America/New_York').tz('Europe/Berlin', true)
// Returns esday for '2025-01-06T12:00:00+01:00' in Europe/Berlin
// (keeping the local time 12:00, but changing the instant in time)
```
