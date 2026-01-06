import React, { useState, useRef } from "react"
import style from "./Header.module.scss"
import classNames from "classnames"

const Header = (props) => {
	console.log('父组件传递的参数',props)
	const [inp, setInp] = useState("")
	const inpRef = useRef(null)

	const keyDown=(e)=>{
		if(e.keyCode===13){
			submit()
		}
	}
	const submit = () => {
		if (!inp.trim()) return
		props.onSubmit(inp)
		setInp('')
		inpRef.current.focus()
	}
	return (
		<div className={style.header}>
			<h1 className={style.title}>我的进阶任务清单</h1>
			<div className={style.inpBtn}>
				<input
					type="text"
					placeholder="输入新任务，然后回车或点击添加..."
					ref={inpRef}
					value={inp}
					onChange={(e) => {
						setInp(e.target.value)
					}}
					onKeyDown={keyDown}
				/>
				<button
					className={classNames("btn", "primary")}
					onClick={submit}
				>
					添加任务
				</button>
			</div>
		</div>
	)
}

export default Header
