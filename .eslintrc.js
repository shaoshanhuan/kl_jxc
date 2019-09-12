module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    "no-alert": 2,
    "no-const-assign": 2,
    "no-dupe-keys": 2,
    "no-dupe-args": 2,
    "no-duplicate-case": 2,
    "no-empty": 2,
    "no-extra-parens": 2,
    "no-multiple-empty-lines": [2, {"max": 2}],
    "no-redeclare": 2,
    "no-sequences": 2,
    "no-sparse-arrays": 2,
    "no-undef": 1,
    "no-use-before-define": 2 ,
    "no-var": 2,
    "array-bracket-spacing": [2, "never"],
    "brace-style": [2, "1tbs"],
    "comma-spacing": 2,
    "comma-dangle": [2, "never"],
    "eqeqeq": 2,
    "indent": [2, 4],
    "semi": [2, "always"],
    "quotes": [2, "single"],
    "no-parsing-error": 0,
    "vue/no-parsing-error": 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
