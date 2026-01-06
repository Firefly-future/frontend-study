const express = require('express')
const ip = require('ip')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

// 生成 token 的密钥
const privateKey = 'bw-key-abc'


// 生成token，2h内有效
// const token = jwt.sign({ name: '小明' }, privateKey, { expiresIn: '2h' })
// console.log('生成token =========》', token)
// setTimeout(() => {
//   // 解析 token
//   const info = jwt.verify(token, privateKey)
//   console.log(info)
// }, 3000)


const app = express()

app.use(express.static('./dist'))
app.use(express.json())


const readFile = filename => JSON.parse(fs.readFileSync(path.join(__dirname, './data', filename), 'utf-8'))
const writeFile = (filename, content) => fs.writeFileSync(path.join(__dirname, './data', filename), content)


// 登陆
app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  // 校验前端传入的参数是否正确
  if (!username || !password) {
    res.send({
      code: 1001,
      message: '登陆失败，参数错误'
    })
    return
  }
  // 读取数据库，根据前端传入的信息查找用户
  const userList = readFile('userlist.json')
  const user = userList.find(v => v.username === username && v.password === password)
  if (!user) {
    res.send({
      code: 1003,
      message: '用户名或密码错误！'
    })
    return
  }
  // 用户登陆成功，使用 jwt 把用户信息生成 token，给前端返回用户标识
  const token = jwt.sign({
    uid: user.uid,
    username: user.username,
    email: user.email
  }, privateKey, { expiresIn: '2h' })

  res.send({
    code: 200,
    message: '登陆成功',
    token
  })
})

// 注册
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body
  // 校验前端传入的参数是否正确
  if (!username || !email || !password) {
    res.send({
      code: 1001,
      message: '注册失败，参数错误'
    })
    return
  }
  // 读取数据库
  const userList = readFile('userlist.json')
  // 查询用户名和邮箱是否已经被注册
  const user = userList.find(v => v.username === username || v.email === email)
  if (user) {
    res.send({
      code: 1002,
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

// 定义中间件统一解析 token
function checkAuth(req, res, next) {
  // 获取请求头中的 token
  const token = req.headers.authorization.split(' ')[1]
  // 解析token, 把 token 存到 req 对象中
  try {
    const user = jwt.verify(token, privateKey)
    req.user = user
    next()
  } catch(e) {
    res.statusCode = 401
    res.setHeader('content-type', 'text/plain;charset=utf-8')
    res.end('用户信息失效，请重新登陆！')
  }
}

// 查询用户信息
app.get('/api/user/info', checkAuth, (req, res) => {
  setTimeout(() => {
    res.send({
      code: 200,
      message: '成功',
      info: req.user
    })
  }, 1000)
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
app.post('/api/create', checkAuth, (req, res) => {
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


const PORT = 10086
app.listen(PORT, () => {
  console.log(`running http://localhost:${PORT}`)
  console.log(`running http://127.0.0.1:${PORT}`)
  console.log(`running http://${ip.address()}:${PORT}`)
})