import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import CinemaDetail from '@/pages/CinemaDetail.vue'
import Search from '@/pages/Search.vue'
import Login from '@/pages/Login.vue'
import Notfound from '@/pages/Notfound.vue'
import Film from '@/pages/Film.vue'
import Cinema from '@/pages/Cinema.vue'
import Mine from '@/pages/Mine.vue'

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
      component: Home,
      redirect: '/home/film',
      // 配置嵌套路由
      children: [
        {
          path: '/home/film',
          name: 'film',
          component: Film
        },
        {
          path: '/home/cinema',
          name: 'cinema',
          component: Cinema
        },
        {
          path: '/home/mine',
          name: 'mine',
          component: Mine
        },
      ]
    },
    {
      // 动态路由：路由的部分 url 是可变的
      path: '/cinema/detail/:cinemaId',
      name: 'cinemaDetail',
      component: CinemaDetail
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
