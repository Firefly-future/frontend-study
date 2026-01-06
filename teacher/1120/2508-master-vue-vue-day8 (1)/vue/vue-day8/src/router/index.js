import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import CinemaDetail from '@/pages/CinemaDetail.vue'
import FilmDetail from '@/pages/FilmDetail.vue'
import City from '@/pages/City.vue'
import Login from '@/pages/Login.vue'
import Pay from '@/pages/Pay.vue'
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
      redirect: '/home/film/now',
      // 配置嵌套路由
      children: [
        {
          path: '/home/film/:type',
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
          component: Mine,
          meta: {
            isAuth: true
          }
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
      path: '/film/detail',
      name: 'filmDetail',
      component: FilmDetail
    },
    {
      path: '/city',
      name: 'city',
      component: City
    },
     {
      path: '/pay',
      name: 'pay',
      component: Pay,
      // 路由元信息，此对象内的数据可以在组件内通过 useRoute 访问到
      meta: {
        isAuth: true
      },
      // 组件内守卫，只给此路由添加守卫，路由跳转前执行
      // beforeEnter: (to, from) => {
      //   // reject the navigation
      //   return false
      // },
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

// 导航守卫
// 全局前置守卫
//    所有路由跳转之前执行
//    可以实现登陆拦截

router.beforeEach((to, from) => {
  console.log('beforeEach')
  // console.log('目标路由', to)
  // console.log('来源路由', from)

  // 从路由元信息中查询此路由是否需要登陆认证
  if (to.meta.isAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      // 跳转到登陆
      return {
        path: '/login'
      }
    }
  }
})

router.beforeResolve(() => {
  console.log('beforeResolve')
})

router.afterEach((to, from) => {
  console.log('afterEach')  
})


export default router
