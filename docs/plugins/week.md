# Week

Week adds the `week`, the `weeks`, the `weekDay`, the `wWeekYear` and the `weeksInYear` methods to EsDay.  Extend the `get` and `set` methods to handle the unit 'week'.

The `week` method gets or sets the week of the year of a date according to the active locale.
The `weeks` method is just an alias for the `week` method.
The `weekDay` method gets the day of week of a date according to the active locale.
The `weekYear` method gets the week-year of a date according to the active locale.
The `weeksInYear` method gets the number of weeks in a year according to the active locale.

Week adds support for parsing tokens `w`, `ww`, `e`, `gg` and `gggg`.
Week adds support for formatting tokens `w`, `ww`, `wo`, `e`, `gg` and `gggg`.

## Usage

### Dependencies
Week requires the plugin Locale and at least 1 registered and activated locale.

When using the week formatting tokens together with other formatting tokens, the plugin localizedFormat is required and must be loaded using esday.extend(...) before the plugin Week.

When using the week parsing tokens, the plugin advancedParse is required and must be loaded using esday.extend(...) before the plugin Week.

Week can be used together with the plugin Utc. If used together with the plugin Utc, the plugin Utc must be activated using esday.extend(...) before the plugin Week.

### Method signatures
```signature
esday().week(): number
esday().week(week: number): EsDay
esday().weeks(): number
esday().weeks(week: number): EsDay
esday().weekday(): number
esday().weekday(newIsoWeekday: number): EsDay
esday().weekYear(): number
esday().weekYear(newIsoWeekYear: number): EsDay
weeksInYear(): number
```

**week**
The week of the year varies depending on which day is the first day of the week (Sunday, Monday, etc), and with which day (of the month) starts the first week of the year.

For example, in the US, Sunday is the first day of the week. The week with January 1st in it is the first week of the year.

In France, Monday is the first day of the week, and the week with January 4th is the first week of the year.

When **setting** the week of the year, the day of the week is retained.

**weekYear**
Because the first day of the first week of a year does not always fall on the first day of the year, sometimes the week-year will differ from the month year.
Because the first day of the first week of a year does not always fall on the first day of the year, sometimes the week-year will differ from the month year.

For example, in the US, the week that contains Jan 1st is always the first week. In the US, weeks also start on Sunday.
If Jan 1 was a Monday, Dec 31 would belong to the same week as Jan 1, and thus the same week-year as Jan 1 (e.g. 2024).
Dec 30 would have a different week-year than Dec 31 (in the previous case it would be 2023).

### Added units
| **Unit** | **Example** | **Description** |
| -------- | ----------- | --------------- |
| 'w'      | 1-53        | Week of year.   |
| 'week'   | 1-53        | Week of year.   |
| 'weeks'  | 1-53        | Week of year.   |

### Added formatting tokens
| **Token** | **Example** | **Description**                 |
| --------- | ----------- | --------------------------------|
| w         | 1-53        | Week of year.                   |
| ww        | 01-53       | Week of year (2 digits).        |
| wo        | 1nd-53rd    | Week of year as ordinal number. |
| e         | 1-7         | Day of week.                    |
| gg        | 00-99       | Week-year (2 digits).           |
| gggg      | 0000-9999   | Week-year.                      |

When no locale is loaded the token 'wo' returns the week number as number (instead of an ordinal number).

### Added parsing tokens
| **Token** | **Example**       | **Description**                                               |
| --------- | ----------------- | ------------------------------------------------------------- |
| w         | 1-53              | Week of year. Sets day of week to 1st day of week.            |
| ww        | 01-53             | Week of year. Sets day of week to 1st day of week (2 digits). |
| d         | 0..6              | Day of week (numeric form)                                    |
| dd        | Su...Sa           | Day of week (minimal form)                                    |
| ddd       | Sun...Sat         | Day of week (short form)                                      |
| dddd      | Sunday...Saturday | Day of week (long form)                                       |
| e         | 1-7               | Day of week (evaluating start-of-week).                       |
| gg        | 00-99             | Week-year (2 digits).                                         |
| gggg      | 0000-9999         | Week-year.                                                    |

If the source string (and the format to use) contains a valid day of month, the week is ignored (like moment.js does).

