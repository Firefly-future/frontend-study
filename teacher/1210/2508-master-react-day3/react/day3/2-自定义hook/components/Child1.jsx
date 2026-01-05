import Child2 from './Child2'
import { UserProvider } from '../context/userCtx'
import { useState } from 'react'
import { useUnmount } from '../hooks/useUnmount'
import { useUpdate } from '../hooks/useUpdate'

const Child1 = () => {
  const [list, setList] = useState([1,2,3,4])

  useUnmount(() => {
    console.log('child1 组件销毁')
  })

  useUpdate(() => {
    console.log('组件更新')
  })

  return (
    <UserProvider value={{ list, setList }}>
      <div className="box">
        <h2>Child1</h2>
        <button onClick={() => setList([...list, Math.random()])}>add</button>
        <div>{JSON.stringify(list)}</div>
        <Child2 />
      </div>
    </UserProvider>
  )
}

export default Child1