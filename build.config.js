// 生成对应环境的配置文件
// @ts-ignore
const path = require('path')
// @ts-ignore
const fs = require('fs')

/**
 * 获取文件路径
 * @param {*} dir  文件
 */
// @ts-ignore
let resolve = dir => path.join(__dirname, '.', dir)

/**
 * 写入配置文件
 * @param {*} sourceFile 需要合并文件的路径
 * @param {*} destFile   需要写入目标文件路径
 */
let copyFile = (sourceFile, destFile) => {
  console.log('========================================================================')
  console.log('读取配置文件:' + sourceFile)
  console.log('========================================================================')
  fs.writeFileSync(destFile, fs.readFileSync(sourceFile))
}

let configFile = ''
// @ts-ignore
switch (process.env.NODE_ENV) {
  case 'development':
    configFile = configFile = resolve('src/config/dev.app.js')
    break
  case 'alpha':
    configFile = resolve('src/config/alpha.app.js')
    break
  case 'uat':
    configFile = resolve('src/config/uat.app.js')
    break
  default:
    configFile = resolve('src/config/prod.app.js')
    break
}

let destFile = resolve('src/config/app.js')

// 写入配置信息
copyFile(configFile, destFile)
