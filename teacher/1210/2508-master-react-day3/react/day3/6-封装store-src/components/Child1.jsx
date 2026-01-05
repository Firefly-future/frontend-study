import React from 'react'
import { useStore } from '../store'


const Child1 = () => {
  const { state, dispatch } = useStore()
  
  return (
    <div className="box">
      <h2>Child1</h2>
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

export default Child1