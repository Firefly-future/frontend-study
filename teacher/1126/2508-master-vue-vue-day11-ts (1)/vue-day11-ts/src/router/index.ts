import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/login/Login.vue'
import Home from '../pages/home/Home.vue'
import NotFound from '../pages/404/404.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/list',
      name: 'list',
      // 异步组件/组件懒加载：打包时拆分成单独的js文件，减小主包的体积，提高首屏加载速度。
      component: () => import('../pages/list/List.vue')
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: () => import('../pages/userInfo/UserInfo.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound', 
      component: NotFound
    },
  ]
})

export default router