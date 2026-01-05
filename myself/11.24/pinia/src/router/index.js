import Creame from "@/pages/Creame.vue";
import Film from "@/pages/Film.vue";
import Home from "@/pages/Home.vue";
import Mine from "@/pages/Mine.vue";
import { createRouter,createWebHistory,createWebHashHistory } from "vue-router";



const router=createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/home',
            name:'home',
            component:Home,
            redirect:'/home/film',
            children:[
                {
                    path:'/home/film',
                    name:'film',
                    component:Film
                },
                {
                    path:'/home/creame',
                    name:'creame',
                    component:Creame
                },
                {
                    path:'/home/mine',
                    name:'mine',
                    component:Mine,
                    meta:{
                        isAuth:true
                    }
                }
            ]
        },
        {
        path:'/:pathWatch(.*)*',
        redirect:'/home'
    }
    ]
})


export default router