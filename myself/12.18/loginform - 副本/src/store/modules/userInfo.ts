import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { userInfo } from "@/services/type"
import { userInfoApi } from "@/services"

// 定义状态的类型
type State = {
  user: userInfo | null // 只存储一个用户信息
  loading?: boolean
  error?: string | null
}

// 初始状态
const initialState: State = {
  user: null,
  loading: false,
  error: null,
}

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
    // 你可以保留 addUser 函数用于手动添加用户
    addUser: (state, action: PayloadAction<userInfo>) => {
      state.user = action.payload
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
        state.user = action.payload
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})


export const {resetUser} = userInfoSlice.actions
export default userInfoSlice.reducer