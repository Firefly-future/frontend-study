import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Detail from "@/pages/Detail.vue";
import NotFound from "@/pages/NotFound.vue";
import Search from "@/pages/Search.vue";

// 多页面应用 （multiple page application）MPA
// 单页面应用  （single  page application）SPA
// 路由： 让单页面应用 可以实现多页面的功能

// 创建路由实例
const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  // 配置url和组件的对应关系
  routes: [
    {
        path:'/home',
        name:'home',
        component:Home
    },
    {
        path:'/detail',
        name:'detail',
        component:Detail
    },
    {
        path:'/login',
        name:'login',
        component:Login
    },
    {
        path:'/search',
        name:'search',
        component:Search
    },
    {
        // 匹配所有路由
        path:'/:pathMatch(.*)*',
        name:'notFound',
        component:NotFound,
        // 重定向
        // redirect:'/home'
    }
  ],
});
export default router