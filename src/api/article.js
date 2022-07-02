import request from '@/utils/request.js'
// 获取新闻详情
export const articles = id => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}
// 获取评论api
export const Comments = params => {
  return request({
    url: '/v1_0/comments',
    params
  })
}
// 发表评论
export const Commentspost = data => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
// 点赞api
export const commentlikings = (data, is_liking) => {
  if (!is_liking) {
    return request({
      url: '/v1_0/comment/likings',
      method: 'post',
      data
    })
  } else if (is_liking) {
    return request({
      url: `/v1_0/comment/likings/` + data.target,
      method: 'delete'
    })
  }
}
