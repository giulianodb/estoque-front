import axios from 'axios'
import store from '@/store/store'

const apiURL = process.env.VUE_APP_ROOT_API

// interceptor on request
axios.interceptors.request.use(function (request) {
  // console.log("TOKEN: " + store.getters.getJwtToken)
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
      return axios.get(`${apiURL}/alunos?page=${page}&linesPerPage=${perPage}`)
    } else {
      let ordem = 'ASC'
      if (sortDesc) {
        ordem = 'DESC'
      }

      return axios.get(`${apiURL}/alunos?page=${page}&linesPerPage=${perPage}&direction=${ordem}&orderBy=${sortBy}`)
    }
  },
  salvarAluno: (aluno) => {
    return axios.post(`${apiURL}/alunos`, aluno)
  },
  alterarAluno: (aluno) => {
    return axios.put(`${apiURL}/alunos`, aluno)
  },
  deletarAluno: (aluno) => {
    return axios.delete(`${apiURL}/alunos/${aluno.idAluno}`)
  }
}
