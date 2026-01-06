const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// webpack 运行时会从入口文件开始打包，查找所有依赖项，构建依赖视图，找到所有文件后开始打包，输出成一个或者多个 js 文件

// webpack 配置项，运行 webpack 时会自动读取此文件的内容
module.exports = {
  mode: 'development',
  // 入口文件，webpack 从此文件开始打包，默认只能处理 js 文件
  entry: './src/index.js',
  // 配置出口，打包之后输出的目录和文件
  output: {
    // 输出的文件夹名称，必须是绝对路径
    path: path.resolve(__dirname, 'build'),
    // 输出的文件名称
    filename: 'main.js'
  },
  // loader 加载器，让 webpack 可以解析其他类型的文件
  module: {
    rules: [
      {
        // npm i -D sass-loader css-loader style-loader sass
        test: /\.(scss|css|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
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
      }
    ]
  },
  // 插件
  plugins: [
    // webpack 打包时自动生成一个 html 文件，并且自动把打包后的 js 引入到 html
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  // 配置开发服务器
  devServer: {
    port: 3000
  }
}