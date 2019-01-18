module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb',
  settings: {
    react: {
      pragma: 'React',
      version: '16.3',
    },
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react'],
  globals: {
    API_HOST: false,
    KEY_WARDEN_HOST: false,
    CARTO_API_KEY: false,
    CARTO_USER: false,
    CARTO_SERVER_URL: false,
    TEGOLA_SERVER_URL: false,
    MAPBOX_ACCESS_TOKEN: false
  },
  rules: {
    'no-console': ['error', {'allow': ['warn', 'error']}],
    'newline-per-chained-call': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'linebreak-style': ['error', 'unix'],
    'jsx-quotes': ['error', 'prefer-single'],
    semi: ['error', 'never'],
    'no-case-declarations': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight', 'to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'react/forbid-prop-types': ['error', { forbid: ['any'] }],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true },
        ObjectPattern: { multiline: true },
      },
    ],
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['+', '-', '*', '/', '%', '**'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: true,
      },
    ],
    'react/sort-comp': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.js', '**/*.spec.js', '**/setup-jest.js', 'webpack.**.config.js'] },
    ],
    'import/newline-after-import': ['error', { count: 2 }],
    'jsx-a11y/label-has-for': 'off',
    'no-shadow': 'off',
    'max-len': [
      'error',
      { code: 100, tabWidth: 2, ignoreStrings: false, ignoreTemplateLiterals: false },
    ],
    'no-param-reassign': ['error', { props: false }],
    'react/no-did-mount-set-state': 'off',
    'react/no-did-update-set-state': 'off',
    radix: ['error', 'as-needed'],
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    camelcase: 'off',
  },
}
