# ToObject

ToObject adds the `toObject` method to EsDay to get an object containing the parts that make up a date.

## Usage

### Dependencies
ToObject has no dependencies on other plugins.

### Method signatures
```typescript
esday().toObject(): { years, months, date, hours, minutes, seconds, milliseconds }
```

## Examples
```typescript
import { esday } from 'esday'
import toObjectPlugin from 'esday/plugins/toObject'

esday.extend(toObjectPlugin)

esday('2025-01-06T12:34:56.789').toObject()
// Returns { years: 2025, months: 0, date: 06, hours: 12, minutes: 34, seconds: 56, milliseconds: 789 }
```
