import Vue from 'vue'
import VueRouter from 'vue-router'
import { getUser } from '@/utils/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/page/login')
  },
  {
    path: '/',
    component: () => import('@/page/layout'),
    children: [
      // {
      //   name: 'home',
      //   path: '', // 匹配到layout的直接默认
      //   component: () => import('@/page/home')
      // },
      {
        name: 'administer',
        // path: '/administer',
        path: '',
        component: () => import('@/page/administer')
      },
      {
        name: 'information',
        path: '/information',
        component: () => import('@/page/information')
      },
      {
        name: 'verif',
        path: '/verif',
        component: () => import('@/page/verif')
      },
      {
        name: 'increase',
        path: '/increase',
        component: () => import('@/page/increase')
      },
      {
        name: 'settings',
        path: '/settings',
        component: () => import('@/page/settings')
      },
      {
        name: 'closing-time',
        path: '/closing-time',
        component: () => import('@/page/closing-time')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const userInfo = getUser()
  if (to.path !== '/login') {
    // 非登录页的处理
    if (!userInfo) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    // 没有登录
    if (!userInfo) {
      next()
    } else {
      window.location.href = '/#/'
      window.location.reload()
    }
  }
})

export default router
