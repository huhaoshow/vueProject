// 这个文件封装了上传文件相关的api方法

import axios from '@/utils/myAxios.js'

// 上传文件
export const upload = (data) => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
}
// 编辑用户信息
export const editUser = (id, data) => {
  return axios({
    url: `/user_update/${id}`,
    method: 'post',
    data
  })
}
