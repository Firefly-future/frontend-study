import { useRef, useState, useEffect } from "react"

export const useUpdate = (callback, deps) => {
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
    } else {
      callback()
    }
  }, deps)
}