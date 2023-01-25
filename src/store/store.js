import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.js'
import pedagogico from './modules/pedagogico.js'
import layout from './modules/layout.js'

Vue.config.devtools = true

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pedagogico,
    layout
  }
})
