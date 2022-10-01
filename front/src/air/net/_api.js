import axios from 'axios'

export default function net( config) {
  
  const instance = axios.create({
    timeout: 12000
  })

  // 重复器
  instance.defaults.retry = 2
  instance.defaults.retryDelay = 3000

  // 拦截器
  instance.interceptors.request.use(config => {
    // 用途：
    // 1. 中途修改 config
    // 2. 请求时显示 Loading
    // 3. 检测是否携带 token，未携带则跳转至登录界面

    return config
  }, err => {
    // 出错
    console.log(err)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    // 出错
    throw err
  })

  return instance(config)
  
}