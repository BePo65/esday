import type { Options } from 'tsdown'

function generateConfig(): Options[] {
  const nodeOpt: Options = {
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
  }

  return [nodeOpt]
}

export default generateConfig()
