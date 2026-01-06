import { useState } from "react"
import Child1 from "./components/Child1"

function App() {
	const [count, setCount] = useState(0)
	const [form, setForm] = useState({
		username: "小明",
		age: 22,
		sex: "男",
	})
	const changeUsername = (text: string) => {
		setForm({
			...form,
			username: text,
		})
	}
	return (
		<>
			<div>
				<h3>{count} </h3>
				<button onClick={() => setCount(count + 1)}>count +</button>
				<div>{JSON.stringify(form)} </div>
				<button onClick={()=>setForm({...form,username:''})}>重置</button>
				<Child1
					label="用户名"
					value={form.username}
					onChange={changeUsername}
					defaultValue="小明"
				/>
				<Child1 
				label="密码"
				defaultValue="123"
				/>
				<div>{JSON.stringify(form)} </div>
			</div>
		</>
	)
}

export default App
