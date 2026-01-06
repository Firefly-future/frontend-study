import React, { Component } from "react"
import Child1 from "./components/Child1"

// 原生事件对象
document.addEventListener('click',e=>{
	console.log(e.target)
})

// React v16.8之前 只有 class 组件可以定义状态，函数组件只能做渲染工作
// v16.8 之后出现 hooks 使得函数组件可以定义状态代替类组件
class App extends Component {
	// 组件状态
	state = {
		title: "我是标题",
		num: 0,
	}
	onChange = (e) => {
		console.log(e.target.value)
		// 更新组件状态，把传入的对象和之前的state进行合并
		this.setState({
			title: e.target.value,
		})
	}
	render() {
		const { title, num } = this.state
		return (
			// 合成事件：react中事件并没有绑定到具体的元素，而是只给根元素绑定事件，然后利用事件冒泡原理触发事件
			<div className="box">
				<h1 onClick={e=>{
					// e：react事件对象，包装一层事件对象统一处理不同平台的兼容问题
					// e.nativeEventL原生事件对象
					console.log(e)
					console.log(e.nativeEvent)
				}}>{title}</h1>
				<input
					type="text"
					value={title}
					onChange={this.onChange}
				/>
				<h3>{num}</h3>
				<button
				onClick={()=>{
					this.setState({
						num:this.state.num + 1
					})
				}}
					// onClick={() =>
					// 	this.setState((prevState) => ({
					// 		num: prevState.num + 1,
					// 	}))
					// }
				>
					num+
				</button>
				<Child1 num={num} />
			</div>
		)
	}
}
export default App
