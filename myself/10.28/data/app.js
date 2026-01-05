
// const fs=require('fs')
// const http=require('http')
// const path=require('path')
// const url=require('url')

// const ContentTypeObj={
//     '.html':'text/html;charset=utf-8',
//     '.css':'text/css;charset=utf-8',
//     '.js':'text/javascript;charset=utf-8',
//     '.json':'application/json;charset=utf-8'
// }

// const app=http.createServer((request,response)=>{
//     // 当有人访问时执行此代码
//     console.log('有人访问了我的应用',request.url)
//     // 解析url
//     // const {pathname,query}=url.parse(request.url,true)
//     // console.log(pathname,query)
//     // //处理静态资源
//     // const fullPath=path.join(__dirname,pathname)
//     // console.log(fullPath)
//     // if(fs.existsSync(fullPath)){
//     //     const data=fs.readFileSync(fullPath,'utf-8')
//     //     // 获取想要的文件的后缀，设置不同的请求头
//     //     const ext=path.extname(fullPath)
//     //     if(ContentTypeObj[ext]){
//     //         response.setHeader('content-type',ContentTypeObj[ext])     
//     //     } // 给前端放回数据
//     //     response.end(data)
//     //     return
//     // }
//     // 处理接口逻辑
    
    
    




//     // 出错执行下面代码
//     // response.end('hello world')
//     // response.statusCode=404
//     // response.setHeader('content-type','application/json;charset=utf-8')
//     // response.end(JSON.stringify({
//     //     code:404,
//     //     message:'访问的地址不存在'
//     // }))
//     response.end('404 Not Found')
// })


// const PORT=5000
// app.listen(PORT,()=>{
//     console.log(`服务器启动成功 http://localhost:${PORT}`)
//     console.log(`服务器启动成功 http://127.0.0.1:${PORT}`)
//     console.log(`服务器启动成功 http://10.55.5.7:${PORT}`)
// })