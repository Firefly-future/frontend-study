import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Child = () => {
  const [count, setCount] = useState(1)

  useEffect(() => {
    console.log('最新的 count', count)

    return () => {
      console.log('return 的', count)
    }
  }, [count])


  useEffect(() => {
    return () => {
      console.log('组件销毁')
    }
  }, [])


  return (
    <div className="box">
      <h3>Child</h3>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

export default Child