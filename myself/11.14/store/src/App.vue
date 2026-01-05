<script>
import Header from './components/Header.vue'
import Comments from './components/Comments.vue'
import Goods from './components/Goods.vue'
import Store from './components/Store.vue'

import {getSeller} from './serve/index.js'
export default {
    components :{
        Header,
        Comments,
        Goods,
        Store
    },
    data(){
        return{
            activeIndex:0,
            navList:[
                {title:'商品',componentName:'Goods'},
                {title:'评论',componentName:'Comments'},
                {title:'商家',componentName:'Store'}
            ],
            sellerInfo:{}
        }
    },
    methods:{
        async getSellerData(){
            try {
                const res=await getSeller()
                console.log(res.data.data)
                this.sellerInfo=res.data.data
            } catch (e) {
                console.log(e)
            }
        }
    },
    created(){
        this.getSellerData()
    }
}
</script>

<template>
<div class="app">
    <Header :info="sellerInfo"></Header>
    <nav>
        <span 
        v-for="(item,index) in navList" 
        :key="item.title"
        :class="{active:activeIndex===index}"
        @click="activeIndex=index"
        >
            {{ item.title }}
            <i :style="{transform:`translateX(${100*activeIndex}%)`}"></i>
        </span>
    </nav>
    <main>
       <KeepAlive>
        <component :is="navList[activeIndex].componentName" :sellerInfo="sellerInfo"></component>
       </KeepAlive>
    </main>
</div>
</template>

<style lang="scss" scoped>
.app{
    display: flex;
    flex-direction: column;
    height: 100vh;
}
nav{
    display: flex;
    align-items: center;
    // justify-content: center;
    height: 36px;
    border-bottom: 1px solid #ccc;
    position: relative;
    span{
        flex: 1;
        text-align: center;
        line-height: 36px;
        &.active{
            color: tomato;
        }
        i{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            width: calc(100% / 3);
            background: tomato;
            transition: transform linear .3s;
        }
    }
}
main{
    flex: 1;
    overflow: hidden;
}
</style>
