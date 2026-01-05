import { useState, createContext } from 'react'
import Child1 from './components/Child1'
import { Provider } from './context/testCtx'

const App = () => {
  const [title, setTitle] = useState('我是app的标题')
  const [num, setNum] = useState(0)

  const add = (n = 1) => {
    setNum(num + n)
  }

  const value = {
    title,
    num,
    add
  }
  return (
    <Provider value={value}>
      <div className="box">
        <h1>{title}</h1>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <div>
          num: {num}
          <button onClick={() => add(1)}>num+</button>
        </div>
        <Child1 />
      </div>
    </Provider>
  )
}

export default App