# IsSameOrAfter

IsSameOrAfter adds the `isSameOrAfter` method to EsDay indicating, if a date is the same as or after another date.

## Usage

### Dependencies
IsSameOrAfter has no dependencies on other plugins.

### Method signatures
```typescript
esday().isSameOrAfter(date: DateType, unit?: UnitType): boolean
```

| parameter   | description                |
| ----------- | -------------------------- |
| date        | date to compare with       |
| unit        | unit to use for comparison |

## Examples
```typescript
import { esday } from 'esday'
import isSameOrAfterPlugin from 'esday/plugins/isSameOrAfter'

esday.extend(isSameOrAfterPlugin)

esday('2010-10-20').isSameOrAfter('2010-10-19', 'day')
// Returns true
```
