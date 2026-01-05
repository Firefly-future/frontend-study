import React, { useState, useRef } from 'react'
import ButtonCounter from './components/ButtonCounter'

const App = () => {
  const [title, setTitle] = useState('默认标题')
  const [apple, setApple] = useState({
    title: '红富士',
    price: 22,
    count: 0
  })

  const changeCount = count => {
    // count: 接收子组件传过来的数据
    setApple({
      ...apple,
      count
    })
  }

  return (
    <div>
      <h1>{title}</h1>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <ButtonCounter
        {...apple}
        onChangeCount={changeCount}
      >
      </ButtonCounter>

      <div className="counter-wrap">我是外层元素</div>
    </div>
  )
}

export default App