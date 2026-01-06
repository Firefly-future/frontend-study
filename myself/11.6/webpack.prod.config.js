const path=require('path')
const HtmlwebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')

module.exports=({
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'main-[hash:12].js',
        clean:true
    },
    module:{
        rules:[
            {
                test:/\.(scss|css|sass)$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test:/\.(jpe?g|png|webp|svg|gif)$/,
                type:'asset',
                parser:{
                    dataUrlCondition:{
                        maxSize:8*1024
                    }
                }
            },
            {
                test:/\.html$/,
                use:'html-loader'
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:'babel-loader'
            }
        ]
    },
    plugins:[
        new HtmlwebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'main-[hash:8].css'
        })
    ],
    devServer:{
        port:3334
    }
})