import axios from 'axios'
import router from '../router'
import { ElMessage } from 'element-plus'

// 创建新的 axios 实例
const instance = axios.create({
  baseURL: 'http://39.96.210.90:9001',
  timeout: 5000 // 超时时间
})

// 添加请求拦截器统一处理共用参数
instance.interceptors.request.use(function (config) {
  // console.log('发送请求了', config)
  config.headers.authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // 统一处理公共错误
  if (error.status === 401) {
    router.replace('/login')
    ElMessage.error('登陆失效，青重新登陆！')
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance