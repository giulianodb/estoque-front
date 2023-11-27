<template>
  <div class="fluid">
    <h1 class="app-title">Cadastrar Pessoa</h1>

    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b>Informações da pessoa</b>
            <b-badge variant="mute" class="float-right small">(*) Obrigatório</b-badge>
          </div>

          <b-form >
            <!-- Nome Série -->
            <b-row>
              <b-col lg="6" sm="12">
                <b-form-group
                  label="Nome da pessoa:"
                  label-for="nome"
                  class="text-label required"
                >
                  <b-form-input id="nome"
                  v-model="pessoa.nome"
                  v-validate="'required'"
                  data-vv-name="nome"
                  data-vv-as="Nome Pessoa"
                  :error-messages="errors.collect('nome')"
                  :state="errors.has('nome')==false?null:!errors.has('nome')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('nome')" class="help is-danger">{{ errors.first('nome') }}</span>

                </b-form-group>
              </b-col>


              <b-col lg="6" sm="12">
                <b-form-group
                  label="CPF:"
                  label-for="cpf"
                  class="text-label required"
                >
                  <b-form-input id="cpf"
                  v-model="pessoa.cpf"
                  v-validate="'required'"
                  data-vv-name="cpf"
                  data-vv-as="Cpf"
                  :error-messages="errors.collect('cpf')"
                  :state="errors.has('cpf')==false?null:!errors.has('cpf')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('cpf')" class="help is-danger">{{ errors.first('cpf') }}</span>

                </b-form-group>
              </b-col>

               
              <b-col lg="6" sm="12">
                <b-form-group
                  label="RG:"
                  label-for="rg"
                  class="text-label required"
                >
                  <b-form-input id="rg"
                  v-model="pessoa.rg"
                  v-validate="'required'"
                  data-vv-name="rg"
                  data-vv-as="RG"
                  :error-messages="errors.collect('rg')"
                  :state="errors.has('rg')==false?null:!errors.has('rg')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('rg')" class="help is-danger">{{ errors.first('rg') }}</span>

                </b-form-group>
              </b-col> 


              <b-col lg="6" sm="12">
                <b-form-group
                  label="Email:"
                  label-for="email"
                  class="text-label required"
                >
                  <b-form-input id="email"
                  v-model="pessoa.email"
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
                  v-model="pessoa.telefone"
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
              <b-form-checkbox id="estoque"  v-model="pessoa.estoque" > </b-form-checkbox>

              </b-form-group>
            </b-col>

            <b-col sm="12" lg="3">
                <b-form-group
                  label="Fornecedor :"
                  label-for="fornecedor"
                  class="text-label"
                >
              <b-form-checkbox id="fornecedor"  v-model="pessoa.fornecedor" > </b-form-checkbox>

              </b-form-group>
            </b-col>


            <b-col sm="12" lg="3">
                <b-form-group
                  label="Cliente :"
                  label-for="cliente"
                  class="text-label"
                >
              <b-form-checkbox id="cliente"  v-model="pessoa.cliente" > </b-form-checkbox>

              </b-form-group>
            </b-col>

            </b-row>

          </b-form>

          <div slot="footer" class="center-xy">
            <b-button v-if="pessoa.id" @click="alterar()" variant="primary">
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
  name: 'EditarPessoa',
  data () {
    return {
      valid: false,
      error: Object
    }
  },
  computed: {
    pessoa: {
      get () {
        return this.$store.getters.getPessoa
      },
      set (e) {
        this.$store.commit('setPessoa', e)
      }
    }
  },
  methods: {
    salvar () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Api.salvarPessoa(this.pessoa)
            .then(() => {
              events.$emit('PessoaAlterada', this.pessoa)
              this.clear()
              this.$store.commit('setMessages', { message: 'Sucesso ao cadastrar pessoa', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    alterar () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Api.alterarAluno(this.pessoa)
            .then(() => {
              events.$emit('PessoaAlterada', this.pessoa)
              this.clear()
              this.$store.dispatch('novaPessoa')
              this.$store.commit('setMessages', { message: 'Sucesso ao alterar pessoa', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    clear () {
      this.$validator.reset()
      this.$store.dispatch('novaPessoa')
      this.$store.dispatch('limparMensagens')
    }
  }
}
</script>

<style>
</style>
