# StartOf / EndOf

The `startOf()` method returns an `esday` object at the start of a unit of time based on the given esday object.

The `endOf()` method returns an `esday` object at the end of a unit of time based on the given esday object.

## Usage

### Method signatures
```signature
esday().startOf(units: UnitType): EsDay
```
```signature
esday().endOf(units: UnitType): EsDay
```

| parameter | type     | description              |
| --------- | -------- | ------------------------ |
| unit      | UnitType | unit for startOf / endOf |

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

## Examples
### startOf
```typescript
import { esday } from 'esday'

esday('2023-11-17T03:24:46.234').startOf('y')
// Returns an instance of EsDay for '2023-01-01T00:00:00.000'

esday('2023-11-17T03:24:46.234').startOf('day')
// Returns an instance of EsDay for '2023-11-17T00:00:00.000'

esday('2023-11-17T03:24:46.234').startOf('dates')
// Returns an instance of EsDay for '2023-11-17T00:00:00.000'
```

### endOf
```typescript
import { esday } from 'esday'

esday('2023-11-17T03:24:46.234').startOf('y')
// Returns an instance of EsDay for '2023-12-31T23:59:59.999'

esday('2023-11-17T03:24:46.234').startOf('day')
// Returns an instance of EsDay for '2023-11-17T23:59:59.999'

esday('2023-11-17T03:24:46.234').startOf('seconds')
// Returns an instance of EsDay for '2023-11-17T03:24:46.999'
```
