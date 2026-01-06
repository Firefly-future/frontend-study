import React, { useReducer } from 'react'


const initValue = {
  username: '默认名称',
  age: 22,
  sex: 1
}

// 作用：返回和修改数据
const reducer = (state, action) => {
  console.log(state, action)
  switch(action.type) {
    case 'age_add':
      return { ...state, age: state.age + action.num }
    case 'change_name':
      return { ...state, username: action.name }
    default :
      return state
  }
}


const App = () => {
  const [state, dispatch] = useReducer(reducer, initValue)

  // console.log(state)
  
  return (
    <div>
      <h2>app</h2>
      <input type="text" value={state.username} onChange={e => {
        dispatch({
          type: 'change_name',
          name: e.target.value
        })
      }} />
      <p>姓名: {state.username}</p>
      <p>年龄: {state.age}</p>
      <p>性别: {state.sex}</p>
      <button onClick={() => {
        // 调用 dispatch 会触发 reducer 函数执行
        dispatch({
          type: 'age_add',
          num: 2
        })
      }}>age+</button>
    </div>
  )
}

export default App