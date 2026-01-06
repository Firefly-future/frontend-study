const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')

module.exports = {
    entry: {
        index: './src/home/index/index.js'
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
            template: './src/home/index/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[hash:8].css'
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@util': path.resolve(__dirname, 'src/util'),
            '@scss': path.resolve(__dirname, 'src/scss')
        }
    }
}