import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: './src/event_emitter.ts',
    output: {
      file: './esm/event_emitter.esm.js',
      format: 'es',
      compact: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig-esm.json'
      }),
      terser({
        mangle: true,
        compress: true
      })
    ]
  },
  {
    input: './src/event_emitter.ts',
    output: {
      file: './umd/event_emitter.umd.js',
      format: 'umd',
      name: 'EventEmitter',
      compact: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json'
      }),
      uglify({
        mangle: true,
        compress: true
      })
    ]
  },
  {
    input: './src/event_emitter.ts',
    output: {
      file: './lib/event_emitter.cjs.js',
      format: 'cjs',
      compact: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json'
      }),
      uglify({
        mangle: true,
        compress: true
      })
    ]
  }
]
