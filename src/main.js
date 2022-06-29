import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './style/base.less'
import 'amfe-flexible'
import './utils/vant'
import filters from '@/filters/index.js'
Vue.use(filters)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
