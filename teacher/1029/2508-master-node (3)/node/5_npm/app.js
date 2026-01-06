const fs = require('fs')
const path = require('path')
const url = require('url')
const http = require('http')


const app = http.createServer(((req, res) => {
  const { pathname } = url.parse(req.url)
  if (pathname === '/api/list') {
    res.end('[1,2,3,4,5,6]')
    return
  } else if (pathname === '/api/test') {
    res.end('{ "name": "小明" }')
    return
  }
  res.end('success')
}))

const port = 3002
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
