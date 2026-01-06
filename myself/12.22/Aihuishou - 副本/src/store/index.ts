import { configureStore } from "@reduxjs/toolkit"
import inquery1Reducer from "./modules/inquery1"
import inquery2Reducer from "./modules/inquery2"
import inquery3Reducer from "./modules/inquery3"

const store = configureStore({
  reducer: {
    inquery1: inquery1Reducer,
    inquery2: inquery2Reducer,
    inquery3: inquery3Reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch

export default store
