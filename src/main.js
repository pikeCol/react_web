import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/vant-css/index.css'
import Http from './service/http'
import fastclick from 'fastclick'
import fly from 'flyio'
import Loading from '@comp/loading/index'

const http = {
  install (Vue) {
    Vue.prototype.$Http = Http
  }
}

Vue.use(http)
Vue.use(Vant)
Vue.use(Lazyload)
// Vue.use(Vant.Lazyload)
// @ts-ignore
fly.interceptors.request.use(config => {
  Loading.open()
  return config
}, error => {
  Loading.close()
  return Promise.reject(error.response.data)
})
// 响应拦截
fly.interceptors.response.use(response => {
  if (response.status === 200) {
    Loading.close()
    return response
  }
}, error => {
  Loading.close()
  return Promise.reject(error.response)
})

// @ts-ignore
fastclick.attach(document.body)

// 开发环境加入调试功能
// @ts-ignore
if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  require('./utils/console')
}

Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
