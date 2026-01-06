import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import KeyBoard from "./components/KeyBoard/KeyBoard"
import Buttons from "./components/Buttons/Buttons"

const App = () => {
	const [list, setList] = useState([])
	const [title, setTitle] = useState("Heater 4")
	const [volume, setVolume] = useState(1)

	const [poweractive, setPowerActive] = useState(true)
	const [bankactive, setBankActive] = useState(false)

	const handlePowerClick = () => {
		setPowerActive((poweractive) => !poweractive)
	}
	const handleBankClick = () => {
		setBankActive((bankactive) => !bankactive)
	}

	const getKeyBoard = async () => {
		try {
			const res = await axios.get("http://39.96.210.90:3000/api/music")
			console.log(res.data)
			setList(res.data)
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		getKeyBoard()
	}, [])

	const handleClickButton = (text) => {
		setTitle(text)
	}

	return (
		<div className="music-container">
			<div className="header">FCC🔥</div>
			<div className="main">
				<KeyBoard
					list={list}
					onChange={setList}
					onHandleClick={handleClickButton}
					poweractive={poweractive}
					bankactive={bankactive}
					volume={volume}
				/>
				<Buttons
					title={title}
					poweractive={poweractive}
					bankactive={bankactive}
					onHandleBankClick={handleBankClick}
					onHandlePowerClick={handlePowerClick}
					onChange={(value) => {
						console.log(value)
						setVolume(value)
					}}
				/>
			</div>
		</div>
	)
}

export default App
