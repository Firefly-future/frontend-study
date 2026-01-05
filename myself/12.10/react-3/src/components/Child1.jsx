import { useStore } from "../store"

const Child1 = () => {
	const { state, initValue } = useStore()
	console.log(state, initValue)
	return <div className="box">
		<p>姓名：{state.username} </p>
		<input type="text" value={state.username} onChange={(e)=>{
			dispatch({
				type:"change_name",
				username:e.target.value
			})
		}} />
		<p>年龄：{state.age} </p>
		<p>性别：{state.sex} </p>
	</div>
}

export default Child1
