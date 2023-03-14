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
            ref="wizard"
            shape="circle"
            nextButtonText="Próximo"
            backButtonText="Anterior"
            finishButtonText="Salvar"
            title
            subtitle
            color="#0073C0"
            transition="slideInRight"
          >
            <tab-content title="Identificação Responsável" icon="fas fa-user">
              <EditarStep01 :index="activeIndex" />

            </tab-content>

            <tab-content icon="fa fa-crosshairs " title="Motivo">
              <EditarStep02 :index="activeIndex" />
            </tab-content>

            <tab-content icon="fas fa-users" title="Composição familiar">
              <EditarStep03 :index="activeIndex" />
            </tab-content>
            
            <tab-content icon="fas fa-people-carry" title="Programas sociais">
              <EditarStep04 :index="activeIndex" />
            </tab-content>

            <tab-content icon="fas fa-home" title="Moradia">
              <EditarStep05 :index="activeIndex" />
            </tab-content>
            
            <tab-content icon="fas fa-address-book" title="Visita domiciliar">
              <EditarStep06 :index="activeIndex" />
            </tab-content>

            <tab-content title="Finalizar"
              icon="fas fa-flag-checkered"
              class="wizard-fixed-height mx-auto"
            >
              <EditarEnd v-if="activeIndex == 6" :index="activeIndex" />
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
import EditarStep06 from './components/EditarStep06.vue'
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
    EditarStep06,
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
        console.log("ANTES DE SALVAR")
        console.log(this.$store.getters.getFamilia)

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
  mounted(){
     //this.$store.dispatch('novaFamilia')
     console.log(this.$route.params.tipo)
     var familia = this.$store.getters.getFamilia
     console.log(familia)
     if (familia.id) {
       this.$refs.wizard.activateAll();
     }
  },
  created(){
    console.log("CREATED EDITAR FAMILIA")
    var teste = this.$refs 
    events.$on('familiaEncontrada', () => {
      console.log("Olá!!!")
       teste.wizard.activateAll();
    })
  },
  beforeMount(){
    if (this.$route.params.tipo == undefined) {
      this.$store.dispatch('novaFamilia')
    }
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
