import React, { useEffect, useLayoutEffect, useState } from "react"

const App = () => {
	const [title, setTitle] = useState("默认标题")
	useLayoutEffect(() => {
		// callback 执行时机
		// useEffect :页面渲染之后，在此callback 修改数据用户可能会看到页面闪烁
		// useLayoutEffect: dom更新后，页面渲染之前，在此callback 修改数据页面不会闪烁
		if (title === "sssssssssssssssssssssssssssssssssssssssssssssssss") {
			setTitle("默认标题")
		}
	}, [title])
	return (
		<div>
			App
			<h1>{title} </h1>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<button
				onClick={() =>
					setTitle("sssssssssssssssssssssssssssssssssssssssssssssssss")
				}
			>
				修改标题
			</button>
		</div>
	)
}

export default App
