module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
      },
    "extends": "airbnb",
    "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react",
  ],
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx"]
      }
    ],
    "no-console": "off",
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "jsx-quotes": [
      "error",
      "prefer-single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-case-declarations": 0,
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "hrefLeft", "hrefRight", "to" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }],
    "react/forbid-prop-types": ["error", { "forbid": ['any'] }],
    "object-curly-newline": ["error", {
      "ObjectExpression": { "multiline": true },
      "ObjectPattern": { "multiline": true }
    }],
    "no-mixed-operators": [
      "error",
      {
        "groups": [
          ["+", "-", "*", "/", "%", "**"],
          ["&", "|", "^", "~", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"]
        ],
        "allowSamePrecedence": true
      }
    ],
    "react/sort-comp": "off",
    "no-restricted-syntax": "off",
    "no-underscore-dangle": "off",
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/mouse-events-have-key-events": "off",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ['**/*.test.js', '**/*.spec.js', '**/setup-jest.js']}],
    "import/newline-after-import": ["error", { "count": 2 }],
    "jsx-a11y/label-has-for": "off",
    "no-shadow": "off",
    "max-len": ["error", {"code": 100, "tabWidth": 2, "ignoreStrings": false, "ignoreTemplateLiterals": false,}],
    "no-param-reassign": ["error", { "props": false }],
    'react/no-did-mount-set-state': 'off',
    'radix': ["error", "as-needed"],
    "import/prefer-default-export": "off",
  }
};
