import React, { useState } from 'react'
import MyInput from './components/MyInput'
const App = () => {

  const [form, setForm] = useState({
    username: '姓名',
    age: 22,
    sex: '男'
  })

  const changeUsername = (val: string) => {
    setForm({
      ...form,
      username: val
    })
  }

  return (
    <div>
      <h3>表单</h3>
      <button onClick={() => {
        setForm({
          ...form,
          username: ''
        })
      }}>重置</button>
      <MyInput label="用户名" value={form.username} onChange={changeUsername} />
      <MyInput label="年龄" defaultValue="2000" onChange={value => {
        console.log(value)
      }} />
      <div>{JSON.stringify(form)}</div>
    </div>
  )
}

export default App