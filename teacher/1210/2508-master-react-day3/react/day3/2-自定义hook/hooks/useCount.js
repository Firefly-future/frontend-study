import { useState, useEffect, useRef } from 'react'

// 自定义hook：抽取公共逻辑
export const useCount = (defaultCount = 10) => {
  const [num, setNum] = useState(defaultCount)
  const intervalId = useRef(null)
  const [loading, setLoading] = useState(false)

  const start = () => {
    if (intervalId.current || num <= 0) return
    setLoading(true)
    intervalId.current = setInterval(() => {
      setNum(n => {
        if (n - 1 === 0) {
          stop()
        }
        return n - 1
      })
    }, 1000)
  }
  const stop = () => {
    clearInterval(intervalId.current)
    intervalId.current = null
    setLoading(false)
  }
  const reset = () => {
    stop()
    setNum(defaultCount)
  }

  useEffect(() => {
    return stop
  }, [])


  return {
    num,
    loading,
    start,
    stop,
    reset
  }
}