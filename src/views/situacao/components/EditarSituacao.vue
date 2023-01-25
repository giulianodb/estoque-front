<template>
  <div class="fluid">
    <h1 class="app-title">Situações identificadas com a família</h1>

    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b>Informações sobre situação identificada da família de {{this.familia.nomeResponsavel}}</b>
            <b-badge variant="mute" class="float-right small">(*) Obrigatório</b-badge>
          </div>

          <b-form >
            <b-row>


              <b-col lg="6" sm="6">
                <b-form-group
                  label="Ação:"
                  label-for="acao"
                  class="text-label required"
                >

                  <b-form-input id="acao"
                  v-model="situacaoIdentificada.acao"
                   v-validate="'required'"
                  data-vv-name="acao"
                  data-vv-as="Ação"
                  :error-messages="errors.collect('acao')"
                  :state="errors.has('acao')==false?null:!errors.has('acao')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('acao')" class="help is-danger">{{ errors.first('acao') }}</span>

                </b-form-group>
              </b-col>

              <b-col lg="3" sm="3">
                <b-form-group
                  label="Responsabilidade técnica:"
                  label-for="responsabilidadeTecnica"
                  class="text-label"
                >

                 <b-form-checkbox id="responsabilidadeTecnica"
                  v-model="situacaoIdentificada.responsabilidadeTecnica"
                  data-vv-name="responsabilidadeTecnica"
                  data-vv-as="Responsabilidade técnica"
                  :error-messages="errors.collect('responsabilidadeTecnica')"
                  :state="errors.has('responsabilidadeTecnica')==false?null:!errors.has('responsabilidadeTecnica')"
                  trim
                  :autofocus="true"></b-form-checkbox>
                  <span v-show="errors.has('responsabilidadeTecnica')" class="help is-danger">{{ errors.first('responsabilidadeTecnica') }}</span>

                </b-form-group>
              </b-col>


              <b-col lg="3" sm="3">
                <b-form-group
                  label="Responsabilidade família:"
                  label-for="responsabilidadeFamilia"
                  class="text-label"
                >

                 <b-form-checkbox id="responsabilidadeFamilia"
                  v-model="situacaoIdentificada.responsabilidadeFamilia"
                  data-vv-name="responsabilidadeFamilia"
                  data-vv-as="Responsabilidade família"
                  :error-messages="errors.collect('responsabilidadeFamilia')"
                  :state="errors.has('responsabilidadeFamilia')==false?null:!errors.has('responsabilidadeFamilia')"
                  trim
                  :autofocus="true"></b-form-checkbox>
                  <span v-show="errors.has('responsabilidadeFamilia')" class="help is-danger">{{ errors.first('responsabilidadeFamilia') }}</span>

                </b-form-group>
              </b-col>

              <b-col lg="3" sm="3">
                <b-form-group
                  label="Prazo:"
                  label-for="prazo"
                  class="text-label"
                >

                  <b-form-input id="prazo"
                  v-model="situacaoIdentificada.prazo"
                  data-vv-name="prazo"
                  data-vv-as="Prazo"
                  :error-messages="errors.collect('prazo')"
                  :state="errors.has('prazo')==false?null:!errors.has('prazo')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('prazo')" class="help is-danger">{{ errors.first('prazo') }}</span>

                </b-form-group>
              </b-col>

              <b-col lg="12" sm="12">
                <b-form-group
                  label="Resultados esperados:"
                  label-for="resultadosEsperados"
                  class="text-label required"
                >

                  <b-form-input id="resultadosEsperados"
                  v-model="situacaoIdentificada.resultadosEsperados"
                   v-validate="'required'"
                  data-vv-name="resultadosEsperados"
                  data-vv-as="Resultados Esperados"
                  :error-messages="errors.collect('resultadosEsperados')"
                  :state="errors.has('resultadosEsperados')==false?null:!errors.has('resultadosEsperados')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('resultadosEsperados')" class="help is-danger">{{ errors.first('resultadosEsperados') }}</span>

                </b-form-group>
              </b-col>

              <b-col lg="12" sm="12">
                <b-form-group
                  label="Resultados obtidos:"
                  label-for="resultadosObtidos"
                  class="text-label required"
                >

                  <b-form-input id="resultadosObtidos"
                  v-model="situacaoIdentificada.resultadosObtidos"
                   v-validate="'required'"
                  data-vv-name="resultadosObtidos"
                  data-vv-as="Resultados Obtidos"
                  :error-messages="errors.collect('resultadosObtidos')"
                  :state="errors.has('resultadosObtidos')==false?null:!errors.has('resultadosObtidos')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('resultadosObtidos')" class="help is-danger">{{ errors.first('resultadosObtidos') }}</span>

                </b-form-group>
              </b-col>


            </b-row>

          </b-form>

          <div slot="footer" class="center-xy">
            <b-button v-if="situacaoIdentificada.id" @click="alterarSituacao()" variant="primary">
              <i class="far fa-save"></i> Alterar
            </b-button>

            <b-button
              v-else
              @click="salvarSituacao()"
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
  name: 'EditarSituacao',
  data () {
    return {
      valid: false,
      error: Object
    }
  },
  computed: {
    situacaoIdentificada: {
      get () {
        return this.$store.getters.getSituacaoIdentificada
      },
      set () {
        this.$store.commit('setSituacaoIdentificada', this.situacaoIdentificada)
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
    salvarSituacao () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.situacaoIdentificada.familia = this.$store.getters.getFamilia
          Api.salvarSituacaoIdentificada(this.situacaoIdentificada)
            .then(() => {
              events.$emit('situacaoIdentificadaAlterada', this.situacaoIdentificada)
              this.clear()
              this.$store.commit('setMessages', { message: 'Sucesso ao cadastrar situação identificada com a família', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    alterarSituacao () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.situacaoIdentificada.familia = this.$store.getters.getFamilia
          Api.alterarSituacaoIdentificada(this.situacaoIdentificada)
            .then(() => {
              events.$emit('situacaoIdentificadaAlterada', this.situacaoIdentificada)
              this.clear()
              this.$store.dispatch('novaSituacaoIdentificada')
              this.$store.commit('setMessages', { message: 'Sucesso ao alterar situação identificada com a família', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    clear () {
      this.$validator.reset()
      this.$store.dispatch('novaSituacaoIdentificada')
      this.$store.dispatch('limparMensagens')
    }
  }
}
</script>

<style>
</style>
