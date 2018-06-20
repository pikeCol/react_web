const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('./webpack.base.config')
const lessLoaderConf = require('./less-loader.conf')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

config.mode = 'production'
config.optimization = {
  splitChunks: {
    chunks: 'async',
    // minChunks: 1, // what means about minChunks ?
    name: 'common'
  },
  minimize: true,
  runtimeChunk: {
    name: 'runtime'
  }
}
config.performance = {
  hints: false
}

// @ts-ignore
config.module.rules = (config.module.rules || []).concat([
  {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    loader: 'strip-loader?strip[]=debug,strip[]=console.log,strip[]=alert'
  },
  {
    test: /\.less$/,
    include: [path.resolve(__dirname, '..', 'node_modules'), path.resolve(__dirname, '..', 'src/assets/less/common')],
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader',
        options: {
          minimize: true
        }
      },
      'postcss-loader',
      {...lessLoaderConf}
      ]
    })
  },
  {
    test: /\.less$/,
    exclude: [path.resolve(__dirname, '..', 'node_modules'), path.resolve(__dirname, '..', 'src/assets/less/common')],
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader',
        options: {
          minimize: true,
          modules: true,
          localIdentName: '[hash:base64:6]'
        }
      },
      'postcss-loader', 'resolve-url-loader', 'less-loader']
    })
  }
])

config.plugins = (config.plugins || []).concat([
  new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, '../')
  }),
  new ExtractTextPlugin({
    filename: 'static/css/app.[chunkhash].css',
    allChunks: true
  }),
  new OptimizeCSSPlugin({
    cssProcessorOptions: {
      safe: true
    }
  }),
  new CompressionWebpackPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp(
      '\\.(js|css|png|jpg|gif|svg)$'
    ),
    threshold: 10240,
    minRatio: 0.8
  }),
  new webpack.HashedModuleIdsPlugin()
])

module.exports = config
