import { configureStore } from "@reduxjs/toolkit"
import exam from "./modules/exam"
const store = configureStore({
  reducer: {
    exam,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export default store
