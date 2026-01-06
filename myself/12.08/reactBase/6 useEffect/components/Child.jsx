import React from "react"
import { useState, useEffect } from "react"

const Child = () => {
	const [count, setCount] = useState(1)

	useEffect(() => {
		console.log("最新的count", count)
		return () => {
			console.log("return的count", count)
		}
	}, [count])

  useEffect(()=>{
    return ()=>{
      console.log('组件销毁')
    }
  },[])
	return (
		<div className="box">
			<button
				onClick={() => {
					setCount(count + 1)
				}}
			>
        {count}
      </button>
		</div>
	)
}

export default Child
