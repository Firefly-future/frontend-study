const express=require('express')
const fs=require('fs')
const ip=require('ip')
const path=require('path')
const jwt=require('jsonwebtoken')

const app=express()
app.use(express.static(path.join(__dirname,'./dist')))
app.use(express.json())

app.get('/api/questions',(req,res)=>{
    const data=JSON.parse(fs.readFileSync(path.join(__dirname,'./data/data.json'),'utf-8'))
    res.send({
        code:200,
        message:'获取成功',
        total:data.length,
        totalScore:data.reduce((prev,val)=>prev+val.score,0),
        data:data.map(item=>{
            const {answer,...other}=item
            return {
                ...other
            }
        })
    })
})

app.post('/api/submit',(req,res)=>{
    const {questions}=req.body
    const data=JSON.parse(fs.readFileSync(path.join(__dirname,'./data/data.json'),'utf-8'))
    // 遍历所有的题目
    const totalScore=data.reduce((prev,val)=>{
        // 默认错误答案
        val.isError=true
        // 用所有的题目的id找前端传入的答案中对应的题
        const currentQuestion=questions.find(v=>v.id===val.id)
        // 如果没有找到 即前端未传入题目答案 此题0分
        if(!currentQuestion){
            return prev
        }
        // 找到了 判断单选多选
        let score=0
        if(val.type==='single'&&val.answer===currentQuestion.answer){
            score=val.score
            val.isError=false
        }else if(val.type==='multiple'&&val.answer.length===currentQuestion.answer.length){
            if(val.answer.every(v=>currentQuestion.answer.includes(v))){
                score=val.score
                val.isError=false
            }
        }
        // 将前端传入的参数放入val中
        val.userAnswer=currentQuestion.answer
        return prev+score
    },0)
    res.send({
        code:200,
        message:'成功',
        totalScore,
        correctLength:data.filter(v=>!v.isError).length,
        data
    })
})

const PORT=5020
app.listen(PORT,()=>{
    console.log(`running http://localhost:${PORT}`)
    console.log(`running http://127.0.0.1:${PORT}`)
    console.log(`running http://${ip.address()}:${PORT}`)
})