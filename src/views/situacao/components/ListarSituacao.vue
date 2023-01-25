<template>
  <div class="fluid">
      <b-card>

        <b-table
          show-empty
          stacked="sm"
          hover="hover"
          striped="striped"
          fixed
          :items="listaSituacaoIdentificada"
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
        <template v-slot:cell(responsabilidadeTecnica)="data">{{simNao(data.item.responsabilidadeTecnica)}}</template>
         <template v-slot:cell(responsabilidadeFamilia)="data">{{simNao(data.item.responsabilidadeFamilia)}}</template>
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

        <b-row v-if="listaSituacaoIdentificada.length > 0" class="my-1 center-xy">
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
import formatar from '@/mixins/formatarMixins'

export default {
  name: 'ListarSituacaoIdentificada',
  mixins: [formatar],
  data () {
    return {
      fields: [
        { label: 'Ação', key: 'acao', sortable: true, sortDirection: 'desc' },
        { label: 'Responsabilidade técnica', key: 'responsabilidadeTecnica', sortable: true, sortDirection: 'desc' },
        { label: 'Responsabilidade família', key: 'responsabilidadeFamilia', sortable: true, sortDirection: 'desc' },
        { label: 'Resultados esperados', key: 'resultadosEsperados', sortable: true, sortDirection: 'desc' },
        { label: 'Resultados obtidos', key: 'resultadosObtidos', sortable: true, sortDirection: 'desc' },
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
    listaSituacaoIdentificada: {
      get () {
        return this.$store.getters.getListaSituacaoIdentificada
      },
      set () {
        this.$store.commit('setListaSituacaoIdentificada', this.listaSituacaoIdentificada)
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
    
    events.$on('situacaoIdentificadaAlterada', () => {
      this.listarSituacaoIdentificada()
    })
  },
  beforeMount(){
    this.listarSituacaoIdentificada()
  },
  methods: {
    deletar (s) {

       var resultado = confirm("Deseja excluir o item ?");
        if (resultado == true) {
              Api.deletarSituacaoIdentificada(s)
                .then(() => {
                  this.currentPage = 1
                  this.perPage = 5
                  this.listarSituacaoIdentificada()
                  this.$store.commit('setMessages', {
                    message: 'Sucesso ao excluir situação identificada na família',
                    variant: 'success'
                  })
                })
                .catch(err => {
                  this.$store.commit('setMessages', err.response.data)
                })
        }
    },
    iniciarEditar (situacao) {
      let obj = JSON.parse(JSON.stringify(situacao))
      this.$store.commit('setSituacaoIdentificada', obj)
    },
    listarSituacaoIdentificada() {
      this.pesquisando = true
      Api.getListaSituacaoIdentificada(this.familia.id, this.currentPage, this.perPage,null,null)
        .then(res => {
          this.$store.commit('setListaSituacaoIdentificada', res.data.content)
          this.totalRows = res.data.totalElements
        })
        .catch(err => {
          this.$store.commit('setListaSituacaoIdentificada', [])
          this.$store.commit('setMessages', err.response.data)
        })
      this.pesquisando = false
    },
    changePage () {
      Api.getListaSituacaoIdentificada(
        this.crianca.id,
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc
      ).then(res => {
        this.$store.commit('setListaSituacaoIdentificada', res.data.content)
        this.totalRows = res.data.totalElements
      })
    },
    sortingChanged (ctx) {
      this.sortBy = ctx.sortBy
      this.sortDesc = ctx.sortDesc
      Api.getListaSituacaoIdentificada(
        this.familia.id,
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc
      ).then(res => {
        this.$store.commit('setListaSituacaoIdentificada', res.data.content)
        this.totalRows = res.data.totalElements
      })
    }
  }
}
</script>

<style>
</style>
