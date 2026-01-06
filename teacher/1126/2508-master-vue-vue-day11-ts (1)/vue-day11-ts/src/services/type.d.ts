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
  age: number
  email: string
  id: string
  no: number
  password: string
  sex: 0 | 1
  username: string
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