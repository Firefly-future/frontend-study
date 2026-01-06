import Child3 from "./Child3"
import { useCount } from "../hooks/useCount"
import {useUpdate} from "../hooks/useUpdate"

const Child2 = () => {
	const { num, start, stop, reset, loading } = useCount(10)

	useUpdate(()=>{
		console.log('child2组件更新')
	},[num])
	return (
		<div className="box">
			<div>倒计时：{num}</div>
			<button
				onClick={start}
				disabled={loading}
			>
				开始
			</button>
			<button onClick={stop}>暂停</button>
			<button onClick={reset}>重置</button>
			<Child3 />
		</div>
	)
}

export default Child2
