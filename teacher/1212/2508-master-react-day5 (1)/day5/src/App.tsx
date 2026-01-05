import React, { useState } from 'react'
import Select from './components/Select/Select'
import Input from './components/Input/Input'

const App = () => {
  const [form, setForm] = useState({
    name: '小明',
    city: [2, 3, 4]
  })

  return (
    <div>
      {/* <button onClick={() => {
        setForm({
          ...form,
          name: Math.random() + ''
        })
      }}>修改name</button>
      <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /> */}
      <div className="form-item">
        姓名: <Input placeholder="请输入用户名" value={form.name} onChange={value => setForm({...form, name: value})}  />
      </div>

      {/* <select value={2}>
        <option value={1}>北京</option>
        <option value={2}>上海</option>
        <option value={3}>天津</option>
      </select> */}

      <div className="form-item">
        选择城市: 
        <Select
          placeholder="选择城市"
          value={form.city}
          options={[
            { label: '北京', value: 1},
            { label: '上海', value: 2},
            { label: '广州', value: 3},
            { label: '深圳', value: 4},
            { label: '天津', value: 5},
            { label: '成都', value: 6},
            { label: '重庆', value: 7},
            { label: '杭州', value: 8},
            { label: '苏州', value: 9},
            { label: '南京', value: 10},
            { label: '郑州', value: 11}
          ]}
          onChange={value => {
            console.log(value)
            setForm({
              ...form,
              city: value
            })
          }}
        />
      </div>
      <button onClick={() => {
        setForm({
          ...form,
          city: [1]
        })
      }}>修改城市</button>
      {JSON.stringify(form)}
    </div>
  )
}

export default App