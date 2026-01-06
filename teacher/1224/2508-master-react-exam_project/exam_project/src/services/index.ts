import request from './request'
import type {
  BaseResponse,
  LoginParams,
  LoginResponse,
  CaptchaResponse,
  UserInfo,
  MenuListItem
} from './types'

export const getVerificationCode = () => {
  return request.get<null, BaseResponse<CaptchaResponse>>('/login/captcha')
}


export const userLogin = (params: LoginParams) => {
  return request.post<null, BaseResponse<LoginResponse>>('/login', params)
}


export const getUserInfo = () => {
  return request.get<null, BaseResponse<UserInfo>>('/user/info')
}

export const getUserMenu = () => {
  return request.get<null, BaseResponse<{ list: MenuListItem[] }>>('/user/menulist')
}