import { defineStore } from "pinia";
import { computed,reactive,ref } from "vue";

// 创建store
export const useGoodsStore=defineStore('goods',()=>{
   const goods=ref(['香蕉','苹果']) 

   return {goods}
})