import axios from 'axios'
import store from '@/store/store'

const apiExemploUrl = process.env.VUE_APP_ROOT_API

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

  getSeries: (page, perPage, sortBy, sortDesc) => {
    if (page == null || page === undefined) {
      page = 1
    }

    if (perPage == null || perPage === undefined) {
      perPage = 50
    }

    if (sortBy == null) {
      return axios.get(`${apiExemploUrl}/v1/serie?page=${page}&perPage=${perPage}`)
    } else {
      let ordem = 'ASCENDING'
      if (sortDesc) {
        ordem = 'DESCENDING'
      }

      return axios.get(`${apiExemploUrl}/v1/serie?page=${page}&perPage=${perPage}&sortOrder=${ordem}&sortField=${sortBy}`)
    }
  },
  salvarSerie: (serie) => {
    return axios.post(`${apiExemploUrl}/v1/serie`, serie)
  },
  alterarSerie: (serie) => {
    return axios.put(`${apiExemploUrl}/v1/serie`, serie)
  },
  deletarSerie: (serie) => {
    return axios.delete(`${apiExemploUrl}/v1/serie/${serie.idSerie}`)
  }
}
