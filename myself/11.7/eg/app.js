const path=require('path')
const express=require('express')
const ip=require('ip')
const axios=require('axios')
// const {createPorxyMiddleware}=require('http-proxy-middleware')

const app=express()
app.use(express.static('./dist'))
app.use(express.json())


app.get("/api/city",async (req,res)=>{
 const {name}=req.query
 res.send({
    code:200,
    message:'请求成功'
 })
})






const PORT=3355
app.listen(PORT,()=>{
    console.log(`running  http://localhost:${PORT}`)
    console.log(`running  http://127.0.0.1:${PORT}`)
    console.log(`running  http://${ip.address()}:${PORT}`)
})