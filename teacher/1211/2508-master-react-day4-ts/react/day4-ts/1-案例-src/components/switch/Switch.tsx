import React, { useEffect, useState } from 'react'
import style from './Switch.module.scss'
import classNames from 'classnames'

interface Props {
  value?: boolean
  children: React.ReactNode
  onChange?: (value: boolean) => void
}

const Switch: React.FC<Props> = (props) => {
  const [on, setOn] = useState(props.value ?? false)

  useEffect(() => {
    if (typeof props.value === 'boolean' && on !== props.value) {
      setOn(props.value)
    }
  }, [props.value])

  return (
    <div className={style.switch_wrap}>
      <p>{props.children}</p>
      <div
        className={classNames(style.switch, { [style.on]: on })}
        onClick={() => {
          setOn(!on)
          props.onChange?.(!on)
        }}
      >
        <span></span>
      </div>
    </div>
  )
}

export default Switch