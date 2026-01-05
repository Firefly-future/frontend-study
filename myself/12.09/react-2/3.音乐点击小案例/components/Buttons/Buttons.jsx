import React, { useState, useRef, useEffect } from "react"
import style from "./Buttons.module.scss"
import classNames from "classnames"
const Buttons = ({
	title,
	onHandleBankClick,
	onHandlePowerClick,
	poweractive,
	bankactive,
	onChange,
}) => {
	const isDown = useRef(false)
	const lineRef = useRef(null)
	const [left, setLeft] = useState(0)
	useEffect(() => {
		const { left: lineLeft, width } = lineRef.current.getBoundingClientRect()
		const maxLeft = width - 10
		setLeft(maxLeft)
		const mousemove = (e) => {
			if (isDown.current) {
				// console.log("按下", e.clientX)
				let left = e.clientX - lineLeft
				if (left < 0) left = 0
				if (left > maxLeft) left = maxLeft
				setLeft(left)
				onChange(left / maxLeft)
			}
		}
		const mouseup = (e) => {
			isDown.current = false
		}
		document.addEventListener("mousemove", mousemove)
		document.addEventListener("mouseup", mouseup)
		return () => {
			document.removeEventListener("mousemove", mousemove)
			document.removeEventListener("mouseup", mouseup)
		}
	}, [])
	return (
		<div className={style.Buttons}>
			<h3>Power</h3>
			<div className={style.btnContain}>
				<button
					className={style.btn}
					onClick={onHandlePowerClick}
				></button>
				<div
					className={classNames(style.bar1, poweractive ? style.active : "")}
				></div>
			</div>
			<h4> {title} </h4>
			<div
				className={style.lineThrough}
				ref={lineRef}
			>
				<div
					className={style.line}
					style={{ left }}
					onMouseDown={() => {
						isDown.current = true
					}}
				></div>
			</div>
			<h3>Bank</h3>
			<div className={style.btnContain}>
				<button
					className={style.btn}
					onClick={onHandleBankClick}
				></button>
				<div
					className={classNames(style.bar2, bankactive ? style.active : "")}
				></div>
			</div>
		</div>
	)
}

export default Buttons
