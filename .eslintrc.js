module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'airbnb-base',
    'plugin:nuxt/recommended'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    quotes: [1, 'single'],
    'comma-dangle': [0, 'always'],
    semi: [0, 'always'],
    'space-before-function-paren': [0, 'never'],
    'array-bracket-spacing': [0, 'never'],
    'arrow-parens': [0, 'as-needed'],
    'no-console': 'off',
    // semi: [1, 'always'],
    'vue/attribute-hyphenation': [
      'off',
      {
        ignore: []
      }
    ],
    // 'vue/html-self-closing': [
    //   'error',
    //   {
    //     html: {
    //       void: 'always',
    //       normal: 'never',
    //       component: 'always',
    //     },
    //     svg: 'always',
    //     math: 'always',
    //   },
    // ],
    'max-len': 0,
    'import/newline-after-import': 'off',
    'no-param-reassign': ['error', { props: false }],
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea', 'template']
      }
    ],
    'no-shadow': 'off'
  },
  settings: {
    'import/resolver': {
      nuxt: {
        extensions: ['.js', '.vue']
      }
    }
  }
};
