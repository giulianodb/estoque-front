export default {

  state: {
    aluno: {},
    alunos: [],
    familia: { estadoCivil: "-1" , motivo: {}, listMembroFamilia: [], programas: {}, moradia: {tipoMoradia: "-1",materialMoradia: "-1", propriedadeMoradia: "-1",situacaoMoradia:"-1"  } },
    familias: [],
    criancas: [],
    crianca: { projeto:"-1", sexo: "-1", listaEspera: false, matriculado: false },
    atendimento: {crianca: {}},
    atendimentos: [],
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
    setAtendimento (state, payload) {
      state.atendimento = payload
    },
    setAtendimentos (state, payload) {
      state.atendimentos = payload
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
    getAtendimento (state) {
      return state.atendimento
    },
    getAtendimentos (state) {
      return state.atendimentos
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
      state.commit('setFamilia', { estadoCivil: "-1" , motivo: {}, listMembroFamilia: [], programas: {}, moradia: {tipoMoradia: "-1",materialMoradia: "-1", propriedadeMoradia: "-1",situacaoMoradia:"-1" }})

    },
    novaCrianca (state) {
      state.commit('setCrianca', {  projeto:"-1", sexo: "-1", listaEspera: false, matriculado: false })
    },
    novaCriancaPesquisa (state) {
      state.commit('setCriancaPesquisa', { nome : '' , projeto: "-1", matriculado: true, espera: false })
    },
    novoAtendimento (state) {
      state.commit('setAtendimento', {crianca:{}})
    },
    limparMensagens (state) {
      state.commit('setMessages', Object)
    }
  }

}
