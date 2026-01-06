import React from 'react'
import { useStore } from '../store'

const Child2 = () => {
  const { state, dispatch } = useStore()

  return (
    <div className="box">
      <h2>Child2</h2>
      <div>{JSON.stringify(state)}</div>
      <button onClick={() => {
        dispatch({
          type: 'age_add',
          num: 5
        })
      }}>age+</button>
    </div>
  )
}

export default Child2