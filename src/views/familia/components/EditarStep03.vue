<template>
  <div>
    <h4>Composição familiar</h4>

      <br>
      <br>

      <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b>Informações de membro familiar</b>
            <b-badge variant="mute" class="float-right small">(*) Obrigatório</b-badge>
          </div>

          <b-form >
            <b-row>
              <b-col lg="6" sm="12">
                <b-form-group
                  label="Nome:"
                  label-for="nome"
                  class="text-label required"
                >

                  <b-form-input id="nome"
                  v-model="listMembroFamilia.nome"
                  v-validate="'required|min:4'"
                  data-vv-name="nome"
                  data-vv-as="Nome"
                  :error-messages="errors.collect('nome')"
                  :state="errors.has('nome')==false?null:!errors.has('nome')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('nome')" class="help is-danger">{{ errors.first('nome') }}</span>

                </b-form-group>
              </b-col>

          <b-col lg="3" sm="12">
                <b-form-group
                  label="Data nascimento:"
                  label-for="dataDascimento"
                  class="text-label required"
                >

                  <b-form-input   type="date" id="dataNascimento"
                  v-model="listMembroFamilia.dataNascimento"
                  v-validate="'required'"
                  data-vv-name="dataNascimento"
                  data-vv-as="Data Nascimento"
                  :error-messages="errors.collect('dataNascimento')"
                  :state="errors.has('dataNascimento')==false?null:!errors.has('dataNascimento')"
                  trim
                  :autofocus="true"
                  maxlength="10"></b-form-input>
                  <span v-show="errors.has('dataNascimento')" class="help is-danger">{{ errors.first('dataNascimento') }}</span>

                </b-form-group>
              </b-col>

              <b-col lg="3" sm="12">
                <b-form-group
                  label="Parentesco:"
                  label-for="parentesco"
                  class="text-label required"
                >

                  <b-form-input id="parentesco"
                  v-model="listMembroFamilia.parentesco"
                  v-validate="'required'"
                  data-vv-name="parentesco"
                  data-vv-as="Parentesco"
                  :error-messages="errors.collect('parentesco')"
                  :state="errors.has('parentesco')==false?null:!errors.has('parentesco')"
                  trim
                  :autofocus="true"></b-form-input>
                  <span v-show="errors.has('parentesco')" class="help is-danger">{{ errors.first('parentesco') }}</span>

                </b-form-group>
              </b-col>

               <b-col lg="3" sm="12">
               <b-form-group
                  label="Escolaridade:"
                  label-for="escolaridade"
                  class="text-label required"
                >
                  <b-form-select
                    id="escolaridade"
                    :plain="true"
                    v-model="listMembroFamilia.escolaridade"
                    v-validate="'required|excluded:-1'"
                    data-vv-name="escolaridade"
                    data-vv-as="escolaridade"
                    :error-messages="errors.collect('escolaridade')"
                    :state="
                      errors.has('escolaridade') == false ? null : !errors.has('escolaridade')
                    "
                  >
                    <template slot="first">
                      <option value="-1">Escolaridade</option>
                    </template>
                    <option value="ENSINO_MEDIO_IMCOMPLETO"> Ensino médio imcompleto </option>
                    <option value="ENSINO_MEDIO_COMPLETO"> Ensino médio completo </option>
                    <option value="SUPERIOR_IMCOMPLETO"> Superior incompleto</option>
                    <option value="SUPERIOR_COMPLETO"> Superior completo </option>
                  </b-form-select>
                  <span v-show="errors.has('escolaridade')" class="help is-danger">{{
                    errors.first("escolaridade")
                  }}</span>
                </b-form-group>

              </b-col>

              <b-col lg="6" sm="12">
                <b-form-group
                  label="Ocupação:"
                  label-for="ocupacao"
                  class="text-label"
                >

                  <b-form-input id="ocupacao"
                  v-model="listMembroFamilia.ocupacao"
                  data-vv-name="ocupacao"
                  data-vv-as="Ocupacao"
                  :error-messages="errors.collect('ocupacao')"
                  :state="errors.has('ocupacao')==false?null:!errors.has('ocupacao')"
                  trim
                  ></b-form-input>
                  <span v-show="errors.has('ocupacao')" class="help is-danger">{{ errors.first('ocupacao') }}</span>

                </b-form-group>
              </b-col>

            <b-col lg="3" sm="12">
                <b-form-group
                  label="Renda:"
                  label-for="renda"
                  class="text-label"
                >

                  <b-form-input id="renda"
                  v-model="listMembroFamilia.renda"
                  data-vv-name="renda"
                  data-vv-as="Renda"
                  :error-messages="errors.collect('renda')"
                  :state="errors.has('renda')==false?null:!errors.has('renda')"
                  trim
                  ></b-form-input>
                  <span v-show="errors.has('renda')" class="help is-danger">{{ errors.first('renda') }}</span>

                </b-form-group>
              </b-col>

            </b-row>

          </b-form>

          <div slot="footer" class="center-xy">
            <b-button v-if="listMembroFamilia.alterar" @click="alterar()" variant="primary">
              <i class="far fa-save"></i> Alterar
            </b-button>

            <b-button
              v-else
              @click="adicionar()"
              variant="primary"
              size="md"
            ><i class="far fa-save"></i> Adicionar</b-button>

            &nbsp;

            <b-button outline @click="clear" size="md" variant="secondary">Limpar</b-button>
          </div>

         </b-card>
      </b-col>
    </b-row>

    <b-card>
        <b-table
          show-empty
          stacked="sm"
          hover="hover"
          striped
          fixed
          :items="familia.listMembroFamilia"
          :fields="fields"
          :current-page="currentPage"
          :per-page="0"
          @sort-changed="sortingChanged"
          :busy="pesquisando"
        >
          <div slot="empty" colspan="2" align="center">Não existe conteúdo a ser exibido</div>
             <div slot="table-busy" class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Pesquisando...</strong>
        </div>

          <template v-slot:cell(dataNascimento)="data">{{formatarData(data.item.dataNascimento)}}</template>
         <template v-slot:cell(acoes)="data">
           <div class="d-flex justify-content-end">
            <b-link title="Alterar" @click="iniciarEditar(data.item)" class="btn btn-outline-info">
            <i class="fas fa-pencil-alt"></i>
            </b-link>&nbsp;
            <b-link title="Excluir" @click="deletar(data.item)" class="btn btn-outline-danger">
              <i class="fas fa-trash-alt"></i>
            </b-link>
            </div>
          </template>
        </b-table>

      </b-card>

    <br><br>
  </div>
