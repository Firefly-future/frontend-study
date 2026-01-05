import { useEffect, useState } from "react"

export const useStorageState = (key, initVal) => {
	const [state, setState] = useState(() => {
		const value = JSON.parse(localStorage.getItem(key))
		return value ?? initVal
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state))
	}, [state])

	return [state, setState]
}

//   ||       左侧为假值，走右侧值
//   ??       左侧严格为null或者undefined 才会走右侧值