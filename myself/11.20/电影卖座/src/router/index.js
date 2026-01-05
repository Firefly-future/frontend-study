import { createRouter, createWebHashHistory } from "vue-router";
import Mine from "@/pages/mine/Mine.vue";
import NotFound from "@/pages/notFound/NotFound.vue";
import Film from "@/pages/film/Film.vue";
import Cinema from "@/pages/cinema/Cinema.vue";
import News from "@/pages/news/News.vue";
import Home from "@/pages/home/Home.vue";
import FilmDetail from "@/pages/filmDetail/FilmDetail.vue";
import Search from "@/pages/search/Search.vue";
import Login from "@/pages/login/Login.vue";
import CinemaDetail from "@/pages/cinemaDetail/CinemaDetail.vue";
import Pay from "@/pages/pay/Pay.vue";
import City from "@/pages/city/City.vue";

// 创建路由实例
const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  //   配置 url和组件的对应关系
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
      redirect: "/home/film/now",
      children: [
        {
          path: "/home/film/:type",
          name: "film",
          component: Film,
        },
        {
          path: "/home/cinema",
          name: "cinema",
          component: Cinema,
        },
        {
          path: "/home/mine",
          name: "mine",
          component: Mine,
        },
      ],
    },
    // 动态路由  路由的部分url是可变的
    {
        path:'/film/detail/:filmId',
        name:'filmDetail',
        component:FilmDetail
    },
    {
      path:'/cinema/detail/:cinemaId/:filmId?/:date?',
      name:'cinemaDetail',
      component:CinemaDetail
    },
    {
        path:'/search',
        name:'search',
        component:Search
    },
    {
      path:'/pay',
      name:'pay',
      component:Pay
    },
    {
        path:'/login',
        name:'login',
        component:Login
    },
    {
      path:'/city',
      name:'city',
      component:City
    },
    {
      path: "/:pathMatch(.*)*",
      // name:'notFound',
      // component:NotFound
      // 重定向
      redirect: "/home",
    },
  ],
});

export default router;
