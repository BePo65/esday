# ObjectSupport

ObjectSupport extends 'esday()', 'esday.utc()', '.set(), '.add() and '.subtract() in EsDay to support an object argument.

## Usage

### Dependencies

ObjectSupport has no dependencies on other plugins.

ObjectSupport can be used together with the plugin Utc that must be loaded using esday.extend(...) before the plugin ObjectSupport.

### Method signatures
```typescript
esday(value: ParsingObject): EsDay
esday.utc(value: ParsingObject): EsDay
esday().set(value: UnitsObjectTypeSet): EsDay
esday().add(value: UnitsObjectTypeAddSub): EsDay
esday().subtract(value: UnitsObjectTypeAddSub): EsDay
```

| parameter | description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| value     | object containing the values to be used in parsing, setting or add/subtract |

### Added types

**ParsingObject**

`type ParsingObject = ParsingObjectShort | ParsingObjectLong | ParsingObjectPlurals`

Omitted time units default to 0.
A missing year unit defaults to the current year.
Missing month and day units default to January 1st, except when there is a day, but no month and year value; in this case the current month is used as a default.

Both `day` and `date` key mean day-of-the-month (in short, long and plural form).

**Note**: months are 0 indexed.

**ParsingObjectLong**

```
type ParsingObjectLong = {
  year?: number | string
  month?: number | string
  day?: number | string // day-of-month
  date?: number | string // day-of-month
  hour?: number | string
  minute?: number | string
  second?: number | string
  millisecond?: number | string
}
```

**ParsingObjectPlurals**

ParsingObjectPlurals corresponds to ParsingObjectLong, but with plural names (e.g. `years`).

**ParsingObjectShort**

ParsingObjectShort corresponds to ParsingObjectLong, but with short names (`y`, `M`, `D`, `d`, `h`, `m`, `s`, `ms`).

**UnitsObjectTypeSet**

```
type UnitsObjectTypeSet = {
  year?: number
  quarter?: number
  month?: number
  week?: number
  day?: number // day-of-week
  date?: number // day-of-month
  hour?: number
  minute?: number
  second?: number
  millisecond?: number
}
```

**UnitsObjectTypeAddSub**

```
type UnitsObjectTypeAddSub = {
  years?: number
  quarters?: number
  months?: number
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
}
```

## Examples
```typescript
import { esday } from 'esday'
import objectSupportPlugin from 'esday/plugins/objectSupportPlugin'

esday.extend(objectSupportPlugin)

esday({ y: 2024, M: 4, D: 14, h: 15, m: 13, s: 34, ms: 765 })
// Returns esday for '2024-05-14T15:13:34.765'

esday().set({ year: 2024, month: 4, date: 14, hour: 2, minute: 22, second: 43, millisecond: 876 })
// Returns esday for '2024-05-14T02:22:43.876'

esday().add({ years: 1, months: 2, days: 3, hours: 1, minutes: 2, seconds: 3 })
// Returns esday for '2026-09-20T04:26:49', when current date is '2025-07-17T03:24:46.234'

esday().subtract({ years: 1, months: 2, days: 3, hours: 1, minutes: 2, seconds: 3 })
// Returns esday for '2024-05-14T02:22:43', when current date is '2025-07-17T03:24:46.234'
```
