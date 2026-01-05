import React from "react"
import { useContext } from "react"
import { Consumer } from "../context/textCtx"
import textCtx from "../context/textCtx"

const Child4 = () => {
	const value = useContext(textCtx)
	console.log(value)
	return (
		<div className="box">
			<h2>{value.title}</h2>
			<h3> {value.count} </h3>
			<button onClick={() => value.add(-1)}> count - </button>
			<div> {JSON.stringify(value)} </div>
		</div>
	)
	// return (
	// 	<Consumer>
	// 		{(value) => {
	// 			console.log("父组件传入的参数", value)
	// 			return (
	// 				<div className="box">
	// 					<h3> 4 </h3>
	// 					<h2> {value.title} </h2>
	// 					<h5> {value.count} </h5>
	// 					<button onClick={()=>value.add(-1)}>count -</button>
	// 					<div>{JSON.stringify(value)}</div>
	// 				</div>
	// 			)
	// 		}}
	// 	</Consumer>
	// )
}

export default Child4
