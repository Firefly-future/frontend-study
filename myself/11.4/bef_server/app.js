const express=require('express')
const axios=require('axios')
const ip=require('ip')
// 配置请求代理
const {createProxyMiddleware}=require('http-proxy-middleware')

const app=express()

app.use(express.static('./dist'))

// 跨域错误
// app.get('/api/list',async (req,response)=>{
//     const res=await axios.get('http://localhost:3000/api/list')
//     response.send(res.data)
// })

// 请求代理  借助http-proxy-middleware插件
const ProxyMiddleware=createProxyMiddleware({
    target:'http://localhost:3000',
    changeOrigin:true
})
app.use('/bw',ProxyMiddleware)

// app.get('/api/user/list',(req,res)=>{
//     res.send({
//         code:200,
//         message:'我是get请求',
//         data:[1,2,3,4,5,6,7,8,9,10]
//     })
// })
const port=3333
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
    console.log(`server is running at http://127.0.0.1:${port}`)
    console.log(`server is running at http://${ip.address()}:${port}`)
})