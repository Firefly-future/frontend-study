const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const ContentTypeObj = {
  '.js': 'application/javascript;charset=utf-8',
  '.css': 'text/css;charset=utf-8',
  '.html': 'text/html;charset=utf-8',
}


// 创建服务器应用
const app = http.createServer((request, response) => {
  // 服务启动成功后如果人有访问的应有就会执行此函数
  console.log('有人访问我的应用', request.url)

  // 格式化url
  const { pathname, query } = url.parse(request.url, true)
  console.log('请求的 pathname', pathname)
  console.log('请求的 query参数', query)

  // 拼接完整地址
  const fullPath = path.join(__dirname, './dist', pathname === '/' ? 'index.html' : pathname)
  console.log('请求此文件', fullPath)
  
  // 去dist中查找文件是否存在
  fs.readFile(fullPath, 'utf-8', (err, data) => {
    if (err) {
      // 设置服务端给前端返回的状态码
      response.statusCode = 404
      // 设置响应头数据格式
      response.setHeader('content-type', 'application/json;charset=utf-8')
      response.end(JSON.stringify({
        code: 404,
        message: '访问的地址不存在'
      }))
    } else {
      // 获取想要访问文件的后缀名，设置不同的响应头
      const ext = path.extname(fullPath)
      if (ContentTypeObj[ext]) {
        response.setHeader('content-type', ContentTypeObj[ext])
      }
      // 给返回前端响应数据
      response.end(data)
    }
  })

})

const PORT = 3001
// 监听端口号，0 - 65535
app.listen(PORT, () => {
  console.log(`服务器应用启动成功 http://localhost:${PORT}`)
  console.log(`服务器应用启动成功 http://127.0.0.1:${PORT}`)
  console.log(`服务器应用启动成功 http://10.55.6.28:${PORT}`)
})