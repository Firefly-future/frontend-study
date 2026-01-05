import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { userInfoApi } from "../services";
import type { userInfo } from "../services/type";
import { useRouter } from "vue-router";
import { ElLoading } from "element-plus";
import { ElMessage } from "element-plus"


const defaultAvatar = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'

export const useUserStore = defineStore('user', () => {
    const router = useRouter()
    const userInfo = ref<userInfo | null>(null)
    const avatar = computed(() => {
        return userInfo.value?.avatar || defaultAvatar
    })
    const getUserInfo = async () => {
        const loading = ElLoading.service({
            lock: true,
            text: 'loading'
        })
        try {
            const res = await userInfoApi()
            console.log(res.data)
            userInfo.value = res.data.values
        } catch (e: any) {
            if (e.status === 401) {
                ElMessage.error('登录失效，请重新登录')
                router.replace('/login')
            }
        } finally {
            loading.close()
        }
    }
    return {
        getUserInfo,
        userInfo,
        avatar
    }
})
