import { useReducer } from "react"
// useReducer 类似 useState
// 一般用于全局变量
const initValue = {
	username: "默认小白",
	age: 18,
	sex: "男",
}

// 作用：返回和修改数据
const reducer = (state, action) => {
	console.log(state, action)
	switch (action.type) {
		case "add_age":
			return { ...state, age: state.age + action.num }
		case "change_name":
			return { ...state, username: action.username }
	}
	// return state
}
const App = () => {
	//dispatch 基本定型参数        //reducer 修改事件函数      //state 对应 initValue
	const [state, dispatch] = useReducer(reducer, initValue)
	return (
		<div>
			<div>app</div>
			<input
				type="text"
				value={state.username}
				onChange={(e) => {
					// 调用dispatch 会触发reducer函数 执行
					dispatch({
						// type 必需  另一个为变量
						type: "change_name",
						username: e.target.value,
					})
				}}
			/>
			<p>姓名：{state.username} </p>
			<p>年龄：{state.age} </p>
			<button
				onClick={() => {
					dispatch({
						type: "add_age",
						num: 1,
					})
				}}
			>
				age +{" "}
			</button>
			<p>性别：{state.sex} </p>
		</div>
	)
}

export default App
