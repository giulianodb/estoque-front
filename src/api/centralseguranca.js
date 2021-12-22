import axios from 'axios'
import jwtDecode from 'jwt-decode'

const clientId = process.env.VUE_APP_CLIENT_ID
const redirectUri = process.env.VUE_APP_REDIRECT_URI
const authorizeUrl = process.env.VUE_APP_AUTHORIZE_URL + clientId + '&redirect_uri=' + redirectUri
const tokenInfoUrl = process.env.VUE_APP_TOKEN_INFO_URL
const userKey = process.env.VUE_APP_CLIENT_ID

// interceptor on response
axios.interceptors.response.use(function (response) {
  return response
},
function (error) {
  if (error === 'Error: Network Error') {
    if (error.response === undefined) {
      var networkError = { response: { data: { message: 'Algum recurso desta funcionalidade encontra-se indisponível. Por favor, tente mais tarde ou entre em contato com o analista responsável.' } } }
      error = networkError
    }
  }

  if (error.response !== undefined && error.response.status === 403) {
    var permissionError = { response: { data: { message: 'Sem permissão de acesso para alguns recursos desta funcionalidade (403).' } } }
    error = permissionError
  }

  return Promise.reject(error)
})

export default {
  userKey,
  authorizeUrl,
  tokenInfoUrl,
  getInfoToken (token) {
    return axios.get(tokenInfoUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  getHashValue (key) {
    var matches = location.hash.match(new RegExp(key + '=([^&]*)'))
    return matches ? matches[1] : null
  },
  decodeJwtToken (jwtToken) {
    try {
      var decoded = jwtDecode(jwtToken)
      return decoded
    } catch (e) {
      // declarações para manipular quaisquer exceções
      console.log(e) // passa o objeto de exceção para o manipulador de erro
      return null
    }
  }
}
