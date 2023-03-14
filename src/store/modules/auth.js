import apiCentralSeguranca from '@/api/centralseguranca'

export default {

  state: {
    jwtToken: localStorage.getItem(process.env.VUE_APP_CLIENT_ID) || '',
    status: '',
  },

  mutations: {
    authRequest (state) {
      state.status = 'loading'
    },
    authSuccess (state, payload) {
      state.status = 'success'
      state.jwtToken = payload
    },
    authError (state) {
      state.status = 'error'
    },
    authLogout (state) {
      state.status = ''
      state.jwtToken = ''
    },
    limparJwtTokenState (state) {
      state.jwtToken = ''
      localStorage.removeItem(process.env.VUE_APP_CLIENT_ID)
    }
  },

  getters: {
    isAuthenticated (state) {
      if (state.jwtToken === '') {
        console.log("jwtToen igual aspas")
        return false
      }
      if ((state.jwtToken)) {
        console.log("tem jwt")
        return true
      } else {
        console.log("nao tem" + state.jwtToken)
        return false
      }
    },
    authStatus (state) {
      return state.status
    },
    getJwtToken (state) {
      return state.jwtToken
    }
  },

  actions: {
    async authFilter ({ commit }) {
      console.log("AuthFILTER")
      return new Promise((resolve, reject) => {
        commit('authRequest')
        const localStorageKey = process.env.VUE_APP_CLIENT_ID
        let jwtToken = localStorage.getItem(localStorageKey)
        
        // if (jwtToken !== '' && jwtToken !== undefined && jwtToken !== null) {
        
        // } else {
        //   jwtToken = apiCentralSeguranca.getHashValue('access_token')
        // }

        var jwtDecoded = jwtToken == null ? null : apiCentralSeguranca.decodeJwtToken(jwtToken)

        let data = new Date()
        let today = data.getTime().toString()

        if (today.length !== 10) {
          today = today.substr(0, 10)
        }

        if (jwtToken != null && jwtDecoded !== null && jwtDecoded !== undefined && today < jwtDecoded.exp) {
          localStorage.setItem(localStorageKey, jwtToken)
          commit('authSuccess', jwtToken)
          resolve(true)
        } else {
          localStorage.removeItem(localStorageKey)
          resolve(false)
          //reject(new Error('Token inválido'))
          //window.location.href = '' + apiCentralSeguranca.authorizeUrl
         // window.getApp.$router.push('/login')
        }
      })
    },

    authLogout ({ commit }) {
      return new Promise((resolve) => {
        commit('authLogout')
        localStorage.removeItem(process.env.VUE_APP_CLIENT_ID)
        // window.getApp.$router.push('/')
        // this.$router.push({ name: 'inicial', })
        resolve()
      })
    }

  }
}
