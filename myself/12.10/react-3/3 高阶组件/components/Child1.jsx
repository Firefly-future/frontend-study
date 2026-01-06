import React, { useState } from "react"
import Child2 from "./Child2"
import { withCount } from "../hoc/WithCount"

const Child1 = ({count,title,start,...props}) => {
	// console.log(count,title,start)
	const [list, setList] = useState([1, 2, 3, 4, 5])

	return (
		<div className="box">
			<div>{JSON.stringify(list)}</div>
			<div>APP的title：{title} </div>
			<button onClick={start}>开始</button>
			<div> 倒计时： {count} </div>
			<Child2 />
		</div>
	)
}

export default withCount(Child1)
