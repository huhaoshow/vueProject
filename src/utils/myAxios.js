// 这个文件封装了axios基准路径

// 引入axios
import axios from 'axios'
// 引入Toast
import { Toast } from 'vant'
// 配置基准路径
axios.defaults.baseURL = 'http://localhost:3000'
// 将基准路径存入到本地中
localStorage.setItem('baseURL', axios.defaults.baseURL)

// 添加请求拦截器   所有的请求都需要经过这里
axios.interceptors.request.use(function (config) {
  // 在发送请求之前,判断是否带有token值,如果有,就在请求头中带上token,如果没有则不处理
  let token = localStorage.getItem('token')
  if (token) {
    // 给请求头中带上token,在config中有个headers,这个就是请求头
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器   所有的响应都需要经过这里
axios.interceptors.response.use(function (response) {
  // 响应数据时,判断返回信息是否合法,若非法则给出提示并重定向到登录页
  if (response.data.message === '用户信息验证失败!' || response.data.message === '用户信息验证失败') {
    // 给出提示
    Toast.fail('请先登录！')
    // 重定向
    window.location.href = '#/login'
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 暴露axios
export default axios
