module.exports = {
  root: true,
  extends: ['./packages/eslint-config-custom'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    'build/',
    '*.min.js'
  ]
};