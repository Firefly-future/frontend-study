import { useEffect, useRef, useState } from 'react'
import { format } from '../utils'

export const useCountDown = (s: number, immediate: boolean = false, onFinish?: () => void) => {
  const [second, setSecond] = useState(s)
  const intervalId = useRef<number | null>(null)

  const start = () => {
    if (second <= 0) return
    intervalId.current = setInterval(() => {
      setSecond(s => {
        const curSecond = s - 1
        if (curSecond === 0) {
          stop()
          onFinish?.()
        }
        return curSecond
      })
    }, 1000)
  }

  const stop = () => clearInterval(intervalId.current!)

  useEffect(() => {
    if (immediate) {
      start()
    }
    return stop
  }, [])


  return {
    timeStr: format(second),
    second,
    start,
    stop
  }
}