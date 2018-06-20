const lessToJs = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

// 自定义antd主题
const themes = lessToJs(fs.readFileSync(path.join(__dirname, '../src/assets/less/theme.less'), 'utf8'))

module.exports = {
  loader: 'less-loader',
  options: {
    javascriptEnabled: true,
    modifyVars: themes,
    minimize: true
  }
}
