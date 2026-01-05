const express = require('express')
const axios = require('axios')
const { createProxyMiddleware } = require('http-proxy-middleware')


const app = express()
app.use(express.static('./dist'))


// 使用插件处理请求代理
const proxyMiddleware = createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
})
// 例如 /bw/api/list => http://localhost:3000/api/list
app.use('/bw', proxyMiddleware)


// app.get('/api/list', async (request, response) => {
//   // 调用第三方接口
//   const res = await axios.get('http://localhost:3000/api/list')
//   // 给前端返回数据
//   response.send(res.data)
// })



app.listen(8001, () => {
  console.log('running http://localhost:8001')
  console.log('running http://127.0.0.1:8001')
  console.log('running http://10.55.6.23:8001')
})