export default {

  state: {
    serie: {},
    series: [],
    messages: Object
  },

  mutations: {

    setSerie (state, payload) {
      state.serie = payload
    },
    setSeries (state, payload) {
      state.series = payload
    },
    setMessages (state, payload) {
      state.messages = payload
    }
  },

  getters: {
    getSerie (state) {
      return state.serie
    },
    getSeries (state) {
      return state.series
    },
    getProfessor (state) {
      return state.professor
    },
    getMessages (state) {
      return state.messages
    }
  },

  actions: {
    novaSerie (state) {
      state.commit('setSerie', {})
    },
    limparMensagens (state) {
      state.commit('setMessages', Object)
    }
  }

}
