<template>
  <div class="fluid">
    <h1 class="app-title">Atendimento</h1>

    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b>Informações sobre o atendimento de {{this.crianca.nome}}</b>
            <b-badge variant="mute" class="float-right small">(*) Obrigatório</b-badge>
          </div>

          <b-form >
            <!-- Nome Série -->
            <b-row>
              <b-col lg="3" sm="12">
                <b-form-group
                  label="Data do atendimento:"
                  label-for="dataAtendimento"
                  class="text-label required"
                >
                  <b-form-input
                    type="date"
                    id="dataAtendimento"
                    v-model="atendimento.dataAtendimento"
                    v-validate="'required'"
                    data-vv-name="dataAtendimento"
                    data-vv-as="Data do atendimento"
                    :error-messages="errors.collect('dataAtendimento')"
                    :state="
                      errors.has('dataAtendimento') == false
                        ? null
                        : !errors.has('dataAtendimento')
                    "
                    trim
                    :autofocus="true"
                  ></b-form-input>
                  <span v-show="errors.has('dataAtendimento')" class="help is-danger" >{{ errors.first("dataAtendimento") }}</span >
                </b-form-group>
              </b-col>


              <b-col lg="12" sm="12">
                <b-form-group
                  label="Registro de atendimento:"
                  label-for="registro"
                  class="text-label required"
                >

                  <b-form-textarea id="registro"
                  v-model="atendimento.registro"
                   v-validate="'required'"
                  data-vv-name="registro"
                  data-vv-as="Registro"
                  :error-messages="errors.collect('registro')"
                  :state="errors.has('registro')==false?null:!errors.has('registro')"
                  trim
                  :autofocus="true"></b-form-textarea>
                  <span v-show="errors.has('nome')" class="help is-danger">{{ errors.first('registro') }}</span>

                </b-form-group>
              </b-col>
            </b-row>

          </b-form>

          <div slot="footer" class="center-xy">
            <b-button v-if="atendimento.id" @click="alterarAtendimento()" variant="primary">
              <i class="far fa-save"></i> Alterar
            </b-button>

            <b-button
              v-else
              @click="salvarAtendimento()"
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
import Api from '@/api/social'
import events from '@/util/events'

export default {
  name: 'EditarAtendimento',
  data () {
    return {
      valid: false,
      error: Object
    }
  },
  computed: {
    atendimento: {
      get () {
        return this.$store.getters.getAtendimento
      },
      set () {
        this.$store.commit('setAtendimento', this.Atendimento)
      }
    },
     crianca: {
      get () {
        return this.$store.getters.getCrianca
      },
      set () {
        this.$store.commit('setCrianca', this.crianca)
      }
    },
  },

  methods: {
    salvarAtendimento () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.atendimento.crianca = this.$store.getters.getCrianca
          console.log("====")
          console.log(this.$store.getters.getCrianca)
          console.log(this.atendimento)
          console.log("====")
          Api.salvarAtendimento(this.atendimento)
            .then(() => {
              events.$emit('atendimentoAlterado', this.atendimento)
              this.clear()
              this.$store.commit('setMessages', { message: 'Sucesso ao cadastrar atendimento', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    alterarAtendimento () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.atendimento.crianca = this.$store.getters.getCrianca
          Api.alterarAtendimento(this.atendimento)
            .then(() => {
              events.$emit('atendimentoAlterado', this.atendimento)
              this.clear()
              this.$store.dispatch('novoAtendimento')
              this.$store.commit('setMessages', { message: 'Sucesso ao alterar série atendimento', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    clear () {
      this.$validator.reset()
      this.$store.dispatch('novoAtendimento')
      this.$store.dispatch('limparMensagens')
    }
  }
}
</script>

<style>
</style>
