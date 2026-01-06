import React from "react"
import { useState, forwardRef, useImperativeHandle } from "react"

const Child = (props, ref) => {
	const [num, setNum] = useState(0)
	const changeNum = (n) => {
		setNum(num + n)
	}
	useImperativeHandle(
		ref,
		() => {
			// 在依赖项更新时，会把此函数return的数值赋值给ref的current属性
			return {
				num,
				changeNum,
			}
		},
		[num]
	)
	return (
		<div className="box">
			Child
			<div>{num}</div>
			<button
				onClick={() => {
					changeNum(1)
				}}
			>
				num +
			</button>
		</div>
	)
}
// forwardRef：把父组件传入的ref对象转发到子组件的第二个参数
export default forwardRef(Child)
