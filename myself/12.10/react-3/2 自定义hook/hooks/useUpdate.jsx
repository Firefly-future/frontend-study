import { useEffect, useRef } from "react"

export const useUpdate = (callback,deps) => {
	// useRef 存和渲染无关的变量
	const first = useRef(true)
	useEffect(() => {
		if (first.current) {
			first.current = false
		} else {
			return callback
		}
	}, deps)
}
