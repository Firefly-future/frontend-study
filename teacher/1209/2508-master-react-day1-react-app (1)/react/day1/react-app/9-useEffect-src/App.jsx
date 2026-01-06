import React, { useState, useRef, useEffect } from 'react'
import Child from './components/Child'
import axios from 'axios'

// useEffect: 处理组件副作用，例如进入页面调用接口，创建定时器，绑定原生事件...，还可以实现类似生命周期的功能
// useEffect(callback, [依赖项1, 依赖项2, ...])
// 1. 依赖项数组不写：组织中只要有变量更新就会执行 callback，类似组件更新完成 componentDidUpdate
// 2. 依赖项传空数组：callback 只执行一次，在组件渲染完成后执行，类似组件挂载完成 componentDidMount
// 3. 依赖项传入具体变量：依赖项改变时执行 callback
// 4. callback 中 return 的函数：清除副作用。依赖项改变时先执行上一次 return 的函数，再执行当前的 callback，组件销毁时会执行最后 return 的函数
// 5. 依赖项传空数组，callback 中 return 的函数，可以实现类似 componentWillUnmount

// 等待组件渲染完成以后执行 callback
const App = () => {
  const [title, setTitle] = useState('默认标题')
  const [show, setShow] = useState(true)

  return (
    <div>
      <h1>{title}</h1>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <hr />
      <button onClick={() => setShow(!show)}>显示隐藏</button>
      {show && <Child />}
    </div>
  )
}

export default App