If the source string (and the format to use) contains a valid month, the weekday is ignored (like moment.js does).

**Differences to Moment.js**

When parsing a string consisting of a year only with a weekYear token ('gg' or 'gggg') or a year and day-of-week ('2022 2) with a weekday token ('YYYY e'), moment.js returns the start of the week before the expected date on the first 4 days of a week (when start-of-year is not '1').

As an example:
`esday('2025', 'gggg)` should return '2025-07-21' when the current date is Wednesday '2022-07-24' and the locale is 'de' (start-of-year is '4'). But '2025-07-14' is returned.

While `esday('2025', 'gggg)` returns '2025-07-21' as expected when the current date is Thursday '2022-07-25' and the locale is 'de'.

## Examples
```typescript
import { esday } from 'esday'
import { advancedParsePlugin, localePlugin, localizedFormatPlugin, weekPlugin } from 'esday/plugins'

import localeEnUs from 'esday/locales/en-us'

esday
  .extend(localePlugin)
  .extend(advancedParsePlugin)
  .extend(localizedFormatPlugin)
  .extend(weekPlugin)

esday.registerLocale(localeEnUs)

// set global locale
esday.locale('en-US')

esday('2024-01-01').week()
// Returns 1

esday('2024-01-01').get('week')
// Returns 1

esday('2024-02-14').week(1)
// Returns esday for '2024-01-03'

esday('2024-02-14').set('w', 1)
// Returns esday for '2024-01-03'

esday('2025-10-01').weekday()
// Returns 3 (Sunday is '0'!)

esday('2025-05-15').weekday(1)
// Returns esday for '2025-05-12'

esday('2023-12-30').weekYear()
// Returns 2023

esday('2023-12-31').weekYear()
// Returns 2024

esday('2024-01-01').weekYear()
// Returns 2024

esday('2016-04-25').weeksInYear()
// Returns 53
```

### Formatting date using week tokens
```typescript
import { esday } from 'esday'
import { localePlugin, localizedFormatPlugin, weekPlugin } from 'esday/plugins'

import localeEnUs from 'esday/locales/en-us'

esday
  .extend(localePlugin)
  .extend(localizedFormatPlugin)
  .extend(weekPlugin)

esday.registerLocale(localeEnUs)

// set global locale
esday.locale('en-US')

esday('2024-12-24T14:25:36').format('w')
// Returns '52'

esday('22024-12-24T14:25:36').format('ww')
// Returns '52'

esday('22024-12-24T14:25:36').format('wo')
// Returns '52nd'

esday('22024-12-24T14:25:36').format('e')
// Returns '2'

esday('22024-12-24T14:25:36').format('gg')
// Returns '24'

esday('22024-12-24T14:25:36').format('gggg')
// Returns '2024'
```

### Parsing date using IsoWeek tokens
```typescript
import { esday } from 'esday'
import { advancedParsePlugin, localePlugin, weekPlugin } from 'esday/plugins'

import localeEnUs from 'esday/locales/en-us'

esday
  .extend(localePlugin)
  .extend(advancedParsePlugin)
  .extend(weekPlugin)

esday.registerLocale(localeEnUs)

// set global locale
esday.locale('en-US')

esday('2025 2', 'YYYY w')
// Returns esday for '2025-01-05'

esday('2025-10-24 2', 'YYYY-MM-DD w')
// Returns esday for '2025-10-24'

esday('2025 02', 'YYYY ww')
// Returns esday for '2025-01-05'

esday('2025 12', 'YYYY ww')
// Returns esday for '2025-03-16'

esday('2025 4', 'YYYY d')
// Returns esday for '2025-12-18' when current date is '2023-12-17'
// '4' is Thursday; month and week is taken from current date

esday('2025 4', 'YYYY e')
// Returns esday for '2025-12-17' when current date is '2023-12-17'
// '4' is Wednesday (weekday); month and week is taken from current date

esday("24", "gg")
// Returns esday for '2024-12-15' when current date is '2023-12-17'
// month and week is taken from current date; '15' is 1st day of the week

esday("24", "gggg")
// Returns esday for '2024-12-15' when current date is '2023-12-17'
// month and week is taken from current date; '15' is 1st day of the week
```
