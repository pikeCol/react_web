// @ts-nocheck
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Stylish = require('webpack-stylish')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

// 配置本地环境和build 的项目路径
const ASSET_PATH = process.env.NODE_ENV === 'development' ? '/' : './'

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      path.resolve(__dirname, '../src/main.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: ASSET_PATH,
    filename: '[name].js',
    chunkFilename: 'static/js/app.[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          publicPath: '../../',
          limit: 10000,
          name: 'static/images/[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.web.js', '.js', '.jsx', '.json', '.less', '.css'],
    alias: {
      '~': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@views': path.resolve(__dirname, '../src/views'),
      '@images': path.resolve(__dirname, '../src/assets/images'),
      '@less': path.resolve(__dirname, '../src/assets/less'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@servers': path.resolve(__dirname, '../src/servers'),
      '@redux': path.resolve(__dirname, '../src/redux')
    }
  },
  mode: '',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React 脚手架',
      template: path.resolve(__dirname, '../src/index.html'),
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      showErrors: true
      // minify: true,
      // inject: true,
    }),
    new Stylish(),
    new FriendlyErrorsWebpackPlugin(),
    new BundleAnalyzerPlugin({openAnalyzer: false})
  ]
}
