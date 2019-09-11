import axios from 'axios'
// import { createBrowserHistory } from 'history'

export interface Data {
  [p: string]: any
}
const param = (data: Data): string => {
  let url = ''
  for (const k of Object.keys(data)) {
    const value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}

export interface AxiosConfig extends Data {
  url: string
}
// 拦截请求
axios.interceptors.request.use((config: AxiosConfig): AxiosConfig => {
  const t = new Date().getTime()
  const data = {
    t
  }
  config.url += (config.url.includes('?') ? '&' : '?') + param(data)
  return config
})

// 拦截响应
axios.interceptors.response.use((config): any => {
  // const history = createBrowserHistory()
  const { data } = config
  if (data.code === 'S001') {
    return Promise.resolve(data)
  }
  // U001是未登录，直接统一跳转到登录页面下，U002用户名密码错误 
  else if (data.code === 'U001') {
    // history.push('/login')
  } else {
    return Promise.reject(data)
  }
})

export type Method = 'GET' | 'POST'

export interface CommitConfig extends Data, AxiosConfig {
  method?: Method
  params: any
}

// 封装公共的调用后端接口的方法
export const commit = (c: CommitConfig) => {
  const p = c.method === 'POST' ? 'data' : 'params'
  const config = { method: c.method, url: c.url, [p]: c.params }
  return axios(config)
}