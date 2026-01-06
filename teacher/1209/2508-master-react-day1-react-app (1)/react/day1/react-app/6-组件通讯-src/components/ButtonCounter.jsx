import React from 'react'

const ButtonCounter = (props) => {

  console.log('父组件传入的参数', props)
  

  return (
    <div className="counter-wrap">
      {props.header}
      <h3>{props.title}</h3>
      <p>价格：¥{props.price}</p>
      {props.count > 0 &&
        <>
          <button onClick={() => props.onChangeCount(props.count - 1)}>-</button>
          {props.count}
        </>
      }
      <button onClick={() => props.onChangeCount(props.count + 1)}>+</button>
      {props.children}
    </div>
  )
}

export default ButtonCounter