import type { Options } from 'tsup'
// tsup.config.ts
import { defineConfig } from 'tsup'

function generateConfig(jsx: boolean): Options {
  return {
    target: 'esnext',
    platform: 'browser',
    format: 'esm',
    clean: true,
    dts: !jsx,
    entry: ['src/index.ts', 'src/plugins/*/index.ts', 'src/plugins/index.ts', 'src/locales/*.ts'],
    outDir: 'dist/',
    treeshake: { preset: 'smallest' },
    replaceNodeEnv: true,
    esbuildOptions(options) {
      options.chunkNames = '[name]/[hash]'
      options.drop = ['console', 'debugger']
    },
  }
}

export default defineConfig([generateConfig(false)])
