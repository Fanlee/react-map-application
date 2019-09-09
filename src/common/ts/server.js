import axios from 'axios'
// import { createBrowserHistory } from 'history'

const param = data => {
  let url = ''
  for (const k of Object.keys(data)) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}

// 拦截请求
axios.interceptors.request.use(config => {
  const t = new Date().getTime()
  const data = {
    t
  }
  config.url += (config.url.includes('?') ? '&' : '?') + param(data)
  return config
})

// 拦截响应
axios.interceptors.response.use(config => {
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

// 封装公共的调用后端接口的方法
export const commit = ({ url, method = 'GET', params = {} }) => {
  const p = method === 'GET' ? 'params' : 'data'
  const config = { method, url, [p]: params }
  return axios(config)
}