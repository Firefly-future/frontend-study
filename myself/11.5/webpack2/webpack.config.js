const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    // 模式
    // mode: 'development',
    // mode:'production'
    // 配置代码前后的映射关系，方便调试
    devtool:'source-map',
    // 入口
    entry: {
        index: './src/index/index.js',
        login: './src/login/login.js',
        detail: './src/detail/detail.js'
    },
    // 出口
    output: {
        path: path.resolve(__dirname, 'build'), // 打包后的文件路径
        filename: '[name]-[hash:8].js',// 打包后的文件名
        clean: true // 打包前清理之前的文件
    },
    module: { // 模块
        rules: [{ //规则
            test: /\.js$/, // 匹配.js文件
            exclude: /node_modules/, // 排除node_modules目录
            use: 'babel-loader' // 使用babel-loader处理.js文件
        },
        {
            test: /\.(scss|css|sass)$/, // 匹配.scss、.css、.sass文件
            use: [
                MiniCssExtractPlugin.loader, // 提取CSS到单独的文件
                // 'style-loader', // 内联样式
                'css-loader', // 处理CSS文件
                'sass-loader' // 处理SASS文件
            ]
        },
        {
            test: /\.(jpe?g|png|webp|gif|svg)$/, // 匹配图片文件
            type: 'asset', // 图片文件处理为资源模块
            parser: {   // 图片文件解析器
                dataUrlCondition: {  // 图片文件小于8KB转换为base64编码
                    maxSize: 8 * 1024 // 8KB 
                }
            }
        },
        {
            test: /\.html$/, // 匹配HTML文件
            use: 'html-loader'  // 使用html-loader处理HTML文件
        }
        ]
    },
    plugins: [  //插件
        new HtmlWebpackPlugin({
            template: './src/index.html', // 模板HTML文件
            filename: 'index.html', // 输出HTML文件名
            chunks: ['index'] // 关联的入口文件
        }),
        new HtmlWebpackPlugin({
            template: './src/login.html', // 模板HTML文件
            filename: 'login.html', // 输出HTML文件名
            chunks: ['login'] // 关联的入口文件
        }),
        new HtmlWebpackPlugin({
            template: './src/detail.html', // 模板HTML文件
            filename: 'detail.html', // 输出HTML文件名
            chunks: ['detail'] // 关联的入口文件
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash:8].css'
        })
    ],
    // 添加路径别名
    resolve: { // 解析模块路径
        alias: {  // 路径别名 
            '@': path.resolve(__dirname, 'src/index'), // @ 指向 src/index 目录
            util: path.resolve(__dirname, 'src/util')
        }
    },
    // 配置开发服务器
    devServer: {
        port: 3000, //开发的服务器端口
        // 配置代理
        // proxy:[
        //     {
        //         // 匹配 /bw 开头的请求
        //         context:['/bw'],
        //         // 目标服务器地址
        //         target:'http://localhost:3334',
        //         // 改变请求路径，去掉 /bw 前缀
        //         pathRewrite:{'^/bw':''}
        //     }
        // ]
    }
}