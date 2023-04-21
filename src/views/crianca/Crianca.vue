<template>
  <div>
      <div class="fluid">
    <h1 class="app-title">Pesquisar Criança</h1>

    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b>Informações para pesquisa</b>
          </div>

          <b-form >
            <!-- Nome Série -->
            <b-row>
              <b-col lg="3" sm="12">
                <b-form-group label="Nome:" label-for="nome" class="text-label required">
                  <b-form-input id="nome"  v-model="criancaPesquisa.nome" :autofocus="true"/>
                </b-form-group>
              </b-col>

              <b-col lg="3" sm="12">
                <b-form-group label="Projeto:" label-for="projeto">
                <b-form-select
                    id="projeto"
                    :plain="true"
                    v-model="criancaPesquisa.projeto"
                  >
                    <template slot="first">
                      <b-form-select-option :value="-1" disabled>Selecione </b-form-select-option>
                    </template>
                    <!-- <option :value="0"> FOCAR dddd </option> -->
                    <option :value="1"> SCFV  </option>
                  </b-form-select>
                </b-form-group>
            </b-col>

            <b-col lg="3" sm="12">
                <b-form-group label="Matriculado?" label-for="matriculado">
                <b-form-checkbox
                    id="matriculado"
                    v-model="criancaPesquisa.matriculado"
                  >
                
                  </b-form-checkbox>
                </b-form-group>
            </b-col>

            <b-col lg="3" sm="12">
                <b-form-group label="Fila de espera ?" label-for="espera">
                <b-form-checkbox
                    id="espera"
                    v-model="criancaPesquisa.espera"
                  >
                
                  </b-form-checkbox>
                </b-form-group>
            </b-col>

            </b-row>
          
          </b-form>

          <div slot="footer" class="center-xy">
            <b-button @click="pesquisarCrianca()" variant="primary">
              <i class="fas fa-search"></i> Pesquisar
            </b-button>

            &nbsp;

            <b-button outline @click="clear" size="md" variant="secondary">Limpar</b-button>
          </div>

         </b-card>
      </b-col>
    </b-row>

  </div>
    
    <ListarCrianca :porFamilia="false"/>

    <EditarCrianca v-if="showEditarCrianca" />
  </div>
</template>

<script>
import ListarCrianca from '../familia/components/crianca/ListarCrianca'
import EditarCrianca from '../familia/components/crianca/EditarCrianca'

import Api from '@/api/social'
import events from '@/util/events'

export default {
  name: 'Crianca',
  components: { ListarCrianca , EditarCrianca},
  data () {
    return {
      familia: { nome: 'OPA' },
      showEditarCrianca : false
    }
  },
  computed : {
     criancaPesquisa: {
      get () {
        return this.$store.getters.getCriancaPesquisa
      },
      set () {
        this.$store.commit('setCriancaPesquisa', this.criancaPesquisa)
      }
    }
  },

  created () {
    console.log("COMPONENTE CRIANCA")
    this.$store.dispatch('novaCriancaPesquisa')

    this.$store.commit('setCriancas', [])

    events.$on('iniciarEditarCrianca', () => {
       this.mostrarEditarCrianca(true)
    })
    events.$on('criancaEditada', () => {
       this.mostrarEditarCrianca(false)
    })
  },
  mounted () {

  },
  methods: {
    pesquisarCrianca () {
      // this.$store.commit('setFamilia', res.data)
      //  this.nota.matricula = selecionado
      //console.log(this.criancaPesquisa)
      events.$emit('pesquisarCrianca')
    },
    mostrarEditarCrianca (mostrar) {
      this.showEditarCrianca = mostrar
      window.scrollBy(1500, 3000);
    },
    clear () {
      this.$store.dispatch('novaCriancaPesquisa')
      this.$store.dispatch('limparMensagens')
    }

  }
}
</script>

<style></style>
