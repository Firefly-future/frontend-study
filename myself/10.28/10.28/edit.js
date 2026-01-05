
const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')


const ContentTypeObj = {
    '.js': 'application/javascript;charset=utf-8',
    '.css': 'text/css;charset=utf-8',
    '.html': 'text/html;charset=utf-8'
}

// http模块（创建服务器应用）
// request 客户端请求的信息 
// response 服务端返回的信息
const app = http.createServer((request, response) => {
    // 服务启动成功后如果有人访问 应用就会执行此函数
    console.log('有人访问我的服务器应用了', request.url)
    // 格式化url
    const  { pathname, query } = url.parse(request.url, true)
    console.log('请求的pathname', pathname)
    console.log('请求的query参数', query)
    // 拼接完整地址
    const fullPath = path.join(__dirname, './http', pathname === '/' ? 'index.html' : pathname)
    // const fullPath = path.join(__dirname, './http/index.html')
    console.log('请求的文件', fullPath)
    // 去http文件夹中查找文件是否存在
    fs.readFile(fullPath, 'utf-8', (err, data) => {
        if (err) {
            // 设置服务端给前端返回的状态码
            response.statusCode = 404
            // 设置响应数据头格式
            response.setHeader('content-type', 'application/json;charset=utf-8')
            response.end(JSON.stringify({
                code: 404,
                message: '访问的地址不存在'
            }))
        } else {
            const ext = path.extname(fullPath)
            if (ContentTypeObj[ext]) {
                response.setHeader('content-type', ContentTypeObj[ext])
            }
            response.end(data)
        }
    })

})

// 设置端口号 并 监听端口号  端口号范围0-65535 且使用后不能再次使用相同端口号
const PORT = 5500
app.listen(PORT, () => {
    console.log(`服务器应用启动成功 http://localhost:${PORT}`)
    console.log(`服务器应用启动成功 http://127.0.0.1:${PORT}`)
    console.log(`服务器应用启动成功 http://10.55.5.7:${PORT}`)
})