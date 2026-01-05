import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { inquery1 } from "@/data/inquery(1)"

const initialState = {
  data: inquery1,
}

const inquery1Slice = createSlice({
  name:"inquery1",
  initialState,
  reducers:{}
})


export default inquery1Slice.reducer