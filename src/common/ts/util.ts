import { enc, AES, mode } from 'crypto-ts'

/**
 * 用户名、密码加密方法
 * @param {string} text 
 */
export function encrypt(text: string) {
  const prous = AES.encrypt
  const parse = enc.Utf8.parse
  const key = parse('dituhui123456!@#')
  // 加密向量，保持与key一致
  const iv = key
  const encrypted = prous(text, key, {
    iv,
    mode: mode.CBC
  }).toString()
  return encrypted
}
