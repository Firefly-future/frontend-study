import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Child = () => {
  const [count, setCount] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('定时器', count)
      // setCount(count - 1)
      setCount(c => {
        if (c - 1 === 0) {
          clearInterval(timer)
        }
        return c - 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  console.log('Child渲染了', count)

  return (
    <div className="box">
      <h3>Child</h3>
      <p>count: {count}</p>
    </div>
  )
}

export default Child