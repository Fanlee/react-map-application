import { commit } from '@common/ts/server'
/**
 * 用户相关接口
 */

export interface Params {
  [p: string]: any
}
// 登录接口
export function login(params: Params) {
  return commit({
    url: '/saas/platform/user/login',
    method: 'POST',
    params
  })
}

// 验证手机号是否存在
export function isExsitEmailOrUserNameOrTel(params: Params) {
  return commit({
    url: '/saas/platform/user/isExsitEmailOrUserNameOrTel',
    params
  })
}

// 发送验证码
export function sendMessage(params: Params) {
  return commit({
    url: '/saas/platform/phone/sendMessage',
    method: 'POST',
    params
  })
}

// 验证验证码是否正确
export function verificatCode(params: Params) {
  return commit({
    url: '/saas/platform/phone/verificatCode',
    method: 'POST',
    params
  })
}

// 注册
export function regist(params: Params) {
  return commit({
    url: '/saas/platform/team/regist',
    method: 'POST',
    params
  })
}

// 重置密码
export function resetPassword(params: Params) {
  return commit({
    url: '/saas/platform/user/resetPassword',
    method: 'POST',
    params
  })
}