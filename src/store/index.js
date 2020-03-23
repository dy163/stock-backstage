import Vue from 'vue'
import Vuex from 'vuex'
import { getUserName } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getUserName(),   // 保存到vuex姓名
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
