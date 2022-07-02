import axios from 'axios'
import { Toast } from 'vant'
import store from '../store'

const _axios = axios.create({
  baseURL: 'https://toutiao.itheima.net/'
})

_axios.interceptors.request.use(
  config => {
    if (!config.notoken) {
      config.headers.Authorization = `Bearer ${store.state.token.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  res => {
    return res
  },
  async error => {
    if (error.response && error.response.data) {
      // 如果是401，退出处理
      if (error.response.status === 401) {
        try {
          const res2 = await axios({
            url: 'https://toutiao.itheima.net/v1_0/authorizations',
            method: 'put',
            headers: {
              Authorization: `Bearer ${store.state.token.refresh_token}`
            }
          })
          store.commit('setToken', {
            token: res2.data.data.token,
            refresh_token: store.state.token.refresh_token
          })
          return _axios(error.config)
        } catch {
          store.commit('logout')
        }
      }
      Toast.fail(error.response.data.message)
    }
    // Toast.fail(error.response.data.message)
    return Promise.reject(error)
  }
)
export default _axios
