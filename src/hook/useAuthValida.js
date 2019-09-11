import { useDispatch } from 'react-redux'
import { createBrowserHistory } from 'history'
import {
  _isExsitEmailOrUserNameOrTel,
  _verificatCode,
} from '@redux/user.redux'

const useAuthValida = (form) => {
  const dispatch = useDispatch()

  // 验证手机号码是否已经存在
  const validatePhoneNumber = async (rule, value, callback) => {
    const reg = /^1(\d)\d{9}$/
    if (value && !reg.test(value)) {
      callback('手机号码格式不正确！')
    } else {
      const history = createBrowserHistory()
      const { pathname } = history.location
      try {
        await dispatch(_isExsitEmailOrUserNameOrTel(value))
        pathname === '/register' ? callback('手机号码已存在！') : callback()

      } catch (err) {
        pathname === '/register' ? callback() : callback('手机号码未注册！')
      }

    }
  }
  // 验证密码长度是否大于6
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value.length < 6) {
      callback('请输入6-20位密码！')
    } else {
      callback()
    }
  }

  // 验证两次输入的密码是否一致
  const validateToNextPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两次填写的密码不一致！')
    } else {
      callback()
    }
  }

  // 验证输入的短信验证码是否正确
  const validateCode = async (rule, code, callback) => {
    if (code && code.length === 6) {
      const telNumber = form.getFieldValue('userAccount')
      try {
        await dispatch(_verificatCode({ code, telNumber }))
        callback()
      } catch (error) {
        callback('短信验证码输入错误！')
      }
    }
  }

  // 验证昵称
  const validateUserName = (rule, value, callback) => {
    const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,10}$/
    if (value && !reg.test(value)) {
      callback('仅支持中文、英文、数字组成的2-10个字符！')
    } else {
      callback()
    }
  }
  return {
    validatePhoneNumber,
    compareToFirstPassword,
    validateToNextPassword,
    validateCode,
    validateUserName
  }
}

export default useAuthValida