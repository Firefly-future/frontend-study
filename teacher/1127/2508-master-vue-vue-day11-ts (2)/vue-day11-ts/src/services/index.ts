import axios from 'axios'
import type {
  BaseResponse,
  LoginParams,
  UserInfo,
  UserListParams,
  UserListRes
} from './type'

axios.defaults.baseURL = 'http://39.96.210.90:9001'


export const loginApi = (params: LoginParams) => {
  return axios.post<BaseResponse<{ token: string }>>('/api/login', params)
}

export const registerApi = (params: LoginParams) => {
  return axios.post<BaseResponse>('/api/register', params)
}

export const getUserInfoApi = () => {
  return axios.get<BaseResponse<{ values: UserInfo }>>('/api/user/info', {
    headers: {
      authorization: localStorage.getItem('token')
    }
  })
}

export const getUsersApi = (params: UserListParams) => {
  return axios.get<UserListRes>('/api/userlist', {
    params,
    headers: {
      authorization: localStorage.getItem('token')
    }
  })
}

export const delUserApi = (id: string) => {
  return axios.post<BaseResponse>('/api/user/delete', {
    id
  }, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  })
}
