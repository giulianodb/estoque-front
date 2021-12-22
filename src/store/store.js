import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.js'
import exemplo from './modules/exemplo.js'
import layout from './modules/layout.js'

Vue.config.devtools = true

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    exemplo,
    layout
  }
})
