import { useState, useRef } from 'react'
import style from './Header.module.scss'

const Header = ({ onSubmit }) => {
  const [text, setText] = useState('')
  const inpRef = useRef(null)

  const keydown = e => {
    if (e.keyCode === 13) {
      submit()
    }
  }

  const submit = () => {
    if (!text.trim()) return
    onSubmit(text)
    setText('')
    inpRef.current.focus()
  }

  return (
    <div className={style.header}>
      <h2>待办事项</h2>
      <div className={style.form}>
        <input
          ref={inpRef}
          type="text"
          placeholder="点击回车或者提交按钮添加数据"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={keydown}
        />
        <button className="button primary" onClick={submit}>提交</button>
      </div>
    </div>
  )
}

export default Header