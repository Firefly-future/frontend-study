import { defineStore, storeToRefs } from "pinia";
import { computed,reactive,ref } from "vue";

// 创建store
export const useUserStore=defineStore('user',()=>{
    const count=ref(0)
    const user=reactive({
        name:'小明',
        age:22,
        sex:'男'
    })
    const info=computed(()=>{
        return `我叫${user.name},今年${user.age}岁`
    })

    const addAge=n=>{
        user.age+=n
    }
    const changeCount=n=>{
        count.value=n
    }
    return {
        count,
        user,
        info,
        addAge,
        changeCount
    }
})