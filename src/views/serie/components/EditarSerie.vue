<template>
  <div class="fluid">
    <h1 class="app-title">Cadastrar Série</h1>

    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b>Informações da série</b>
            <b-badge variant="mute" class="float-right small">(*) Obrigatório</b-badge>
          </div>

          <b-form >
            <!-- Nome Série -->
            <b-row>
              <b-col lg="6" sm="12">
                <b-form-group
                  label="Nome da série:"
                  label-for="nome"
                  class="text-label required"
                >

                  <b-form-input id="nome"
                  v-model="serie.nome"
                  v-validate="'required|min:8'"
                  data-vv-name="nome"
                  data-vv-as="Nome Série"
                  :error-messages="errors.collect('nome')"
                  :state="errors.has('nome')==false?null:!errors.has('nome')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('nome')" class="help is-danger">{{ errors.first('nome') }}</span>

                </b-form-group>
              </b-col>
            </b-row>

          </b-form>

          <div slot="footer" class="center-xy">
            <b-button v-if="serie.idSerie" @click="alterarSerie()" variant="primary">
              <i class="far fa-save"></i> Alterar
            </b-button>

            <b-button
              v-else
              @click="salvarSerie()"
              variant="primary"
              size="md"
            ><i class="far fa-save"></i> Salvar</b-button>

            &nbsp;

            <b-button outline @click="clear" size="md" variant="secondary">Limpar</b-button>
          </div>

         </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import ApiExemplo from '@/api/vue-exemplo'
import events from '@/util/events'

export default {
  name: 'EditarSerie',
  data () {
    return {
      valid: false,
      error: Object
    }
  },
  computed: {
    serie: {
      get () {
        return this.$store.getters.getSerie
      },
      set () {
        this.$store.commit('setSerie', this.serie)
      }
    }
  },
  methods: {
    salvarSerie () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          ApiExemplo.salvarSerie(this.serie)
            .then(() => {
              events.$emit('serieAlterada', this.serie)
              this.clear()
              this.$store.commit('setMessages', { message: 'Sucesso ao cadastrar série', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    alterarSerie () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          ApiExemplo.alterarSerie(this.serie)
            .then(() => {
              events.$emit('serieAlterada', this.serie)
              this.clear()
              this.$store.dispatch('novaSerie')
              this.$store.commit('setMessages', { message: 'Sucesso ao alterar série', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    clear () {
      this.$validator.reset()
      this.$store.dispatch('novaSerie')
      this.$store.dispatch('limparMensagens')
    }
  }
}
</script>

<style>
</style>
