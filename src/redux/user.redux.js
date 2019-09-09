import { encrypt } from '@common/ts/util'
import { message } from 'antd'
import {
  login,
  regist,
  isExsitEmailOrUserNameOrTel,
  sendMessage,
  verificatCode,
  resetPassword
} from '@api/user'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const REGIST_SUCCESS = 'REGIST_SUCCESS'
const RESET_PW = 'RESET_PW'

const initState = {
  userInfo: {},
  resetPW: false
}

export function user(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, userInfo: { ...state.userInfo, ...action.payload } }
    case REGIST_SUCCESS:
      return { ...state, userInfo: { ...state.userInfo, ...action.payload } }
    case RESET_PW:
      return { ...state, resetPW: action.payload }
    default:
      return state
  }
}

const loginSuccess = data => ({ type: 'LOGIN_SUCCESS', payload: data })
const registSuccess = data => ({ type: 'REGIST_SUCCESS', payload: data })
const resetPW = data => ({ type: 'RESET_PW', payload: data })

// 登录
export const _login = ({ userAccount, password, remember }) => {
  // 加密
  let params = {
    remember,
    userAccount: encrypt(userAccount),
    password: encrypt(password)
  }

  return async dispatch => {
    try {
      const res = await login(params)
      dispatch(loginSuccess(res.result))
    } catch (err) {
      if (err.code === 'U002') {
        return message.error('账号或密码错误！')
      }
      message.error('登录失败！')
    }
  }
}

// 注册
export const _regist = ({ userAccount, userName, password, code }) => {
  const params = {
    code,
    userName,
    userAccount: encrypt(userAccount),
    password: encrypt(password)
  }
  return async dispatch => {
    try {
      const res = await regist(params)
      dispatch(registSuccess(res.result))
    } catch (error) {
      message.error('注册失败！')
    }
  }
}

export const _resetPassword = ({ userAccount, password, code }) => {
  return async dispatch => {
    const params = {
      code,
      userAccount: encrypt(userAccount),
      password: encrypt(password),
      confirmKey: encrypt(userAccount)
    }
    try {
      await resetPassword(params)
      dispatch(resetPW(true))
      message.success('密码重置成功！')
    } catch (error) {
      message.error('密码重置失败！')
    }
  }
}

// 验证手机号码是否存在
export const _isExsitEmailOrUserNameOrTel = tel => async () => {
  try {
    const res = await isExsitEmailOrUserNameOrTel({ tel })
    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

// 发送手机验证码
export const _sendMessage = telNumber => async () => {
  try {
    await sendMessage({ telNumber })
  } catch (err) {
    message.error('验证码发送失败！')
  }
}

// 验证手机验证码是否正确
export const _verificatCode = ({ telNumber, code }) => async () => {
  try {
    const res = await verificatCode({ telNumber, code })
    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

