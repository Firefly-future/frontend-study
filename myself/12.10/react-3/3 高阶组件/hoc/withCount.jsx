// 高阶组件：一个参数为组件，返回一个组件的函数
// 作用：提取组件的公共逻辑

import { useState } from "react"

export const withCount = (Component) => {
	const Count = (props) => {
		const [count, setCount] = useState(10)
		const start = () => {
			setInterval(() => {
				setCount((c) => c - 1)
			}, 1000)
		}
		return (
			<Component
				{...props}
				count={count}
				start={start}
			/>
		)
	}
	return Count
}
