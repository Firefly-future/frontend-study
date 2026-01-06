import { createApp } from 'vue'
import App from './App.vue'
import './style/common.scss'
import router from './router'

const app = createApp(App)

// 使用路由插件
app.use(router)
app.mount('#app')


// 多页面应用（multiple page application） MPA
// 单页面应用（single page application）SPA
// 路由：让单页面应用可以实现多页面的功能
