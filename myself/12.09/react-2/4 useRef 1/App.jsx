import { useState, useMemo, useRef, useEffect } from "react"
// useRef 返回一个对象{current：xxx} 此对象地址在整个react组件的生命周期中保持不变
// 1 存和渲染无关的数据
//   useState定义的变量改变时会触发组件的渲染，useRef定义的变量改变时不会触发组件的渲染
// 2 获取dom
// 3 获取子组件内部的数据

function App() {
	const [title, setTitle] = useState("默认标题")
	const [num, setNum] = useState(0)
	const timer = useRef(null)
	const isDown = useRef(false)

	console.log("组件渲染了", timer)

	const start = () => {
		timer.current = setInterval(() => {
			// timer.current++
			console.log(timer.current, num)
			setNum((n) => n + 1)
		}, 1000)
		console.log(timer.current)
	}

	const stop = () => {
		clearInterval(timer.current)
		console.log(timer.current, "停止定时器")
	}

	useEffect(() => {
		return stop
	}, [])

	useEffect(() => {
		document.addEventListener("mousedown", () => {
			isDown.current = true
			console.log("鼠标按下了")
		})
		document.addEventListener("mousemove", () => {
			if (isDown.current) {
				console.log("鼠标移动了")
			}
		})
		document.addEventListener("mouseup", () => {
			isDown.current = false
			console.log("鼠标抬起了")
		})
	})
	return (
		<div>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<h2> {title} </h2>
			<h3>{num}</h3>
			<button onClick={start}>开始</button>
			<button onClick={stop}>暂停</button>
			<hr />
		</div>
	)
}

export default App
