<template>
  <div class="fluid">
    <h2 v-if = "familia.nomeResponsavel != null && porFamilia" class="app-title">Crianças da família de {{this.familia.nomeResponsavel}}</h2>
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
         <template v-slot:cell(acoes)="data">
           <div class="d-flex justify-content-end">
            <b-link title="Inscrição" @click="iniciarInscricao(data.item)" class="btn btn-outline-info">
              <i class="fas fa-folder-open"></i>
            </b-link>&nbsp;
              <b-link title="Atendimento" @click="iniciarAtendimento(data.item)" class="btn btn-outline-info">
              <i class="fas fa-heart"></i>
            </b-link>&nbsp;
            <b-link title="Avaliação de contexto" @click="iniciarEditarAvaliacaoContexto(data.item)" class="btn btn-outline-info">
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
import Api from '@/api/social'
import events from '@/util/events'

export default {
  name: 'ListarCrianca',
  props: ['porFamilia'],
  data () {
    return {
      fields: [
        { label: 'Nome', key: 'nome', sortable: false, sortDirection: 'desc' },
        { label: 'Projeto', key: 'projeto', sortable: false, sortDirection: 'desc' },
        { label: 'Responsável', key: 'familia.nomeResponsavel', sortable: false, sortDirection: 'desc' },
        { label: 'Total Afirmação', key: 'totalAfirmacao', sortable: false, sortDirection: 'desc' },
        { label: 'Total Situação', key: 'totalSituacao', sortable: false, sortDirection: 'desc' },
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
        return this.$store.getters.getCriancas
      },
      set (obj) {
        this.$store.commit('setCriancas', obj)
      }
    },
    familia: {
      get () {
        return this.$store.getters.getFamilia
      },
      set (obj) {
        this.$store.commit('setFamilia', obj)
      }
    },
    criancaStore: {
      get () {
        return this.$store.getters.getCrianca
      },
      set (obj) {
        this.$store.commit('setCrianca', obj)
      }
    },
  },
  created () {
    console.log("Criando componente Listar Criança ")
    console.log(this.porFamilia)

    events.$on('pesquisarCrianca', () => {
      console.log("Evento para pesquisar crianca iniciado..")
      this.listarCriancas()
      console.log("apos listar criancas")
    })

    events.$on('criancaAlterada', () => {
      console.log("porFamilia?: " + this.porFamilia)
      console.log("Evento acionado")
      this.listarCriancas()
    })

    events.$on('criancaEditada', () => {
      console.log("porFamilia?: " + this.porFamilia)
      console.log("Evento acionado de novoa Crianca")
      this.listarCriancas()
    })

    
    if (this.criancaStore !== null || this.criancaStore !== undefined){
      console.log("Chamou essa coisa louca aqui")
      this.listarCriancas()
    }
    
  },
  mounted () {
    // this.listarCriancas()
  },
  beforeDestroy() {
    // removing eventBus listener
    events.$off('pesquisarCrianca')
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
    iniciarInscricao (crianca) {
      // let obj = JSON.parse(JSON.stringify(crianca))
      // this.$store.commit('setCrianca', obj)
      // console.log(obj)
      //  events.$emit('iniciarEditarCrianca')

       this.$router.push(`/crianca/${crianca.id}/inscricao`)

    },
    iniciarEditar (crianca) {
      let obj = JSON.parse(JSON.stringify(crianca))
      this.$store.commit('setCrianca', obj)
      console.log(obj)
       events.$emit('iniciarEditarCrianca')
    },
    iniciarEditarAvaliacaoContexto (crianca) {
      
      this.$router.push(`/crianca/${crianca.id}/avaliacao_contexto`)
      
    },
    iniciarAtendimento (crianca) {
      
      this.$router.push(`/crianca/${crianca.id}/atendimento`)
      
    },
    listarCriancas () {
      console.log("Chamei listar crianças")
      this.$store.commit('setBusy', true)
      this.pesquisando = true
       // console.log("testeee")
        if (!this.porFamilia) {
          let nome = this.$store.getters.getCriancaPesquisa.nome
          let projeto = this.$store.getters.getCriancaPesquisa.projeto
          let matriculado = this.$store.getters.getCriancaPesquisa.matriculado
          let espera =  this.$store.getters.getCriancaPesquisa.espera
          //page, perPage, sortBy, sortDesc, nome

          let idCrianca = 0
          
          if (this.criancaStore !== null || this.criancaStore !== undefined){
            if (this.criancaStore.id !== null || this.criancaStore.id !== undefined){
              idCrianca = this.criancaStore.id
            } 
            
          }

          console.log("idCri: " + idCrianca)


          Api.getCriancas(this.currentPage, this.perPage, 'nome', this.sortDesc, nome,
            projeto,
            matriculado,
            espera, idCrianca)
            .then(res => {
              //this.$store.commit('setCriancas', res.data.content)
              this.$store.commit('setCriancas', res.data.content)
              console.log(res.data.content)
              console.log("111111")
              this.totalRows = res.data.totalElements
              this.$store.commit('setBusy', false)
            })
            .catch(err => {
              this.$store.commit('setCriancas', [])
              this.$store.commit('setMessages', err.response.data)
              this.$store.commit('setBusy', false)
            })
        } else {
             Api.getCriancasPorFamilia(
            this.currentPage,
            this.perPage,
            this.sortBy,
            this.sortDesc,
            this.familia.id
          ).then(res => {
            this.$store.commit('setCriancas', res.data.content)
            this.totalRows = res.data.totalElements
            this.$store.commit('setBusy', false)
          })
      }

      this.pesquisando = false
    },
    changePage () {

      if (!this.porFamilia) {
          let nome = this.$store.getters.getCriancaPesquisa.nome
          let projeto = this.$store.getters.getCriancaPesquisa.projeto
          let matriculado = this.$store.getters.getCriancaPesquisa.matriculado
          let espera =  this.$store.getters.getCriancaPesquisa.espera
          Api.getCriancas(
            this.currentPage,
            this.perPage,
            this.sortBy,
            this.sortDesc,
            nome,
            projeto,
            matriculado,
            espera
          ).then(res => {
            this.$store.commit('setCriancas', res.data.content)
            this.totalRows = res.data.totalElements
          })
      } else {
             Api.getCriancasPorFamilia(
            this.currentPage,
            this.perPage,
            this.sortBy,
            this.sortDesc,
            this.familia.id
          ).then(res => {
            this.$store.commit('setCriancas', res.data.content)
            this.totalRows = res.data.totalElements
          })
      }


    },
    sortingChanged (ctx) {
      this.sortBy = ctx.sortBy
      this.sortDesc = ctx.sortDesc
      
      if (!this.porFamilia) {
          let nome = this.$store.getters.getCriancaPesquisa.nome
          let projeto = this.$store.getters.getCriancaPesquisa.projeto
          let matriculado = this.$store.getters.getCriancaPesquisa.matriculado
          let espera =  this.$store.getters.getCriancaPesquisa.espera
           
           
          Api.getCriancas(
            this.currentPage,
            this.perPage,
            this.sortBy,
            this.sortDesc,
            nome,
            projeto,
            matriculado,
            espera
          ).then(res => {
            this.$store.commit('setCriancas', res.data.content)
            this.totalRows = res.data.totalElements
          })
    } else {
            Api.getCriancasPorFamilia(
            this.currentPage,
            this.perPage,
            this.sortBy,
            this.sortDesc,
            this.familia.id
          ).then(res => {
            this.$store.commit('setCriancas', res.data.content)
            this.totalRows = res.data.totalElements
          })
    } }
  }
}
</script>

<style>
</style>
