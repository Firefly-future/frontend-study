const express = require('express')

const app = express()

app.get('/api/list', (req, res) => {
  // 允许跨域访问的地址
  // res.setHeader('Access-Control-Allow-Origin', '*')
  res.send({
    code: '200',
    msg: '成功',
    values: [1,2,3,4,5,6,7,89,9]
  })
})

app.post('/api/list', (req, res) => {
  res.send({
    code: '200',
    msg: '我是post请求',
    values: [1,2,3,4,5,6,7,89,9]
  })
})
app.put('/api/list', (req, res) => {
  res.send({
    code: '200',
    msg: '我是put请求',
    values: [1,2,3,4,5,6,7,89,9]
  })
})
app.delete('/api/list', (req, res) => {
  res.send({
    code: '200',
    msg: '我是delete请求',
    values: [1,2,3,4,5,6,7,89,9]
  })
})

const userlist = [
  { name: '小明', age: 22 },
  { name: '小红', age: 23 },
  { name: '小刚', age: 24 },
  { name: '小李', age: 25 },
]

app.get('/api/jsonp/list', (req, res) => {
  res.setHeader('content-type', 'application/javascript;charset=utf-8')
  res.end(`window.jsonp_callback(${JSON.stringify(userlist)})`)
})

app.listen(3001, () => {
  console.log('running http://localhost:3001')
  console.log('running http://127.0.0.1:3001')
  console.log('running http://10.55.6.23:3001')
})