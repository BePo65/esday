# Set

EsDay has 2 methods to set the elements of a date: the specific setter (`year()`, `month()` etc.) and the generic setter (`set`).

The `year()` method sets the year of the date.

The `month()` method sets the month of the date (0-based, i.e. 0..11).

The `date()` method sets the day of the month of a date.

The `day()` method sets the day of the week of a date (0 .. 6). If a locale is loaded, '0' is the first day of the week as defined in the locale settings. Otherwise '0' is Sunday,'1' is Monday etc.

The `hour()` method sets the hour of the date (0..23).

The `minute()` method sets the minute of the date.

The `second()` method sets the second of the date.

The `millisecond()` method sets the millisecond of the date.

The `set` method takes a unit parameter to define, which value to set in a date.

All setters will bubble up to the next higher unit, If the range is exceeded. I.e. if minutes are set to a value higher than 59, the value will bubble up to hours etc.

## Usage

### Method signatures
```typescript
esday().set(unit: UnitYears, year: number, month?: number, date?: number): EsDay
esday().set(unit: UnitQuarters, quarter: number): EsDay
esday().set(unit: UnitMonths, month: number, date?: number): EsDay
esday().set(unit: UnitWeeks, week: number): EsDay
esday().set(unit: UnitDates, date: number): EsDay
esday().set(unit: UnitDays, day: number): EsDay
esday().set(unit: UnitHours, hours: number, min?: number, sec?: number, ms?: number): EsDay
esday().set(unit: UnitMins, min: number, sec?: number, ms?: number): EsDay
esday().set(unit: UnitSeconds, sec: number, ms?: number): EsDay
esday().set(unit: UnitMss, ms: number): EsDay
esday().set(unit: UnitsObjectTypeSet): EsDay
esday().year((year: number, month?: number, date?: number): EsDay
esday().month((month: number, date?: number): EsDay
esday().date((date: number): EsDay
esday().day((day: number): EsDay
esday().hour((hours: number): EsDay
esday().minute((min: number): EsDay
esday().second((sec: number): EsDay
esday().millisecond((ms: number): EsDay
```

| parameter | description                |
| --------- | -------------------------- |
| unit      | Unit to use for the getter |

### Available Units in UnitTypeGetSet

| Singular    | Plural       | Shorthand | Comment      |
| ----------- | ------------ | --------- | ------------ |
| year        | years        | y         |              |
| quarter     | quarters     | Q         |              |
| month       | months       | M         |              |
| isoWeek     | isoWeeks     | W         |              |
| week        | weeks        | w         |              |
| day         | days         | d         | day of week  |
| date        | dates        | D         | day of month |
| hour        | hours        | h         |              |
| minute      | minutes      | m         |              |
| second      | seconds      | s         |              |
| millisecond | milliseconds | ms        |              |

`date` is 'day of month' and `day` is 'day of week'.

`UnitYears` means one of the 3 forms of units for years ('y', 'year' or 'years'). The same goes for the other units (like UnitQuarters, UnitMonths, etc.).

The unit `week` (in short, long and plural forms) requires the plugin [week](../plugins/week.md) to be loaded.

The unit `quarter` (in short, long and plural forms) requires the plugin [quarterOfYear](../plugins/quarterOfYear.md) to be loaded.

`UnitsObjectTypeSet` (an object containing several units and values to set) requires the plugin [ObjectSupport](../plugins/objectSupport.md).

## Examples
```typescript
import { esday } from 'esday'

esday('2019-01-25').year(2025)
// Returns esday for '2025-01-25T00:00:00'

esday('2019-03-25T12:34:56.789').set(esday('month', 5)
// Returns esday for '2019-06-25T12:34:56.789'

esday('2019-01-25T12:34:56.789').set(esday('D', 5)
// Returns esday for '2019-01-05T12:34:56.789'

esday('2019-01-25T12:34:56.789').set(esday('d', 2)
// Returns esday for '2019-01-22T12:34:56.789', as no locale is loaded
```
