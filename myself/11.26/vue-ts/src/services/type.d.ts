
export type BaseResponse<T extends {}={}>=T & {
    code:number
    msg:string
}

//登录参数
export type LoginInfo={
    username:string
    password:string
}
//注册参数
export type registerInfo={
    username:string
    password:string
    confirm:string
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