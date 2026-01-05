import { useEffect } from "react"

export const useMount=(callback)=>{
  useEffect(()=>{
    if(typeof callback==='function'){
      return callback()
    }
  },[])
}
