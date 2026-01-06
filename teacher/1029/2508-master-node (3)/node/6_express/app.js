const express = require('express')
const fs = require('fs')
const path = require('path')

// 创建服务器应用
const app = express()

// 处理静态资源
app.use(express.static('./dist'))

// 让 post 接口可以接收 json 格式的参数
app.use(express.json())
// 让 post 接口可以接收 urlencoded 格式的参数 'name=小明&age=100'
app.use(express.urlencoded())

// 定义 get 接口
app.get('/api/user/list', (req, res) => {
  console.log('前端传入的参数', req.query)
  const { page, pagesize } = req.query
  // 读取数据库
  const userList = JSON.parse(fs.readFileSync(path.join(__dirname, './data/userlist.json'), 'utf-8'))
  // 根据前端传入的参数截取数据
  const values = userList.slice((page - 1) * pagesize, page * pagesize)

  // 返回数据给前端
  res.send({
    code: 200,
    msg:'成功',
    values,
    total: userList.length
  })
})

// 定义 post 接口
app.post('/api/create', (req, res) => {
  console.log('接收post请求传入的参数', req.body)
  // 读取数据库
  const userList = JSON.parse(fs.readFileSync(path.join(__dirname, './data/userlist.json'), 'utf-8'))
  // 把前端传入的参数添加到数据库中
  userList.unshift({
    id: Date.now() + '',
    ...req.body
  })
  console.log(userList);
  fs.writeFileSync(path.join(__dirname, './data/userlist.json'), JSON.stringify(userList))
  res.send({
    code: 200,
    msg: '创建成功'
  })
})

// 删除接口
app.post('/api/user/remove', (req, res) => {
  console.log('需要删除的用户id', req.body)
  const { id } = req.body
  // 读取数据库, 根据id查找数据
  const userList = JSON.parse(fs.readFileSync(path.join(__dirname, './data/userlist.json'), 'utf-8'))
  const index = userList.findIndex(v => v.id === id)
  if (index > -1) {
    // 删除对应id的数据，存到数据库中
    userList.splice(index, 1)
    fs.writeFileSync(path.join(__dirname, './data/userlist.json'), JSON.stringify(userList))
    res.send({
      code: 200,
      msg: '删除成功'
    })
  } else {
    res.send({
      code: 1000,
      msg: '删除失败，用户不存在'
    })
  }
})

// 编辑接口
app.post('/api/user/update', (req, res) => {
  console.log('前端参数', req.body)
  const { id, ...other } = req.body

  // 读取数据库, 根据id查找数据
  const userList = JSON.parse(fs.readFileSync(path.join(__dirname, './data/userlist.json'), 'utf-8'))
  const index = userList.findIndex(v => v.id === id)
  if (index > -1) {
    userList.splice(index, 1, {
      ...userList[index],
      ...other
    })
    fs.writeFileSync(path.join(__dirname, './data/userlist.json'), JSON.stringify(userList))
    res.send({
      code: 200,
      msg: '更新成功'
    })
  } else {
    res.send({
      code: 1000,
      msg: '用户不存在'
    })
  }
})

const PORT = 5001
app.listen(PORT, () => {
  console.log(`running http://localhost:${PORT}`)
  console.log(`running http://127.0.0.1:${PORT}`)
  console.log(`running http://10.55.6.28:${PORT}`)
})
