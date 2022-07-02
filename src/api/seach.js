import request from '../utils/request'
// 获取联想建议api
export const Suggestion = params => {
  return request({
    url: '/v1_0/suggestion',
    params
  })
}
// 获取搜索结果
export const Search = params => {
  return request({
    url: '/v1_0/search',
    params
  })
}
