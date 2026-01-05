import { create } from 'zustand'
import { getUserInfo, getUserMenu } from '@/services'
import type { UserInfo, MenuListItem } from '@/services/types'

interface State {
  userInfo: UserInfo | null
  menuList: MenuListItem[]
  getUserInfo: () => void
}

export const useUserStore = create<State>((set) => ({
  userInfo: null,
  menuList: [],
  getUserInfo: async () => {
    try {
      const res = await getUserInfo()
      set(() => ({ userInfo: res.data }))
      const menuRes = await getUserMenu()
      set(() => ({ menuList: menuRes.data.list }))
    } catch(e) {
      console.log(e)
    }
  }
}))