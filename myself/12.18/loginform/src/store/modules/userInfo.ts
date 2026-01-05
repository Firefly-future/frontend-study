import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { userInfo } from "@/services/type"
import { userInfoApi } from "@/services"

// 定义状态的类型
type State = {
  user: userInfo | null // 只存储一个用户信息
  loading?: boolean
  error?: string | null
}

const defaultAvatar = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'

// 初始状态
const initialState: State = {
  user: null,
  loading: false,
  error: null,
}

// 修复：补全函数闭合大括号
const completeUserAvatar = (user: userInfo): userInfo => {
  return {
    ...user,
    // 若 avatar 为空/undefined/null，替换为默认值
    avatar: user.avatar || defaultAvatar
  }
} // 关键：添加这个闭合括号

// 异步请求获取用户信息
export const fetchUserInfo = createAsyncThunk(
  "userInfo/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userInfoApi()
      return response.data.values // 返回用户信息
    } catch (err: any) {
      return rejectWithValue(err.message || "获取用户信息失败")
    }
  }
)

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    // 修复：手动添加用户时调用补全头像函数
    addUser: (state, action: PayloadAction<userInfo>) => {
      state.user = completeUserAvatar(action.payload)
    },
    // 重置用户信息（可以作为登出操作）
    resetUser: (state) => {
      state.user = null
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false
        // 修复1：判断 payload 是否存在，避免赋值 undefined
        // 修复2：调用补全头像函数
        state.user = action.payload ? completeUserAvatar(action.payload) : null
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetUser, addUser } = userInfoSlice.actions // 可选：导出 addUser（如果需要）
export default userInfoSlice.reducer