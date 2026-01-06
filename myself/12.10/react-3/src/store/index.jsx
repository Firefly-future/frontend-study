import { createContext, useContext, useReducer } from "react"

export const storeCtx = createContext()
export const useStore=()=>useContext(storeCtx)
// 初始值
export const initValue = {
	username: "默认小白",
	age: 18,
	sex: "男",
}
// 作用：返回和修改数据
export const reducer = (state, action) => {
	switch (action.type) {
		case "add_age":
			return { ...state, age: state.age + action.num }
		case "change_name":
			return { ...state, username: action.username }
		default:
			return state
	}
}

export const Provider = (props) => {
	const [state, dispatch] = useReducer(reducer, initValue)
	return <storeCtx.Provider value={{ state, dispatch }}>{props.children}</storeCtx.Provider>
}
