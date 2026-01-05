import { useState, createContext } from 'react'
import Child1 from './components/Child1'
import { Provider } from './context/testCtx'
import { useStorageState } from './hooks/useStorageState'
import { useMount } from './hooks/useMount'

const App = () => {
  const [title, setTitle] = useStorageState('appTitle', '我是app的标题')
  // const [title, setTitle] = useState('我是app的标题')
  const [num, setNum] = useState(1)

  const add = (n = 1) => {
    setNum(num + n)
  }

  useMount(() => {
    console.log('组件挂载完成')
  })

  return (
    <Provider value={{
      title,
      num,
      add
    }}>
      <div className="box">
        <h1>{title}</h1>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <div>
          num: {num}
          <button onClick={() => add(1)}>num+</button>
          <button onClick={() => add(-1)}>num-</button>
        </div>
        {num > 0 && <Child1 />}
      </div>
    </Provider>
  )
}

export default App