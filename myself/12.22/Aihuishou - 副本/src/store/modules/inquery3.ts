import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { inquery3 } from "@/data/inquery(3)"

const initialState = {
  data: inquery3,
}

const inquery3Slice = createSlice({
  name:"inquery3",
  initialState,
  reducers:{}
})


export default inquery3Slice.reducer
