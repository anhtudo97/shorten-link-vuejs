module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    document: true,
    foo: true,
    window: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'prettier', 'prettier/vue', 'plugin:nuxt/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/no-v-html': 'off',
  },
};
