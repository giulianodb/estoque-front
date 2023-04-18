<template>
    <b-card header="Período e Nova Movimentação" class="text-left">
      
      <b-row>
        <b-col lg="2">

            <b-form-group
                id="periodo"
                label="Período:"
                label-for="periodo"
              >
                  <b-form-select
                          @change="atualizarTransacacoes()"
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
                          <option value=30 :selected="true"> 30 dias  </option>
                          <option value=60> 60 dias </option>
                          <option value=0> Personalizado </option>
                        </b-form-select>

              </b-form-group>
            </b-col>

            <b-col lg="2" v-if="fluxoCaixaPesquisa.periodo == 0">
                <b-form-group
                label="Data Inicial"
                label-for="dataInicio"
              >
                <b-form-input
                  @change="atualizarTransacacoes()"
                  id="dataInicio-input"
                  v-model="fluxoCaixaPesquisa.dataInicial"
                  type="date"
                ></b-form-input>
              </b-form-group>
          </b-col>

          <b-col lg="2" v-if="fluxoCaixaPesquisa.periodo == 0">
                <b-form-group
                label="Data Final"
                label-for="dataFinal"
              >
                <b-form-input
                  @change="atualizarTransacacoes()"
                  id="dataFinal-input"
                  v-model="fluxoCaixaPesquisa.dataFinal"
                  type="date"
                ></b-form-input>
              </b-form-group>
          </b-col>


          </b-row>
      
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
                type="number"
                step="0.01" 
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
import formatar from '@/mixins/formatarMixins'
export default {
  name: 'Transacao',
  mixins: [formatar],
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
        this.transacao.valor = "0,00"
        this.transacao.id = null
        this.transacao.descricao = ""
        this.transacao.data = null

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
      atualizarTransacacoes(){
        events.$emit('pesquisarTransacao')
        events.$emit('pesquisarContasPorTipo')

      },
      salvar(){
        this.transacao.valor = this.formatarMoedaToServer(this.transacao.valor) 
        
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
      this.transacao.valor = "0,00"
      const date= new Date()
      const dateFin= new Date()
      //this.fluxoCaixaPesquisa = {dataInicial:new Date(date.setMonth(date.getMonth() - 1).toISOString().substr(0, 10) ),dataFinal:date.toISOString().substr(0, 10)}
      const dateIni = new Date(date.setMonth(date.getMonth() - 1))

      this.fluxoCaixaPesquisa = {dataInicial:dateIni.toISOString().substr(0, 10),dataFinal:dateFin.toISOString().substr(0, 10),periodo:30}
    }
}
</script>

<style>

</style>