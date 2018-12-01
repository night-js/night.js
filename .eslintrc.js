module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  env: {
    browser: true
  },
  rules: {
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true }
    ],
    'class-methods-use-this': ['error', { exceptMethods: ['extendSettings'] }],
    'new-cap': ['error', { newIsCap: false, capIsNew: false }],
    'max-len': ['error', { ignoreTrailingComments: true }],
    'prettier/prettier': 'error'
  }
};
