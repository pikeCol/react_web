import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let routes = [
  {
    path: '/bargain',
    name: 'bargain',
    component: () => import('@views/bargain'),
    meta: {
      title: '砍价详情'
    }
  },
  {
    path: '/award',
    name: 'award',
    component: () => import('@views/award'),
    meta: {
      title: '抽奖'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@views/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/shoplist',
    name: 'shoplist',
    component: () => import('@views/shoplist'),
    meta: {
      title: '门店列表',
      keepAlive: true // 设置为 false 页面回加载上次停留的位置
    }
  }
]

// @ts-ignore
const route = new Router({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

// 设置页面的title
route.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default route
