module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended",
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    quotes: [0, "double"],
    "comma-dangle": [0, "always"],
    semi: [0, "always"],
    "space-before-function-paren": [0, "never"],
    "array-bracket-spacing": [0, "never"],
    "arrow-parens": [0, "as-needed"],
    "no-console": "off"
  },
}
