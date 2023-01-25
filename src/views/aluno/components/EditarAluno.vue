<template>
  <div class="fluid">
    <h1 class="app-title">Cadastrar Aluno</h1>

    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b>Informações do aluno</b>
            <b-badge variant="mute" class="float-right small">(*) Obrigatório</b-badge>
          </div>

          <b-form >
            <!-- Nome Série -->
            <b-row>
              <b-col lg="6" sm="12">
                <b-form-group
                  label="Nome do aluno:"
                  label-for="nome"
                  class="text-label required"
                >

                  <b-form-input id="nome"
                  v-model="Aluno.nome"
                  v-validate="'required|min:8'"
                  data-vv-name="nome"
                  data-vv-as="Nome Aluno"
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
            <b-button v-if="Aluno.idAluno" @click="alterarAluno()" variant="primary">
              <i class="far fa-save"></i> Alterar
            </b-button>

            <b-button
              v-else
              @click="salvarAluno()"
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
import Api from '@/api/pedagogico'
import events from '@/util/events'

export default {
  name: 'EditarAluno',
  data () {
    return {
      valid: false,
      error: Object
    }
  },
  computed: {
    Aluno: {
      get () {
        return this.$store.getters.getAluno
      },
      set () {
        this.$store.commit('setAluno', this.Aluno)
      }
    }
  },
  methods: {
    salvarAluno () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Api.salvarAluno(this.Aluno)
            .then(() => {
              events.$emit('AlunoAlterada', this.Aluno)
              this.clear()
              this.$store.commit('setMessages', { message: 'Sucesso ao cadastrar série', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    alterarAluno () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Api.alterarAluno(this.Aluno)
            .then(() => {
              events.$emit('AlunoAlterada', this.Aluno)
              this.clear()
              this.$store.dispatch('novaAluno')
              this.$store.commit('setMessages', { message: 'Sucesso ao alterar série', variant: 'success' })
            }).catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
      })
    },
    clear () {
      this.$validator.reset()
      this.$store.dispatch('novoAluno')
      this.$store.dispatch('limparMensagens')
    }
  }
}
</script>

<style>
</style>
