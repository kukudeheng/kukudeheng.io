import request from '@/utils/request.js'
// 获取新闻详情
export const articles = id => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}
