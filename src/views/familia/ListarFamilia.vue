<template>
  <div>
    <div class="fluid">
      <b-row>
        <b-col md="12">
          <b-card>
            <div slot="header">
              <b>Pesquisar família</b>
            </div>

            <b-form>
              <!-- Nome Série -->
              <b-row>
                <b-col lg="6" sm="12">
                  <b-form-group
                    label="Nome representande família:"
                    label-for="nome"
                    class="text-label"
                  >
                    <b-form-input
                      id="nomeRepresentante"
                      v-model="familiaPesquisa.nomeRepresentante"
                      trim
                      :autofocus="true"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>

            <div slot="footer" class="center-xy">
              <b-button @click="listarFamilias()" variant="primary" size="md"
                ><i class="fas fa-search"></i> Pesquisar </b-button
              >

              &nbsp;

              <b-button outline @click="clear" size="md" variant="secondary"
                >Limpar</b-button
              >
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
          :items="familias"
          :fields="fields"
          :current-page="currentPage"
          :per-page="0"
          @sort-changed="sortingChanged"
          :busy="pesquisando"
        >
          <div slot="empty" colspan="2" align="center">
            Não existe conteúdo a ser exibido
          </div>
          <div slot="table-busy" class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong> Pesquisando...</strong>
          </div>
          <template v-slot:cell(acoes)="data">
            <div class="d-flex justify-content-end">
       
              <b-link
                title="Crianças"
                @click="listarCrianca(data.item)"
                class="btn btn-outline-info"
              >
                <i class="fas fa-shapes"></i> </b-link
              >&nbsp;

             <b-link
                title="Situações identificadas com a família"
                @click="listarSituacaoIdentificada(data.item)"
                class="btn btn-outline-info"
              >
                <i class="fas fa-tags"></i> </b-link
              >&nbsp;

             <b-link
                title="Plano de ação familiar"
                @click="listarPlanoFamiliar(data.item)"
                class="btn btn-outline-info"
              >
                <i class="fas fa-location-arrow"></i> </b-link
              >&nbsp;
       
              <b-link
                title="Alterar"
                @click="iniciarEditar(data.item)"
                class="btn btn-outline-info"
              >
                <i class="fas fa-pencil-alt"></i> </b-link
              >&nbsp;
              <b-link
                title="Excluir"
                @click="deletarFamilia(data.item)"
                class="btn btn-outline-danger"
              >
                <i class="fas fa-trash-alt"></i>
              </b-link>
            </div>
          </template>
        </b-table>

        <b-row v-if="familias.length > 0" class="my-1 center-xy">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            :length="currentPage"
            class="text-label"
            @input="changePage"
          >
          </b-pagination>
          <p class="VuePagination__count text-center col-md-12">
            Mostrando {{ currentPage * perPage - perPage + 1 }} a
            {{
              currentPage * perPage > totalRows
                ? totalRows
                : currentPage * perPage
            }}
            de {{ totalRows }} registros
          </p>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
import Api from '@/api/social'
import events from '@/util/events'

export default {
  name: 'ListarFamilia',
  data () {
    return {
      fields: [
        {
          label: 'Nome Responsável',
          key: 'nomeResponsavel',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          label: 'CPF responsável',
          key: 'cpfResponsavel',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          label: 'Celular',
          key: 'celular',
          sortable: true,
          sortDirection: 'desc'
        },
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
      pesquisando: false,
      familiaPesquisa: {}
    }
  },
  computed: {
    familias: {
      get () {
        return this.$store.getters.getFamilias
      },
      set () {
        this.$store.commit('setFamilias', this.familias)
      }
    }
  },
  created () {
    events.$on('familiaAlterada', () => {
      this.listarFamilias()
    })
  },
  mounted () {
    this.listarFamilias()
  },
  methods: {
    deletarFamilia (s) {
     var resultado = confirm("Deseja excluir o item ?");
        if (resultado == true) {
            Api.deletarFamilia(s)
              .then(() => {
                this.currentPage = 1
                this.perPage = 5
                this.listarFamilias()
                this.$store.commit('setMessages', {
                  message: 'Sucesso ao excluir família',
                  variant: 'success'
                })
              })
              .catch((err) => {
                this.$store.commit('setMessages', err.response.data)
              })
        }
    },
    iniciarEditar (familia) {
      this.inserirObjetosFamilia(familia)
      let obj = JSON.parse(JSON.stringify(familia))
      this.$store.commit('setFamilia', obj)
      console.log(obj)
      this.$router.push({ name: 'editarFamilia', params: { idFamilia: familia.id , tipo: "editar"} })

    },
    listarCrianca (familia) {
      this.$router.push({ name: 'criancaFamilia', params: { idFamilia: familia.id } })
    },
    listarPlanoFamiliar (familia){
      this.$router.push({ name: 'planoFamiliar', params: { idFamilia: familia.id} })
    },

   listarSituacaoIdentificada (familia){
      this.$router.push({ name: 'situacaoIdentificada', params: { idFamilia: familia.id } })
    },
    
    listarFamilias () {
      this.pesquisando = true
      Api.getFamilias(
        this.currentPage,
        this.perPage,
        null,
        null,
        this.familiaPesquisa
      )
        .then((res) => {
          this.$store.commit('setFamilias', res.data.content)
          this.totalRows = res.data.totalElements
        })
        .catch((err) => {
          this.$store.commit('setFamilias', [])
          this.$store.commit('setMessages', err.response.data)
        })
      this.pesquisando = false
    },
    changePage () {
      Api.getFamilias(
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc
      ).then((res) => {
        this.$store.commit('setFamilias', res.data.content)
        this.totalRows = res.data.totalElements
      })
    },
    sortingChanged (ctx) {
      this.sortBy = ctx.sortBy
      this.sortDesc = ctx.sortDesc
      Api.getFamilias(
        this.currentPage,
        this.perPage,
        this.sortBy,
        this.sortDesc
      ).then((res) => {
        this.$store.commit('setFamilias', res.data.content)
        this.totalRows = res.data.totalElements
      })
    },
    clear () {
      this.familiaPesquisa = {}
    },
    inserirObjetosFamilia(familia){
      if (familia.motivo == null) {
        familia.motivo = {}
      }
      if (familia.moradia == null) {
        familia.moradia = {tipoMoradia: "-1",materialMoradia: "-1", propriedadeMoradia: "-1",situacaoMoradia:"-1" }
      }
      if (familia.programas == null) {
        familia.programas = {}
      }

      if (familia.visitaDomiciliar == null) {
        familia.visitaDomiciliar = {}
      }
    }
  }
}
</script>

<style></style>
