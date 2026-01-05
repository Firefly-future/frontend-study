import { useEffect } from "react"

export const useUnmount = callback => useEffect(() => callback, [])

// export const useUnmount = (callback) => {
//   useEffect(() => {
//     return callback
//   }, [])
// }