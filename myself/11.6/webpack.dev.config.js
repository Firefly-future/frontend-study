const path=require('path')
const HtmlwebpackPlugin=require('html-webpack-plugin')


module.exports=({

    // 配置打包后的前后 映射关系
    devtool:'source-map',
    // 入口
    entry:'./src/index.js',

    // 出口
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'main.js',
    },

    // loader加载器
    module:{
        rules:[
            {
                test:/\.(css|sass|scss)$/,
                use:['style-loader','css-loader','sass-loader']
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
            }
        ]
    },

    // 插件
    plugins:[
        new HtmlwebpackPlugin({
            template:'./src/index.html'
        })
    ],

    // 服务
    devServer:{
        port:3333
    }
})