const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        index: './src/public/index/index.js',
        player: './src/public/player/player.js',
        detail: './src/public/detail/detail.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name]-[hash:12].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use: `babel-loader`
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                }
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/public/index/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/public/player/player.html',
            filename: 'player.html',
            chunks: ['player']
        }),
        new HtmlWebpackPlugin({
            template: './src/public/detail/detail.html',
            filename: 'detail.html',
            chunks: ['detail']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[hash:8].css'
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@util': path.resolve(__dirname, 'src/util'),
            '@scss': path.resolve(__dirname, 'src/scss'),
            '@public': path.resolve(__dirname, 'src/public')
        }
    }
    // devServer:{
    //     port:3000,
    //     proxy:{
    //         context:'/api',
    //         target:'http://localhost:3001',
    //         pathRewrite:{
    //             '^/api':''
    //         }
    //     }
    // }
}