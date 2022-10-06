export default {

  state: {
    aluno: {},
    alunos: [],
    familia: { motivo: {}, listMembroFamilia: [], programasSociais: {}, moradia: {} },
    familias: [],
    criancas: [],
    crianca: { listaEspera: false, matriculado: false },
    criancaPesquisa: {},
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
    setCriancaPesquisa (state, payload) {
      state.criancaPesquisa = payload
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
    getCriancaPesquisa (state) {
      return state.criancaPesquisa
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
      state.commit('setFamilia', {motivo: {}, listMembroFamilia: [], programasSociais: {}, moradia: {} } )
    },
    novaCrianca (state) {
      state.commit('setCrianca', { listaEspera: false, matriculado: false })
    },
    novaCriancaPesquisa (state) {
      state.commit('setCriancaPesquisa', { nome : '' , projeto: "-1", matriculado: true, espera: false })
    },
    limparMensagens (state) {
      state.commit('setMessages', Object)
    }
  }

}
