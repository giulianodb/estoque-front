import axios from 'axios'
import store from '@/store/store'

const apiURL = process.env.VUE_APP_ROOT_API

// interceptor on request
axios.interceptors.request.use(function (request) {
  if (store.getters.getJwtToken) {
    request.headers.Authorization = `Bearer ${store.getters.getJwtToken}`
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

  getAlunos: (page, perPage, sortBy, sortDesc) => {
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}alunos?page=${page}&linesPerPage=${perPage}`)
    } else {
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      return axios.get(`${apiURL}alunos?page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}`)
    }
  },
  salvarFamilia: (familia) => {
    alert(familia)
    console.log(familia)
    return axios.post(`${apiURL}familias`, familia)
  },
  getFamilias: (page, perPage, sortBy, sortDesc, familiaPesquisa) => {
    if (familiaPesquisa == null || familiaPesquisa.nomeRepresentante == null) {
      familiaPesquisa.nomeRepresentante = ''
    }
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}familias?page=${page}&linesPerPage=${perPage}&nome=${familiaPesquisa.nomeRepresentante}`)
    } else {
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      return axios.get(`${apiURL}familias?page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}&nome=${familiaPesquisa.nomeRepresentante}`)
    }
  },
  getFamilia: (idFamilia) => {
    return axios.get(`${apiURL}familias/${idFamilia}`)
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
  getCriancas: (page, perPage, sortBy, sortDesc, nome, projeto, matriculado, espera) => {
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiURL}criancas?nome=${nome}&projeto=${projeto}&matriculado=${matriculado}&espera=${espera}&page=${page}&linesPerPage=${perPage}`)
    } else {
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      return axios.get(`${apiURL}criancas?nome=${nome}&projeto=${projeto}&matriculado=${matriculado}&espera=${espera}&page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}`)
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
  alterarAluno: (aluno) => {
    return axios.put(`${apiURL}alunos`, aluno)
  },
  deletarAluno: (aluno) => {
    return axios.delete(`${apiURL}alunos/${aluno.idAluno}`)
  }
}
