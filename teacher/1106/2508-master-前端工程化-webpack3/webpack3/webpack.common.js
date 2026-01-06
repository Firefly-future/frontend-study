const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: {
    index: './src/pages/home/index.js',
    detail: './src/pages/detail/detail.js',
    player: './src/pages/player/player.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name]-[hash:12].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(scss|css|sass)$/,
        use: [
          MiniCssExtractPlugin.loader, // 把 js 中的 css 代码抽离成一个单独的文件
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|webp|svg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 12kb
          }
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/home/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/detail/detail.html',
      filename: 'detail.html',
      chunks: ['detail']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/player/player.html',
      filename: 'player.html',
      chunks: ['player']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:8].css'
    })
  ],
  // 添加路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      Utils: path.resolve(__dirname, 'src/utils'),
    },
  }
}