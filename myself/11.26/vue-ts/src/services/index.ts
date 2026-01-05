// import axios from "axios"
import { Header } from 'element-plus/es/components/table-v2/src/components/index.mjs'
import request from './request'
import type {
    BaseResponse,
    LoginInfo,
    registerInfo,
    userlistInfo,
    userInfo,
    userlistRes,
    UserForm,
    updateForm,
    FilterSearch
} from "./type"
// axios.defaults.baseURL='http://39.96.210.90:9001'

// 登录
export const loginApi = (params: LoginInfo) => {
    return request.post<BaseResponse<{ token: string }>>('/api/login', params)
}
// 注册
export const registerApi = (params: registerInfo) => {
    return request.post<BaseResponse>('/api/register', params)
}
// 列表
export const listApi = (params: userlistInfo & FilterSearch) => {
    return request.get<userlistRes>('/api/userlist', {params})
}
// 用户信息
export const userInfoApi = () => {
    return request.get<BaseResponse<{ values: userInfo }>>('/api/user/info')
}

//删除信息
export const delUserApi = (id: string) => {
    return request.post<BaseResponse>('/api/user/delete', {id})
}

//创建
export const createApi=(params:UserForm)=>{
    return request.post<BaseResponse>('/api/user/create',params)
}

//更新
export const updateApi=(params:updateForm)=>{
    return request.post<BaseResponse>('/api/user/update',params)
}

// 导出excel表格
export const exportApi=(ids:string[])=>{
    return request.post('/api/export',{ids},{responseType:'blob'})
}