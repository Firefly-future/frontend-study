import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/pages/film/Film.vue";
import Detail from "@/pages/cinema/Cinema.vue";
import Search from "@/news/News.vue";
import Mine from "@/pages/mine/Mine.vue";
import NotFound from "@/pages/notFound/NotFound.vue";

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
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
        path:'/search',
        name:'search',
        component:Search
    },
    {
        path:'/mine',
        name:'mine',
        component:Mine
    },
    {
        path:'/:pathMatch(.*)*',
        name:'notFound',
        component:NotFound
        // 重定向
        // redirect:'/home'
    }
],
});

export default  router