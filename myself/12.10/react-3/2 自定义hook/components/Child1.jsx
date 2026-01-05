import React, { useState } from "react"
import Child2 from "./Child2"
import { UserProvider } from "../context/userCtx"
import { useStorageState } from "../hooks/useStorageState"
import { useMount } from "../hooks/useMount"
const Child1 = () => {
	const [list, setList] = useState([1, 2, 3, 4, 5])
	const [title, setTitle] = useStorageState("appTitle", "我是app默认标题")

	useMount(()=>{
		console.log('组件挂载成功')
	})
	return (
		<UserProvider value={{ list, setList }}>
			<div className="box">
				<h1> {title} </h1>
				<input type="text" value={title} onChange={e=>setTitle(e.target.value)} />
				<div>{JSON.stringify(list)}</div>
				<Child2 />
			</div>
		</UserProvider>
	)
}

export default Child1
