const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    // plugins: [
    //     new Dotenv({
    //         path: path.resolve(__dirname, './.dev.env')
    //     })
    // ],
    devServer: {
        port: 3000,
        proxy:[{
            context:['/bw'],
            target:'http://localhost:3001',
            changeOrigin: true
                // pathRewrite:{
                //     '^/bw':''
                // }
        }]
    }
})