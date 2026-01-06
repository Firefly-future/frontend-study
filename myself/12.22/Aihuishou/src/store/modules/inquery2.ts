import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { inquery2 } from "@/data/inquery(2)"

const initialState = {
  data: inquery2,
}

const inquery2Slice = createSlice({
  name:"inquery2",
  initialState,
  reducers:{}
})



export default inquery2Slice.reducer
