const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const Dotenv = require('dotenv-webpack') 

module.exports = merge(common, {
  devtool: 'eval-source-map',
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, './.dev.env')
    })
  ],
  // 配置开发服务器
  devServer: {
    port: 3000,
    // 配置代理
    // proxy: [
    //   {
    //     context: ['/bw'],
    //     target: 'http://localhost:8002',
    //     pathRewrite: { '^/bw': '' },
    //   },
    // ]
  }
})