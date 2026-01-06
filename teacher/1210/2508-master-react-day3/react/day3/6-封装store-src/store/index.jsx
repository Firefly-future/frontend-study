import { createContext, useReducer, useContext } from 'react'
import { initValue, reducer } from './reducer'

// 创建 context 对象
export const storeCtx = createContext()

// 定义获取数据的自定义 hook
export const useStore = () => useContext(storeCtx)


// 定义数据给所有组件传入数据
export const Provider = props => {
  const [state, dispatch] = useReducer(reducer, initValue)

  return <storeCtx.Provider value={{ state, dispatch }}>
    {props.children}
  </storeCtx.Provider>
}

