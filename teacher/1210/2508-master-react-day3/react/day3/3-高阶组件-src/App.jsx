import { useState } from 'react'
import Child1 from './components/Child1'

const App = () => {
  const [title, setTitle] = useState('我是app的标题')
  const [num, setNum] = useState(1)

  const add = (n = 1) => {
    setNum(num + n)
  }

  return (
    <div className="box">
      <h1>{title}</h1>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <div>
        num: {num}
        <button onClick={() => add(1)}>num+</button>
        <button onClick={() => add(-1)}>num-</button>
      </div>
      {num > 0 && <Child1 appTitle={title} />}
    </div>
  )
}

export default App