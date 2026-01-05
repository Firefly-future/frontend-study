import { configureStore } from '@reduxjs/toolkit'
import exam from './models/exam'

const store = configureStore({
  reducer: {
    exam
  }
})

// console.log('获取 store 数据', store.getState())
export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch

export default store