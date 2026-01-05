import { useState, useRef, useEffect } from "react"

export const useCount = (n) => {
	const [num, setNum] = useState(n)
	const IntervalId = useRef(null)
	const [loading, setLoading] = useState(false)

	const start = () => {
		if (IntervalId.current || num <= 0) return
		setLoading(true)
		IntervalId.current = setInterval(() => {
			setNum((n) => {
				if (n - 1 === 0) {
					stop()
				}
				return n - 1
			})
		}, 1000)
	}
	const stop = () => {
		clearInterval(IntervalId.current)
		IntervalId.current = null
		setLoading(false)
	}
	const reset = () => {
		stop()
		setNum(n)
	}
	useEffect(() => {
		return stop
	}, [])
	return {
		num,
		loading,
		start,
		stop,
		reset,
	}
}
