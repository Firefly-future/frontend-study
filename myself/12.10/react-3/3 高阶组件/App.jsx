import { useState } from "react"
import Child1 from "./components/Child1"


function App() {
	const [count, setCount] = useState(1)
	const [title, setTitle] = useState("我是App的默认标题")
	const add = (n) => {
		setCount(count + n)
	}

	return (

			<div className="box">
				<h2> {title} </h2>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<b> {count} </b>
				<button onClick={() => add(1)}>count +1</button>
				{count > 0 && <Child1 title={title} />}
			</div>
	)
}

export default App
