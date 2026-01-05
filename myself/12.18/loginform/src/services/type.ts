// 登录信息
export type LoginType = {
  username?: string
  password?: string
}
// 注册信息
export type RegisterType = {
  username?: string
  password?: string
  confirm?: string
}
export type BaseResponse<T extends {}={}>=T & {
    code:number
    msg:string
}

// 列表信息
export type userlistInfo={
    page:number
    pagesize:number
}
//用户信息
export type userInfo={
    age:number
    email:string
    id:string
    no:number
    password:string
    sex:0 | 1
    username:string
    avatar:string
}
//用户返回信息
export type userlistRes=BaseResponse<{
    values:{
    total:number
    list:userInfo[]
}}>
//创建用户信息
export type UserForm = Pick<userInfo, "username" | "age" | "sex" | "email" | "password">

//更新用户信息
export type updateForm=Omit<userInfo,'no'|'avatar'>

//搜索信息
export type FilterSearch=Partial<Pick<userInfo,'username'|'age'|'sex'|'email'>>