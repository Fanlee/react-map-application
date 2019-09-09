import { enc, AES, mode } from 'crypto-js'

/**
 * 用户名、密码加密方法
 * @param {string} text 
 */
export function encrypt(text) {
  const prous = AES.encrypt
  const parse = enc.Utf8.parse
  let key = parse('dituhui123456!@#')
  //加密向量，保持与key一致
  var iv = key
  var encrypted = prous(text, key, {
    iv: iv,
    mode: mode.CBC
  })
  encrypted = encrypted.toString()
  return encrypted
}
