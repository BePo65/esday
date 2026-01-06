# IsBetween

IsBetween adds the `isBetween` method to EsDay indicating, if a date is between two other dates.

## Usage

### Dependencies
IsBetween has no dependencies on other plugins.

### Method signatures
```signature
esday().isBetween(
      from: DateType,
      to: DateType,
      unit?: UnitType,
      inclusivity?: '()' | '[]' | '[)' | '(]'): boolean
```

| parameter   | description                                   |
| ----------- | --------------------------------------------- |
| from        | beginning of the range, the date should be in |
| to          | end of therange, the date should be in        |
| unit        | unit to use for comparisons                   |
| inclusivity | unit to use for comparisons                   |
|             |   () = exclude from and to                    |
|             |   [] = include from and to                    |
|             |   [) = include from and exclude to            |
|             |   (] = exclude from and include to            |

## Examples
```typescript
import { esday } from 'esday'
import isBetweenPlugin from 'esday/plugins/isBetween'

esday.extend(isBetweenPlugin)

esday('2010-10-20').isBetween('2010-10-19', '2010-10-25', 'day')
// Returns true

esday('2016-10-30').isBetween('2016-01-01', '2016-10-30', 'day', '[)')
// Returns true
```
