import React from "react"
import style from "./TaskItem.module.scss"
import classNames from "classnames"
import { useState, useRef } from "react"

const TaskItem = ({ id, isDone, title, onChange, onDel, onChangeTitle }) => {
	const [Edit, setEdit] = useState(false)
	const [EditText, setEditText] = useState(title)
	const inputRef = useRef(null)
	const showEdit = () => {
		setEdit(true)
		setTimeout(() => {
			inputRef.current.focus()
		})
	}
	const save = () => {
		setEdit(false)
		onChangeTitle(id, EditText)
	}
	return (
		<div className={classNames(style.tasksItem, { [style.done]: isDone })}>
			<input
				type="checkbox"
				checked={isDone}
				onChange={(e) => onChange(id, e.target.checked)}
			/>
			{Edit ? (
				<>
					<input
						type="text"
						ref={inputRef}
						value={EditText}
						className={style.input}
						onChange={(e) => {
							setEditText(e.target.value)
						}}
						onKeyDown={(e) => {
							if (e.keyCode === 13) {
								save()
							}
						}}
					/>
					<div className={style.btns}>
						<button
							className="btn success"
							onClick={save}
						>
							保存
						</button>
						<button
							className="btn"
							onClick={() => {
								setEdit(false)
							}}
						>
							取消
						</button>
					</div>
				</>
			) : (
				<>
					<div
						className={style.title}
						onDoubleClick={showEdit}
					>
						{title}
					</div>
					<div className={style.btns}>
						<button
							className="btn warn"
							onClick={showEdit}
						>
							编辑
						</button>
						<button
							className="btn danger"
							onClick={() => onDel(id)}
						>
							删除
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default TaskItem
