# IsToday

IsToday adds the `isToday` method to EsDay indicating, if a date is today.

## Usage

### Dependencies
IsToday has no dependencies on other plugins.

### Method signatures
```signature
esday().isToday(): boolean
```

## Examples
```typescript
import { esday } from 'esday'
import isTodayPlugin from 'esday/plugins/isToday'

esday.extend(isTodayPlugin)

esday().isToday()
// Returns true
```
