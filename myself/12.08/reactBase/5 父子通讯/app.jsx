import React, { useState,useRef } from "react"
import ButtonCount from "./components/ButtonCount"

const App = () => {
  const [title,setTitle]=useState('默认标题')
  const [apple,setApple]=useState(
    {
      name:'红富士',
      price:22,
      count:1
    }
  )
  const changeCount=count=>{
    setApple({
      ...apple,
      count
    })
  }
  return (
    <div>
      <h1 class="buttonCountBox"> {title} </h1>
      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <ButtonCount 
      // name={apple.name}
      // price={apple.price}
      // count={apple.count}
      {...apple}
      onChangeCount={changeCount}
      ></ButtonCount>
    </div>
  )
}

export default App