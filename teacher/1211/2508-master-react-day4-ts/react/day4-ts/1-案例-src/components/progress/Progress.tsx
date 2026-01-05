import React, { useEffect, useRef, useState } from 'react'
import style from './Progress.module.scss'

interface Props {
  onChange?: (value: number) => void
}

const Progress = (props: Props) => {
  const isDown = useRef(false)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const [left, setLeft] = useState(0)

  useEffect(() => {
    const { left: progressLeft, width } = progressRef.current!.getBoundingClientRect()
    const maxLeft = width - 15
    setLeft(maxLeft)
    const mousemove = (e: MouseEvent) => {
      if (isDown.current) {
        let left = e.clientX - progressLeft
        if (left < 0) left = 0
        if (left > maxLeft) left = maxLeft
        setLeft(left)
        props.onChange?.(left / maxLeft)
      }
    }
    const mouseup = () => isDown.current = false
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
    return () => {
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
    }
  }, [])

  return (
    <div className={style.progress} ref={progressRef}>
      <i
        style={{ left }}
        onMouseDown={() => isDown.current = true}
      ></i>
    </div>
  )
}

export default Progress