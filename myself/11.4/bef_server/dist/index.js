// 不受同源策略影响，不会产生跨域问题的四个请求标签
// a标签  img标签  link标签  script标签
 

// 同源：协议域名端口号三者都相同

// 同源策略
// 浏览器为了保护用户安全，限制前端发送xhr请求时，只能向同源的地址发送请求


// 跨域问题
// 当前端页面请求的接口地址中，协议域名端口号三者其中有一个与当前页面的不一致时，就会出现跨域问题
// 处理跨域问题的三个方法
// 1.jsonp 跨域处理方案（不常用 只支持get请求）
// 原理：利用script标签的src属性可以跨域请求的特性，将请求的参数作为函数调用的参数，将返回值作为函数调用的返回值
// 实现：在前端页面中定义一个函数，将函数名作为参数传递给后端，后端将返回值作为函数调用的参数，前端页面中定义的函数就会被调用
window.jsonp_callback=function(data){
    // data作为接收jsonp的数据
    console.log('jsonp_callback',data)
}
// 然后发送js请求 等待后端调用window.jsonp_callback函数
const script=document.createElement('script')
script.src='http://localhost:3000/api/list'
document.body.appendChild(script)
console.log(script)
// 2.后端设置cors 跨域处理方案
// 原理：在后端接口中设置响应头，允许跨域请求
// 实现：在后端接口中添加响应头 Access-Control-Allow-Origin: *
const xhr=new XMLHttpRequest()
xhr.open('get','http://localhost:3000/api/list')
xhr.onreadystatechange=()=>{
    if(xhr.readyState===4&&xhr.status===200){
        console.log(JSON.parse(xhr.responseText))
    }
}
xhr.send()
// 3.请求代理   跨域处理方案
// 前端页面请求本地服务  本地服务请求第三方接口



// 请求方式 get post put delete
// 预检请求 option 
//  跨域 复杂请求时会出现
// 简单请求 get/post 且无额外请求头
// 复杂请求 put  delete         或者        get/post 有额外请求头
