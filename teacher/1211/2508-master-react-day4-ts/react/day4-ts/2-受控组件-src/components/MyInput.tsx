import React, { useEffect, useState } from 'react'

interface Props {
  label: string
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
}

const MyInput: React.FC<Props> = ({
  label,
  value,
  defaultValue = '',
  onChange
}) => {
  const [inputText, setInputText] = useState(value ?? defaultValue)

  const change = (text: string) => {
    setInputText(text)
    onChange?.(text)
  }

  useEffect(() => {
    if (typeof value !== 'undefined' && value !== inputText) {
      setInputText(value)
    }
  }, [value])

  return (
    <div className="input_wrap">
      <span>{label}：</span>
      <input type="text" value={inputText} onChange={e => change(e.target.value)} />
      <i onClick={() => change('')}>清空</i>
    </div>
  )
}

export default MyInput