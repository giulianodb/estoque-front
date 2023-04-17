<template>
    <b-card header="Configuracao" class="text-left">
      
      <b-form-group
          id="periodo"
          label="Período:"
          label-for="periodo"
        >
                    <b-form-select
                    id="periodo"
                    :plain="true"
                    v-model="fluxoCaixaPesquisa.periodo"
                    data-vv-name="periodo"
                    data-vv-as="periodo"
                    :error-messages="errors.collect('periodo')"
                    :state="
                      errors.has('periodo') == false ? null : !errors.has('periodo')
                    "
                  >
                    <option value="30"> 30 dias  </option>
                    <option value="60"> 60 dias </option>
                    <option value="0"> Personalizado </option>
                  </b-form-select>

        </b-form-group>
      
      
      <div>
        <b-button v-b-modal.modal-prevent-closing @click="resetTransacao()">Nova Movimentação</b-button>
        <b-modal
          id="modal-prevent-closing"
          ref="modal"
          title="Movimentação financeira"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              label="Descrição"
              label-for="descricao"
              invalid-feedback="Descrição necessário"
              :state="nameState"
            >
              <b-form-input
                id="name-input"
                v-model="transacao.descricao"
                :state="nameState"
                required
              ></b-form-input>
            </b-form-group>
            
            <b-form-group
              label="Valor"
              label-for="valor"
              invalid-feedback="Valor necessário"
            >
              <b-form-input
                id="valor-input"
                v-model="transacao.valor"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Data"
              label-for="data"
              invalid-feedback="Data necessária"
            >
              <b-form-input
                id="data-input"
                v-model="transacao.data"
                type="date"
                required
              ></b-form-input>
            </b-form-group>


            <b-form-group
              label="Conta"
              label-for="conta"
            >
            
            
            <b-form-select
                    id="conta"
                    :plain="true"
                    v-model="transacao.conta"
                    data-vv-name="conta"
                    data-vv-as="conta"
                    :error-messages="errors.collect('conta')"
                    :state="
                      errors.has('conta') == false ? null : !errors.has('conta')
                    "
                  >
                  <option v-for="cs in contas" :value="cs" :key="cs.id" :selected="selecionado(cs)"> {{cs.nomeConta}}  </option>

                  </b-form-select>

            </b-form-group>





          </form>
        </b-modal>
      </div>
    </b-card>
  
</template>

<script>
    
    
// import Lottie from 'vue-lottie'
import events from '@/util/events'
import Api from '@/api/social'
export default {
  name: 'Transacao',
  data () {
    return {
      name: '',
        nameState: null,
        submittedNames: [],
        contas:[]
    }
  },
  computed: {
    fluxoCaixaPesquisa: {
      get () {
        return this.$store.getters.getFluxoCaixaPesquisa
      },
      set (f) {
        this.$store.commit('setFluxoCaixaPesquisa', f)
      }
    },
    transacao: {
      get () {
        return this.$store.getters.getTransacao
      },
      set (valor) {
        this.$store.commit('setTransacao', valor)
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
        //this.transacao = {}

      },
      resetTransacao() {
        var objConta = this.$store.getters.getContaPesquisa
        var thisExterno = this
        
        for(let i=1; i<=thisExterno.contas.length; i++){
          if (thisExterno.contas[i].id == objConta.id) {
            thisExterno.transacao = {conta:thisExterno.contas[i]}
          }
        }
      },
      handleOk(bvModalEvent) {
        console.log("AQui?")
        //this.salvar();

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

        this.salvar();

        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },

      salvar(){
        Api.salvarTransacao(this.transacao)
            .then(res => {
              this.$store.commit('setMessages', {
                message: 'Sucesso ao salvar Movimentação financeira',
                variant: 'success'
              })
              events.$emit('pesquisarTransacao')
              events.$emit('pesquisarContasPorTipo')
          })
          .catch(err => {
            this.$store.commit('setMessages', err.response.data)
          })
      },

      montarContas(){
      

        Api.getTodasContas()
            .then(res => {
                this.contas = res.data
          })
          .catch(err => {
            this.$store.commit('setMessages', err.response.data)
          })
      
      },
      selecionado(obj){
        var conta = this.$store.getters.getContaPesquisa
        if (conta.id == obj.id){
          return true;
        }
      }
    },
    created(){

      events.$on('editarTransacao', (t) => {
        this.$bvModal.show('modal-prevent-closing')
      }) 

      this.fluxoCaixaPesquisa = {periodo:"30"}
      //this.montarContas();
      //this.$store.commit('setFluxoCaixaPesquisa',{periodo:"30"})
    },
    mounted(){
      this.montarContas();
    }
}
</script>

<style>

</style>