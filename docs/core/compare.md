# IsBefore / IsSame / IsAfter

The `isBefore()` method checks if one `esday` object is before an esday object given as an argument.

The `isSame()` method method checks if one `esday` object is the same as an esday object given as an argument.

The `isAfter()` method checks if one `esday` object is after an esday object given as an argument.

## Usage

### Method signatures
```typescript
esday().isBefore(units: UnitType = C.MS): boolean
```
```typescript
esday().isSame(units: UnitType = C.MS: boolean
```
```typescript
esday().isAfter(units: UnitType = C.MS: boolean
```

| parameter | type     | description         |
| --------- | -------- | ------------------- |
| unit      | UnitType | unit for comparison |

### Available Units in UnitType

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

The unit `quarter` (in short, long and plural forms) requires the plugin [QuarterOfYear](../plugins/quarterOfYear.md) to be loaded.

The unit `isoWeek` (in short, long and plural forms) requires the plugin [IsoWeek](../plugins/isoWeek.md) to be loaded.

### Granularity
If you want to limit the granularity to a unit other than milliseconds, pass the units as the second parameter.

The second parameter determines the **precision** and not just a single value to check. I.e. using 'hour' as a unit will not just compare the values of the hour, but will also check for year, month and day.

## Examples
### isBefore
```typescript
import { esday } from 'esday'

const date1 = esday('2023-11-17T03:24:46.234')
const date2 = esday('2025-11-17T03:24:46.234')
date1.isBefore(date2, 'y')
// Returns true
```

### isSame
```typescript
import { esday } from 'esday'

const date1 = esday('2023-11-17T03:24:46.234')
const date2 = esday('2023-11-27T13:14:36.134')
date1.isSame(date2, 'month')
// Returns true
```

### isAfter
```typescript
import { esday } from 'esday'

const date1 = esday('2023-11-17T03:24:46.234')
const date2 = esday('2021-11-17T03:24:46.234')
date1.isAfter(date2, 'years')
// Returns true
```
