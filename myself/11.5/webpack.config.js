const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// webpack 运行时会从入口文件开始打包，查找所有依赖项，构建依赖视图，找到所有文件之后开始打包
// 输出成一个或者多个js文件

// webpack配置项 运行webpack时会自动读取此文件的内容
module.exports = {
    // 当设置为 development 时，Webpack 会以开发模式运行。
    // 在这种模式下，Webpack 会优化打包速度，而不是优化打包后的文件大小。
    // 它会生成更易读的代码，方便开发和调试。
    // 为 production 模式时 Webpack 以生产模式运行  会进行压缩
    mode: 'development',

    // 入口文件 webpack从此文件开始打包，默认只能处理js文件
    // 入口不配置 默认 ./src/index.js
    entry: './src/index.js',
    // 配置出口 打包之后输出的目录和文件 对象形式
    // 出口不配置的话 默认 ./dist/main.js
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js'
    },
    // loader 加载器，让webpack 可以解析其他类型的文件
    module: {
        rules: [
            {
            // 安装 sass css类的插件
            // npm i -D sass-loader css-loader style-loader sass
            test: /\.(scss|css|sass)$/,
            use: ['style-loader','css-loader','sass-loader']
            },
            {
                // 图片
                test:/\.(png|jpe?g|webp|svg|gif)$/,
                type:'asset',
                parser:{
                    dataUrlCondition:{
                        maxSize:8*1024     //默认小于8kb以下的会转换为
                    }
                }
            },
            {
                test:/\.html$/,
                use:'html-loader'
            }
        ]
    },
    // 插件
    plugins:[
        // webpack打包时自动生成一个html文件，并且自动把打包后的js引入到html
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    // 配置开发服务器
    devServer:{
        port:5055
    }
}