import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getUserInfoApi } from '../services'
import type { UserInfo } from '../services/type'
import { useRouter } from 'vue-router'
import { ElLoading } from 'element-plus'

const defaultAvatar = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const userInfo = ref<UserInfo | null>(null)
  const avatar = computed(() => {
    return userInfo.value?.avatar || defaultAvatar
  })

  const getUserInfo = async () => {
    const loading = ElLoading.service({
      lock: true,
      text: 'Loading'
    })
    try {
      const res = await getUserInfoApi()
      console.log(res.data)
      userInfo.value = res.data.values
    } catch(e) {
      if (e.status === 401) {
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