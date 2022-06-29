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
        // 如果是公共数据要调整转换，尽量在源头上就行更改，（userinfo.gender2），这里先用过滤器，熟悉一下语法
        // res.data.data.gender2=res.data.data.gender===0?"男":"女"
        store.commit('setuserinfo', res.data.data)
        // console.log(3);
      }
    }
  },
  modules: {},
  plugins: [persistedstate({ paths: ['token'] })]
})
