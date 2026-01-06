import { createSlice } from "@reduxjs/toolkit";

interface PlayList {
  id:number
  name:string
  url:string
  cover:string
}

interface PlayerState {
  playList: PlayList[],
  curIndex: number
}

const initialState:PlayerState={
  playList: [],
  curIndex: 0
}
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
      setPlayList(state,{payload}:{payload:PlayList[]}){
        state.playList=payload
      }
  }
})

export const {setPlayList}=playerSlice.actions

export default playerSlice.reducer
