const path = require('path');

module.exports = {
  extends: [
    'react-app',
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/react',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['jsx-a11y', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/extensions': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'import/no-cycle': 0,
    'no-nested-ternary': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
};
