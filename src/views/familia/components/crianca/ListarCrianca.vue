<template>
  <div class="fluid">
    <h2 class="app-title">Crianças da família de {{this.familia.nomeResponsavel}}</h2>
      <b-card>

        <b-table
          show-empty
          stacked="sm"
          hover="hover"
          striped="striped"
          fixed
          :items="criancas"
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
         <template v-slot:cell(matriculado)="ma">
          <span v-if="ma.item.matriculado">Sim</span>
          <span v-else>Não</span>
         </template>
         <template v-slot:cell(acoes)="data">
           <div class="d-flex justify-content-end">
            <b-link title="Assistencial" @click="iniciarEditarAssistencial(data.item)" class="btn btn-outline-info">
              <i class="fas fa-hand-holding-heart"></i>
            </b-link>&nbsp;
            <b-link title="Alterar" @click="iniciarEditar(data.item)" class="btn btn-outline-info">
            <i class="fas fa-pencil-alt"></i>
            </b-link>&nbsp;
            <b-link title="Excluir" @click="deletarCrianca(data.item)" class="btn btn-outline-danger">
              <i class="fas fa-trash-alt"></i>
            </b-link>
            </div>
          </template>
        </b-table>

        <b-row v-if="criancas.length > 0" class="my-1 center-xy">
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
import Api from '@/api/pedagogico'
import events from '@/util/events'

export default {
  name: 'ListarCrianca',
  data () {
    return {
      fields: [
        { label: 'Nome', key: 'nome', sortable: false, sortDirection: 'desc' },
        { label: 'Projeto', key: 'projeto', sortable: false, sortDirection: 'desc' },
        { label: 'Responsável', key: 'familia.nomeResponsavel', sortable: false, sortDirection: 'desc' },
        { label: 'Matriculado', key: 'matriculado', sortable: false, sortDirection: 'desc' },
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
    criancas: {
      get () {
        console.log(this.$store.getters.getCriancas)
        return this.$store.getters.getCriancas
      },
      set () {
        this.$store.commit('setCriancas', this.criancas)
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
  created () {
    // events.$on('criancaAlterada', () => {
    //   this.listarCriancas()
    // })
  },
  mounted () {
    // this.listarCriancas()
  },
  methods: {
    deletarCrianca (s) {
      Api.deletarCrianca(s)
        .then(() => {
          this.currentPage = 1
          this.perPage = 5
          this.listarCriancas()
          this.$store.commit('setMessages', {
            message: 'Sucesso ao excluir crianca',
            variant: 'success'
          })
        })
        .catch(err => {
          this.$store.commit('setMessages', err.response.data)
        })
    },
    iniciarEditar (crianca) {
      let obj = JSON.parse(JSON.stringify(crianca))
      this.$store.commit('setCrianca', obj)
    },
    iniciarEditarAssistencial (crianca) {
      
      this.$router.push(`/crianca/${crianca.id}/avaliacao_contexto`)
      
    },
    listarCriancas () {
      this.pesquisando = true
      Api.getCriancas(this.currentPage, this.perPage)
        .then(res => {
          this.$store.commit('setCriancas', res.data.content)
          console.log(res.data.content)
          this.totalRows = res.data.totalElements
        })
        .catch(err => {
          this.$store.commit('setCriancas', [])
          this.$store.commit('setMessages', err.response.data)
        })
      this.pesquisando = false
    },
    changePage () {
      Api.getCriancas(
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc
      ).then(res => {
        this.$store.commit('setCriancas', res.data.content)
        this.totalRows = res.data.totalElements
      })
    },
    sortingChanged (ctx) {
      this.sortBy = ctx.sortBy
      this.sortDesc = ctx.sortDesc
      Api.getCriancas(
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc
      ).then(res => {
        this.$store.commit('setCriancas', res.data.content)
        this.totalRows = res.data.totalElements
      })
    }
  }
}
</script>

<style>
</style>
