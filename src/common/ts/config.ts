interface UrlParams {
  [p: string]: string
}

// 测试环境地址
const urls: UrlParams = {
  ip: '40.73.116.211:8034'
}

// 判断协议类型
const protocal = location.protocol.includes('http:') ? "http://" : "https://"

urls.server = protocal + urls.ip + '/saas/'

urls.platform = urls.server + 'platform/'

export { urls }

