module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'jest',
    '@typescript-eslint',
  ],
  rules: {
    "semi": 0
  },
  settings: {
    'import/resolver': {
      typescript: {
        extensions: ['ts'],
      },
    },
  },
}
