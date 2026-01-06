
export const initValue = {
  username: '默认名称',
  age: 22,
  sex: 1
}

// 作用：返回和修改数据
export const reducer = (state, action) => {
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