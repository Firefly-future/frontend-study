import { useState, useMemo } from "react"
// useMemo(callback,[依赖项])
// 1 callback需要return 一个 返回值
// 2 依赖项改变时会自动执行callback缓存return的数据,依赖项没改变从缓存中读取数据

function App() {
	const [count, setCount] = useState(0)
	const [title, setTitle] = useState("默认标题")
	const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8])
	const [odd, setOdd] = useState(false)

  

	const newList = useMemo(() => {
    console.log('运行了')
		return arr.filter((v) => {
			if (odd) return v % 2 === 1
			return true
		})
	}, [arr, odd])

	return (
		<div>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<h2> {title} </h2>
			<hr />
			<button onClick={() => setArr([...arr, arr.length + 1])}>创建</button>
			<button onClick={() => setOdd(!odd)}> {odd ? "奇数" : "全部"} </button>
			<ul>
				{newList.map((n) => {
					return <li key={n}> {n} </li>
				})}
			</ul>
		</div>
	)
}

export default App
