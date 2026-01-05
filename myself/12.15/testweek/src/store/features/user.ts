import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "张三",
    age: 18,
  },
  reducers: {
    addAge(state,action){
      state.age += action.payload
    },
    changeName(state,action){
      state.name=action.payload
    }
  }
})

// 每个case reducer 函数会生成对应的 action creators
// export const { } =counterSlice.actions

export const {addAge,changeName}=userSlice.actions
// 默认抛出reducer
export default userSlice.reducer
