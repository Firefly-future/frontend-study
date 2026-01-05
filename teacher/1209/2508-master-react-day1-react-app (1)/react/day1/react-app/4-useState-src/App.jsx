import React, { useState } from 'react'
import classNames from 'classnames'

// 函数组件需要使用 hooks 实现组件逻辑
// hooks: 名称以 use 开头的函数
// hooks 使用规则:
// 1. 只能在函数组件最顶层使用，不能再if、for、子函数内部使用
// 2. 只能在函数组件和自定义hook中使用，不能在类组件或普通函数中使用

// useState: 定义组件状态，返回一个数组 [数据, 改变数据的函数]

const App = () => {
  const [num, setNum] = useState(10)
  const [title, setTitle] = useState('标题')
  const [list, setList] = useState([])
  const [obj, setObj] = useState({ name: '小明', age: 22 })

  console.log('组件渲染了', num)


  const add = () => {
    // 修改组件状态，触发组件更新，此方法是异步执行，无法立即获取到最新的数据
    // 同时多次修改状态时 react 会合并更新
    // setNum(num + 1) // 10 + 1
    // setNum(num + 1) // 10 + 1
    // setNum(num + 1) // 10 + 1

    // 如果更新状态时需要确保使用的是最新变量，可以传入一个函数，函数的参数就是最新的数据
    setNum(prev => {
      // prev: 最新的变量
      console.log(prev)
      return prev + 1
    })
    setNum(prev => {
      console.log(prev)
      return prev + 1
    })
    setNum(prev => {
      console.log(prev)
      return prev + 1
    })
    console.log(num)
  }

  const remove = (index, time) => {
    // const newList = [...list]
    // newList.splice(index, 1)
    // setList(newList)
    setList(list.filter(item => item.time !== time))
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>num: {num}</p>
      <button onClick={() => setNum(num - 1)}>-</button>
      <button onClick={add}>+</button>
      <hr />
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
        {list.map((item, index) =>
          <li key={item.time}>
            {item.name} - {item.time}
            <button onClick={() => remove(index, item.time)}>删除</button>
          </li>
        )}
      </ul>
      <hr />
      <p>姓名:{obj.name}</p>
      <p>年龄:{obj.age}
        <button onClick={() => {
          const newObj = {...obj}
          newObj.age++
          setObj(newObj)
          // setObj({ ...obj, age: obj.age + 1 })
        }}>age+</button>
      </p>
    </div>
  )
}

export default App