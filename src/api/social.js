import axios from 'axios'
import store from '@/store/store'

const apiURL = process.env.VUE_APP_ROOT_API

// interceptor on request
axios.interceptors.request.use(function (request) {
  // console.log("TOKEN: " + store.getters.getJwtToken)
  if (store.getters.getJwtToken) {
    request.headers.Authorization = `Bearer ${store.getters.getJwtToken}`
   // request.headers.append('GET', 'POST', 'OPTIONS','PUT');
  }
  return request
},
function (error) {
  return Promise.reject(error)
})

// interceptor on response
axios.interceptors.response.use(function (response) {
  return response
},
function (error) {
  if (error === 'Error: Network Error') {
    if (error.response === undefined) {
      var networkError = { response: { data: { message: 'Algum recurso necessário para execução desta funcionalidade encontra-se indisponível.' } } }
      error = networkError
    }
  }

  if (error.response !== undefined && error.response.status === 403) {
    var permissionError = { response: { data: { message: '403 - Sem acesso a alguns recursos desta funcionalidade.' } } }
    error = permissionError
  }

  if (error.response !== undefined && error.response.status === 404) {
    var permiError = { response: { data: { message: '404 - Algum recurso necessário para execução desta funcionalidade não foi encontrado.' } } }
    error = permiError
  }

  return Promise.reject(error)
})

