# IsoWeek

IsoWeek adds the `isoWeek`, the `isoWeeks`, the `isoWeekDay`, the `isoWeekYear` and the `isoWeeksInYear` methods to EsDay.

The `isoWeek` method gets or sets the ISO week of the year of a date according to the ISO 8601.
The `isoWeeks` method is just an alias for the `isoWeek` method.
The `isoWeekDay` method gets the ISO day of week of a date.
The `isoWeekYear` method gets the ISO week-year of a date.
The `isoWeeksInYear` method gets the number of weeks in a year according to the ISO 8601.

IsoWeek adds support for parsing tokens `W`, `WW`, `E`, `GG` and `GGGG`.
IsoWeek adds support for formatting tokens `W`, `WW`, `Wo`, `E`, `GG` and `GGGG`.

## Usage

### Dependencies
In most cases IsoWeek requires no other plugin.

When using the 'Wo' formatting token, IsoWeek requires the plugins Locale and LocalizedFormat and at least 1 registered and activated locale.

When using the parsing tokens, the plugin AdvancedParse is required and must be activated using esday.extend(...) before the plugin IsoWeek.

IsoWeek can be used together with the plugin Utc. If used together with the plugin Utc, the plugin Utc must be activated using esday.extend(...) before the plugin IsoWeek.

### Method signatures
```typescript
esday().isoWeek(): number
esday().isoWeek(newIsoWeek: number): EsDay
esday().isoWeeks(): number
esday().isoWeeks(newIsoWeek: number): EsDay
esday().isoWeekday(): number
esday().isoWeekday(newIsoWeekday: number): EsDay
esday().isoWeekYear(): number
esday().isoWeekYear(newIsoWeekYear: number): EsDay
isoWeeksInYear(): number
```

**isoWeek**
The ISO week of the year depends on the first day of the week (Monday), and with which day (of the month) the first week of the year starts. According to the ISO 8601 the first week of the year is the the week containing January 4th.

When **setting** the ISO week of the year, the day of the week is retained.

**isoWeekYear**
Because the first day of the first week of a year does not always fall on the first day of the year, sometimes the ISO week-year will differ from the "month year".

For example, in 2022 Jan 1 was a Saturday. Because of this, the first ISO week of the year 2022 starts on Monday Jan 3 and Jan 1 belongs to ISO week year 2021 (ISO week 52).

### Formatting tokens
| **Token** | **Example** | **Description**                     |
| --------- | ----------- | ------------------------------------|
| W         | 1-53        | ISO week of year.                   |
| WW        | 01-53       | ISO week of year (2 digits).        |
| Wo        | 1nd-53rd    | ISO week of year as ordinal number. |
| E         | 1-7         | ISO day of week.                    |
| GG        | 00-99       | ISO week-year (2 digits).           |
| GGGG      | 0000-9999   | ISO week-year.                      |

When no locale is loaded the token 'Wo' returns the ISO week number as number (instead of an ordinal number).

### Parsing tokens
| **Token** | **Example** | **Description**                                                          |
| --------- | ----------- | ------------------------------------------------------------------------ |
| W         | 1-53        | ISO week of year.  Sets day of week to Monday (1st day of week).         |
| WW        | 01-53       | 2 digits ISO week of year. Sets day of week to Monday (1st day of week). |
| E         | 1-7         | ISO day of week.                                                         |
| GG        | 00-99       | ISO week-year (2 digits).                                                |
| GGGG      | 0000-9999   | ISO week-year.                                                           |

If the source string (and the format to use) contains a valid day of month, the isoWeek is ignored (like moment.js does).

If the source string (and the format to use) contains a valid month, the isoWeekday is ignored (like moment.js does).

If the source string (and the format to use) contains only 'GG' or 'GGGG', the parsed date is set to Monday of the week that contains Jan 1st (like moment.js does).

## Examples
```typescript
import { esday } from 'esday'
import isoWeekPlugin from 'esday/plugins/isoWeek'

esday.extend(isoWeekPlugin)

esday('2021-01-02').isoWeek()
// Returns 53

esday('2023-04-15').isoWeek(23)
// Returns esday for '2024-06-10'

esday('2025-04-13').isoWeekday()
// Returns 7 (Sunday is '7'!)

esday('2025-05-15').isoWeekday(1)
// Returns esday for '2025-05-12'

esday('2025-12-29').weekYear()
// Returns 2026

esday('2025-12-29').weekYear(2025)
// Returns esday for '2025-01-01'

esday('2020-04-25').isoWeeksInYear()
// Returns 53
```

### Formatting date using IsoWeek tokens
```typescript
import { esday } from 'esday'
import isoWeekPlugin from 'esday/plugins/isoWeek'

esday.extend(isoWeekPlugin)

esday('22024-12-24T14:25:36').format('W')
// Returns '52'

esday('22024-12-24T14:25:36').format('WW')
// Returns '52'

esday('22024-12-24T14:25:36').format('Wo')
// Returns '52'

esday('22024-12-24T14:25:36').format('E')
// Returns '2'

esday('22024-12-24T14:25:36').format('GG')
// Returns '24'

esday('22024-12-24T14:25:36').format('GGGG')
// Returns '2024'
```

and with a locale loaded:

```typescript
import { esday } from 'esday'
import { localePlugin, isoWeekPlugin } from 'esday/plugins'
import localeEn from 'esday/locales/en'

esday.extend(localePlugin)
esday.extend(isoWeekPlugin)

esday.registerLocale(localeEn)

// set global locale
esday.locale('en')

esday('22024-12-24T14:25:36').format('Wo')
// Returns '52nd'
```

### Parsing date using IsoWeek tokens
```typescript
import { esday } from 'esday'
import isoWeekPlugin from 'esday/plugins/isoWeek'

esday.extend(isoWeekPlugin)

esday('2025 2', 'YYYY W')
// Returns esday for '2025-01-06'

esday('2025-10-24 2', 'YYYY-MM-DD W')
// Returns esday for '2025-10-24'

esday('2025-09-23 2', 'YYYY-MM-DD W')
// Returns esday for '2025-09-23'

esday('2025 12', 'YYYY WW')
// Returns esday for '2025-01-01' as we don't have a locale

esday('2025 4', 'YYYY E')
// Returns esday for '2025-01-02'

esday("24", "GG")
// Returns esday for '2024-01-01'
```

and with a locale loaded:

```typescript
import { esday } from 'esday'
import { localePlugin, isoWeekPlugin } from 'esday/plugins'
import localeEn from 'esday/locales/en'

esday.extend(localePlugin)
esday.extend(isoWeekPlugin)

esday.registerLocale(localeEn)

// set global locale
esday.locale('en')

esday('2025 12', 'YYYY WW')
// Returns esday for '2025-03-17'
```
