import React, { useState, useRef, useEffect } from "react"
import Child from "./components/Child"
import axios from "axios"
import classNames from "classnames"

const App = () => {
	const [title, setTitle] = useState("我的任务进阶清单")
	const [task, setTask] = useState("")
	const [tasks, setTasks] = useState([])
	const [activeIndex, setActiveIndex] = useState(0)
	const navList = ["全部", "已完成", "未完成"]
	const add = () => {
		if (task.trim()) {
			setTasks([...tasks, task])
			setTask("")
		}
	}
	const handlePush = (e) => {
		if (e.key === "Enter") {
			add()
		}
	}
	return (
		<div className="page">
			<h1>{title}</h1>
			<div className="inpBtn">
				<input
					className="inp"
					type="text"
					placeholder="输入新任务，然后按回车或者点击添加..."
					value={task}
					onChange={(e) => setTask(e.target.value)}
					onHandlePush={handlePush}
				/>
				<button
					onClick={add}
					className="add"
				>
					添加任务
				</button>
			</div>
			<h3>任务列表</h3>
			<nav>
				{navList.map((item, index) => {
					return (
						<div
							key={index}
							className={classNames("nav", { active: activeIndex === index })}
							onClick={() => setActiveIndex(index)}
						>
							{" "}
							{item}{" "}
						</div>
					)
				})}
			</nav>
			<ul>
				{tasks.map((item, index) => {
					return (
						<li key={index}>
							{index + 1}.{item}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default App
