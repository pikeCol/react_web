// @ts-nocheck
const webpack = require('webpack')
const config = require('./webpack.base.config.js')
const WebpackDevServer = require('webpack-dev-server')
const PORT = process.env.PORT || 8000
const lessLoaderConf = require('./less-loader.conf')
const path = require('path')

config.entry.main = (config.entry.main || []).concat([
  // 'react-hot-loader/patch', // Code is automatically patched in v4
  `webpack-dev-server/client?http://0.0.0.0:${PORT}/`,
  'webpack/hot/dev-server'
])

// separate css-loader and style-loader in dev and production because dev // need hot reload but extract-text-webpack-plugin not support hot reload
// @ts-ignore
config.module.rules = (config.module.rules || []).concat([
  {
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    loader: 'eslint-loader',
    exclude: /(node_modules)/
  },
  {
    test: /\.less$/,
    include: [path.resolve(__dirname, '..', 'node_modules'), path.resolve(__dirname, '..', 'src/assets/less/common')],
    use: ['style-loader', 'css-loader',
      {
        loader: 'postcss-loader'
      },
      {
        ...lessLoaderConf
      }
    ]
  },
  {
    test: /\.less$/,
    exclude: [path.resolve(__dirname, '..', 'node_modules'), path.resolve(__dirname, '..', 'src/assets/less/common')],
    use: ['style-loader', {
      loader: 'css-loader',
      options: {
        modules: true
      }
    }, 'postcss-loader', 'less-loader']
  }
])

config.plugins = (config.plugins || []).concat([
  new webpack.HotModuleReplacementPlugin()
])
config.mode = 'development'

const compiler = webpack(config)

const server = new WebpackDevServer(compiler, {
  hot: true,
  // noInfo: true,
  quiet: true,
  historyApiFallback: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  inline: true,
  stats: {
    colors: true
  },
  overlay: {
    errors: true
  }
})

server.listen(PORT, 'localhost', () => {
  console.log('')
  console.log('')
  console.log('=====================================================================')
  console.log(`*            启动已经完成，请在浏览器中访问 localhost:${PORT}           *`)
  console.log('=====================================================================')
})
