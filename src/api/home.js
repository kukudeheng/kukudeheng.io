import request from '@/utils/request.js'
export const UserChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
// 获取推荐文章列表

export const Articles = params => {
  return request({
    url: '/v1_0/articles',
    params
  })
}

// 获取所有频道列表
export const Channels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
//  设置用户的频道
export const userchannelsPUT = data => {
  return request({
    url: '/v1_0/user/channels',
    method: 'put',
    data:data
  })
}
