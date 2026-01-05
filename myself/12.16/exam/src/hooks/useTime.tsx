import { useEffect, useRef, useState } from "react"
import { formatTime } from "../utils"

export const useTime = (s: number, immediate: boolean = false) => {
  const [second, setSecond] = useState(s)
  const intervalId = useRef<number | null>(null)

  const start = () => {
    if(intervalId.current) return
    if (second <= 0) return
    intervalId.current = setInterval(() => {
      setSecond((n) => {
        const curTime = n - 1
        if (curTime === 0) {
          stop()
        }
        return curTime
      })
    },1000)
  }
  const stop = () => clearInterval(intervalId.current!)
  useEffect(() => {
    if (immediate) {
      start()
    }
    return stop
  }, [immediate])
  return {
    timeStr: formatTime(second),
    start,
    stop,
    second,
  }
}
