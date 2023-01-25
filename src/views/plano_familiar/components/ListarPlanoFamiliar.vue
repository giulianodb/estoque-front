<template>
  <div class="fluid">
      <b-card>

        <b-table
          show-empty
          stacked="sm"
          hover="hover"
          striped="striped"
          fixed
          :items="planos"
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
            <b-link title="Excluir" @click="deletar(data.item)" class="btn btn-outline-danger">
              <i class="fas fa-trash-alt"></i>
            </b-link>
            </div>
          </template>
        </b-table>

        <b-row v-if="planos.length > 0" class="my-1 center-xy">
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
  name: 'ListarPlanoFamiliar',
  mixins: [formatar],
  data () {
    return {
      fields: [
        { label: 'Nome', key: 'nome', sortable: true, sortDirection: 'desc' },
        { label: 'Vínculo', key: 'vinculo', sortable: true, sortDirection: 'desc' },
        { label: 'Meta', key: 'meta', sortable: true, sortDirection: 'desc' },
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
    planos: {
      get () {
        return this.$store.getters.getPlanos
      },
      set () {
        this.$store.commit('setPlanos', this.planos)
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
    
    events.$on('planoFamiliarAlterado', () => {
      this.listarPlanoFamiliar()
    })
  },
  beforeMount(){
    this.listarPlanoFamiliar()
  },
  methods: {
    deletar (s) {

       var resultado = confirm("Deseja excluir o item ?");
        if (resultado == true) {
              Api.deletarPlanoFamiliar(s)
                .then(() => {
                  this.currentPage = 1
                  this.perPage = 5
                  this.listarPlanoFamiliar()
                  this.$store.commit('setMessages', {
                    message: 'Sucesso ao excluir plano de ação familiar',
                    variant: 'success'
                  })
                })
                .catch(err => {
                  this.$store.commit('setMessages', err.response.data)
                })
        }
    },
    iniciarEditar (planoFamiliar) {
      let obj = JSON.parse(JSON.stringify(planoFamiliar))
      this.$store.commit('setPlanoFamiliar', obj)
    },
    listarPlanoFamiliar () {
      this.pesquisando = true
      Api.getPlanosFamiliar(this.familia.id, this.currentPage, this.perPage,null,null)
        .then(res => {
          this.$store.commit('setPlanos', res.data.content)
          this.totalRows = res.data.totalElements
        })
        .catch(err => {
          this.$store.commit('setPlanos', [])
          this.$store.commit('setMessages', err.response.data)
        })
      this.pesquisando = false
    },
    changePage () {
      Api.getPlanosFamiliar(
        this.crianca.id,
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc
      ).then(res => {
        this.$store.commit('setPlanos', res.data.content)
        this.totalRows = res.data.totalElements
      })
    },
    sortingChanged (ctx) {
      this.sortBy = ctx.sortBy
      this.sortDesc = ctx.sortDesc
      Api.getPlanosFamiliar(
        this.familia.id,
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc
      ).then(res => {
        this.$store.commit('setPlanos', res.data.content)
        this.totalRows = res.data.totalElements
      })
    }
  }
}
</script>

<style>
</style>
