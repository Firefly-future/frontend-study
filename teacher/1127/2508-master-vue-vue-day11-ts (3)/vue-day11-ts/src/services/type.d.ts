// .d.ts 
// 1. 类型声明文件，只能定义类型
// 2. 如果此文件中没有使用 import/export, 此文件中的类型时全局类型，其他文件可以不用引入直接使用

export type BaseResponse<T extends {} = {}> = T & {
  code: number
  msg: string
}

// 登陆参数
export type LoginParams = {
  username: string
  password: string
}


// 用户信息
export type UserInfo = {
  id: string
  no: number
  age: number
  email: string
  password: string
  sex: 0 | 1
  username: string
  avatar: string
}

// 用户列表参数
export type UserListParams = {
  page: number
  pagesize: number
}
// 用户列表返回值
export type UserListRes = BaseResponse<{
  values: {
    total: number
    list: UserInfo[]
  }
}>

// 创建用户参数
export type UserCreateParams = Pick<UserInfo, 'age' | 'email' | 'sex' | 'password' | 'username'>

// 创建用户参数
export type UserUpdateParams = Omit<UserInfo, 'no' | 'avatar'>