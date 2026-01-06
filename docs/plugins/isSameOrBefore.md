# IsSameOrBefore

IsSameOrBefore adds the `isSameOrBefore` method to EsDay indicating, if a date is the same as or before another date.

## Usage

### Dependencies
IsSameOrBefore has no dependencies on other plugins.

### Method signatures
```signature
esday().isSameOrBefore(date: DateType, unit?: UnitType): boolean
```

| parameter   | description                |
| ----------- | -------------------------- |
| date        | date to compare with       |
| unit        | unit to use for comparison |

## Examples
```typescript
import { esday } from 'esday'
import isSameOrBeforePlugin from 'esday/plugins/isSameOrBefore'

esday.extend(isSameOrBeforePlugin)

esday('2010-10-20').isSameOrBefore('2010-10-19', 'day')
// Returns false
```
