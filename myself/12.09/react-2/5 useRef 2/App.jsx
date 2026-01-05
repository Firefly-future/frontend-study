import { useState, useMemo, useRef, useEffect } from "react"
import Child from "./components/Child"
// useRef 返回一个对象{current：xxx} 此对象地址在整个react组件的生命周期中保持不变
// 1 存和渲染无关的数据
//   useState定义的变量改变时会触发组件的渲染，useRef定义的变量改变时不会触发组件的渲染
// 2 获取dom
// 3 获取子组件内部的数据
//   配合forwardRef 和 useImperativeHandle 使用
//   forwardRef ；把父组件传入的ref 对象 转发到子组件的第二个参数

function App() {
	const childRef = useRef(null)

	return (
		<div>
			<div>App</div>
			<button
				onClick={() => {
					// 获取子组件内部的数据
					console.log(childRef.current)
					childRef.current.changeNum(-2)
				}}
			>
				按钮
			</button>
			<hr />
			<Child ref={childRef} />
		</div>
	)
}

export default App
