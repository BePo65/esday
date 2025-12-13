# ToArray

ToArray adds the `toArray` method to EsDay to get an array containing the parts that make up a date.

## Usage

### Dependencies
ToArray has no dependencies on other plugins.

### Method signatures
```typescript
esday().toArray(): [number, number, number, number, number, number, number]
```

## Examples
```typescript
import { esday } from 'esday'
import toArrayPlugin from 'esday/plugins/toArray'

esday.extend(toArrayPlugin)

esday('2025-01-06T12:34:56.789').toArray()
// Returns [2025, 0, 6, 12, 34, 56, 789]
```
