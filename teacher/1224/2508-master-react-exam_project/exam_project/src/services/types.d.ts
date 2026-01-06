import type { API_STATUS_CODE } from '@/constants'
import type { IconKeys } from '@/constants/icons'

// 通用 response 结构
export type BaseResponse<T = never> = {
  code: API_STATUS_CODE
  msg: string
  data: T
}

// 登陆参数
export type LoginParams = Record<'username' | 'password' | 'code', string>

// 登陆返回值
export type LoginResponse = {
  token: string
}

// 图形验证码返回值
export type CaptchaResponse = {
  code: string
}

// 权限
export type PermissionItem = {
  name: string
  path: string
}

// 用户信息
export type UserInfo = {
  _id: string
  username: string
  sex: string
  avator: string
  email: string
  age: number
  role: string[]
  permission: PermissionItem[]
}

// 左侧菜单
export type MenuListItem = {
  component: string
  createTime: number
  createdAt: string
  creator: string
  disabled: string
  icon: IconKeys
  isBtn: boolean
  name: string
  path: string
  pid: string
  updatedAt: string
  _id: string
  children?: MenuListItem[]
}