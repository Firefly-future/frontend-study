const path = require('path')
const common = require('./webpack.common.js')
const { merge }=require('webpack-merge')
const Dotenv=require('dotenv-webpack')

module.exports=merge(common,{
    mode:'production',
    devtool:'eval-source-map',
    plugins:[
        new Dotenv({
            path:path.resolve(__dirname,'./.prod.env')
        })
    ]
})