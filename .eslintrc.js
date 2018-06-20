// @ts-ignore
module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: 'standard',
  
  plugins: [
    'react'
  ],
  // add your custom rules here
  rules: {
    indent: [2, 2, { SwitchCase: 1, VariableDeclarator: 1 }],
    'no-unused-vars': 0,
    // 'prop-types': [2]
  },
  globals: {
    'React': true,
    'Container': true,
    'ConnectedRouter': true
  }
}