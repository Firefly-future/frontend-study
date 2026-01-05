import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeName,addAge } from '../../store/features/user'
import type { RootState, RootDispatch } from '../../store'
const Loop = () => {
  const name=useSelector((state:RootState)=>state.user.name)
  const age=useSelector((state:RootState)=>state.user.age)
  const dispatch=useDispatch<RootDispatch>()
  return (
    <div>
      <div>姓名：{name}</div>
      <input type="text" value={name} onChange={e=>dispatch(changeName(e.target.value))} />
      <div>年龄：{age}</div>
      <button onClick={()=>dispatch(addAge(2))}>age+2</button>
    </div>
  )
}

export default Loop