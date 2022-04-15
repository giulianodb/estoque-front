export default {

  state: {
    aluno: {},
    familia: { motivo: {}, composicaoFamiliar:[], programasSociais: {}, moradia : {} },
    alunos: [],
    messages: Object
  },

  mutations: {

    setAluno (state, payload) {
      state.aluno = payload
    },
    setAlunos (state, payload) {
      state.alunos = payload
    },
    setFamilia (state, payload) {
      state.familia = payload
    },
    setMessages (state, payload) {
      state.messages = payload
    }
  },

  getters: {
    getAluno (state) {
      return state.aluno
    },
    getAlunos (state) {
      return state.alunos
    },
    getFamilia (state) {
      return state.familia
    },
    getMessages (state) {
      return state.messages
    }
  },

  actions: {
    novoAluno (state) {
      state.commit('setAluno', {})
    },
    novaFamilia (state) {
      state.commit('setFamilia', {})
    },
    limparMensagens (state) {
      state.commit('setMessages', Object)
    }
  }

}
