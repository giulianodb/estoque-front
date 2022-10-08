<template>
  <div class="fluid">
    <h1 class="app-title">Família</h1>

    <b-card>
      <div slot="header">
        <strong>Cadastro de Família</strong>
      </div>

      <b-row>
        <b-col md="12">
          <form-wizard
            @on-complete="salvar"
            :start-index.sync="activeIndex"
            shape="circle"
            nextButtonText="Próximo"
            backButtonText="Anterior"
            finishButtonText="Concluir"
            title
            subtitle
            color="#0073C0"
            transition="slideInRight"
          >
            <tab-content icon="fas fa-user">
              <EditarStep01 :index="activeIndex" />
            </tab-content>

            <tab-content icon="fa fa-crosshairs ">
              <EditarStep02 :index="activeIndex" />
            </tab-content>

            <tab-content icon="fas fa-users">
              <EditarStep03 :index="activeIndex" />
            </tab-content>
            
            <tab-content icon="fas fa-people-carry">
              <EditarStep04 :index="activeIndex" />
            </tab-content>

            <tab-content icon="fas fa-home">
              <EditarStep05 :index="activeIndex" />
            </tab-content>

            <tab-content
              icon="fas fa-flag-checkered"
              class="wizard-fixed-height mx-auto"
            >
              <EditarEnd v-if="activeIndex == 5" :index="activeIndex" />
            </tab-content>
          </form-wizard>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'

import EditarStep01 from './components/EditarStep01.vue'
import EditarStep02 from './components/EditarStep02.vue'
import EditarStep03 from './components/EditarStep03.vue'
import EditarStep04 from './components/EditarStep04.vue'
import EditarStep05 from './components/EditarStep05.vue'
import EditarEnd from './components/EditarEnd.vue'

import Api from '@/api/social'
import events from '@/util/events'

import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  components: {
    FormWizard,
    TabContent,
    EditarStep01,
    EditarStep02,
    EditarStep03,
    EditarStep04,
    EditarStep05,
    EditarEnd
  },
  data () {
    return {
      activeIndex: 0,
      componentInfo: {
        title: 'Sobre o componente',
        text: `Os componentes do tipo <i>Wizard</i> são utilizados para quebrar formulários em etapas.`,
        urls: ['https://github.com/BinarCode/vue-form-wizard']
      }
    }
  },
  methods: {
    salvar () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Api.salvarFamilia(this.$store.getters.getFamilia)
            .then(() => {
              // events.$emit('AlunoAlterada', this.Aluno)
              // this.clear();
              this.$validator.reset()
              this.$store.dispatch('novaFamilia')
              this.$store.commit('setMessages', {
                message: 'Sucesso ao salvar Família',
                variant: 'success'
              })

              this.$router.push('/listar_familia')
            })
            .catch((err) => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    clear () {
      this.$validator.reset()
      this.$store.dispatch('novaFamilia')
      this.$store.dispatch('limparMensagens')
    }
  },
  created(){
     //this.$store.dispatch('novaFamilia')
  }
}
</script>

<style scoped>
h4 {
  font-weight: bold;
}
.wizard-fixed-height {
  height: 250px;
}
</style>
