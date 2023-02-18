<template>
  <div class="fluid">
    <h1 class="app-title">Editar Criança</h1>

    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b>Informações da criança</b>
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
                    v-model="crianca.nome"
                    v-validate="'required|min:5'"
                    data-vv-name="nome"
                    data-vv-as="Nome Crianca"
                    :error-messages="errors.collect('nome')"
                    :state="
                      errors.has('nome') == false ? null : !errors.has('nome')
                    "
                    trim
                    :autofocus="true"
                  ></b-form-input>
                  <span v-show="errors.has('nome')" class="help is-danger">{{
                    errors.first("nome")
                  }}</span>
                </b-form-group>
              </b-col>

              <b-col lg="3" sm="12">
                <b-form-group
                  label="Data de nascimento:"
                  label-for="dataNascimento"
                  class="text-label required"
                >
                  <b-form-input
                    type="date"
                    id="dataNascimento"
                    v-model="crianca.dataNascimento"
                    v-validate="'required'"
                    data-vv-name="dataNascimento"
                    data-vv-as="Data de Nascimento"
                    :error-messages="errors.collect('dataNascimento')"
                    :state="
                      errors.has('dataNascimento') == false
                        ? null
                        : !errors.has('dataNascimento')
                    "
                    trim
                    :autofocus="true"
                  ></b-form-input>
                  <span v-show="errors.has('dataNascimento')" class="help is-danger" >{{ errors.first("dataNascimento") }}</span >
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
                    v-model="crianca.projeto"
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
                    <option value="NFI"> NFI  </option>
                  </b-form-select>

                  <span v-show="errors.has('projeto')" class="help is-danger"> {{ errors.first("projeto") }}</span>
                </b-form-group>
              </b-col>

            <b-col lg="3" sm="12">
                <b-form-group
                  label="Sexo:"
                  label-for="sexo"
                  class="text-label required"
                >

                <b-form-select
                    id="sexo"
                    :plain="true"
                    v-model="crianca.sexo"
                    v-validate="'required|excluded:-1'"
                    data-vv-name="sexo"
                    data-vv-as="sexo"
                    :error-messages="errors.collect('sexo')"
                    :state="
                      errors.has('sexo') == false ? null : !errors.has('sexo')
                    "
                  >
                    <template slot="first">
                      <option value="-1">Selecione</option>
                    </template>
                    <option :value="0"> Feminino </option>
                    <option :value="1"> Masculino  </option>
                  </b-form-select>

                  <span v-show="errors.has('sexo')" class="help is-danger"> {{ errors.first("sexo") }}</span>
                </b-form-group>
              </b-col>

              <b-col lg="3" sm="12">
                <b-form-group
                  label="Escola:"
                  label-for="escola"
                  class="text-label"
                >
                  <b-form-input
                    id="escola"
                    v-model="crianca.escola"
                    data-vv-name="escola"
                    data-vv-as="Escola "
                    :error-messages="errors.collect('escola')"
                    :state="errors.has('escola') == false ? null : !errors.has('escola')"
                    trim
                    :autofocus="true"
                  ></b-form-input>
                  <span v-show="errors.has('escola')" class="help is-danger">{{ errors.first("escola")}}</span>
                </b-form-group>
              </b-col>

              <b-col lg="3" sm="12">
                <b-form-group
                  label="Condução:"
                  label-for="conducao"
                  class="text-label"
                >
                  <b-form-input
                    id="conducao"
                    v-model="crianca.conducao"
                    data-vv-name="conducao"
                    data-vv-as="conducao"
                    :error-messages="errors.collect('conducao')"
                    :state="errors.has('conducao') == false ? null : !errors.has('conducao')"
                    trim
                    :autofocus="true"
                  ></b-form-input>
                  <span v-show="errors.has('conducao')" class="help is-danger">{{ errors.first("conducao")}}</span>
                </b-form-group>
              </b-col>

               <b-col lg="3" sm="12">
                <b-form-group
                  label="Telefone Condução:"
                  label-for="telefoneConducao"
                  class="text-label"
                >
                  <b-form-input
                    id="telefoneConducao"
                    v-model="crianca.telefoneConducao"
                    data-vv-name="telefoneConducao"
                    data-vv-as="telefoneConducao"
                    :error-messages="errors.collect('telefoneConducao')"
                    :state="errors.has('telefoneConducao') == false ? null : !errors.has('telefoneConducao')"
                    trim
                    :autofocus="true"
                  ></b-form-input>
                  <span v-show="errors.has('telefoneConducao')" class="help is-danger">{{ errors.first("telefoneConducao")}}</span>
                </b-form-group>
              </b-col>

              <b-col lg="3" sm="6">
                <b-form-group
                  label="Religião: "
                  label-for="religiao"
                  class="text-label"
                >
                  <b-form-input
                    id="religiao"
                    v-model="crianca.religiao"
                    data-vv-name="religiao"
                    data-vv-as="religiao"
                    :error-messages="errors.collect('religiao')"
                    :state="errors.has('religiao') == false ? null : !errors.has('religiao')"
                    trim
                    :autofocus="true"
                  ></b-form-input>
                  <span v-show="errors.has('religiao')" class="help is-danger">{{ errors.first("religiao")}}</span>
                </b-form-group>
              </b-col>

             <b-col sm="12" lg="12">
              <b-form-checkbox id="alergia"  v-model="crianca.alergia" > Possuí alergia? </b-form-checkbox>
            </b-col>

            

          <b-col lg="6" sm="2">
                <b-form-group
                  label="Qual?"
                  label-for="descricaoAlergia"
                  class="text-label"
                >
                  <b-form-input
                    id="descricaoAlergia"
                    v-model="crianca.descricaoAlergia"
                    data-vv-name="descricaoAlergia"
                    data-vv-as="descricaoAlergia"
                    :error-messages="errors.collect('descricaoAlergia')"
                    :state="errors.has('descricaoAlergia') == false ? null : !errors.has('descricaoAlergia')"
                    trim
                    :autofocus="true"
                  ></b-form-input>
                  <span v-show="errors.has('descricaoAlergia')" class="help is-danger">{{ errors.first("descricaoAlergia")}}</span>
                </b-form-group>
              </b-col>

        <b-col sm="12" lg="12">
              <b-form-checkbox id="medicamento"  v-model="crianca.medicamento" > Toma algum medicamento? </b-form-checkbox>
            </b-col>

          <b-col lg="6" sm="2">
                <b-form-group
                  label="Qual?"
                  label-for="descricaoMedicamento"
                  class="text-label"
                >
                  <b-form-input
                    id="descricaoAlergia"
                    v-model="crianca.descricaoMedicamento"
                    data-vv-name="descricaoMedicamento"
                    data-vv-as="descricaoMedicamento"
                    :error-messages="errors.collect('descricaoMedicamento')"
                    :state="errors.has('descricaoMedicamento') == false ? null : !errors.has('descricaoMedicamento')"
                    trim
                    :autofocus="true"
                  ></b-form-input>
                  <span v-show="errors.has('descricaoMedicamento')" class="help is-danger">{{ errors.first("descricaoMedicamento")}}</span>
                </b-form-group>
              </b-col>

            <b-col />


            </b-row>
          </b-form>

          <div slot="footer" class="center-xy">
            <b-button
              v-if="crianca.id"
              @click="alterarCrianca()"
              variant="primary"
            >
              <i class="far fa-save"></i> Alterar
            </b-button>

            <b-button
              v-else
              @click="salvarCrianca()"
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
  name: 'EditarCrianca',
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
    familia: {
      get () {
        return this.$store.getters.getFamilia
      },
      set () {
        this.$store.commit('setFamilia', this.familia)
      }
    }
  },
  methods: {
    salvarCrianca () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          console.log('FAMILIA:::')
          console.log(this.familia)
          console.log(this.familia.id)
          Api.salvarCrianca(this.crianca, this.familia.id)
            .then(() => {
              events.$emit('criancaAlterada', this.crianca)
              this.clear()
              this.$store.commit('setMessages', {
                message: 'Sucesso ao cadastrar criança',
                variant: 'success'
              })
              events.$emit('criancaEditada')
               window.scrollTo(0, 0);
            })
            .catch((err) => {
              this.$store.commit('setMessages', err.response.data)
               window.scrollTo(0, 0);
            })
            
        }
      })
    },
    alterarCrianca () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Api.alterarCrianca(this.crianca)
            .then(() => {
              events.$emit('criancaAlterada', this.crianca)
              this.clear()
              this.$store.dispatch('novaCrianca')
              this.$store.commit('setMessages', {
                message: 'Sucesso ao alterar criança',
                variant: 'success'
              })
              events.$emit('criancaEditada')
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
      this.$store.dispatch('novaCrianca')
      this.$store.dispatch('limparMensagens')
    }
  }
}
</script>

<style></style>
