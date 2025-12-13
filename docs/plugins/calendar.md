# Calendar

Calendar adds the `calendar` method to EsDay to format a date relative to a given reference date.

## Usage

### Dependencies
Calendar requires the plugin Locale and at least 1 registered and activated locale.

### Method signatures
```typescript
calendar(referenceDate?: EsDay | null, formats?: CalendarPartial): string
```

| parameter     | description                              |
| ------------- | ---------------------------------------- |
| referenceDate | date used as a base to compare `this` to |
| formats       | format string(s) used for parsing `date` |

`referenceDate` can be null or undefined and defaults to the start of today.

`formats` is a `CalendarPartial` object with these 6 properties

| property | description                              |
| ------------ | ---------------------------------------- |
| sameDay  | format used, when difference between `this` and `referenceDate` is < 1 day  |
| nextDay  | format used, when difference between `this` and `referenceDate` is < 2 day  |
| nextWeek | format used, when difference between `this` and `referenceDate` is < 7 day  |
| lastDay  | format used, when difference between `this` and `referenceDate` is < 0 day  |
| lastWeek | format used, when difference between `this` and `referenceDate` is < -1 day |
| sameElse | format used, when difference is 7 days or more                              |

The property values can be a (format) string like `LT` or a function with the following signature:
```typescript
(this: EsDay, refDate?: EsDay) => string
```

## Examples
```typescript
import { esday } from 'esday'
import { calendarPlugin, localePlugin, localizedFormatPlugin } from 'esday/plugins'

import localeEnUs from 'esday/locales/en-us'

esday
  .extend(localePlugin)
  .extend(localizedFormatPlugin)
  .extend(calendarPlugin)

esday.registerLocale(localeEnUs)

// set global locale
esday.locale('en-US')

// All examples presume that current date is '2023-12-17T03:24:46.234'

esday().calendar()
// Returns 'Today at 3:24 AM' - "sameDay"

esday('2025-06-21T17:24:46.234').calendar(esday('2025-06-21T03:24:46.234'))
// Returns 'Today at 5:24 PM' - "sameDay" with reference date

esday().add(1, 'day').hour(10).calendar()
// Returns 'Tomorrow at 10:24 AM' - "nextDay"

esday().add(3, 'day').hour(11).calendar()
// Returns 'Wednesday at 11:24 AM' - "nextWeek"

esday().subtract(1, 'day').hour(14).calendar()
// Returns 'Yesterday at 2:24 PM' - "lastDay"

esday().subtract(4, 'day').hour(15).calendar()
// Returns 'Last Wednesday at 3:24 PM' - "lastWeek"

esday().add(8, 'day').hour(16).calendar()
// Returns '12/25/2023' - "sameElse (future)"

esday().subtract(8, 'day').hour(17).calendar()
// Returns '12/09/2023' - "sameElse (past)"

esday().calendar(undefined, { sameDay: '[My Custom Today at] HH:mm' })
// Returns 'My Custom Today at 03:24' - overriding a format key with a string

const customFormats: CalendarPartial = {
  nextDay: function (this: EsDay, refDate?: EsDay) {
    return `[Func: Next Day from ${refDate?.format('YYYY-MM-DD')} at] HHmm`
  },
}
esday().add(1, 'day').hour(10).calendar.calendar(undefined, { sameDay: '[My Custom Today at] HH:mm' })
// Returns 'My Custom Today at 03:24' - overriding a format key with a string
```
