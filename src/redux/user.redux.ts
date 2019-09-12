import { encrypt } from '@common/ts/util'
import { message } from 'antd'
import { createBrowserHistory } from 'history'

import {
  login,
  regist,
  isExsitEmailOrUserNameOrTel,
  sendMessage,
  verificatCode,
  resetPassword
} from '@api/user'

enum ActionType {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  REGIST_SUCCESS = 'REGIST_SUCCESS',
}

const initState = {
  userInfo: {}
}

const history = createBrowserHistory()

interface InitState {
  userInfo: object
}

interface Action {
  type: ActionType,
  payload?: any
}

export function user(state: InitState = initState, action: Action) {
  switch (action.type) {
    case ActionType.LOGIN_SUCCESS:
      return { ...state, userInfo: { ...state.userInfo, ...action.payload } }
    case ActionType.REGIST_SUCCESS:
      return { ...state, userInfo: { ...state.userInfo, ...action.payload } }
    default:
      return state
  }
}

type Creator = (data: any) => { type: ActionType, payload: any }

export const loginSuccess: Creator = data => ({ type: ActionType.LOGIN_SUCCESS, payload: data })
export const registSuccess: Creator = data => ({ type: ActionType.REGIST_SUCCESS, payload: data })

interface AuthParams {
  userAccount: string
  password: string
  remember: boolean
  userName: string
  code: string
}

// 登录

export const _login = ({ userAccount, password, remember }: AuthParams) => {
  // 加密
  const params = {
    remember,
    userAccount: encrypt(userAccount),
    password: encrypt(password)
  }

  return async (dispatch: any) => {
    try {
      const res: any = await login(params)
      dispatch(loginSuccess(res.result))
      localStorage.setItem('token', res.result.token)
      history.push('/menu')
    } catch (err) {
      if (err.code === 'U002') {
        return message.error('账号或密码错误！')
      }
      message.error('登录失败！')
    }
  }
}

export const _regist = ({ userAccount, userName, password, code }: AuthParams) => {
  const params = {
    code,
    userName,
    userAccount: encrypt(userAccount),
    password: encrypt(password)
  }
  return async (dispatch: any) => {
    try {
      const res: any = await regist(params)
      dispatch(registSuccess(res.result))
      localStorage.setItem('token', res.result.token)
      history.push('/menu')
    } catch (error) {
      message.error('注册失败！')
    }
  }
}

export const _resetPassword = ({ userAccount, password, code }: AuthParams) => async () => {
  const params = {
    code,
    userAccount: encrypt(userAccount),
    password: encrypt(password),
    confirmKey: encrypt(userAccount)
  }
  try {
    await resetPassword(params)
    message.success('密码重置成功！')
    history.push('/login')
  } catch (error) {
    message.error('密码重置失败！')
  }
}


// 验证手机号码是否存在
export const _isExsitEmailOrUserNameOrTel = (tel: string) => async () => {
  try {
    const res = await isExsitEmailOrUserNameOrTel({ tel })
    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

// 发送手机验证码
export const _sendMessage = (telNumber: string) => async () => {
  try {
    await sendMessage({ telNumber })
  } catch (err) {
    message.error('验证码发送失败！')
  }
}

// 验证手机验证码是否正确
export const _verificatCode = ({ telNumber, code }: { telNumber: string, code: string }) => async () => {
  try {
    const res = await verificatCode({ telNumber, code })
    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

