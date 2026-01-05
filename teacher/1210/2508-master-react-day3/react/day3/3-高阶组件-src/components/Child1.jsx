import { useState } from 'react'
import Child2 from './Child2'
import { withCount } from '../hoc/withCount'

const Child1 = (props) => {
  const [list, setList] = useState([1,2,3,4])

  console.log(props)
  
  return (
    <div className="box">
      <h2>Child1</h2>
      <button onClick={props.start}>开始</button>
      <div>倒计时：{props.count}</div>
      <p>父组件的title{props.appTitle}</p>
      <button onClick={() => setList([...list, Math.random()])}>add</button>
      <div>{JSON.stringify(list)}</div>
      <Child2 />
    </div>
  )
}

// export default Child1
export default withCount(Child1)