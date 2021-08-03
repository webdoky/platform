module.exports = {
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier-vue/recommended',
    'prettier',
  ],
  env: {
    node: true,
    es6: true,
  },
  plugins: ['gridsome'],
  rules: {
    'gridsome/format-query-block': 'error',
    'prettier-vue/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
  },
  parser: 'vue-eslint-parser',
};
