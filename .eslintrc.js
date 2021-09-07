module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "airbnb-base",
    "plugin:nuxt/recommended"
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    quotes: [0, "double"],
    "comma-dangle": [0, "always"],
    semi: [0, "always"],
    "space-before-function-paren": [0, "never"],
    "array-bracket-spacing": [0, "never"],
    "arrow-parens": [0, "as-needed"],
    "no-console": "off",
    // semi: [1, 'always'],
    "vue/attribute-hyphenation": [
      "off",
      {
        ignore: []
      }
    ],
    "vue/html-self-closing": [
      "off",
      {
        html: {
          void: "never",
          normal: "never",
          component: "always"
        },
        svg: "always",
        math: "always"
      }
    ],
    "max-len": 0,
    "import/newline-after-import": "off"
  },
  settings: {
    "import/resolver": {
      nuxt: {
        extensions: [".js", ".vue"]
      }
    }
  }
};
