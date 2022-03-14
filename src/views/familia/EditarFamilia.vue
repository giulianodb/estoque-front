<template>
  <div class="fluid">
    <h1 class="app-title">Família</h1>

    <b-card>
      <div slot="header">
        <strong>Exemplo</strong>
      </div>

      <b-row no-gutters>
        <b-col md="12" no-gutters>
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

            <tab-content icon="fas fa-user" class="wizard-fixed-height mx-auto">
              <EditarStep01 :index="activeIndex" />
            </tab-content>
            <tab-content
              icon="fas fa-flag-checkered"
              class="wizard-fixed-height mx-auto"
            >
              <EditarEnd v-if="activeIndex == 3" :index="activeIndex" />
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
import EditarEnd from './components/EditarEnd.vue'

import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  components: {
    FormWizard,
    TabContent,
    EditarStep01,
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
      alert('Vamos salvar isso..!')
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
