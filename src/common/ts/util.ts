import { enc, AES, mode, HmacMD5 } from 'crypto-js'

/**
 * 用户名、密码加密方法
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

/**
 * 签名参数
 * @param {Number} t 时间戳
 * @param {String} k token
 * @param {Object} p 参数
 */
interface Params {
  [p: string]: any
}

export function encryptConnect(timestamp: number, token: string, params: Params = {}): string {
  const temp = {
    token,
    t: timestamp,
    ...params
  }

  const tempKey = Object.keys(temp).sort()
  let param = ''

  for (const item of tempKey) {
    const value = temp[item]
    if (!value && value !== 0 && value !== false) {
      continue
    }
    if (typeof value === 'object') {
      param += item + JSON.stringify(value)
    } else {
      param += item + value
    }
  }

  const key = `dituhui${timestamp}dituhui`

  const T = key.split('')
  const K = token.split('')

  const result: any = T.reduce((perv, item, i): any => {
    const curK = K[i - 1]
    if (T.length - 1 === i) {
      if (!curK) {
        return [...(perv as any), item]
      }
      return [...(perv as any), curK, item, ...K.slice(i)]
    }
    if (!curK) {
      return [...(perv as any), item]
    }
    return [...(perv as any), curK, item]
  })

  const enct = encrypt(result.join(''))
  const hMD5 = HmacMD5(param, enct).toString()

  return hMD5
}