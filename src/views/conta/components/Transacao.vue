<template>
         <b-card :header="`Movimentações - ${contaPesquisa.nomeConta}`" class="text-center">
        <b-table
          show-empty
          stacked="sm"
          hover="hover"
          striped="striped"
          fixed
          :items="listTransacao"
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
        <template v-slot:cell(data)="data">{{formatarData(data.item.data)}}</template>
        <template v-slot:cell(valor)="data"> <span :style="definirStyleValor(data.item.valor)">{{formatarMoeda(data.item.valor)}}</span> </template>
        <template v-slot:cell(saldo)="data"> <span :style="definirStyleValor(data.item.saldo)">{{formatarMoeda(data.item.saldo)}}</span> </template>

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

        <b-row v-if="alunos.length > 0" class="my-1 center-xy">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              :length="currentPage"
              class="text-label"
            >  </b-pagination>
            <p
              class="VuePagination__count text-center col-md-12"
            >Mostrando {{currentPage * perPage - perPage +1}} a {{ (currentPage * perPage) > totalRows ? totalRows : currentPage * perPage}} de {{totalRows}} registros</p>
        </b-row>

      </b-card>
  
</template>

<script>
    
    
// import Lottie from 'vue-lottie'
import events from '@/util/events'
import Api from '@/api/social'
import formatar from '@/mixins/formatarMixins'
export default {
  name: 'Transacao',
  mixins: [formatar],
  data () {
    return {
      fields: [
        { label: 'Data', key: 'data', sortable: false, sortDirection: 'desc' },
        { label: 'Descrição', key: 'descricao', sortable: false, sortDirection: 'desc' },
        { label: 'Valor', key: 'valor', sortable: false, sortDirection: 'desc' },
        { label: 'Saldo', key: 'saldo', sortable: false, sortDirection: 'desc' },
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
      alunos:[{nome:"Nome",rua:"RUA"}],
      name: '',
        nameState: null,
        submittedNames: []
    }
  },
  computed: {
    listTransacao: {
      get () {
        return this.$store.getters.getListaTransacao
      },
      set (t) {
        this.$store.commit('setListaTransacao', t)
      }
    },
    contaPesquisa: {
      get () {
        return this.$store.getters.getContaPesquisa
      },
      set (c) {
        this.$store.commit('setContaPesquisa', c)
      }
    }
  },
  methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },
      deletar (s) {
        var resultado = confirm("Deseja excluir o item ?");
        if (resultado == true) {
            Api.deletarTransacao(s)
            .then(() => {
              events.$emit('pesquisarTransacao')
              events.$emit('pesquisarContasPorTipo')
              this.$store.commit('setMessages', {
                message: 'Sucesso ao excluir movimentação',
                variant: 'success'
              })
            })
            .catch(err => {
              this.$store.commit('setMessages', err.response.data)
            })
        }
    },
    iniciarEditar (obj) {
      //let obj = JSON.parse(JSON.stringify(aluno))
      this.$store.commit('setTransacao', obj)
      console.log("@@@")
      console.log(obj)
      console.log("@@@")
      events.$emit('editarTransacao', obj)
    },
    }
}
</script>

<style>

</style>