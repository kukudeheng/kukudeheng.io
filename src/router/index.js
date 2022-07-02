import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/seach',
    component: () => import('../views/seach/index.vue')
  },
  {
    path: '/reuelt/:key',
    component: () => import('../views/seach/reuelt.vue')
  },
  {
    path: '/chat',
    component: () => import('../views/chat/index.vue')
  },
  {
    path: '/layout',
    component: () => import('../views/layout/index.vue'),
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
          keep: true
        }
      },
      {
        path: 'question',
        component: () => import('../views/question/index.vue')
      },
      {
        path: 'video',
        component: () => import('../views/video/index.vue')
      },
      {
        path: 'mine',
        meta: {
          needlogin: true
        },
        component: () => import('../views/mine/index.vue')
      },
      {
        path: '/mine/enit',
        meta: {
          needlogin: true,
          noTob: true
        },
        component: () => import('../views/mine/enit.vue')
      },
      {
        path: '@/views/article/:id',
        meta: {
          // 不需要显示tab
          noTob: true
        },
        component: () => import('../views/article/index.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/layout/mine'
  }
]

const router = new VueRouter({
  routes
})
// 前置守卫
router.beforeEach(async (to, from, next) => {
  // 判断条件
  // console.log('to',to);
  if (to.meta.needlogin) {
    // 判断是否有token
    if (store.state.token.token) {
      // console.log(1)
      await store.dispatch('getuserinfo')
      next()
      // console.log(2);
    } else {
      // 没有就去登录页
      next('/login?back=' + to.fullPath)
    }
  } else {
    // 没有就不通过
    next()
  }
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
