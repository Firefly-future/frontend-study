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
        // title={apple.title}
        // price={apple.price}
        // count={apple.count}
        {...apple}
        onChangeCount={changeCount}
        header={<div style={{ background: 'green' }}>我是头部</div>}
        abc={<i>11111111</i>}
      >
        <ul>
          <li>111</li>
          <li>2222</li>
        </ul>
        <p>aaaaaaaaaaaaaa</p>
      </ButtonCounter>
      {/* <ButtonCounter /> */}
    </div>
  )
}

export default App