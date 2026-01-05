
const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const ContentTypeObj = {
  '.js': 'application/javascript;charset=utf-8',
  '.css': 'text/css;charset=utf-8',
  '.html': 'text/html;charset=utf-8'
  // '.json': 'application/json;charset=utf-8'
}

const app = http.createServer((request, response) => {
  console.log('请求地址', request.url)
  console.log('请求方式', request.method)
  console.log('有人在访问我的应用', request.url)
  const { pathname, query } = url.parse(request.url, true)
  const fullPath = path.join(__dirname, './dist', pathname === '/' ? 'index.html' : pathname)
  if (fs.existsSync(fullPath)) {
    const data = fs.readFileSync(fullPath, 'utf-8')
    // 获取不同文件的后缀以设置不同的响应头
    const ext = path.extname(fullPath)
    if (ContentTypeObj[ext]) {
      response.setHeader('content-type', ContentTypeObj[ext])
    }
    // 给前端返回数据
    response.end(data)
    return
  }
  // 处理接口逻辑
  if (pathname === '/api/userlist' && request.method === 'GET') {
      console.log('前端传入的参数', pathname, query)
      const { page, pagesize } = query
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, './data/userlist.json'), 'utf-8'))
      // 根据前端传入的参数截取数据
      const curData = data.slice((page - 1) * pagesize, page * pagesize)
      // 给前端返回数据
      response.setHeader('content-type', 'application/json;charset=utf-8')
      response.end(JSON.stringify(curData))
      return
  }
  if (pathname === '/api/userlist' && request.method === 'POST') {
    // 接收前端通过post接口传入的参数
    let params = ''
    request.on('data', chunk => {
      params += chunk
    })
    request.on('end', () => {
      params = JSON.parse(params)
      console.log('接收前端传入的参数', params)
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, './data/userlist.json'), 'utf-8'))
      const curData = data.slice((params.page - 1) * params.pagesize, params.page * params.pagesize)
      // 设置响应头
      response.setHeader('content-type', 'application/json;charset=utf-8')
      response.end(JSON.stringify(curData))
    })
    return
  }


  response.statusCode = 404
  response.setHeader('content-type', 'application/json;charset=utf-8')
  response.end(JSON.stringify({
    code: 404,
    msg: '访问的内容信息不存在'
  }))
})

// 创建服务器应用
// const app = http.createServer((request, response) => {
//   console.log('请求地址', request.url)
//   console.log('请求方式', request.method)

//   const { pathname, query } = url.parse(request.url, true)

//   // 处理静态资源
//   const fullPath = path.join(__dirname, './dist', pathname === '/' ? 'index.html' : pathname)
//   if (fs.existsSync(fullPath)) {
//     const data = fs.readFileSync(fullPath, 'utf-8')
//     // 获取想要访问文件的后缀名，设置不同的响应头
//     const ext = path.extname(fullPath)
//     if (ContentTypeObj[ext]) {
//       response.setHeader('content-type', ContentTypeObj[ext])
//     }
//     // 给返回前端响应数据
//     response.end(data)
//     return
//   }

//   // 处理接口逻辑
//   if (pathname === '/api/music' && request.method === 'GET') {
//     const data = fs.readFileSync(path.join(__dirname, './data/music.json'), 'utf-8')
//     response.setHeader('content-type', 'application/json;charset=utf-8')
//     response.end(data)
//     return
//   } else if (pathname === '/api/userlist' && request.method === 'GET') {
//     console.log('获取前端传入的参数', pathname, query)
//     const { page, pagesize } = query
//     const data = JSON.parse(fs.readFileSync(path.join(__dirname, './data/userlist.json'), 'utf-8'))
//     // page: 1, pagesize: 10  data.slice(0, 10)
//     // page: 2, pagesize: 10  data.slice(10, 20)
//     // 根据前端传入的参数截取数据
//     const curData = data.slice((page - 1) * pagesize, page * pagesize)
//     // 给前端返回数据
//     response.setHeader('content-type', 'application/json;charset=utf-8')
//     response.end(JSON.stringify(curData))
//     return
//   } else if (pathname === '/api/userlist' && request.method === 'POST') {
//     // 接收前端通过 post 接口的请求体传入的参数
//     let params = ''
//     request.on('data', chunk => {
//       params += chunk
//     })
//     request.on('end', () => {
//       // 接收数据完毕
//       params = JSON.parse(params)
//       console.log('接收前端传入的参数', params)
//       const data = JSON.parse(fs.readFileSync(path.join(__dirname, './data/userlist.json'), 'utf-8'))
//       // 根据前端传入的参数截取数据
//       const curData = data.slice((params.page - 1) * params.pagesize, params.page * params.pagesize)
//       // 给前端返回数据
//       response.setHeader('content-type', 'application/json;charset=utf-8')
//       response.end(JSON.stringify(curData))
//     })
//     return
//   }

//   // 设置服务端给前端返回的状态码
//   response.statusCode = 404
//   // 设置响应头数据格式
//   response.setHeader('content-type', 'application/json;charset=utf-8')
//   response.end(JSON.stringify({
//     code: 404,
//     message: '访问的地址不存在'
//   }))
// })


const PORT = 3001
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
  console.log(`http://127.0.0.1:${PORT}`)
  console.log(`http://10.55.5.7:${PORT}`)
}
)