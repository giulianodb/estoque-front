export default {

  state: {
    aluno: {},
    alunos: [],
    familia: { motivo: {}, listMembroFamilia: [], programasSociais: {}, moradia: {} },
    familias: [],
    criancas: [],
    crianca: {},
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
    setFamilias (state, payload) {
      state.familias = payload
    },
    setCriancas (state, payload) {
      state.criancas = payload
    },
    setCrianca (state, payload) {
      state.crianca = payload
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
    getFamilias (state) {
      return state.familias
    },
    getCrianca (state) {
      return state.crianca
    },
    getCriancas (state) {
      return state.criancas
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
    novaCrianca (state) {
      state.commit('setCrianca', {})
    },
    limparMensagens (state) {
      state.commit('setMessages', Object)
    }
  }

}
