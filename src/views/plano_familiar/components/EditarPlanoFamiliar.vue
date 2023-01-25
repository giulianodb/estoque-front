<template>
  <div class="fluid">
    <h1 class="app-title">Plano de ação familiar</h1>

    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b>Informações sobre plano de ação familiar da {{this.familia.nomeResponsavel}}</b>
            <b-badge variant="mute" class="float-right small">(*) Obrigatório</b-badge>
          </div>

          <b-form >
            <b-row>


              <b-col lg="12" sm="12">
                <b-form-group
                  label="Nome:"
                  label-for="nome"
                  class="text-label required"
                >

                  <b-form-input id="nome"
                  v-model="planoFamiliar.nome"
                   v-validate="'required'"
                  data-vv-name="nome"
                  data-vv-as="Nome"
                  :error-messages="errors.collect('nome')"
                  :state="errors.has('nome')==false?null:!errors.has('nome')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('nome')" class="help is-danger">{{ errors.first('nome') }}</span>

                </b-form-group>
              </b-col>

              <b-col lg="12" sm="12">
                <b-form-group
                  label="Vínculo:"
                  label-for="vinculo"
                  class="text-label required"
                >

                  <b-form-input id="vinculo"
                  v-model="planoFamiliar.vinculo"
                   v-validate="'required'"
                  data-vv-name="vinculo"
                  data-vv-as="Vínculo"
                  :error-messages="errors.collect('vinculo')"
                  :state="errors.has('vinculo')==false?null:!errors.has('vinculo')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('vinculo')" class="help is-danger">{{ errors.first('vinculo') }}</span>

                </b-form-group>
              </b-col>


              <b-col lg="12" sm="12">
                <b-form-group
                  label="Meta:"
                  label-for="meta"
                  class="text-label required"
                >

                  <b-form-input id="meta"
                  v-model="planoFamiliar.meta"
                   v-validate="'required'"
                  data-vv-name="meta"
                  data-vv-as="Meta"
                  :error-messages="errors.collect('meta')"
                  :state="errors.has('meta')==false?null:!errors.has('meta')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('meta')" class="help is-danger">{{ errors.first('meta') }}</span>

                </b-form-group>
              </b-col>


            </b-row>

          </b-form>

          <div slot="footer" class="center-xy">
            <b-button v-if="planoFamiliar.id" @click="alterarPlano()" variant="primary">
              <i class="far fa-save"></i> Alterar
            </b-button>

            <b-button
              v-else
              @click="salvarPlano()"
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
  name: 'EditarPlano',
  data () {
    return {
      valid: false,
      error: Object
    }
  },
  computed: {
    planoFamiliar: {
      get () {
        return this.$store.getters.getPlanoFamiliar
      },
      set () {
        this.$store.commit('setPlanoFamiliar', this.planoFamiliar)
      }
    },
     familia: {
      get () {
        return this.$store.getters.getFamilia
      },
      set () {
        this.$store.commit('setFamilia', this.familia)
      }
    },
  },

  methods: {
    salvarPlano () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.planoFamiliar.familia = this.$store.getters.getFamilia
          Api.salvarPlanoFamiliar(this.planoFamiliar)
            .then(() => {
              events.$emit('planoFamiliarAlterado', this.planoFamiliar)
              this.clear()
              this.$store.commit('setMessages', { message: 'Sucesso ao cadastrar plano de açõa familiar', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    alterarPlano () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.planoFamiliar.familia = this.$store.getters.getFamilia
          Api.alterarPlanoFamiliar(this.planoFamiliar)
            .then(() => {
              events.$emit('planoFamiliarAlterado', this.planoFamiliar)
              this.clear()
              this.$store.dispatch('novoPlanoFamiliar')
              this.$store.commit('setMessages', { message: 'Sucesso ao alterar plano familiar', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    clear () {
      this.$validator.reset()
      this.$store.dispatch('novoPlanoFamiliar')
      this.$store.dispatch('limparMensagens')
    }
  }
}
</script>

<style>
</style>
