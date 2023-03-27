module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'airbnb', 'airbnb-typescript', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.jsx', '.ts', '.tsx'],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  root: true,
  rules: {
    'no-param-reassign': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
