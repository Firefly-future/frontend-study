import React, { useEffect, useState } from "react"
import style from "./KeyBoard.module.scss"

const KeyBoard = ({ list, onHandleClick, poweractive, bankactive, volume }) => {
	const [clickIndex, setClickIndex] = useState(-1)
	const handleClick = (index) => {
		const text = list[index].id
		onHandleClick(text)
		setClickIndex(index)
		playAudio(index)
	}
	const handleDeactivate = () => {
		setClickIndex(-1)
	}
	const keyDown = (e) => {
		const matchIndex = list.findIndex((item) => item.keyCode === e.keyCode)
		if (matchIndex !== -1) {
			// 匹配到对应按钮
			handleClick(matchIndex)
		}
	}
	const keyUp = (e) => {
		const matchIndex = list.findIndex((item) => item.keyCode === e.keyCode)
		if (matchIndex !== -1) {
			// 匹配到对应按钮
			handleDeactivate()
		}
	}
	const playAudio = (index) => {
		if (!poweractive) return
		const audioUrl = bankactive ? list[index].bankUrl : list[index].url
		const audio = new Audio(audioUrl)
		audio.volume = volume
		audio.play()
	}
	useEffect(() => {
		window.addEventListener("keydown", keyDown)
		window.addEventListener("keyup", keyUp)
		return () => {
			window.removeEventListener("keydown", keyDown)
			window.removeEventListener("keyup", keyUp)
		}
	}, [list, poweractive, bankactive]) // 依赖变化时重新绑定

	return (
		<div className={style.KeyBoard}>
			<div className={style.btns}>
				{list.map((item, index) => {
					return (
						<button
							key={item.id}
							onMouseDown={() => handleClick(index)}
							onMouseUp={() => {
								handleDeactivate()
							}}
							className={clickIndex === index ? style.clicked : ""}
						>
							{item.keyTrigger}
						</button>
					)
				})}
			</div>
		</div>
	)
}

export default KeyBoard
