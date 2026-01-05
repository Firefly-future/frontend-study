import { useState } from "react"
import Child1 from "./components/Child1"
import { Provider } from "./context/textCtx"

function App() {
	const [count, setCount] = useState(0)
	const [title, setTitle] = useState("我是App的默认标题")
	const add = (n) => {
		setCount(count + n)
	}
	const value = { title, count, add }
	return (
		<Provider value={value}>
			<div className="box">
				<h2> {title} </h2>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<b> {count} </b>
				<button onClick={() =>add(1)}>count +1</button>
				<Child1 />
			</div>
		</Provider>
	)
}

export default App
