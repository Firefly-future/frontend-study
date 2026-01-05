const express = require('express')
const fs = require('fs')
const path = require('path')
const ip = require('ip')
const jwt = require('jsonwebtoken')

const privateKey = 'bw-jwt-abc'

const app = express()
app.use(express.static('./dist'))
app.use(express.json())


const readFile = filename => JSON.parse(fs.readFileSync(path.join(__dirname, './data', filename), 'utf-8'))
const writeFile = (filename, content) => fs.writeFileSync(path.join(__dirname, './data', filename), content)
// 登录端口
app.post('/api/login', (req, res) => {
    const { username, password } = req.body
    // 判断前端输入的参数是否正确
    if (!username || !password) {
        res.send({
            code: 1000,
            message: '参数错误'
        })
        return
    }
    // 读取数据库 根据前端传入的参数查找用户    
    const userList = readFile('userlist.json')
    const user = userList.find(item => item.username === username && item.password === password)
    if (!user) {
        res.send({
            code: 1001,
            message: '用户名或密码错误'
        })
        return
    }
    const token = jwt.sign({
        uid: user.uid,
        username: user.username,
        email: user.email
    }, privateKey, { expiresIn: '24h' })
    res.send({
        code: 200,
        message: '登录成功',
        token
    })
})
// 注册端口
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body
    // 判断前端传参是否正确
    if (!username || !password || !email) {
        res.send({
            code: 1000,
            message: '参数错误'
        })
        return
    }
    // 读取数据库
    const userList = readFile('userlist.json')
    // 查询用户名 或邮箱是否已经被注册
    const user = userList.find(v => v.username === username || v.email === email)
    if (user) {
        res.send({
            code: 1001,
            message: '用户名或邮箱已被注册'
        })
        return
    }
    // 添加到数据库中
    userList.push({
        uid: (userList[userList.length - 1]?.uid || 0) + 1,
        username,
        email,
        password
    })
    writeFile('userlist.json', JSON.stringify(userList))
    res.send({
        code: 200,
        message: '注册成功'
    })
})


// 定义中间件统一解析token
function checkToken(req, res, next) {
    // 获取请求头中的token
    const token = req.headers.authorization.split(' ')[1]
    // 解析token，将token解析放入req对象中
    try {
        const user = jwt.verify(token, privateKey)
        req.user = user
        next()
    } catch (e) {
        res.statusCode = 401
        res.setHeaders('Content-Type', 'text/plain;charset=utf-8')
        res.end('用户信息失效，请重新登录')
    }
}
// 获取用户信息
app.get('/api/user/info', checkToken, (req, res) => {
    setTimeout(() => {
        res.send({
            code: 200,
            message: '获取成功',
            info: req.user
        })
    }, 1000)
})

// 发布文章
app.post('/api/create/article', checkToken, (req, res) => {
    const { title, content } = req.body
    if (!title || !content) {
        res.send({
            code: 1000,
            message: '参数错误'
        })
        return
    }
    const articleList = readFile('articlelist.json')
    articleList.unshift({
        id: (articleList[0]?.id || 0) + 1,
        title,
        content,
        authorId: req.user.uid,
        createTime: new Date().toLocaleString()
    })
    writeFile('articlelist.json', JSON.stringify(articleList))
    res.send({
        code: 200,
        message: '发布成功'
    })
})

// 获取文章列表
app.get('/api/article/list', checkToken, (req, res) => {
    // 读取数据库
    const articleList = readFile('articlelist.json').filter(v => !v.isDel)
    const userList = readFile('userlist.json')
    res.send({
        code: 200,
        message: '获取成功',
        values: articleList.map(item => {
            const user = userList.find(v => v.uid === item.authorId)
            return {
                ...item,
                authorName: user?.username || '未知'
            }
        })
    })
})

app.post('/api/remove', checkToken, (req, res) => {
    const { id } = req.body
    // 读取文档库，检查数据库中是否有id对应的文章存在
    const articleList = readFile('articlelist.json')
    const index = articleList.findIndex(v => v.id === Number(id))
    if (index === -1 || articleList[index]?.isDel) {
        res.send({
            code: 1000,
            message: '此文章已被删除或不存在'
        })
        return
    }
    // 判断当前用户是否有权限删除此文章
    if (req.user.uid !== articleList[index].authorId) {
        res.send({
            code: 1002,
            message: '用户没有权限删除此文章'
        })
        return
    }
    // 标记此文章已被删除
    articleList[index].isDel = true
    // 写入文件
    writeFile('articlelist.json', JSON.stringify(articleList))
    res.send({
        code: 200,
        message: '删除成功'
    })
})


// 编辑端口
app.post('/api/update', checkToken, (req, res) => {
    const { id,title,content} = req.body
    const articleList=readFile('articlelist.json')
    const index=articleList.findIndex(v=>v.id===Number(id))
    if(index===-1||articleList[index]?.isDel){
        res.send({
            code:1000,
            message:'此文章不存在或已被删除'
        })
        return 
    }
    if(req.user.uid!==articleList[index].authorId){
        res.send({
            code:1001,
            message:'对于此文章您没有权限'
        })
        return
    }
    articleList[index].title=title
    articleList[index].content=content
    articleList[index].updateTime=new Date().toLocaleString()
    writeFile('articlelist.json',JSON.stringify(articleList))
    res.send({
        code:200,
        message:'编辑成功'
    })
})

const PORT = 7071
app.listen(PORT, () => {
    console.log(`服务器启动成功 http://localhost:${PORT}`)
    console.log(`服务器启动成功 http://127.0.0.1:${PORT}`)
    console.log(`服务器启动成功 http://${ip.address()}:${PORT}`)
})