import React from 'react'
import Child2 from './Child2'
import { UserProvider } from '../context/userCtx'
import { useState } from 'react'

const Child1 = () => {
  const [list, setList] = useState([1,2,3,4])

  return (
    <UserProvider value={{ list, setList }}>
      <div className="box">
        <h2>Child1</h2>
        <div>{JSON.stringify(list)}</div>
        <Child2 />
      </div>
    </UserProvider>
  )
}

export default Child1