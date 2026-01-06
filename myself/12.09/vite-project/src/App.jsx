import { useEffect, useState } from "react"
import Header from "./Header/Header"
import Filter from "./Filter/Filter"
import TaskItem from "./TaskItem/TaskItem"
import { FilterType } from "./constant"
function App() {
	const [list, setList] = useState(() => {
		return JSON.parse(localStorage.getItem("list")) || []
	})
	// const [list, setList] = useState([])
	const [Curkey, setCurkey] = useState(FilterType.ALL)

	const push = (title) => {
		console.log("父组件接受的数据", title)
		setList([
			...list,
			{
				id: Date.now() + Math.random(),
				title,
				isDone: false,
			},
		])
	}
	const del = (id) => {
		setList(list.filter((v) => v.id !== id))
	}
	const changeStatus = (id, isDone) => {
		setList(
			list.map((item) => {
				if (item.id === id) {
					return { ...item, isDone }
				}
				return item
			})
		)
	}
	const onChangeTitle = (id, title) => {
		setList(
			list.map((item) => {
				if (item.id === id) {
					return { ...item, title }
				}
				return item
			})
		)
	}
	// const change = (id, key, value) => {
	// 	setList(
	// 		list.map((item) => {
	// 			if (item.id === id) {
	// 				return { ...item, [key]: value }
	// 			}
	// 			return item
	// 		})
	// 	)
	// }

	const total = list.length
	const doneLen = list.filter((item) => item.isDone).length
	const getList = () => {
		return list.filter((item) => {
			if (Curkey === FilterType.DONE) {
				return item.isDone
			} else if (Curkey === FilterType.TODO) {
				return !item.isDone
			} else {
				return true
			}
		})
	}
	// 存储
	useEffect(() => {
		localStorage.setItem("list", JSON.stringify(list))
	}, [list])
	return (
		<div className="app">
			<Header onSubmit={push} />
			<Filter
				Curkey={Curkey}
				onChange={setCurkey}
			/>
			<div className="tasks-stats">
				总任务:{total} | 已完成:{doneLen} | 未完成:{total - doneLen}{" "}
			</div>
			{list.length === 0 ? (
				<div className="empty">暂无任务，请添加一个任务吧！</div>
			) : (
				<div className="tasks-list">
					{getList().map((item) => {
						return (
							<TaskItem
								key={item.id}
								{...item}
								onDel={del}
								onChange={changeStatus}
								onChangeTitle={onChangeTitle}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default App
