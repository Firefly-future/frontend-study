import React, { memo } from "react"

const List = ({ arr, count, onDel }) => {
	console.log("子组件更新了")
	return (
		<div className="box">
			<button onClick={onDel}>删除</button>
			<p>父组件传入的count:{count}</p>
			<ul>
				{arr.map((n) => (
					<li key={n}> {n} </li>
				))}
			</ul>
		</div>
	)
}
// React.memo 优化组件性能，减少不必要的渲染
// 原理：React.memo 浅比较上一次的props和当前的props是否一致，一致就不更新，不同再进行组件渲染
// export default React.memo(List)

export default  memo(List)
