import React, { useContext } from "react"
import Child4 from "./Child4"
import userCtx from "../context/userCtx"


const Child3 = () => {
	const Uservalue=useContext(userCtx)
	// console.log(Uservalue)
	return <div className="box">
		<ul>
			{Uservalue.list.map(item=>{
				return <li key={item}>
					{item}
				</li>
			})}
		</ul>
		 <Child4 />
	</div>
}

export default Child3
