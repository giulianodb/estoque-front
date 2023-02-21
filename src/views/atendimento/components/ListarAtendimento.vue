<template>
  <div class="fluid">
      <b-card>

        <b-table
          show-empty
          stacked="sm"
          hover="hover"
          striped="striped"
          fixed
          :items="atendimentos"
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
          <template v-slot:cell(dataAtendimento)="data">{{formatarData(data.item.dataAtendimento)}}</template>
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

        <b-row v-if="atendimentos.length > 0" class="my-1 center-xy">
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
  name: 'ListarAtendimento',
  mixins: [formatar],
  data () {
    return {
      fields: [
        { label: 'Criança', key: 'crianca.nome', sortable: true, sortDirection: 'desc' },
        { label: 'Data atendimento', key: 'dataAtendimento', sortable: true, sortDirection: 'desc' },
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
    atendimentos: {
      get () {
        return this.$store.getters.getAtendimentos
      },
      set () {
        this.$store.commit('setAtendimentos', this.atendimentos)
      }
    },
    crianca: {
      get () {
        return this.$store.getters.getCrianca
      },
      set (crianca) {
        this.$store.commit('setCrianca', crianca)
      }
    }
  },
  created () {
    this.crianca = {id:this.$route.params.idCrianca}

    console.log(this.crianca)
    this.listarAtendimentos()
    events.$on('atendimentoAlterado', () => {
      this.listarAtendimentos()
    })
  },
  mounted () {
    
  },
  methods: {
    deletar (s) {

       var resultado = confirm("Deseja excluir o item ?");
        if (resultado == true) {
              Api.deletarAtendimento(s)
                .then(() => {
                  this.currentPage = 1
                  this.perPage = 5
                  this.listarAtendimentos()
                  this.$store.commit('setMessages', {
                    message: 'Sucesso ao excluir atendimento',
                    variant: 'success'
                  })
                })
                .catch(err => {
                  this.$store.commit('setMessages', err.response.data)
                })
        }
    },
    iniciarEditar (atendimento) {
      let obj = JSON.parse(JSON.stringify(atendimento))
      this.$store.commit('setAtendimento', obj)
    },
    listarAtendimentos () {
      this.pesquisando = true
      Api.getAtendimentos(this.crianca.id, this.currentPage, this.perPage,null,null)
        .then(res => {
          console.log("TESTE")
          console.log(res.data)
          this.$store.commit('setAtendimentos', res.data.content)
          console.log(res.data.content)
          this.totalRows = res.data.totalElements
        })
        .catch(err => {
          this.$store.commit('setAtendimentos', [])
          this.$store.commit('setMessages', err.response.data)
        })
      this.pesquisando = false
    },
    changePage () {
      Api.getAtendimetos(
        this.crianca.id,
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc
      ).then(res => {
        this.$store.commit('setAtendimentos', res.data.content)
        this.totalRows = res.data.totalElements
      })
    },
    sortingChanged (ctx) {
      this.sortBy = ctx.sortBy
      this.sortDesc = ctx.sortDesc
      Api.getAtendimentos(
        this.crianca.id,
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc
      ).then(res => {
        this.$store.commit('setAtendimentos', res.data.content)
        this.totalRows = res.data.totalElements
      })
    }
  }
}
</script>

<style>
</style>
