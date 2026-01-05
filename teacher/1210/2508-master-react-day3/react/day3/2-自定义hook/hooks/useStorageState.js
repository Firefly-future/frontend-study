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


// console.log(0 || '默认值')
// console.log(undefined ?? '默认值')


