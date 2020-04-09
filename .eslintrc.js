const {
  rules: bpRules
} = require('eslint-config-airbnb-base/rules/best-practices')
const { rules: styleRules } = require('eslint-config-airbnb-base/rules/style')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/camelcase': styleRules.camelcase,
    'vue/eqeqeq': bpRules.eqeqeq,
    'vue/no-restricted-syntax': styleRules['no-restricted-syntax'],
    'vue/component-name-in-template-casing': 0,
    'vue/match-component-file-name': 0,
    'vue/no-boolean-default': 0,
    'vue/require-direct-export': 0,
    'vue/v-on-function-call': 0,
    'promise/always-return': 0,
    'vue/no-parsing-error': 1
  }
}
