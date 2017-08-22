import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import {mutations, state} from './mutations'
import getters from './getters'
import login from './modules/login'
import cetegory from './modules/category'
import article from './modules/article'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
  modules: {
    login,
    cetegory,
    article
  }
})

export default store
