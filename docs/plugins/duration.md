# Duration

Duration extends the `esday` constructor to create a Duration object.

Where an EsDay is defined as a single point in time, a duration is defined as a length of time.

Durations do not have a defined beginning and end date. They are contextless.

A duration is conceptually more similar to '2 hours' than to 'between 2 and 4 pm today'. As such, they are not a good solution to converting between units that depend on context. For example, a year can be defined as 366 days, 365 days, 365.25 days, 12 months, or 52 weeks. Trying to convert years to days makes no sense without context (which year, which month etc.). It is much better to use EsDay.diff for calculating days or years between two EsDays than to use Durations.

Durations are immutable.

## Content

- [Dependencies](#dependencies)
- [Create a duration](#create-a-duration)
- [Clone a duration](#clone-a-duration)
- [Get a part of a duration](#get-a-part-of-a-duration)
- [Get a duration as unit](#get-a-duration-as-unit)
- [Humanize a duration](#humanize-a-duration)
- [Locale of a duration](#locale-of-a-duration)
- [Add / Subtract a duration](#add--subtract-a-duration)
- [Format a duration](#format-a-duration)
- [Inspect](#inspect)

## Dependencies

To use the Duration humanize method or any of the Duration locale methods, the plugin Locale, a loaded locale and the plugin RelativeTime are required.

[&#8593; Goto top](#duration)

## Create a duration

Create a duration with a given length of time.

```signature
esday.duration(): Duration
esday.duration(input: string): Duration
esday.duration(input: string, unit: UnitTypeDuration): Duration
esday.duration(input: number): Duration
esday.duration(input: number, unit: UnitTypeDuration): Duration
esday.duration(input: Duration): Duration
esday.duration(input: object): Duration
```

### Parameters

| parameters               | description                                               |
| ------------------------ | --------------------------------------------------------- |
| ---                      | create a duration of 0ms                                  |
| string                   | create a duration of given time in milliseconds           |
| string                   | create a duration of given ISO 8601 string                |
| string                   | create a duration of given ASP.NET style time span string |
| string, UnitTypeDuration | create a duration of given time in given units            |
| number                   | create a duration of given time in milliseconds           |
| number, UnitTypeDuration | create a duration of given time in given units            |
| Duration                 | create a duration from the given duration                 |
| object                   | create a duration from the given duration                 |

### Types

**UnitTypeDuration**

| Short | Long	        | Plural	       |
| ----- | ------------- | -------------- |
| 'y'   | 'year'        | 'years'        |
| 'Q'   | 'quarter'     | 'quarters'     |
| 'M'   | 'month'       | 'months'       |
| 'w'   | 'week'        | 'weeks'        |
| 'd'   | 'day'         | 'days'         |
| 'h'   | 'hour'        | 'hours'        |
| 'm'   | 'minute'      | 'minutes'      |
| 's'   | 'second'      | 'seconds'      |
| 'ms'  | 'millisecond' | 'milliseconds' |

The ASP.NET style time span format is an hour, minute, second string separated by colons like 23:59:59.
The number of days can be prefixed with a dot separator like so 7.23:59:59 or with a space as separator.
Partial seconds are supported as well 23:59:59.999.

The object used for defining a duration uses the UnitTypeDuration values as keys.

### Examples

```typescript
import { esday } from 'esday'
import durationPlugin, { type UnitTypeDuration } from '~/plugins/duration'

esday.extend(durationPlugin)

esday.duration()
// Returns duration object for milliseconds

esday.duration(123)
// Returns duration object for 123 milliseconds

esday.duration(5, 'h')
// Returns duration object for 5 hours

esday.duration('P7Y6MT3H')
// Returns duration object for 7 years, 6 months, 3 hours

esday.duration('7 26:45:25')
// Returns duration object for 7 days, 26 hours, 45 minutes 25 seconds

esday.duration({ y: 6, M: 2 })
// Returns duration object for 6 years, 2 months

esday.duration(Number.NaN).isValid()
// Returns false
```

[&#8593; Goto top](#duration)

## Clone a duration

Create a clone of a duration.

```signature
esday.duration().clone(): Duration
```

### Example

```typescript
import { esday } from 'esday'
import durationPlugin, { type UnitTypeDuration } from '~/plugins/duration'

esday.extend(durationPlugin)

esday.duration(2, 'days').clone()
// Returns a copy of the original duration object
```

[&#8593; Goto top](#duration)

## Get a part of a duration

Get a part of the length of a duration. E.g. `.seconds()` gets the number of seconds in a duration.

```signature
esday.duration(<length>).milliseconds(): number
esday.duration(<length>).seconds(): number
esday.duration(<length>).minutes(): number
esday.duration(<length>).hours(): number
esday.duration(<length>).days(): number
esday.duration(<length>).weeks(): number
esday.duration(<length>).months(): number
esday.duration(<length>).quarters(): number
esday.duration(<length>).years(): number
esday.duration(<length>).get(unit: UnitTypeDuration): number
```

**Note**: the values from the duration definition ripple up to higher units (e.g. "25 hours" will get "1 day, 1 hour"). This way, the returned pars are limited to the following  ranges.

**Exception**: `.weeks()` unlike the other getters for duration, weeks are counted as a subset of the days, and are not taken off the days count (i.e. 10 days will get `.weeks() === 1` and `.days() === 10`).

The same goes true for `.quarters()` (i.e. 5 months will get `.quarters() === 1` and `.months() === 5`).

### Types

**UnitTypeDuration**

| Short | Long	        | Plural	       |
| ----- | ------------- | -------------- |
| 'y'   | 'year'        | 'years'        |
| 'Q'   | 'quarter'     | 'quarters'     |
| 'M'   | 'month'       | 'months'       |
| 'w'   | 'week'        | 'weeks'        |
| 'd'   | 'day'         | 'days'         |
| 'h'   | 'hour'        | 'hours'        |
| 'm'   | 'minute'      | 'minutes'      |
| 's'   | 'second'      | 'seconds'      |
| 'ms'  | 'millisecond' | 'milliseconds' |

### Range of output values

| unit           | range      |
| -------------- | ---------- |
| seconds()      | 0 ... 59   |
| minutes()      | 0 ... 59   |
| hours()        | 0 ... 23   |
| days()         | 0 ... 30   |
| weeks()        | 0 ... 4    |
| months()       | 0 ... 11   |
| quarters()     | 0 ... 3    |
| years()        | 0 ... 9999 |

### Example

```typescript
import { esday } from 'esday'
import durationPlugin, { type UnitTypeDuration } from '~/plugins/duration'

esday.extend(durationPlugin)

esday.duration(2, 'days').days()
// Returns 2

esday.duration(4, 'months').get('months')
// Returns 4
```

[&#8593; Goto top](#duration)

## Get a duration as unit

Get the number of milliseconds, seconds etc. of a duration. E.g. `.asSeconds()` gets the length of the duration as seconds.

```signature
esday.duration(<length>).asMilliseconds(): number
esday.duration(<length>).asSeconds(): number
esday.duration(<length>).asMinutes(): number
esday.duration(<length>).asHours(): number
esday.duration(<length>).asDays(): number
esday.duration(<length>).asWeeks(): number
esday.duration(<length>).asMonths(): number
esday.duration(<length>).asQuarters(): number
esday.duration(<length>).asYears(): number
esday.duration(<length>).as(unit: UnitTypeDuration): number
```

### Types

**UnitTypeDuration**

| Short | Long	        | Plural	       |
| ----- | ------------- | -------------- |
| 'y'   | 'year'        | 'years'        |
| 'Q'   | 'quarter'     | 'quarters'     |
| 'M'   | 'month'       | 'months'       |
| 'w'   | 'week'        | 'weeks'        |
| 'd'   | 'day'         | 'days'         |
| 'h'   | 'hour'        | 'hours'        |
| 'm'   | 'minute'      | 'minutes'      |
| 's'   | 'second'      | 'seconds'      |
| 'ms'  | 'millisecond' | 'milliseconds' |

### Example

```typescript
import { esday } from 'esday'
import durationPlugin, { type UnitTypeDuration } from '~/plugins/duration'

esday.extend(durationPlugin)

const duration = esday.duration(2, 'days')
duration.asWeeks()  // Returns 0.2857
duration.asDays()  // Returns 2
duration.asHours()  // Returns 48
duration.asMinutes()  // Returns 2,880
```

[&#8593; Goto top](#duration)

## Humanize a duration

Formt a Duration as a length of time (e.g. 'in 5 days') using the plugins [Locale](./locale.md) and [RelativeTime](./relativeTime.md).

For suffixes before now (e.g. '5 days ago'), pass in a negative number.

Invalid durations are humanized to `Invalid Date`.

Humanize output can be configured with relative time thresholds.

```signature
esday.duration(<length>).humanize(): string
esday.duration(<length>).humanize(withSuffix: boolean): string
esday.duration(<length>).humanize(thresholds: ThresholdRelativeTime): string
esday.duration(<length>).humanize(withSuffix: boolean, thresholds: ThresholdRelativeTime): string
```

### Parameters

| parameters                     | description                                                 |
| ------------------------------ | ----------------------------------------------------------- |
| ---                            | format a duration as length of time (e.g. '5 days')         |
| boolean                        | format a duration with suffix ('in 5 days' or '5 days ago') |
| ThresholdRelativeTime          | format a duration using the given thresholds                |
| boolean, ThresholdRelativeTime | format a duration with suffix using the given thresholds    |

### Types

**ThresholdRelativeTime**

|unit | meaning       | usage                                                               | default |
| --- | ------------- | ------------------------------------------------------------------- | ------- |
|ss   | a few seconds | least number of seconds to be counted in seconds, minus 1           | 44      |
|s    | seconds       | least number of seconds to be considered a minute                   | 45      |
|m    | minutes       | least number of minutes to be considered an hour                    | 45      |
|h    | hours         | least number of hours to be considered a day                        | 22      |
|d    | days          | least number of days to be considered a week                        | 26      |
|w    | weeks         | least number of weeks to be considered a month; not used by default | null    |
|M    | months        | least number of months to be considered a year                      | 11      |

### Example

```typescript
import { esday } from 'esday'
import durationPlugin, { type UnitTypeDuration } from '~/plugins/duration'

esday.extend(durationPlugin)

esday.duration(45, 'seconds').humanize()
// Returns 'a minute'

esday.duration(45, 'seconds').humanize(true)
// Returns 'in a minute'

esday.duration(-45, 'seconds').humanize(true)
// Returns 'a minute ago'

esday.duration(20, 'hours').humanize()
// Returns '20 hours'
```

[&#8593; Goto top](#duration)

## Locale of a duration

Get or set the Locale to use for .humanize function or get the currently used Locale object.

```signature
esday.duration(<length>).locale(): string
esday.duration(<length>).locale(locale: string): Duration
esday.duration(<length>).localeObject(): Locale
```

### Parameters

| parameter | description               |
| --------- | ------------------------- |
| locale    | name of the Locale to use |

### Example

```typescript
import { esday } from 'esday'
import localeEn from '~/locales/en'
import localeFr from '~/locales/fr'
import durationPlugin from '~/plugins/duration'
import localePlugin from '~/plugins/locale'

esday.extend(localePlugin).extend(durationPlugin)
esday.registerLocale(localeEn).registerLocale(localeFr)

esday.duration().locale()
// Returns 'en' (default Locale)

esday.duration().locale('fr').locale()
// Returns 'fr'

esday.duration().locale('fr').localeObject()
// Returns Locale object for locale 'fr'
```

[&#8593; Goto top](#duration)

## Add / Subtract a duration

Add or subtract a value to a duration.

```signature
esday.duration(<length>).add(input: number | UnitsObjectTypeDuration | Duration, unit?: UnitTypeDuration): Duration
esday.duration(<length>).subtract(input: number | UnitsObjectTypeDuration | Duration, unit?: UnitTypeDuration): Duration
```

### Parameters

| parameter | description                                    |
| --------- | ---------------------------------------------- |
| input     | value to add                                   |
| unit      | unit of input value (defaults to milliseconds) |

### Types

**UnitsObjectTypeDuration**

object of values to add / subtract with the following properties (all properties are optional and of type `string` or `number`)

| parameter    | description          |
| ------------ | -------------------- |
| years        | years to add        |
| quarters     | quarters to add     |
| months       | months to add       |
| weeks        | weeks to add        |
| days         | days to add         |
| hours        | hours to add        |
| minutes      | minutes to add      |
| seconds      | seconds to add      |
| milliseconds | milliseconds to add |

**UnitTypeDuration**

| Short | Long	        | Plural	       |
| ----- | ------------- | -------------- |
| 'y'   | 'year'        | 'years'        |
| 'Q'   | 'quarter'     | 'quarters'     |
| 'M'   | 'month'       | 'months'       |
| 'w'   | 'week'        | 'weeks'        |
| 'd'   | 'day'         | 'days'         |
| 'h'   | 'hour'        | 'hours'        |
| 'm'   | 'minute'      | 'minutes'      |
| 's'   | 'second'      | 'seconds'      |
| 'ms'  | 'millisecond' | 'milliseconds' |


[&#8593; Goto top](#duration)

## Format a duration

```signature
// Alias for 'toISOString'
esday.duration(<length>).toString(): string

// Format as string using given format string
esday.duration(<length>).format(formatStr?: string): string

// Format as ISO 8601 string
esday.duration(<length>).toISOString(): string

// Alias for 'toISOString'
esday.duration(<length>).toJSON(): string

// Get all parts of duration as stringified JSON
esday.duration(<length>).asStringifiedJSON(): string
```

### Parameters

| parameters | description                                |
| ---------- | ------------------------------------------ |
| formatStr  | optional parameter to define output format |
|            |   default value: 'YYYY-MM-DDTHH:mm:ss.SSS' |

### Available format tokens

| Format | Output- | Description            |
| ------ | ------- | ---------------------- |
| `Y`    | 18      | years                  |
| `YY`   | 18      | years, 2-digits        |
| `YYYY` | 2018    | years, 4-digits        |
| `M`    | 1-12    | months, beginning at 1 |
| `MM`   | 01-12   | months, 2-digits       |
| `D`    | 1-31    | days                   |
| `DD`   | 01-31   | days, 2-digits         |
| `H`    | 0-23    | hours                  |
| `HH`   | 00-23   | hours, 2-digits        |
| `m`    | 0-59    | minutes                |
| `mm`   | 00-59   | minutes, 2-digits      |
| `s`    | 0-59    | seconds                |
| `ss`   | 00-59   | seconds, 2-digits      |
| `SSS`  | 000-999 | milliseconds, 3-digits |


### Example

```typescript
import { esday } from 'esday'
import durationPlugin, { type UnitTypeDuration } from '~/plugins/duration'

esday.extend(durationPlugin)

esday.duration({ s: 6, m: 5, h: 4, d: 3, M: 2, y: 1 }).toString()
// Returns 'P1Y2M3DT4H5M6S'

esday.duration({ ms: 7, s: 6, m: 5, h: 4, d: 3, M: 2, y: 1 }).format()
// Returns '0001-02-03T04:05:06.007'

esday.duration({ d: 3, M: 2, y: 1 }).format('YY-M-D')
// Returns '01-2-3'

esday.duration({ ms: 7, s: 6, m: 5, h: 4 }).format('HH:mm:ss.SSS)
// Returns '04:05:06.007'

esday.duration({ s: 6, m: 5, h: 4, d: 3, M: 2, y: 1 }).toISOString()
// Returns 'P1Y2M3DT4H5M6S'

esday.duration({ s: 6, m: 5, h: 4, d: 3, M: 2, y: 1 }).toJSON()
// Returns 'P1Y2M3DT4H5M6S'

esday.duration({ ms:7, s: 6, m: 5, h: 4, d: 3, M: 2, y: 1 }).asStringifiedJSON()
// Returns '{"years":1,"months":2,"days":3,"hours":4,"minutes":5,"seconds":6,"milliseconds":0}'
```
[&#8593; Goto top](#duration)

## Inspect

```signature
// Is a duration valid?
esday.duration(<length>).isValid(): boolean

// Is a given element a duration?
esday.isDuration(d?: any): boolean
```

### Example

```typescript
import { esday } from 'esday'
import durationPlugin, { type UnitTypeDuration } from '~/plugins/duration'

esday.extend(durationPlugin)

esday.duration().isValid()
// Returns true

esday.duration(Number.NaN).isValid()
// Returns false

esday.isDuration(esday.duration())
// Returns true

esday.isDuration(esday.duration(esday()))
// Returns false
```
[&#8593; Goto top](#duration)
