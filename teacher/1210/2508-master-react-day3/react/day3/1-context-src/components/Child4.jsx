import { useContext } from 'react'
import testCtx, { Consumer } from '../context/testCtx'
import userCtx from '../context/userCtx'

const Child4 = () => {
  const value = useContext(testCtx)
  console.log(value)

  const userVal = useContext(userCtx)
  console.log(userVal)
  

  return (
    <div className="box">
      <h3>Child4</h3>
      <button onClick={() => value.add(-1)}>num - 1</button>
      {JSON.stringify(value)}
    </div>
  )
}

// const Child4 = () => {
//   return <Consumer>
//     {value => {
//       console.log('父级组件传入的数据', value)
//       return (
//         <div className="box">
//           <h3>Child4</h3>
//           <button onClick={() => value.add(-1)}>num - 1</button>
//           {JSON.stringify(value)}
//         </div>
//       )
//     }}
//   </Consumer>
// }

export default Child4