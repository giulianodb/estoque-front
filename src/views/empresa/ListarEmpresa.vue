<template>
  <div>
      <div class="fluid">
    <h1 class="app-title">Pesquisar Empresas</h1>

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
                  <b-form-input id="nome"  v-model="empresaPesquisa.nome" :autofocus="true"/>
                </b-form-group>
              </b-col>
            </b-row>
          
          </b-form>

          <div slot="footer" class="center-xy">
            <b-button @click="pesquisarEmpresa()" variant="primary">
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
          :items="empresas"
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

          <template v-slot:cell(acoes)="data">
            <div class="d-flex justify-content-end">
              <b-link
                title="Alterar"
                @click="iniciarEditar(data.item)"
                class="btn btn-outline-info"
              >
                <i class="fas fa-pencil-alt"></i> </b-link
              >&nbsp;
              <b-link
                title="Excluir"
                @click="deletar(data.item)"
                class="btn btn-outline-danger"
              >
                <i class="fas fa-trash-alt"></i>
              </b-link>
            </div>


          </template>

        </b-table>

        <b-row v-if="empresas.length > 0" class="my-1 center-xy">
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
  name: 'ListarEmpresa',
  components: {},
  data() {
    return {
      empresaPesquisa: {nome:''},
      empresas: [],
      fields: [
        { label: 'Nome', key: 'nome', sortable: false, sortDirection: 'desc' },
        { label: 'Telefone', key: 'telefone', sortable: false, sortDirection: 'desc' },
        { label: 'Pessoa contato', key: 'nomeContato', sortable: false, sortDirection: 'desc' },
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
    this.pesquisarEmpresa()
  },
  methods: {
    clear() {
      this.empresaPesquisa = {nome:''}
      this.currentPage = 1
      this.$store.dispatch('limparMensagens')
    },

    handleSubmit(){
      this.pesquisarEmpresa()
    },

    pesquisarEmpresa() {
      this.pesquisando = true
      this.currentPage = 1
      let nome = this.empresaPesquisa.nome
      Api.getEmpresa(this.currentPage, this.perPage, this.sortBy,this.sortDesc, nome)
        .then(res => {
          this.empresas = res.data.content
          this.totalRows = res.data.totalElements
        })
        .catch(err => {
          this.empresas = []
          this.$store.commit('setMessages', err.response.data)
        })

      this.pesquisando = false
    },
    changePage() {

      let nome = this.empresaPesquisa.nome

      Api.getEmpresa(
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc,
        nome,
      ).then(res => {
        this.empresas = res.data.content
        this.totalRows = res.data.totalElements
      })
    },
    sortingChanged(ctx) {
      this.sortBy = ctx.sortBy
      this.sortDesc = ctx.sortDesc

      let nome = this.empresaPesquisa.nome

      Api.getInscricao(
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc,
        nome,
      ).then(res => {
        this.empresas = res.data.content
        this.totalRows = res.data.totalElements
      })
    },
    deletar (s) {
     var resultado = confirm("Deseja excluir o item ?");
        if (resultado == true) {
            Api.deletarEmpresa(s)
              .then(() => {
                this.currentPage = 1
                this.perPage = 15
                this.pesquisarEmpresa()
                this.$store.commit('setMessages', {
                  message: 'Sucesso ao excluir empresa',
                  variant: 'success'
                })
              })
              .catch((err) => {
                this.$store.commit('setMessages', err)
              })
        }
    },
    iniciarEditar (empresa) {
      let obj = JSON.parse(JSON.stringify(empresa))
      this.$store.commit('setEmpresa', obj)
      this.$router.push({ name: 'editarEmpresa', params: { idEmpresa: empresa.id , tipo: "editar"} })

    },



  }
}
</script>

<style></style>
