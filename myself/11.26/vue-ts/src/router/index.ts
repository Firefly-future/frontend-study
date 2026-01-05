import { createRouter, createWebHistory } from "vue-router"
import Home from "../pages/home/Home.vue"
import Login from "../pages/login/Login.vue"
import NotFound from "../pages/404/NotFound.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/list',
            name: 'list',
            component: () => import("../pages/list/List.vue")
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/user',
            name: 'userInfo',
            component: () => import("../pages/user/UserInfo.vue")
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: NotFound
        }
    ]
})

export default router