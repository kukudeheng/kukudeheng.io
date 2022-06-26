import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import persistedstate from 'vuex-persistedstate'
import { userprofile } from '../api/mine'
Vue.use(Vuex)
// 第一步：下载vuex-persistedstate
// 第二部：导入插件
export default new Vuex.Store({
  state: {
    token: '',
    userinfo: ''
  },
  getters: {},
  mutations: {
    setToken (state, value) {
      state.token = value
    },
    // 退出的处理
    logout (state) {
      //  删除token
      state.token = ''
      // 清除用户信息
      state.userinfo=''
      //跳转到登录页
      // this.$router===router的实例化对象
      router.push('/login')
    },
    setuserinfo (state, value) {
      state.userinfo = value
    }
  },
  actions: {
    async getuserinfo (store) {
      if (!store.state.userinfo.id) {
        const res = await userprofile()
        store.commit('setuserinfo', res.data.data)
        // console.log(3);
      }
    }
  },
  modules: {},
  plugins: [persistedstate({ paths: ['token'] })]
})
