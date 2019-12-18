// 这个文件主要封装了与文章相关的api方法

import axios from '@/utils/myAxios.js'

// 获取文章列表
export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
// 文章详情
export const getArticleDetail = (id) => {
  return axios({
    url: `/post/${id}`,
    method: 'get'
  })
}
// 评论列表
export const getCommentList = (id) => {
  return axios({
    url: `/post_comment/${id}`,
    method: 'get'

  })
}

// 点赞文章
export const likeArticle = (id) => {
  return axios({
    url: `/post_like/${id}`,
    method: 'get'
  })
}
