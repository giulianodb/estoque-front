<template>
  <div>
      <div class="fluid">
    <h1 class="app-title">Pesquisar Pessoas</h1>

    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b>Informações para pesquisa</b>
          </div>

          <b-form @submit.prevent="handleSubmit">
            <!-- Nome Série -->
            <b-row>
              <b-col lg="3" sm="12">
                <b-form-group label="Nome:" label-for="nome" class="text-label">
                  <b-form-input id="nome"  v-model="pessoaPesquisa.nome" :autofocus="true"/>
                </b-form-group>
              </b-col>
            </b-row>
          
          </b-form>

          <div slot="footer" class="center-xy">
            <b-button @click="pesquisarPessoa()" variant="primary">
              <i class="fas fa-search"></i> Pesquisar
            </b-button>
            &nbsp;
            <b-button outline @click="clear" size="md" variant="secondary">Limpar</b-button>
          </div>

         </b-card>
      </b-col>
    </b-row>

  </div>
  <div class="fluid">
      <b-card>
        <b-table
          show-empty
          stacked="sm"
          hover="hover"
          striped="striped"
          fixed
          :items="pessoas"
          :fields="fields"
          :current-page="currentPage"
          :per-page="0"
          @sort-changed="sortingChanged"
          :busy="pesquisando"
        >
        <!-- <template v-slot:cell(estoque)="e">
          <span v-if="e.item.estoque">Sim</span>
          <span v-else>Não</span>
         </template>

         <template v-slot:cell(cliente)="c">
          <span v-if="c.item.cliente">Sim</span>
          <span v-else>Não</span>
         </template>

         <template v-slot:cell(fornecedor)="f">
          <span v-if="f.item.fornecedor">Sim</span>
          <span v-else>Não</span>
         </template> -->


          <div slot="empty" colspan="2" align="center">Não existe conteúdo a ser exibido</div>
          <div slot="table-busy" class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Pesquisando...</strong>
        </div>
        </b-table>

        <b-row v-if="pessoas.length > 0" class="my-1 center-xy">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              :length="currentPage"
              class="text-label"
              @input="changePage"
            >  </b-pagination>
            <p
              class="VuePagination__count text-center col-md-12"
            >Mostrando {{currentPage * perPage - perPage +1}} a {{ (currentPage * perPage) > totalRows ? totalRows : currentPage * perPage}} de {{totalRows}} registros</p>
        </b-row>

      </b-card>
  </div>


  </div>
</template>

<script>

import Api from '@/api/social'
import events from '@/util/events'

export default {
  name: 'ListarPessoa',
  components: {},
  data() {
    return {
      pessoaPesquisa: {nome:''},
      pessoas: [],
      fields: [
        { label: 'Nome', key: 'nome', sortable: false, sortDirection: 'desc' },
        { label: 'Telefone', key: 'telefone', sortable: false, sortDirection: 'desc' },
        // { label: 'Pessoa contato', key: 'nomeContato', sortable: false, sortDirection: 'desc' },
        // { label: 'Estoque', key: 'estoque', sortable: false, sortDirection: 'desc' },
        // { label: 'Cliente', key: 'cliente', sortable: false, sortDirection: 'desc' },
        // { label: 'Fornecedor', key: 'fornecedor', sortable: false, sortDirection: 'desc' },

        { key: 'acoes', label: 'Ações' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      pesquisando: false
    }
  },

  created() {
  },
  mounted() {

  },
  methods: {
    clear() {
      this.pessoaPesquisa = {nome:''}
      this.currentPage = 1
      this.$store.dispatch('limparMensagens')
    },

    handleSubmit(){
      this.pesquisarPessoa()
    },

    pesquisarPessoa() {
      this.pesquisando = true
      let nome = this.pessoaPesquisa.nome
      Api.getPessoa(this.currentPage, this.perPage, this.sortBy,this.sortDesc, nome)
        .then(res => {
          this.pessoas = res.data.content
          this.totalRows = res.data.totalElements
        })
        .catch(err => {
          this.pessoas = []
          this.$store.commit('setMessages', err.response.data)
        })

      this.pesquisando = false
    },
    changePage() {

      let nome = this.pessoaPesquisa.nome

      Api.getPessoa(
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc,
        nome,
      ).then(res => {
        this.pessoas = res.data.content
        this.totalRows = res.data.totalElements
      })
    },
    sortingChanged(ctx) {
      this.sortBy = ctx.sortBy
      this.sortDesc = ctx.sortDesc

      let nome = this.pessoaPesquisa.nome

      Api.getInscricao(
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc,
        nome,
      ).then(res => {
        this.pessoas = res.data.content
        this.totalRows = res.data.totalElements
      })
    },



  }
}
</script>

<style></style>
