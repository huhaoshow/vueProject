// 这个文件封装了与栏目相关的api方法

import axios from '@/utils/myAxios.js'

// 获取栏目列表
export const getCategory = () => {
  return axios({
    url: '/category'
  })
}
