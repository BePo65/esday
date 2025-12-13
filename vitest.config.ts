import path from 'node:path'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'dev/*'],
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      esday: `${path.resolve(__dirname, 'src')}`,
    },
    coverage: {
      exclude: [...configDefaults.exclude, 'dev/**', 'scripts/**', 'tsdown.config.ts'],
      reporter: ['text', 'json', 'json-summary', 'html'],
      reportOnFailure: true,
      thresholds: {
        statements: 95,
        functions: 95,
        branches: 95,
        lines: 95,
      },
      watermarks: {
        statements: [95, 100],
        functions: [95, 100],
        branches: [95, 100],
        lines: [95, 100],
      },
    },
    browser: {
      headless: true,
      enabled: false,
      provider: 'playwright',
      screenshotFailures: false,
      instances: [{ browser: 'firefox' }, { browser: 'chromium' }, { browser: 'webkit' }],
    },
    onConsoleLog(log) {
      // HACK suppress moment.js deprecation warning from test file
      // 'test/plugins/toArray.test.ts > toArray plugin > should handle invalid dates gracefully'
      if (log.includes('Non RFC2822/ISO date formats are discouraged')) return false
      if (log.includes('Deprecation warning: years accessor is deprecated. Use year instead'))
        return false
      if (log.includes('Deprecation warning: months accessor is deprecated. Use month instead'))
        return false
      if (log.includes('Deprecation warning: dates accessor is deprecated. Use date instead'))
        return false
      return true
    },
  },
})