</template>

<script>

import formatar from '@/mixins/formatarMixins'

export default {
  props: {
    index: Number
  },
  mixins: [formatar],
  data () {
    return {
      listMembroFamilia: {},
      fields: [
        { label: 'Nome', key: 'nome', sortable: true, sortDirection: 'desc' },
        { label: 'Parentesco', key: 'parentesco', sortable: true, sortDirection: 'desc' },
        { label: 'Data nascimento', key: 'dataNascimento', sortable: true, sortDirection: 'desc' },
        { key: 'acoes', label: 'Ações' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      pesquisando: false
    }
  },
  computed: {
    familia: {
      get () {
        return this.$store.getters.getFamilia
      },
      set () {
        this.$store.commit('setFamilia', this.Familia)
      }
    }
  },
  methods: {
    onReset (evt) {
      evt.preventDefault()
      // Reset
      this.familia.cpf = ''
      this.familia.idade = 0
    },
    adicionar () {
      this.totalRows++
      this.familia.listMembroFamilia.push(this.listMembroFamilia)
      this.listMembroFamilia = {}
      this.$validator.reset()
    },
    iniciarEditar (objeto) {
      this.listMembroFamilia = objeto
      this.listMembroFamilia.alterar = true
      console.log(this.familia.listMembroFamilia)
    },
    alterar () {
      this.listMembroFamilia = {}
      this.$validator.reset()
    },
    clear () {
      this.listMembroFamilia = {}
    },
    deletar (objeto) {
      var resultado = confirm('Deseja excluir o item: ' + objeto.nome + ' ?')
      if (resultado) {
        this.familia.listMembroFamilia = this.arrayRemove(this.familia.listMembroFamilia, objeto)
      }
    },
    changePage () {
    },
    sortingChanged (ctx) {
    }
  }
}
</script>

<style>
</style>
