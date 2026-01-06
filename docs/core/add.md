# Add / Subtract

The `add()` method adds a value to an `esday` object.

The `subtract()` method subtracts a value from an `esday` object.

## Usage

### Method signatures
```signature
esday().add(value: number, unit: UnitTypeAddSub): EsDay
```
```signature
esday().subtract(value: number, unit: UnitTypeAddSub): EsDay
```

| parameter | type           | description                       |
| --------- | -------------- | --------------------------------- |
| value     | number         | number of units to add / subtract |
| unit      | UnitTypeAddSub | unit for add / subtract           |

### Available Units in UnitTypeAddSub

| Singular    | Plural       | Shorthand |
| ----------- | ------------ | --------- |
| year        | years        | y         |
| quarter     | quarters     | Q         |
| month       | months       | M         |
| week        | weeks        | w         |
| day         | days         | d         |
| hour        | hours        | h         |
| minute      | minutes      | m         |
| second      | seconds      | s         |
| millisecond | milliseconds | ms        |

The unit `quarter` (in short, long and plural forms) requires the plugin [QuarterOfYear](../plugins/quarterOfYear.md) to be loaded.

Adding multiple values in one step requires the plugin [ObjectSupport](../plugins/objectSupport.md).

## Examples
### add
```typescript
import { esday } from 'esday'

esday('2025-07-17T03:24:46.234').add(2, 'M')
// Returns an instance of EsDay for '2025-09-17T03:24:46.234'

esday('2024-01-31T13:24:35.789').add(1, 'day')
// Returns an instance of EsDay for '2024-02-01T13:24:35.789'

esday('2024-01-31T13:24:35.789').add(15, 'seconds')
// Returns an instance of EsDay for '2024-01-31T13:24:50.789'
```

### subtract
```typescript
import { esday } from 'esday'

esday('2025-07-17T03:24:46.234').subtract(2, 'M')
// Returns an instance of EsDay for '2025-05-17T03:24:46.234'

esday('2024-01-31T13:24:35.789').subtract(1, 'day')
// Returns an instance of EsDay for '2024-01-30T13:24:35.789'

esday('2024-01-31T13:24:35.789').subtract(15, 'seconds')
// Returns an instance of EsDay for '2024-01-31T13:24:20.789'
```
