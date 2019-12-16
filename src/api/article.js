// 这个文件主要封装了与文章相关的api方法

import axios from '@/utils/myAxios.js'

// 获取文章列表
export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
