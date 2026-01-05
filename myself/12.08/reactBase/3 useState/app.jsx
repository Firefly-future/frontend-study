import React, { useState } from "react"

// 函数组件需要使用hooks实现组件逻辑
// hooks：以use开头的函数
// 使用规则：只能在函数组件最顶层使用，不能在if，for，子函数内部使用；
//          只能在函数组件和自定义hook中使用，不能在类组件和普通函数中使用
// useState：定义组件状态 返回一个数组[数据，改变数据的函数]

const App = () => {
  // const title = '标题'
  const [title, setTitle] = useState('标题')
  const [num, setNum] = useState(0)
  const [list, setList] = useState([])
  const [obj,setObj]=useState({name:'小明',age:22})

  const add = () => {
    // 修改组件状态 触发组件更新，异步执行，无法立即获取最新的数据
    // 同时多次修改状态时，只渲染最后一次，react合并更新
    setNum(num + 1)
    setNum(num + 1)
    setNum(num + 1)
    console.log(num)
    // 如果更新状态时需要确保使用的是最新变量，可以传入一个函数，函数的参数即是最新的数据
    setNum(prev=>{
      console.log(prev)
      return prev+1
    })
    setNum(prev=>{
      console.log(prev)
      return prev+1
    })
    setNum(prev=>{
      console.log(prev)
      return prev+1
    })
    console.log(num)
  }
  const decrease = () => {
    setNum(num - 1)
    console.log(num)
  }
  const remove=(index,time)=>{
    // const newList=[...list]
    // newList.splice(index,1)
    // setList(newList)
    setList(list.filter(item=>item.time!==time))
  }
  return (
    <div>
      <h1>{title}</h1>
      {/* 再这里写逻辑的话 需要是函数的形式 */}
      <button onClick={() => setNum(num - 1)}>-</button>
      <button onClick={decrease}>-</button>
      <p>数字：{num} </p>
      <button onClick={add}>+</button>
      <button onClick={() => {
        setList([
          {
            name: Math.random(),
            time: Date.now()
          },
          ...list
        ])
      }}>创建</button>
      <ul>
        {list.map((item,index)=>{
         return <li key={item.time}>
            {item.name}--{item.time}
            <button onClick={()=>remove(index,item.time)}>删除</button>
          </li>
        })}
      </ul>
      <p> {obj.name} </p>
      <p> {obj.age}  <button onClick={()=>{
        const newObj={...obj}
        newObj.age++
        setObj(newObj)
        // setObj({...obj,age:obj.age+1})
      }}>age+1</button></p>
    </div>
  )
}

export default App