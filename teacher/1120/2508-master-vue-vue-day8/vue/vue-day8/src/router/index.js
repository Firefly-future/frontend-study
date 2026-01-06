import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Detail from '@/pages/Detail.vue'
import Search from '@/pages/Search.vue'
import Login from '@/pages/Login.vue'
import Notfound from '@/pages/Notfound.vue'

// 多页面应用（multiple page application） MPA
// 单页面应用（single page application）SPA
// 路由：让单页面应用可以实现多页面的功能



// 创建路由实例
const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  // 配置 url 和 组件的对应关系
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      // 匹配所有路由
      path: '/:pathMatch(.*)*',
      // name: 'notfound',
      // component: Notfound,
      // 重定向
      redirect: '/home'
    }
  ],
})


console.log(router)


export default router
