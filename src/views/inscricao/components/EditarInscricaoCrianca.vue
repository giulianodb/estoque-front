<template>
  <div class="fluid">
    <h1 class="app-title">Editar Inscrição</h1>

    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b-badge variant="mute" class="float-right small"
              >(*) Obrigatório</b-badge
            >
          </div>

          <b-form>
            <!-- Nome Série -->
            <b-row>
              <b-col lg="3" sm="12">
                <b-form-group
                  label="Nome do crianca:"
                  label-for="nome"
                  class="text-label required"
                >
                  <b-form-input
                    id="nome"
                    readonly
                    v-model="crianca.nome"
                  ></b-form-input>
                  <span v-show="errors.has('nome')" class="help is-danger">{{
                    errors.first("nome")
                  }}</span>
                </b-form-group>
              </b-col>


           <b-col lg="3" sm="12">
                <b-form-group
                  label="Projeto:"
                  label-for="projeto"
                  class="text-label required"
                >

                <b-form-select
                    id="projeto"
                    :plain="true"
                    v-model="inscricao.projeto"
                    v-validate="'required|excluded:-1'"
                    data-vv-name="projeto"
                    data-vv-as="projeto"
                    :error-messages="errors.collect('projeto')"
                    :state="
                      errors.has('projeto') == false ? null : !errors.has('projeto')
                    "
                  >
                    <template slot="first">
                      <option value="-1">Selecione</option>
                    </template>
                    <option value="FOCAR"> FOCAR </option>
                    <option value="SCFV"> SCFV  </option>
                  </b-form-select>

                  <span v-show="errors.has('projeto')" class="help is-danger"> {{ errors.first("projeto") }}</span>
                </b-form-group>
              </b-col>

            <b-col sm="12" lg="3">
                <b-form-group
                  label="Lista de espera? :"
                  label-for="listaEspera"
                  class="text-label"
                >
              <b-form-checkbox id="listaEspera"  v-model="inscricao.listaEspera" > </b-form-checkbox>

              </b-form-group>
            </b-col>

            <b-col lg="3" sm="12">
                <b-form-group
                  label="Ano:"
                  label-for="ano"
                  class="text-label required"
                >
                  <b-form-input
                    id="ano"
                    aria-readonly="true"
                    v-model="inscricao.ano"
                  ></b-form-input>
                  <span v-show="errors.has('ano')" class="help is-danger">{{
                    errors.first("ano")
                  }}</span>
                </b-form-group>
              </b-col>


              <b-col lg="3" sm="3">
                <b-form-group
                  label="Data de inscrição:"
                  label-for="dataInscricao"
                  class="text-label required"
                >
                  <b-form-input
                    type="date"
                    id="dataInscricao"
                    v-model="inscricao.dataInscricao"
                    v-validate="'required'"
                    data-vv-name="dataInscricao"
                    data-vv-as="Data de Inscrição"
                    :error-messages="errors.collect('dataInscricao')"
                    :state="
                      errors.has('dataInscricao') == false
                        ? null
                        : !errors.has('dataInscricao')
                    "
                    trim
                    :autofocus="true"
                  ></b-form-input>
                  <span v-show="errors.has('dataInscricao')" class="help is-danger">{{ errors.first("dataInscricao") }}</span>
                </b-form-group>
              </b-col>

            </b-row>
          </b-form>

          <div slot="footer" class="center-xy">
            <b-button
              v-if="inscricao.id"
              @click="alterarInscricao()"
              variant="primary"
            >
              <i class="far fa-save"></i> Alterar
            </b-button>

            <b-button
              v-else
              @click="salvarInscricao()"
              variant="primary"
              size="md"
              ><i class="far fa-save"></i> Salvar</b-button
            >

            &nbsp;

            <b-button outline @click="clear" size="md" variant="secondary"
              >Limpar</b-button
            >
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
  name: 'EditarInscricao',
  data () {
    return {
      valid: false,
      error: Object
    }
  },
  computed: {
    crianca: {
      get () {
        return this.$store.getters.getCrianca
      },
      set () {
        this.$store.commit('setCrianca', this.crianca)
      }
    },
    inscricao: {
      get () {
        return this.$store.getters.getInscricao
      },
      set () {
        this.$store.commit('setInscricao', this.inscricao)
      }
    }
  },
  methods: {
    salvarInscricao () {
      console.log(this.$store.getters.getCrianca)
      console.log(this.crianca)
      this.$validator.validateAll().then((result) => {
        if (result) {
          Api.salvarInscricao(this.inscricao, this.crianca.id)
            .then(() => {
              events.$emit('inscricaoCriancaAlterada', this.inscricao)
              window.scrollTo(0, 0);
              this.clear()
              this.$store.commit('setMessages', {
                message: 'Sucesso ao inscrever criança',
                variant: 'success'
              })
              //events.$emit('inscricaoCriancaEditada')
             
            })
            .catch((err) => {
              this.$store.commit('setMessages', err.response.data)
               window.scrollTo(0, 0);
            })
            
        }
      })
    },
    alterarInscricao () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Api.alterarInscricao(this.inscricao)
            .then(() => {
              events.$emit('inscricaoCriancaAlterada', this.inscricao)
              this.clear()
              this.$store.dispatch('novaInscricao')
              this.$store.commit('setMessages', {
                message: 'Sucesso ao alterar inscrição',
                variant: 'success'
              })
              events.$emit('inscricaoEditada')
               window.scrollTo(0, 0);
            })
            .catch((err) => {
              this.$store.commit('setMessages', err.response.data)
               window.scrollTo(0, 0);
            })
        }
      })
    },
    clear () {
      this.$validator.reset()
      this.inscricao = {}
      // this.$store.dispatch('novaCrianca')
      this.$store.dispatch('limparMensagens')
    }
  }
}
</script>

<style></style>
