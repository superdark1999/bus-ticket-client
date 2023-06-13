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
    'max-len': ['error', { code: 120, ignoreStrings: true }],
    'react/jsx-indent': ['error', 2],
    'no-param-reassign': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'import/no-extraneous-dependencies': 0,
    'react/function-component-definition': 0,
    'no-nested-ternary': 0,
    'react/jsx-props-no-spreading': 0,
    'no-plusplus': 0,
    'react/require-default-props': 0,
    'no-console': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 'warn',
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/*': 0,
  },
};
