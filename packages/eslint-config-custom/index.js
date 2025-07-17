module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
};
