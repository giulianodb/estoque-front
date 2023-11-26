<template>
  <div class="fluid">
    <h1 class="app-title">Cadastrar Empresa</h1>

    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b>Informações da empresa</b>
            <b-badge variant="mute" class="float-right small">(*) Obrigatório</b-badge>
          </div>

          <b-form >
            <!-- Nome Série -->
            <b-row>
              <b-col lg="6" sm="12">
                <b-form-group
                  label="Nome da empresa:"
                  label-for="nome"
                  class="text-label required"
                >
                  <b-form-input id="nome"
                  v-model="empresa.nome"
                  v-validate="'required'"
                  data-vv-name="nome"
                  data-vv-as="Nome Empresa"
                  :error-messages="errors.collect('nome')"
                  :state="errors.has('nome')==false?null:!errors.has('nome')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('nome')" class="help is-danger">{{ errors.first('nome') }}</span>

                </b-form-group>
              </b-col>


              <b-col lg="6" sm="12">
                <b-form-group
                  label="Cnpj:"
                  label-for="cnpj"
                  class="text-label required"
                >
                  <b-form-input id="cnpj"
                  v-model="empresa.cnpj"
                  v-validate="'required'"
                  data-vv-name="cnpj"
                  data-vv-as="Cnpj"
                  :error-messages="errors.collect('cnpj')"
                  :state="errors.has('cnpj')==false?null:!errors.has('cnpj')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('cnpj')" class="help is-danger">{{ errors.first('cnpj') }}</span>

                </b-form-group>
              </b-col>

               
              <b-col lg="6" sm="12">
                <b-form-group
                  label="Nome contato:"
                  label-for="nomeContato"
                  class="text-label required"
                >
                  <b-form-input id="nomeContato"
                  v-model="empresa.nomeContato"
                  v-validate="'required'"
                  data-vv-name="nomeContato"
                  data-vv-as="Nome Contato"
                  :error-messages="errors.collect('nomeContato')"
                  :state="errors.has('nomeContato')==false?null:!errors.has('nomeContato')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('nomeContato')" class="help is-danger">{{ errors.first('nomeContato') }}</span>

                </b-form-group>
              </b-col> 


              <b-col lg="6" sm="12">
                <b-form-group
                  label="Email:"
                  label-for="email"
                  class="text-label required"
                >
                  <b-form-input id="email"
                  v-model="empresa.email"
                  v-validate="'required'"
                  data-vv-name="email"
                  data-vv-as="Email"
                  :error-messages="errors.collect('email')"
                  :state="errors.has('email')==false?null:!errors.has('email')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>

                </b-form-group>
              </b-col> 

              <b-col lg="6" sm="12">
                <b-form-group
                  label="Telefone:"
                  label-for="telefone"
                  class="text-label required"
                >
                  <b-form-input id="telefone"
                  v-model="empresa.telefone"
                  v-validate="'required'"
                  data-vv-name="telefone"
                  data-vv-as="Telefone"
                  :error-messages="errors.collect('telefone')"
                  :state="errors.has('telefone')==false?null:!errors.has('telefone')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('telefone')" class="help is-danger">{{ errors.first('telefone') }}</span>

                </b-form-group>
              </b-col> 

              
            <b-col sm="12" lg="3">
                <b-form-group
                  label="Estoque :"
                  label-for="estoque"
                  class="text-label"
                >
              <b-form-checkbox id="estoque"  v-model="empresa.estoque" > </b-form-checkbox>

              </b-form-group>
            </b-col>

            <b-col sm="12" lg="3">
                <b-form-group
                  label="Fornecedor :"
                  label-for="fornecedor"
                  class="text-label"
                >
              <b-form-checkbox id="fornecedor"  v-model="empresa.fornecedor" > </b-form-checkbox>

              </b-form-group>
            </b-col>


            <b-col sm="12" lg="3">
                <b-form-group
                  label="Cliente :"
                  label-for="cliente"
                  class="text-label"
                >
              <b-form-checkbox id="cliente"  v-model="empresa.cliente" > </b-form-checkbox>

              </b-form-group>
            </b-col>

            </b-row>

          </b-form>

          <div slot="footer" class="center-xy">
            <b-button v-if="empresa.id" @click="alterar()" variant="primary">
              <i class="far fa-save"></i> Alterar
            </b-button>

            <b-button
              v-else
              @click="salvar()"
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
  name: 'EditarEmpresa',
  data () {
    return {
      valid: false,
      error: Object
    }
  },
  computed: {
    empresa: {
      get () {
        return this.$store.getters.getEmpresa
      },
      set (e) {
        this.$store.commit('setEmpresa', e)
      }
    }
  },
  methods: {
    salvar () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Api.salvarEmpresa(this.empresa)
            .then(() => {
              events.$emit('EmpresaAlterada', this.empresa)
              this.clear()
              this.$store.commit('setMessages', { message: 'Sucesso ao cadastrar empresa', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    alterar () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Api.alterarAluno(this.empresa)
            .then(() => {
              events.$emit('EmpresaAlterada', this.empresa)
              this.clear()
              this.$store.dispatch('novaEmpresa')
              this.$store.commit('setMessages', { message: 'Sucesso ao alterar empresa', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    clear () {
      this.$validator.reset()
      this.$store.dispatch('novaEmpresa')
      this.$store.dispatch('limparMensagens')
    }
  }
}
</script>

<style>
</style>
