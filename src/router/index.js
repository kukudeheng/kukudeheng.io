import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/layout',
    component: () => import('../views/layout/index.vue'),
    redirect: '/layout/home',
    children:[
      {
        path:'home',
    component: () => import('../views/home/index.vue'),
      },
      {
        path:'question',
    component: () => import('../views/question/index.vue'),
      },
      {
        path:'mine',
    component: () => import('../views/mine/index.vue'),
      },
      {
        path:'video',
    component: () => import('../views/video/index.vue'),
      },
    ]
  },
  {
    path:'/',
    redirect:'/layout/home'
  }
]

const router = new VueRouter({
  routes
})

export default router
