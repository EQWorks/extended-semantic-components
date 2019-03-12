module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
    'jest': true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.7',
    },
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    ecmaVersion: 6,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
      { 'avoidEscape': true },
    ],
    'semi': [
      'error',
      'never',
    ],
    'no-console': [
      'warn'
    ],
    'comma-dangle': [
      'error',
      'only-multiline'
    ],
    'eol-last': [
      'error',
    ],
    'no-trailing-spaces': [
      'error',
    ],
    'key-spacing': [
      'error',
    ],
    'keyword-spacing': [
      'error',
    ],
    'react/jsx-tag-spacing': [
      'error',
    ]
  },
}
