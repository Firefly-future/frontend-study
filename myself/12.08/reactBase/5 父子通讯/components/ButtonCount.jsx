import React from "react"
import style from "./ButtonCount.module.scss"
// 使用css module 实现样式隔离 使样式只在当前组件生效
// 原理：编译css类名 让每个组件的类名都不重复
// 接收父组件参数以及事件都是props
console.log(style)
const ButtonCount = (props) => {
	console.log("父组件传入的参数", props)
	return (
		<div className={style.buttonCountBox}>
			<h2>名称：{props.name} </h2>
			<p>价格：{props.price} </p>
			{props.count > 0 && (
				<>
					<button
						className="btn"
						onClick={() => {
							props.onChangeCount(props.count - 1)
						}}
					>
						-
					</button>
					<p>数量：{props.count} </p>
				</>
			)}

			<button
				className="btn"
				onClick={() => {
					props.onChangeCount(props.count + 1)
				}}
			>
				+
			</button>
		</div>
	)
}

export default ButtonCount
