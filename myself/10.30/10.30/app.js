const express = require('express')
const ip = require('ip')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

// 生成token的密钥
const privateKey = 'bw-key-abc'

// 生成token 2h内有效
// const token=jwt.sign({name:'xiaoming'},privateKey,{expiresIn:"2h"})
// console.log('生成token',token)
// setTimeout(()=>{
//     const info=jwt.verify(token,privateKey)
//     console.log(info)
// },2000)

// 创建服务器应用
const app = express()
// 处理静态资源
app.use(express.static('./dist'))
// 让post接口可以接收json格式的参数
app.use(express.json())

//封装读取数据库函数与写入数据库函数
const readFile = filename => JSON.parse(fs.readFileSync(path.join(__dirname, './data', filename), 'utf-8'))
const writeFile = (filename, content) => fs.writeFileSync(path.join(__dirname, './data', filename), content)


// 登录接口
app.post('/api/login',(req,res)=>{
    // 接收前端传入的参数
    const {username,password}=req.body
    // 判断传入的参数是否正确
    if(!username||!password){
        res.send({
            code:1000,
            message:'参数错误'
        })
        return
    }
    // 参数正确 读取数据库 根据前端传入的信息查找用户
    const userList=readFile('userlist.json')
    const user=userList.find(v=>v.username===username&&v.password===password)
    if(!user){
        res.send({
            code:1000,
            message:'用户名或密码错误'
        })
        return
    }
    // 用户登录成功，使用jwt把用户信息生成token，给前端返回用户标识
    const token=jwt.sign({
        uid:user.uid,
        username:user.username,
        email:user.email,
    },privateKey,{expiresIn:'2h'})
    res.send({
        code:200,
        message:'登录成功',
        token
    })
})

// 注册接口
app.post('/api/register', (req, res) => {
    // 获取前端传入的参数
    const { username, email, password } = req.body
    // 判断传入的参数是否正确
    if (!username || !email || !password) {
        res.send({
            code: 1000,
            message: '参数错误'
        })
        return
    }
    // 读取数据库 
    const userList = readFile('userlist.json')
    // 判断数据库中是否有相同的用户名或邮箱
    const user = userList.find(v => v.username === username || v.email === email)
    if (user) {
        res.send({
            code: 1000,
            message: '用户名或邮箱已被注册'
        })
        return
    }
    // 将前端传入的参数添加至数据库中
    userList.push({
        uid: (userList[userList.length - 1]?.uid || 0) + 1,
        username,
        email,
        password
    })
    writeFile('userlist.json',JSON.stringify(userList))
    res.send({
        code:200,
        message:'注册成功'
    })
})

// 定义中间件统一解析token
function checkAuth(req,res,next){
    // 获取请求头中的token
    const token=req.headers.authorization.split(' ')[1]
    try{
        const user=jwt.verify(token,privateKey)
        req.user=user
        next()
    }catch(e){
        res.statusCode=401
        res.setHeader('content-type','text/plain;charset=utf-8')
        res.end('用户信息失效，请重新登录')
    }
}
// 检查用户信息
app.get('/api/user/info',checkAuth,(req,res)=>{
    setTimeout(()=>{
        res.send({
            code:200,
            message:'成功',
            info:req.user
        })
    },1000)
})

// 查询文章列表
app.get('/api/article/list', checkAuth, (req, res) => {
  // 读取数据库
  const articleList = readFile('articles.json')
  const userList = readFile('userlist.json')
  res.send({
    code: 200,
    message: '成功',
    values: articleList.map(item => {
      const user = userList.find(v => v.uid === item.authorId)
      return {
        ...item,
        authorName: user?.username || '未知'
      }
    })
  })
})

// 发布文章
app.post('/api/article/create', checkAuth, (req, res) => {
  const { title, content } = req.body
  if (!title || !content) {
    res.send({
      code: 1002,
      message: '参数错误'
    })
    return
  }
  // 读取数据库
  const articleList = readFile('articles.json')
  articleList.unshift({
    id: (articleList[articleList.length - 1]?.id || 0) + 1,
    authorId: req.user.uid,
    updateTime: new Date(),
    title,
    content
  })
  // 写入文件
  writeFile('articles.json', JSON.stringify(articleList))
  res.send({
    code: 200,
    message: '成功'
  })
})




// 定义端口号
const PORT = 5051
app.listen(PORT, () => {
    console.log(`running http://localhost:${PORT}`)
    console.log(`running http://127.0.0.1:${PORT}`)
    console.log(`running http://${ip.address()}:${PORT}`)
})