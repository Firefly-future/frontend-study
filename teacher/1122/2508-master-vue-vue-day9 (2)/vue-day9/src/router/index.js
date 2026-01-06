import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/home/Home.vue'
import CinemaDetail from '@/pages/cinemaDetail/CinemaDetail.vue'
import FilmDetail from '@/pages/filmDetail/FilmDetail.vue'
import City from '@/pages/city/City.vue'
import Login from '@/pages/login/Login.vue'
import Pay from '@/pages/pay/Pay.vue'
// import Notfound from '@/pages/404/Notfound.vue'
import Film from '@/pages/film/Film.vue'
import Cinema from '@/pages/cinema/Cinema.vue'
import Mine from '@/pages/mine/Mine.vue'

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
      meta: {
        isAuth: true
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      // 匹配所有路由
      path: '/:pathMatch(.*)*',
      redirect: '/home'
    }
  ],
})

// 导航守卫
router.beforeEach((to, from) => {
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


export default router
