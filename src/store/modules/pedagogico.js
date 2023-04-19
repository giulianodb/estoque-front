export default {

  state: {
    aluno: {},
    alunos: [],
    familia: { estadoCivil: "-1" , motivo: {}, listMembroFamilia: [], programas: {}, moradia: {tipoMoradia: "-1",materialMoradia: "-1", propriedadeMoradia: "-1",situacaoMoradia:"-1"  },visitaDomiciliar:{} },
    familias: [],
    criancas: [],
    crianca: { projeto:"-1", sexo: "-1", listaEspera: false, matriculado: false },
    atendimento: {crianca: {}},
    atendimentos: [],
    planos: [],
    planoFamiliar: {familia:{}},
    listaSituacaoIdentificada: [],
    situacaoIdentificada: {familia:{}},
    criancaPesquisa: {},
    inscricao: {},
    listaInscricao: [],
    listaConta: [],
    fluxoCaixaPesquisa:{},
    listaTransacao:[{}],
    contaPesquisa:{},
    transacao: {},
    contasPorTipo:[],
    conta: {tipoConta:{cod:0  }},
    contas:[{}],
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
    setPlanoFamiliar (state, payload) {
      state.planoFamiliar = payload
    },
    setPlanos (state, payload) {
      state.planos = payload
    },

    setSituacaoIdentificada (state, payload) {
      state.situacaoIdentificada = payload
    },
    setListaSituacaoIdentificada (state, payload) {
      state.listaSituacaoIdentificada = payload
    },
    setInscricao(state, payload){
      state.inscricao = payload
    },
    setListaInscricao(state, payload){
      state.listaInscricao = payload
    },
    setListaInscricaoConta(state, payload){
      state.listaConta = payload
    },

    setFluxoCaixaPesquisa(state, payload){
      state.fluxoCaixaPesquisa = payload
    },

    setListaTransacao(state, payload){
      state.listaTransacao = payload
    },

    setTransacao(state, payload){
      state.transacao = payload
    },

    setContaPesquisa(state, payload){
      state.contaPesquisa = payload
    },

    setContasPorTipo(state, payload){
      state.contasPorTipo = payload
    },

    setConta(state, payload){
      state.conta = payload
    },

    setContas(state, payload){
      state.contas = payload
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
    getPlanoFamiliar (state) {
      return state.planoFamiliar
    },
    getPlanos (state) {
      return state.planos
    },

    getSituacaoIdentificada (state) {
      return state.situacaoIdentificada
    },
    getListaSituacaoIdentificada (state) {
      return state.listaSituacaoIdentificada
    },
    getInscricao (state) {
      return state.inscricao
    },
    getListaInscricao (state) {
      return state.listaInscricao
    },
    getListaConta (state) {
      return state.listaConta
    },

    getFluxoCaixaPesquisa(state) {
      return state.fluxoCaixaPesquisa
    },
    getListaTransacao (state) {
      return state.listaTransacao
    },
    getContaPesquisa (state) {
      return state.contaPesquisa
    },
    getTransacao (state) {
      return state.transacao
    },

    getContasPorTipo (state) {
      return state.contasPorTipo
    },
    getConta (state) {
      return state.conta
    },
    getContas (state) {
      return state.contas
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
      state.commit('setFamilia', { estadoCivil: "-1" , motivo: {}, listMembroFamilia: [], programas: {}, moradia: {tipoMoradia: "-1",materialMoradia: "-1", propriedadeMoradia: "-1",situacaoMoradia:"-1" },visitaDomiciliar:{}})

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
    novoPlanoFamiliar (state) {
      state.commit('setPlanoFamiliar', {familia:{}})
    },
    novaSituacaoIdentificada (state) {
      state.commit('setSituacaoIdentificada', {familia:{}})
    },
    limparMensagens (state) {
      state.commit('setMessages', Object)
    },
    novaInscricao (state) {
      state.commit('setInscricao', {   })
    },
    novaConta (state) {
      state.commit('setConta', { tipoConta:{cod:0}   })
    }
  }

}
