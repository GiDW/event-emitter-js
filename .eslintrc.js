module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'standard'
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/**/*',
    'esm/**/*',
    'lib/**/*',
    'umd/**/*',
    'legacy-dist/**/*',
    '**/*.d.ts'
  ],
  env: {
    browser: true,
    node: true
  }
}