export default {
  salvarFamilia: (familia) => {
    console.log(familia)
    if (familia.moradia.tipoMoradia == -1) {
      familia.moradia.tipoMoradia = null
    }
    if (familia.moradia.materialMoradia == -1) {
      familia.moradia.materialMoradia = null
    }
    if (familia.moradia.propriedadeMoradia == -1) {
      familia.moradia.propriedadeMoradia = null
    }
    if (familia.moradia.situacaoMoradia == -1) {
      familia.moradia.situacaoMoradia = null
    }
    if (familia.estadoCivil == -1) {
      familia.estadoCivil = null
    }
    
    if (familia.id == null) {
      return axios.post(`${apiURL}familias`, familia)
    } else {
      console.log("PUT")
      return axios.put(`${apiURL}familias/${familia.id}`, familia)
    }

    
  },
  getFamilias: (page, perPage, sortBy, sortDesc, familiaPesquisa) => {
    
    if (familiaPesquisa == null || familiaPesquisa.nomeRepresentante == null) {
      familiaPesquisa.nomeRepresentante = ''
    }
    if (familiaPesquisa == null || familiaPesquisa.familiaAssistida == null) {
      familiaPesquisa.familiaAssistida = true
    }

    
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}familias?page=${page}&linesPerPage=${perPage}&nome=${familiaPesquisa.nomeRepresentante}&familiaAssistida=${familiaPesquisa.familiaAssistida}`)
    } else {
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      return axios.get(`${apiURL}familias?page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}&nome=${familiaPesquisa.nomeRepresentante}&familiaAssistida=${familiaPesquisa.familiaAssistida}`)
    }
  },
  getFamilia: (idFamilia) => {
    return axios.get(`${apiURL}familias/${idFamilia}`)
  },
  getFamiliaPorCpf: (cpf) => {
    return axios.get(`${apiURL}familias/cpf/${cpf}`)
  },
  deletarFamilia: (familia) => {
    return axios.delete(`${apiURL}familias/${familia.id}`)
  },
  getCriancasPorFamilia: (page, perPage, sortBy, sortDesc, idFamilia) => {
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}criancas/familia/${idFamilia}?page=${page}&linesPerPage=${perPage}`)
    } else {
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      return axios.get(`${apiURL}criancas/${idFamilia}?page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}`)
    }
  },
  getCriancas: (page, perPage, sortBy, sortDesc, nome, projeto, matriculado, espera,idCrianca) => {
    console.log("ESTOU NA API PATA GET CRIANCAS")
    if (idCrianca == null || idCrianca === undefined) {
      idCrianca = 0
    }
    
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}criancas?nome=${nome}&projeto=${projeto}&matriculado=${matriculado}&espera=${espera}&page=${page}&linesPerPage=${perPage}&idCrianca=${idCrianca}`)
    } else {
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      return axios.get(`${apiURL}criancas?nome=${nome}&projeto=${projeto}&matriculado=${matriculado}&espera=${espera}&page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}&idCrianca=${idCrianca}`)
    }
  },
  getCrianca: (idCrianca) => {
    return axios.get(`${apiURL}criancas/${idCrianca}`)
  },
  salvarCrianca: (crianca, idFamilia) => {
    crianca.familia = { id: idFamilia }
    console.log(crianca)
    return axios.post(`${apiURL}criancas`, crianca)
  },
  alterarCrianca: (crianca) => {
    console.log(crianca)
    return axios.put(`${apiURL}criancas/${crianca.id}`, crianca)
  },
  getAvaliacaoContextoPorCrianca: (idCrianca) => {
    return axios.get(`${apiURL}avaliacao_contexto/crianca/${idCrianca}/respostas`)
  },
  salvarAvaliacao: (avaliacaoContexto) => {
    return axios.post(`${apiURL}avaliacao_contexto/`, avaliacaoContexto)
  },
  atualizarAvaliacao: (avaliacaoContexto) => {
    return axios.put(`${apiURL}avaliacao_contexto/`, avaliacaoContexto)
  },
  getAtendimentos: (idCrianca, page, perPage, sortBy, sortDesc) => {
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}atendimento/crianca/${idCrianca}?page=${page}&linesPerPage=${perPage}`)
    } else {
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      return axios.get(`${apiURL}atendimento/crianca/${idCrianca}?page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}`)
    }
  },
  salvarAtendimento: (atendimento) => {
    return axios.post(`${apiURL}atendimento`, atendimento)
  },
  alterarAtendimento: (atendimento) => {
    return axios.put(`${apiURL}atendimento/${atendimento.id}`, atendimento)
  },
  deletarAtendimento: (atendimento) => {
    return axios.delete(`${apiURL}atendimento/${atendimento.id}`)
  }
  ,
  getPlanosFamiliar: (idFamilia, page, perPage, sortBy, sortDesc) => {
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}plano_acao_familiar/familia/${idFamilia}?page=${page}&linesPerPage=${perPage}`)
    } else {
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      return axios.get(`${apiURL}plano_acao_familiar/familia/${idFamilia}?page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}`)
    }
  },
  salvarPlanoFamiliar: (plano) => {
    return axios.post(`${apiURL}plano_acao_familiar`, plano)
  },
  alterarPlanoFamiliar: (plano) => {
    return axios.put(`${apiURL}plano_acao_familiar/${plano.id}`, plano)
  },
  deletarPlanoFamiliar: (plano) => {
    return axios.delete(`${apiURL}plano_acao_familiar/${plano.id}`)
  }

  ,
  getListaSituacaoIdentificada: (idFamilia, page, perPage, sortBy, sortDesc) => {
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}situacao_identificada/familia/${idFamilia}?page=${page}&linesPerPage=${perPage}`)
    } else {
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      return axios.get(`${apiURL}situacao_identificada/familia/${idFamilia}?page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}`)
    }
  },
  salvarSituacaoIdentificada: (situacao) => {
    return axios.post(`${apiURL}situacao_identificada`, situacao)
  },
  alterarSituacaoIdentificada: (situacao) => {
    return axios.put(`${apiURL}situacao_identificada/${situacao.id}`, situacao)
  },
  deletarSituacaoIdentificada: (situacao) => {
    return axios.delete(`${apiURL}situacao_identificada/${situacao.id}`)
  },

  getInscricaoPorCrianca: (page, perPage, sortBy, sortDesc, idCrianca) => {
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}inscricao/crianca/${idCrianca}?page=${page}&linesPerPage=${perPage}`)
    } else {
      sortBy = 'ano'
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      ordem = 'DESC'
      return axios.get(`${apiURL}inscricao/crianca/${idCrianca}?page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}`)
    }
  },

  getInscricaoPorCrianca: (page, perPage, sortBy, sortDesc, idCrianca) => {
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}inscricao/crianca/${idCrianca}?page=${page}&linesPerPage=${perPage}`)
    } else {
      sortBy = 'ano'
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      ordem = 'DESC'
      return axios.get(`${apiURL}inscricao/crianca/${idCrianca}?page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}`)
    }
  },

  

  salvarInscricao: (inscricao,idCrianca) => {
    console.log(idCrianca)
    inscricao.crianca = {id:idCrianca}
    return axios.post(`${apiURL}inscricao`, inscricao)
  },

  alterarInscricao: (inscricao) => {
    //console.log(idCrianca)
    //inscricao.crianca = {id:idCrianca}
   // return axios.post(`${apiURL}/inscricao`, inscricao)
    return axios.put(`${apiURL}inscricao/${inscricao.id}`, inscricao)
  },
  deletarInscricao: (inscricao) => {
    return axios.delete(`${apiURL}inscricao/${inscricao.id}`)
  },

  getInscricao: (page, perPage, sortBy, sortDesc, nome, projeto, matriculado, espera,ano) => {
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}inscricao?nomeCrianca=${nome}&projeto=${projeto}&matriculado=${matriculado}&ano=${ano}&espera=${espera}&page=${page}&linesPerPage=${perPage}`)
    } else {
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      return axios.get(`${apiURL}inscricao?nomeCrianca=${nome}&projeto=${projeto}&matriculado=${matriculado}&ano=${ano}&espera=${espera}&page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}`)
    }
  },
  getInscricaoRelatorio: (page, perPage, sortBy, sortDesc, nome, projeto, matriculado, espera,ano) => {
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}inscricao/relatorio/pesquisa?nomeCrianca=${nome}&projeto=${projeto}&matriculado=${matriculado}&ano=${ano}&espera=${espera}&page=${page}&linesPerPage=${perPage}`)
    } else {
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      return axios.get(`${apiURL}inscricao/relatorio/pesquisa?nomeCrianca=${nome}&projeto=${projeto}&matriculado=${matriculado}&ano=${ano}&espera=${espera}&page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}`)
    }
  },
  getTodasContas: () => {
      return axios.get(`${apiURL}contas`)
  },
  getTodasContasPorTipo: () => {
    return axios.get(`${apiURL}contas/tipo_conta/todos`)
  },
  
  getTransacao(periodo,dataInicial,dataFinal,idConta){
    let periodo30 = false;
    let periodo60 = false;
    let periodoCustomizado = true;
    if (periodo == "30") {
      periodo30 = true;
      periodoCustomizado = false
    } else if(periodo == "60") {
      periodo60 = true
      periodoCustomizado = false
    }
    if (periodoCustomizado) {
      return axios.get(`${apiURL}transacoes?idConta=${idConta}&dataInicio=${dataInicial}&dataFim=${dataFinal}`)
    } else {
      return axios.get(`${apiURL}transacoes?idConta=${idConta}&dias30=${periodo30}&dias60=${periodo60}`)  
    }
  },
  
  salvarTransacao: (transacao) => {
    let conta = {}
    conta.id = transacao.conta.id
    let instituicao =  {}
    let familia =  {}
    let doador=  {}

    /*
    if (transacao.instituicao != undefined){
      instituicao.id = transacao.instituicao
      transacao.instituicao = instituicao
    }
    if (transacao.familia){
      familia.id = transacao.familia
      transacao.familia = familia

    }

    if (transacao.doador != undefined){
      doador.id = transacao.doador
      transacao.doador = doador

    }
*/

    console.log("===============")
    
    console.log(transacao)
    transacao.conta = conta
    if (transacao.id > 0 ) {
      return axios.put(`${apiURL}transacoes/${transacao.id}`, transacao,{ responseType: 'blob' })
    } else {
      return axios.post(`${apiURL}transacoes`, transacao,{ responseType: 'blob' })
    }
  },


  getRecibo: (transacao) => {
      return axios.get(`${apiURL}transacoes/recibo?cod=${transacao.id}`,{ responseType: 'blob' })
  },
  

  deletarTransacao: (transacao) => {
    return axios.delete(`${apiURL}transacoes/${transacao.id}`)
  },


  salvarConta: (conta) => {
    console.log(conta)
    
    var novaConta = JSON.parse(JSON.stringify(conta));
    
     novaConta.tipoConta = conta.tipoConta.cod

    if (conta.id == null) {
      return axios.post(`${apiURL}contas`, novaConta)
    } else {
      return axios.put(`${apiURL}contas/${conta.id}`, novaConta)
    }
    
  },

  deletarConta(c){
    return axios.delete(`${apiURL}contas/${c.id}`)
  },

  getContas: () => {

      return axios.get(`${apiURL}contas`)
  },
  getParceiros: () => {

    return axios.get(`${apiURL}parceiros`)
  },
  getListaCentroCusto: () => {

    return axios.get(`${apiURL}centrocusto`)
  },

  getConta: (idConta) => {
    return axios.get(`${apiURL}contas/${idConta}`)
  },
   deletaConta: (conta) => {
    return axios.delete(`${apiURL}contas/${conta.id}`)
  },

  getListaGrupoCategoria: () => {

    return axios.get(`${apiURL}transacaocategoria`)
  },


  autenticar: (usuario,senha) => {
    let obj = {
    
    }
    obj.login = usuario;
    obj.senha = senha;

    return axios.post(`${apiURL}login`, obj)
  },
  
  emitirRelatorioRazao (periodo,dataInicial,dataFinal){
    let periodo30 = false;
    let periodo60 = false;
    let periodoCustomizado = true;
    if (periodo == "30") {
      periodo30 = true;
      periodoCustomizado = false
    } else if(periodo == "60") {
      periodo60 = true
      periodoCustomizado = false
    }
    if (periodoCustomizado) {
      return axios.get(`${apiURL}transacoes/razao?dataInicio=${dataInicial}&dataFim=${dataFinal}`)
    } else {
      return axios.get(`${apiURL}transacoes/razao?&dias30=${periodo30}&dias60=${periodo60}`)  
    }


  } ,

  teste22(periodo, dataInicial, dataFinal) {
    let periodo30 = false;
    let periodo60 = false;
    let periodoCustomizado = true;
    if (periodo == "30") {
      periodo30 = true;
      periodoCustomizado = false
    } else if (periodo == "60") {
      periodo60 = true
      periodoCustomizado = false
    }
    let url;
    if (periodoCustomizado) {
      url = (`${apiURL}transacoes/razao?dataInicio=${dataInicial}&dataFim=${dataFinal}`)
    } else {
      url = (`${apiURL}transacoes/razao?&dias30=${periodo30}&dias60=${periodo60}`)
    }

    axios.get(url, { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'arraybuffer' });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'teste.pdf');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error('Erro ao baixar o arquivo', error);
      });


  },

  getEmpresa : (page, perPage, sortBy, sortDesc, nome, ) => {
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}instituicoes?nome=${nome}&page=${page}&linesPerPage=${perPage}`)
    } else {
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      return axios.get(`${apiURL}instituicoes?nome=${nome}&page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}`)
    }
  },

  salvarEmpresa: (e) => {
    return axios.post(`${apiURL}instituicoes`, e)
  },
  alterarEmpresa: (e) => {
    return axios.put(`${apiURL}instituicoes`, e)
  },

  getPessoa : (page, perPage, sortBy, sortDesc, nome, ) => {
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}doadores?nome=${nome}&page=${page}&linesPerPage=${perPage}`)
    } else {
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      return axios.get(`${apiURL}doadores?nome=${nome}&page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}`)
    }
  },

  salvarPessoa: (e) => {
    return axios.post(`${apiURL}doadores`, e)
  },
  alterarPessoa: (e) => {
    return axios.put(`${apiURL}doadores`, e)
  },


  
}
