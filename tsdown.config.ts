import { defineConfig } from 'tsdown'

export default defineConfig({
  target: 'es2020',
  platform: 'node',
  clean: true,
  dts: true,
  entry: ['src/index.ts', 'src/plugins/*/index.ts', 'src/locales/*.ts'],
  outDir: 'dist/',
  treeshake: true,
  outputOptions: {
    chunkFileNames: 'chunks/[hash].js',
  },
})
