import request from '../utils/request'

// import store from '../store'
export const userprofile = () => {
  return request({
    url: '/v1_0/user/profile'
    // headers:{
    //     // Authorization:`Bearer ${store.state.token.token}`
    // }
  })
}
// 定义用户修改的api
// 编辑用户信息
export const userprofilePatch = data => {
  return request({
    url: '/v1_0/user/profile',
    method: 'patch',
    data
  })
}
// 头像上传
export const userPhotoPatch = data => {
  return request({
    url: '/v1_0/user/photo',
    method: 'patch',
    data
  })
}
