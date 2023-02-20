<template>
  <div class="fluid">
    <h2 v-if = "crianca.nome != null" class="app-title">Inscrições -  {{this.crianca.nome}}</h2>
      <b-card>

        <b-table
          show-empty
          stacked="sm"
          hover="hover"
          striped="striped"
          fixed
          :items="inscricoes"
          :fields="fields"
          :current-page="currentPage"
          :per-page="0"
          :busy="pesquisando"
        >
          <div slot="empty" colspan="2" align="center">Não existe conteúdo a ser exibido</div>
          <div slot="table-busy" class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Pesquisando...</strong>
        </div>
         <template v-slot:cell(listaEspera)="ma">
          <span v-if="ma.item.listaEspera">Sim</span>
          <span v-else>Não</span>
         </template>
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

        <b-row v-if="inscricoes.length > 0" class="my-1 center-xy">
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
  name: 'ListarInscricaoCrianca',
  props: ['porCrianca'],
  data () {
    return {
      fields: [
        { label: 'Projeto', key: 'projeto', sortable: false, sortDirection: 'desc' },
        { label: 'Turno',  key: 'periodo', sortable: false, sortDirection: 'desc' },
        { label: 'Ano',  key: 'ano', sortable: false, sortDirection: 'desc' },
        { label: 'Lista de espera', key: 'listaEspera', sortable: false, sortDirection: 'desc' },
        { label: 'Data Inscrição', key: 'dataInscricao', sortable: false, sortDirection: 'desc' },
        { label: 'Desligamento', key: 'dataDesligamento', sortable: false, sortDirection: 'desc' },
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
    inscricoes: {
      get () {
        console.log(this.$store.getters.getListaInscricao)
        return this.$store.getters.getListaInscricao
      },
      set (listaIn) {
        this.$store.commit('setListaInscricao', listaIn)
      }
    },
    crianca: {
      get () {
        return this.$store.getters.getCrianca
      },
      set () {
        this.$store.commit('setCrianca', this.crianca)
      }
    }
  },
  created () {
    events.$on('pesquisarInscricao', () => {
      this.listarInscricao()
    })

    events.$on('inscricaoCriancaAlterada', () => {
      console.log("Evento acionado de inscricaoCriancaAlterada")
      this.listarInscricao()
    })
    
  },
  mounted () {
    // this.listarCriancas()
  },
  methods: {
    deletar (s) {
      var resultado = confirm("Deseja excluir o item ?");
        if (resultado == true) {

            Api.deletarInscricao(s)
              .then(() => {
                this.currentPage = 1
                this.perPage = 5
                this.listarInscricao()
                this.$store.commit('setMessages', {
                  message: 'Sucesso ao excluir inscrição',
                  variant: 'success'
                })
              })
              .catch(err => {
                this.$store.commit('setMessages', err.response.data)
              })
            }

    },
   
    iniciarEditar (inscricao) {
      let obj = JSON.parse(JSON.stringify(inscricao))
      this.$store.commit('setInscricao', obj)
      console.log(obj)
       events.$emit('iniciarEditarInscricaoCrianca')
    },

    listarInscricao () {
      this.pesquisando = true
        console.log("testeee")
        // if (!this.porFamilia) {
          
          
          //page, perPage, sortBy, sortDesc, nome
          Api.getInscricaoPorCrianca (this.currentPage, this.perPage, 'ano', this.sortDesc, this.crianca.id)
            .then(res => {
              //this.$store.commit('setCriancas', res.data.content)

              let lista = JSON.parse(JSON.stringify(res.data.content))

              this.inscricoes = lista
              console.log(res.data.content)
              this.totalRows = res.data.totalElements
            })
            .catch(err => {
              this.$store.commit('setListaInscricao', [])
              this.$store.commit('setMessages', err.response.data)
            })
        // }    
      this.pesquisando = false
    },
    changePage () {

      // if (!this.porFamilia) {
      //     let nome = this.$store.getters.getCriancaPesquisa.nome
      //     let projeto = this.$store.getters.getCriancaPesquisa.projeto
      //     let matriculado = this.$store.getters.getCriancaPesquisa.matriculado
      //     let espera =  this.$store.getters.getCriancaPesquisa.espera
      //     Api.getCriancas(
      //       this.currentPage,
      //       this.perPage,
      //       this.sortBy,
      //       this.sortDesc,
      //       nome,
      //       projeto,
      //       matriculado,
      //       espera
      //     ).then(res => {
      //       this.$store.commit('setCriancas', res.data.content)
      //       this.totalRows = res.data.totalElements
      //     })
      // } else {

             Api.getInscricaoPorCrianca(
            this.currentPage,
            this.perPage,
            this.sortBy,
            this.sortDesc,
            this.crianca.id
          ).then(res => {
            this.inscricoes =res.data.content
            this.totalRows = res.data.totalElements
          })

      // }

    },

  }
}
</script>

<style>
</style>
