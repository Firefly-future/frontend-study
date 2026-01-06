import { useEffect } from "react"

export const useUnmount = (callback) => {
	useEffect(() => {
		return callback
	}, [])
}
