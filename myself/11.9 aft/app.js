const express =require('express')
const path=require('path')
const ip=require('ip')
const fs=require('fs')


const app=express()


app.get('/bw/api/zome',(req,res)=>{
    const {name}=req.query
    const data=JSON.parse(fs.readFileSync(path.resolve(__dirname,'./data/zh.json'),'utf-8'))
    res.send({
        code:200,
        msg:'success',
        data
    })
})

app.get('/bw/api/num',(req,res)=>{
    const {name}=req.query
    const data=JSON.parse(fs.readFileSync(path.resolve(__dirname,'./data/xl.json'),'utf-8'))
    res.send({
        code:200,
        msg:'success',
        data
    })
})

app.get('/bw/api/new',(req,res)=>{
    const {name}=req.query
    const data=JSON.parse(fs.readFileSync(path.resolve(__dirname,'./data/sx.json'),'utf-8'))
    res.send({
        code:200,
        msg:'success',
        data
    })
})






const port=3001
app.listen(port,()=>{
    console.log(`server is running   http://localhost:${port}`)
    console.log(`server is running   http://127.0.0.1:${port}`)
    console.log(`server is running   http://${ip.address()}:${port}`)
})