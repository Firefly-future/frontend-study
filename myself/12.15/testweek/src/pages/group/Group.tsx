import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {addAge} from "../../store/features/user"
import type { RootDispatch,RootState } from "../../store"

const Group = () => {
  // 从 store 中获取数据
  const userState = useSelector((state:RootState) => {
    return state.user
  })
  const playlistState = useSelector((state:RootState) => {
    return state.player.playList
  })
  // 从 store 中获取修改数据的 dispatch({type:''}) 函数
  const dispatch = useDispatch()
  console.log(userState)
  console.log(playlistState)
  console.log(dispatch)
  return (
    <div>
      <div>
        <div>用户信息</div>
        <div>
          <div>用户名：{userState.name}</div>
          <div>用户年龄：{userState.age}</div>
          <button onClick={()=>dispatch(addAge(-1))}>age-</button>
          <button onClick={()=>dispatch(addAge(1))}>age+</button>
        </div>
      </div>
    </div>
  )
}

export default Group
