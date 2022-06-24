import request from '../utils/request'

//登录接口
export function authorizations (data) {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    notoken:true,
    data
  })
}
