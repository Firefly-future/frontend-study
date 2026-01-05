const express = require('express')
const ip=require('ip')

const app=express()



// app.use(express.json())
// 在后端设置Access-Control-Allow-Origin头信息 允许所有域名访问
app.get('/api/list',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send({
        code:200,
        message:'我是get请求',
        data:[1,2,3,4,5,6,7,8,9,10]
    })
})


app.get('/user/list',(req,res)=>{
    res.send({
        code:200,
        message:'我是delete请求',
        data:[1,2,3,4,5,6,7,8,9,10]
    })
})

app.post('/api/list',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')     
    res.send({
        code:200,
        message:'我是post请求',     
        data:[1,2,3,4,5,6,7,8,9,10]
    })
})
app.put('/api/list',(req,res)=>{
    // res.setHeader('Access-Control-Allow-Origin','*')     
    res.send({
        code:200,
        message:'我是put请求',     
        data:[1,2,3,4,5,6,7,8,9,10]
    })
})
app.delete('/api/list',(req,res)=>{
    // res.setHeader('Access-Control-Allow-Origin','*')     
    res.send({
        code:200,
        message:'我是delete请求',     
        data:[1,2,3,4,5,6,7,8,9,10]
    })
})
const userList={
    name:'小白',
    name:'小蝶',
    lucky:'喝掉'
}
// 后端返回jsonp格式数据
app.get('/api/jsonp/list',(req,res)=>{
    res.setHeader('content-type','application/javascript;charset=utf-8')
    res.end(`window.jsonp_callback(${JSON.stringify(userList)})`)
})


const port=3334
app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`) 
    console.log(`server is running http://127.0.0.1:${port}`)
    console.log(`server is running http://${ip.address()}:${port}`)
})