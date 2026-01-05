import React, { useEffect, useState } from 'react'
import style from './Input.module.scss'

interface Props {
  defaultValue?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

const Input: React.FC<Props> = ({
  defaultValue = '',
  value,
  placeholder = '',
  onChange
}) => {
  const isControlled = typeof value !== 'undefined'
  const [text, setText] = useState(value ?? defaultValue)

  const onChangeText = (value: string) => {
    if (!isControlled) {
      setText(value)
    }
    onChange?.(value)
  }

  useEffect(() => {
    if (value !== undefined) {
      setText(value)
    }
  }, [value])

  return (
    <div className={style.input_wrap}>
      <input
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={e => onChangeText(e.target.value)}
      />
      {text.length > 0 &&
        <span onClick={() => onChangeText('')}>x</span>
      }
    </div>
  )
}

export default Input