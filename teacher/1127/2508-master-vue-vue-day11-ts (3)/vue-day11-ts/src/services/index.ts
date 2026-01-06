import request from './request'
import type {
  BaseResponse,
  LoginParams,
  UserInfo,
  UserListParams,
  UserListRes,
  UserCreateParams,
  UserUpdateParams
} from './type'

export const loginApi = (params: LoginParams) => {
  return request.post<BaseResponse<{ token: string }>>('/api/login', params)
}

export const registerApi = (params: LoginParams) => {
  return request.post<BaseResponse>('/api/register', params)
}

export const getUserInfoApi = () => {
  return request.get<BaseResponse<{ values: UserInfo }>>('/api/user/info')
}

export const getUsersApi = (params: UserListParams) => {
  return request.get<UserListRes>('/api/userlist', { params })
}

export const delUserApi = (id: string) => {
  return request.post<BaseResponse>('/api/user/delete', { id })
}

export const createUserApi = (params: UserCreateParams) => {
  return request.post<BaseResponse>('/api/user/create', params)
}

export const updateUserApi = (params: UserUpdateParams) => {
  return request.post<BaseResponse>('/api/user/update', params)
}
