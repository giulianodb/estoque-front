<template>
<b-row class="vh-100 vw-100 row-login">
    <b-col sm="5" class="d-flex justify-content-center align-items-center left-login">
      <div class="col-8">
        <h2 class="text-center mb-5 title-login">Autenticação</h2>
        <b-form>
          <b-form-group
            label="Login"
            label-for="login"
            >
              <b-form-input
                id="login"
                autocomplete="off"
                v-model="usuario"
              ></b-form-input>
            </b-form-group>
 
            <b-form-group
              label-for="senha"
            >
              <label class="d-flex justify-content-between">
                Senha
                <!-- <small><a href="#">Esqueceu sua senha?</a></small> -->
              </label>
 
              <b-form-input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                v-model="senha"
              ></b-form-input>
            </b-form-group>
 
            <b-button
              type="button"
              variant="primary"
              block
              @click="autenticar()">
              <i class="fas fa-sign-in-alt"></i> Entrar
            </b-button>
 
            <hr>
 
        </b-form>
      </div>
    </b-col>
    <b-col sm="7"></b-col>
  </b-row>
</template>

<script>

// import App from '@/application.json'
import ApiSeguranca from '@/api/centralseguranca'
import Api from '@/api/social'

export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      usuario:"",
      senha:""
      
    } 
  }, methods: {

    autenticar () {
      console.log("teste")
      Api.autenticar (
        this.usuario,
        this.senha,
      
      )
        .then((res) => {

          // this.$store.commit('setFamilias', res.data.content)
          // this.totalRows = res.data.totalElements
          console.log(res)
          console.log(res.headers.authorization)
          let token = res.headers.authorization.substring(7)
          console.log(token)

         const localStorageKey = process.env.VUE_APP_CLIENT_ID
         localStorage.setItem(localStorageKey, token)
         //let jwtToken = localStorage.getItem(localStorageKey)

         this.$router.push({ name: 'inicial', })

        })
        .catch((err) => {
          console.log(err)
          // this.$store.commit('setFamilias', [])
          // this.$store.commit('setMessages', err.response.data)
        })


      // this.inserirObjetosFamilia(familia)
      // let obj = JSON.parse(JSON.stringify(familia))
      // this.$store.commit('setFamilia', obj)
      // console.log(obj)
      
      // this.$router.push({ name: 'editarFamilia', params: { idFamilia: familia.id , tipo: "editar"} })

    }
  }
}


</script>
<style scoped>
  *, /*resetar o estilo da página*/
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
 
.row-login {
  margin-left: 0;
}
 
.left-login {
  background-color: #F2F2F2;
}
 
.title-login {
  font-weight: bold;
}
</style>
