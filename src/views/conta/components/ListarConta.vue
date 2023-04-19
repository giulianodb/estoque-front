<template>
  <div class="fluid">
      <b-card>

        <b-table
          show-empty
          stacked="sm"
          hover="hover"
          striped="striped"
          fixed
          :items="contas"
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
         <template v-slot:cell(acoes)="data">
           <div class="d-flex justify-content-end">
            <b-link title="Alterar" @click="iniciarEditar(data.item)" class="btn btn-outline-info">
            <i class="fas fa-pencil-alt"></i>
            </b-link>&nbsp;
            <b-link title="Excluir" @click="deletarConta(data.item)" class="btn btn-outline-danger">
              <i class="fas fa-trash-alt"></i>
            </b-link>
            </div>
          </template>
        </b-table>

        <b-row v-if="contas.length > 0" class="my-1 center-xy">
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
</template>

<script>
import Api from '@/api/social'
import events from '@/util/events'

export default {
  name: 'ListarConta',
  data () {
    return {
      fields: [
        { label: 'Nome', key: 'nomeConta', sortable: false, sortDirection: 'desc' },
        { label: 'Agência', key: 'agenciaConta', sortable: false, sortDirection: 'desc' },
        { label: 'Número', key: 'numeroConta', sortable: false, sortDirection: 'desc' },
        { label: 'Tipo Conta', key: 'tipoConta.descricao', sortable: false, sortDirection: 'desc' },
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
    contas: {
      get () {
        return this.$store.getters.getContas
      },
      set (valor) {
        this.$store.commit('setContas', valor)
      }
    }
  },


  created () {
    console.log("CREATED")
    events.$on('contaAlterada', () => {
      console.log("Chamei o evento de listar Contas aposta conta alterada")
      this.listarContas()
    })
  },
  mounted () {
    console.log("monted")
    this.listarContas()
  },
  methods: {
    deletarConta (s) {
      Api.deletarConta(s)
        .then(() => {
          this.currentPage = 1
          this.perPage = 5
          this.listarContas()
          this.$store.commit('setMessages', {
            message: 'Sucesso ao excluir conta',
            variant: 'success'
          })
        })
        .catch(err => {
          this.$store.commit('setMessages', err.response.data)
        })
    },
    iniciarEditar (conta) {
      let obj = JSON.parse(JSON.stringify(conta))
      this.$store.commit('setConta', obj)
    },
    listarContas () {
      this.pesquisando = true
      Api.getContas(this.currentPage, this.perPage)
        .then(res => {
          this.$store.commit('setContas', res.data)
          console.log(res.data)
          this.totalRows = res.data.totalElements
        })
        .catch(err => {
          this.$store.commit('setContas', [])
          this.$store.commit('setMessages', err.response.data)
        })
      this.pesquisando = false
    },
    changePage () {
      Api.getContas(
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc
      ).then(res => {
        this.$store.commit('setContas', res.data)
        this.totalRows = res.data.totalElements
      })
    },
    sortingChanged (ctx) {
      this.sortBy = ctx.sortBy
      this.sortDesc = ctx.sortDesc
      Api.getContas(
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc
      ).then(res => {
        this.$store.commit('setContas', res.data)
        this.totalRows = res.data.totalElements
      })
    }
  }
}
</script>

<style>
</style>
