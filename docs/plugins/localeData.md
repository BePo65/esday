# LocaleData

LocaleData adds the `localeData()` method to `esday`.

The `localeData` method gets an object with methods to access the properties of a Locale.

The `months()`, `monthsShort()`,`weekdays()`, `weekdaysShort()` and `weekdaysMin()` methods are added to the core `esday` object to get the list of month or weekday names.

## Usage

### Dependencies

LocaleData requires the plugin Locale and at least 1 registered and activated locale.

The plugin Locale must be loaded using esday.extend(...) before the plugin LocaleData.

### Method signatures
```signature
esday().localeData(): LocaleData
esday.localeData(localeName?: string): LocaleData
```

| parameter  | description               |
| ---------- | ------------------------- |
| localeName | name of the locale to use |

### Properties of LocaleData
| property                                                 |  Description                                    |
| -------------------------------------------------------- |  ---------------------------------------------- |
| weekdays()                                               | Get the list of all weekday names               |
| weekdays(date: EsDay, format?: string)                   | Format a date as weekday name                   |
| weekdaysShort()                                          | Get the list of all short weekday names         |
| weekdaysShort(date: EsDay, format?: string)              | Format a date as short weekday name             |
| weekdaysMin()                                            | Get the list of all minimal weekday names       |
| weekdaysMin(date: EsDay, format?: string)                | Format a date as minimal weekday name           |
| months()                                                 | Get the list of all month names                 |
| months(date: EsDay, format?: string)                     | Format a date as month name                     |
| monthsShort()                                            | Get the list of all short month names           |
| monthsShort(date: EsDay, format?: string)                | Format a date as short month name               |
| ordinal(number: number, period?: string)                 | Format a number as string                       |
| firstDayOfWeek()                                         | Get the weekday of the 1st day of the week      |
| firstDayOfYear()                                         | Get the day of month of the 1st day of the year |
| longDateFormat(keyF: LocaleFormatKeys)                   | Get the full format of abbreviated format       |
| calendar(keyL?: string, date?: EsDay, now?: EsDay)       | Get format for calendar representation          |
| relativeTime(value?: string | number,                    | Get format for calendar representation          |
|    withoutSuffix: boolean, token: RelativeTimeKeys       | Get relative time string                        |
|    isFuture: boolean)                                    |                                                 |
| meridiem(hour: number, minute: number, isLower: boolean) | Get the am/pm string for particular time        |
| preParse?(dateString: string)                            | Modify unformatted date string before parsing   |
| postFormat?(formattedDate: string)                       | Modify formatted date                           |

| parameter | description                                      |
| --------- | ------------------------------------------------ |
| date          | date to format                               |
| now           | reference date                               |
| format        | format to use to select a names list;        |
|               | some locales use a different names           |
|               | list, depending on the format used.          |
| period        | period used to select format details;        |
|               | e.g. 'D' or 'w'.                             |
| keyF          | key of the format to select (e.g. 'LT')      |
| keyL          | key of the format to select (e.g. 'sameDay') |
| value         | date-time string of date value               |
| withoutSuffix | do not add suffix to result (e.g. 'ago')     |
| token         | key to define diff base (e.g. 'mm' or 'hh')  |
| isFuture      | format as future date (e.g. 'in 5 minutes')  |
| isLower       | format result as lower case string           |

## Examples
```typescript
import { esday } from 'esday'
import localeDataPlugin from 'esday/plugins/localeData'

esday.extend(localeDataPlugin)

esday().localeData().months()
// Returns list of month names for locale of esday instance

esday().localeData().weekdaysMin()
// Returns list of minimal weekday names for locale of esday instance

esday.localeData().firstDayOfWeek()
// Returns 1st day of week for default locale (e.g. 0 for 'Sunday')

esday.localeData('en').ordinal(2)
// Returns '2nd'
```
