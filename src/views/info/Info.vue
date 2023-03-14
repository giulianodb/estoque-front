<template>
  <div>
    <h1 class="app-title">Informações sobre a aplicação</h1>

    <b-row>
      <b-col sm="12" md="12">
        <b-card class="mb-2">
          <b-row class="justify-content-around">
            <b-col sm="12" md="3" class="my-2">
              <span class="d-block text-center">Desenvolvido pela:</span>
              <a
                :href="App.developer.href"
                target="_blank"
                :title="App.developer.name"
                class="dont-print d-flex justify-content-center"
              >
                <div class="logo-org about-logo-1"></div>
              </a>
              <img
                class="print"
                style="width:220px;"
                :src="App.developer.logo"
                :title="App.developer.name"
              />
            </b-col>
        
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-card header="Informações gerais" class="mb-2">
      <b-row>
        <b-col sm="12">
          <b-col sm="12">
            <b-form-group
              id="application-name"
              label-cols-sm="12"
              label-cols-md="6"
              label-cols-lg="4"
              label-cols-xl="2"
              label-align-sm="left"
              label-align-md="right"
              label-align-lg="right"
              label-align-xl="right"
              label="Nome da aplicação:"
              class="mb-0"
            >
              <b-form-input
                plaintext
                :value="App.name"
                class="text-bold"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12">
            <b-form-group
              id="application-name"
              label-cols-sm="12"
              label-cols-md="6"
              label-cols-lg="4"
              label-cols-xl="2"
              label-align-sm="left"
              label-align-md="right"
              label-align-lg="right"
              label-align-xl="right"
              label="Versão:"
              class="mb-0"
            >
              <b-form-input
                plaintext
                :value="App.version"
                class="text-bold"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="12">
            <b-form-group
              id="application-name"
              label-cols-sm="12"
              label-cols-md="6"
              label-cols-lg="4"
              label-cols-xl="2"
              label-align-sm="left"
              label-align-md="right"
              label-align-lg="right"
              label-align-xl="right"
              label="Cliente:"
              class="mb-0"
            >
              <span class="text-bold"
                ><a
                  class="link-control-plaintext"
                  :href="App.customer.href"
                  target="_blank"
                  >{{ App.customer.name }}</a
                ></span
              >
            </b-form-group>
          </b-col>

          <b-col sm="12">
            <b-form-group
              id="application-name"
              label-cols-sm="12"
              label-cols-md="6"
              label-cols-lg="4"
              label-cols-xl="2"
              label-align-sm="left"
              label-align-md="right"
              label-align-lg="right"
              label-align-xl="right"
              label="Framework:"
              class="mb-0"
            >
              <b-form-input
                plaintext
                :value="App.framework.name"
                class="text-bold"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="12">
            <b-form-group
              id="application-name"
              label-cols-sm="12"
              label-cols-md="6"
              label-cols-lg="4"
              label-cols-xl="2"
              label-align-sm="left"
              label-align-md="right"
              label-align-lg="right"
              label-align-xl="right"
              label="Descrição:"
              class="mb-0"
            >
              <!-- <b-form-textarea plaintext :value="App.description" rows="3" max-rows="6" class="text-bold" ></b-form-textarea> -->
            </b-form-group>
          </b-col>
        </b-col>
      </b-row>
    </b-card>

    <InfoBaseTechnologies />
    <InfoCredits :items="App.credits" />
  </div>
</template>

<script>
import InfoCredits from './components/InfoCredits.vue'
import InfoBaseTechnologies from './components/InfoBaseTechnologies.vue'
import { application } from '@/application.js'

// import App from '@/application.json'

export default {
  name: 'Informacoes',
  components: {
    InfoCredits,
    InfoBaseTechnologies
  },
  data () {
    return {
      // brandLogoPath: brandLogoPath,
      App: application,
      // App,
      creditos: [
        {
          nome: 'vue-the-mask',
          url: 'https://vuejs-tips.github.io/vue-the-mask/'
        },
        {
          nome: 'Vue-multiselect',
          url: 'https://vue-multiselect.js.org/'
        }
      ]
    }
  }
}
</script>
<style scoped>

</style>
