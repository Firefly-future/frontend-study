import { useState, useMemo,useCallback } from "react"
import List from "./components/List"
// useCallback(callback,[依赖项])
// 1 缓存callback函数
// 2 依赖项改变重新创建函数，依赖项没有改变从缓存中读取函数
// 作用：配合React.memo高阶组件优化子组件的性能
function App() {
	const [count, setCount] = useState(0)
	const [title, setTitle] = useState("默认标题")
	const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8])

  const create=useCallback(()=>{
    setArr([...arr,arr.length+1])
  },[arr])
  
  const shiftArr=useCallback(()=>{
    const newArr=[...arr]
    newArr.shift()
    setArr(newArr)
  },[arr])
  
  console.log('App更新了')

	return (
		<div>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<h2> {title} </h2>
			<hr />
      <button onClick={()=>setCount(count + 1)}>count + </button>
      <hr />
			<button onClick={create}>创建</button>
      <List arr={arr} count={count} onDel={shiftArr}></List>
		</div>
	)
}

export default App
