import React, { useState } from "react"
import Child2 from "./Child2"
import { UserProvider } from "../context/userCtx"
const Child1 = () => {
	const [list, setList] = useState([1, 2, 3, 4, 5])
	return (
		<UserProvider value={{list,setList}}>
			<div className="box">
        <div>{JSON.stringify(list)}</div>
				<Child2 />
			</div>
		</UserProvider>
	)
}

export default Child1
