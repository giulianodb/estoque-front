<template>
  <div class="fluid">
    <h1 class="app-title">Cadastrar Conta</h1>

    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b>Informações da conta</b>
            <b-badge variant="mute" class="float-right small">(*) Obrigatório</b-badge>
          </div>

          <b-form >
            <!-- Nome Série -->
            <b-row>
              <b-col lg="6" sm="12">
                <b-form-group
                  label="Nome da conta:"
                  label-for="nome"
                  class="text-label required"
                >

                  <b-form-input id="nome"
                  v-model="conta.nomeConta"
                  v-validate="'required|min:3'"
                  data-vv-name="nome"
                  data-vv-as="Nome conta"
                  :error-messages="errors.collect('nome')"
                  :state="errors.has('nome')==false?null:!errors.has('nome')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('nome')" class="help is-danger">{{ errors.first('nome') }}</span>

                </b-form-group>
              </b-col>

              <b-col lg="6" sm="12">
                <b-form-group
                  label="Agência conta:"
                  label-for="agenciaConta"
                  class="text-label"
                >

                  <b-form-input id="agenciaConta"
                  v-model="conta.agenciaConta"
                  data-vv-name="agenciaConta"
                  data-vv-as="Agencia conta"
                  :error-messages="errors.collect('agenciaConta')"
                  :state="errors.has('agenciaConta')==false?null:!errors.has('agenciaConta')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('agenciaConta')" class="help is-danger">{{ errors.first('agenciaConta') }}</span>

                </b-form-group>
              </b-col>
              
              
              <b-col lg="6" sm="6">
                <b-form-group
                  label="Número conta:"
                  label-for="nome"
                  class="text-label"
                >

                  <b-form-input id="numeroConta"
                  v-model="conta.numeroConta"
                  data-vv-name="numeroConta"
                  data-vv-as="Número conta"
                  :error-messages="errors.collect('numeroConta')"
                  :state="errors.has('numeroConta')==false?null:!errors.has('numeroConta')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('numeroConta')" class="help is-danger">{{ errors.first('numeroConta') }}</span>

                </b-form-group>
              </b-col>
              
              
              <b-col lg="6" sm="6">

                    <b-form-group
                    label="Tipo Conta"
                    label-for="tipoConta"
                  >
            
         
                    <b-form-select
                            id="tipoConta"
                            :plain="true"
                            v-model="conta.tipoConta.cod"
                            data-vv-name="tipoConta"
                            data-vv-as="tipoConta"
                            :error-messages="errors.collect('tipoConta')"
                            :state="
                              errors.has('tipoConta') == false ? null : !errors.has('tipoConta')
                            "
                          >
                          <option  value=0 > Conta corrente  </option>
                          <option  value=1 > Investimento  </option>
                          <option  value=2 > Poupança  </option>

                          </b-form-select>

                    </b-form-group>
          </b-col>









             </b-row>

          </b-form>

          <div slot="footer" class="center-xy">
            <b-button v-if="conta.id" @click="alterarConta()" variant="primary">
              <i class="far fa-save"></i> Alterar
            </b-button>

            <b-button
              v-else
              @click="salvarConta()"
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
  name: 'Editarconta',
  data () {
    return {
      valid: false,
      error: Object
    }
  },
  computed: {
    conta: {
      get () {
        return this.$store.getters.getConta
      },
      set (valor) {
        this.$store.commit('setConta', valor)
      }
    }
  },
  methods: {
    salvarConta () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Api.salvarConta(this.conta)
            .then(() => {
              events.$emit('contaAlterada', this.conta)
              this.clear()
              this.$store.commit('setMessages', { message: 'Sucesso ao cadastrar conta', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    alterarConta () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Api.salvarConta(this.conta)
            .then(() => {
              events.$emit('contaAlterada', this.conta)
              this.clear()
              this.$store.dispatch('novaConta')
              this.$store.commit('setMessages', { message: 'Sucesso ao alterar conta', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    clear () {
      this.$validator.reset()
      this.$store.dispatch('novaConta')
      this.$store.dispatch('limparMensagens')
    }
  }
}
</script>

<style>
</style>
