import Vue from 'vue'
import Vuex from 'vuex'
import clock from './modules/clock'
import shoplist from './modules/shoplist'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    clock,
    shoplist,
    user
  }
})
