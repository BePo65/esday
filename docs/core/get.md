# Get

EsDay has 2 methods to get the elements of a date: the specific getter (`year()`, `month()` etc.) and the generic getter (`get`).

The `year()` method gets the year of the date.

The `month()` method gets the month of the date (0-based, i.e. 0..11).

The `date()` method gets the day of the month of a date.

The `day()` method gets the day of the week of a date (0 .. 6). If a locale is loaded, '0' is the first day of the week as defined in the locale settings. Otherwise '0' is Sunday,'1' is Monday etc.

The `hour()` method gets the hour of the date (0..23).

The `minute()` method gets the minute of the date.

The `second()` method gets the second of the date.

The `millisecond()` method gets the millisecond of the date.

The `get` method takes a unit parameter to define, which value to extract from a date.

## Usage

### Method signatures
```signature
esday().get(unit: UnitTypeGetSet): number
esday().year(): number
esday().month(): number
esday().date(): number
esday().day(): number
esday().hour(): number
esday().minute(): number
esday().second(): number
esday().millisecond(): number
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

The unit `week` (in short, long and plural forms) requires the plugin [week](../plugins/week.md) to be loaded.

The unit `quarter` (in short, long and plural forms) requires the plugin [quarterOfYear](../plugins/quarterOfYear.md) to be loaded.

`date` is 'day of month' and `day` is 'day of week'.

## Examples
```typescript
import { esday } from 'esday'

esday('2019-01-25').year()
// Returns 2019

esday('2019-03-25').get(esday('month')
// Returns 2 as the result is 0-based

esday('2019-01-25').get(esday('D')
// Returns 25

esday('2019-01-25').get(esday('d')
// Returns 5 for Friday, as no locale is loaded
```
