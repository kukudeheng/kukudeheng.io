import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import persistedstate from 'vuex-persistedstate'
Vue.use(Vuex)
// 第一步：下载vuex-persistedstate
// 第二部：导入插件

export default new Vuex.Store({
  state: {
    token: ''
  },
  getters: {},
  mutations: {
    setToken (state, value) {
      state.token = value
    },
    // 退出的处理
    logout(state){
      //  删除token
      state.token=''
      //跳转到登录页
      // this.$router===router的实例化对象
      router.push('/login')
    }
  },
  actions: {},
  modules: {},
  plugins: [persistedstate({ paths: ['token'] })]
})
