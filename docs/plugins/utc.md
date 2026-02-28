# Utc

Utc adds methods to EsDay and esday to dates as UTC.

The `utc` method converts an EsDay instance to utc. If the optional parameter `keepLocalTime` is true, then the the local time is not changed.
The `local` method converts an EsDay instance from utc to the local timezone.
The `isUTC` method checks, if the EsDay instance in utc mode.
The `utcOffset` getter returns the offset to utc for the EsDay instance in minutes.
The `utcOffset` setter sets the offset to utc for the EsDay instance to the given value (minutes). If the optional parameter `keepLocalTime` is true, then the the local time is not changed (changing the point in Universal Time).

## Usage

### Dependencies
Utc has no dependencies on other plugins.

### Method signatures
Methods added to EsDay instances:
```signature
esday().utc(keepLocalTime?: boolean): EsDay
esday().local(): EsDay
esday().isUTC(): boolean
esday().utcOffset(): number
esday().utcOffset(offset: number | string, keepLocalTime?: boolean): EsDay
```

| parameter     | description                   |
| ------------- | ----------------------------- |
| offset        | offset from utc               |
| keepLocalTime | keep the existing time of day |

If the first parameter of utcOffset is less than 16 and greater than -16, it will be interpreted as hours instead of minutes.

utcOffset will take a string as input value; EsDay will search the string for the last match of +00 -00 +00:00 +0000 -00:00 -0000 Z, so you can even pass an ISO8601 formatted string to offset and esday will set that UTC offset. If the string does not include 'Z', it must include the + or - character.

Methods added to esday:
```signature
esday.utc(date: DateType): EsDay
```

## Differences to Moment.js

When setting the year you can add parameters to set the month and date too. The same goes true for hours, minutes and seconds that can set the corresponding smaller units too.

Setting year/month or month using the `set` operator: if the new month does not have enough days to keep the current day of month (e.g. 31), day is clamped to the end of the target month (see [moment.js](https://momentjs.com/docs/#/get-set/month/).

## Examples
```typescript
import { esday } from 'esday'
import utcPlugin from 'esday/plugins/utc'

esday.extend(utcPlugin)

esday('2025-01-06T12:34:56.789').utc()
// Returns esday for '2025-01-06T11:34:56Z' in utc mode
// when timezone offset on Jan 6 is '+01:00'

esday('2025-01-06T12:34:56.789').utc(true)
// Returns esday for '2025-01-06T12:34:56Z' in utc mode

esday.utc('2025-01-06T12:34:56.789')
// Returns esday for '2025-01-06T12:34:56Z' in utc mode

esday('2025-01-06T12:34:56.789').utc(true).local()
// Returns esday for '2025-01-06T13:34:56+01:00' in local mode,
// when timezone offset on Jan 6 is '+01:00'

esday('2025-01-06T12:34:56.789').utcOffset()
// Returns 60, when timezone offset on Jan 6 is '+01:00'

esday('2025-01-06T12:34:56.789').utc(true).utcOffset(120)
// Returns esday for '2025-01-06T13:34:56+02:00' in local mode

esday('2025-01-06T12:34:56.789').utc(true).utcOffset(120, true)
// Returns esday for '2025-01-06T11:34:56+02:00' in local mode,
// when timezone offset on Jan 6 is '+01:00'. utcOffset is 120.
```
