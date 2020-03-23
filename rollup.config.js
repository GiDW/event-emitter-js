import typescript from '@rollup/plugin-typescript'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: './src/event_emitter.ts',
    output: {
      file: './dist/event_emitter.umd.js',
      format: 'umd',
      name: 'EventEmitter',
      compact: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig-rollup.json'
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
      dir: './dist',
      format: 'cjs',
      compact: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig-typings.json'
      }),
      uglify({
        mangle: true,
        compress: true
      })
    ]
  }
]
