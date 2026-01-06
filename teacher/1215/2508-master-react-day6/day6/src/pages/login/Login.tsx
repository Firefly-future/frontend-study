import React, { useState } from 'react'
import style from './Login.module.scss'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const onSubmit = () => {
    if (form.username === 'admin' && form.password === '123') {
      const token = form.username + form.password
      localStorage.setItem('token', token)
      alert('登录成功！')
      navigate('/')
    } else {
      alert('用户名或密码错误')
    }
  }
  return (
    <div className={style.page}>
      <div className={style.form}>
        <div className={style.form_item}>
          <input type="text" placeholder="用户名" value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
        </div>
        <div className={style.form_item}>
          <input type="password" placeholder="密码" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        </div>
        <div className={style.form_item}>
          <button onClick={onSubmit}>登录</button>
        </div>
      </div>
    </div>
  )
}

export default Login