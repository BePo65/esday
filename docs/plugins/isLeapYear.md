# IsLeapYear

IsLeapYear adds the `isLeapYear` method to EsDay indicating, if a date is a leap year.

## Usage

### Dependencies
IsLeapYear has no dependencies on other plugins.

### Method signatures
```typescript
esday().isLeapYear(): boolean
```

## Examples
```typescript
import { esday } from 'esday'
import isLeapYearPlugin from 'esday/plugins/isLeapYear'

esday.extend(isLeapYearPlugin)

esday('2000-01-01').isLeapYear()
// Returns true
```
