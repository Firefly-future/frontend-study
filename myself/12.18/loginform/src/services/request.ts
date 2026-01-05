
import { message } from "antd";
import axios from "axios"


const instance=axios.create({
    baseURL:'http://39.96.210.90:9001',
    timeout:5000 //超时时间
}
)

instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.authorization=localStorage.getItem('token')
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if(error.status===401){
        location.href='/'
        message.error('登录失效，请重新登录')
    }
    return Promise.reject(error);
  });

export default instance