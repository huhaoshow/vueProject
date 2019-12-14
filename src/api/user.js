// 这个文件封装了用户信息相关的api方法

// 引入配置好基准路径的axios
import axios from '@/utils/myAxios.js'

// 配置api接口
// 登录请求
export const userLogin = (data) => {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取用户数据
export const getUserInfo = (id) => {
  return axios({
    // 根据后台的需求,需要用url传参
    url: `/user/${id}`,
    method: 'get'
  })
}
