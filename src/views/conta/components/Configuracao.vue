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
        &nbsp; 
     
        <b-button @click="emitirRazao()">Emitir Razão</b-button> 
        
        <b-modal size="lg"
          id="modal-prevent-closing"
          ref="modal"
          title="Movimentação financeira"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-row>
                <b-col lg="12" sm="12">
                  <b-form-group
                    label="Descrição"
                    label-for="descricao"
                    invalid-feedback="Descrição necessário"
                  >
                    <b-form-input
                      id="name-input"
                      v-model="transacao.descricao"
                      :state="descricaoState"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>

                <b-col lg="6" sm="6">
                    <b-form-group
                      label="Valor"
                      label-for="valor-input"
                      invalid-feedback="Valor necessário"
                    >
                      <b-form-input
                        id="valor-input"
                        type="number"
                        step="0.01" 
                        v-model="transacao.valor"
                        required
                        :state="valorState"
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
                        :state="dataState"
                        required
                      ></b-form-input>
                    </b-form-group>
                </b-col>

                <b-col lg="6" sm="6">
                  <b-form-group
                    label="Tipo"
                    label-for="tipoTransacao"
                    invalid-feedback="Tipo"
                  >

                  <b-form-select
                          id="tipoTransacao"
                          v-model="transacao.tipoTransacaoEnum"
                          :onchange="montarGrupoCategoriaCombo()"
                        >
                          <option  value='RECEITA' > Receita  </option>
                          <option  value='PAGAMENTO' > Pagamento  </option>
                        </b-form-select>
                  </b-form-group>
                

                  <b-form-group
                    label="Conta"
                    label-for="conta"
                  >
                  
                  
                  <b-form-select
                          id="conta"
                          required
                          :plain="true"
                          v-model="transacao.conta"
                          data-vv-name="conta"
                          data-vv-as="conta"
                          :error-messages="errors.collect('conta')"
                          :state="contaState"
                        >
                        <option v-for="cs in contas" :value="cs" :key="cs.id" > {{cs.nomeConta}}  </option>

                        </b-form-select>

                  </b-form-group>
              </b-col>

              <b-col lg="6" sm="6">

              
                
                <b-form-group
                    label="Clientes/Fornecedores"
                    label-for="tipoParceiro"
                    invalid-feedback="TipoParceiro"
                  >

                  <b-form-select
                          id="tipoParceiro"
                          required
                          :plain="true"
                          v-model="transacao.tipoParceiro"
                          data-vv-name="tipoParceiro"
                          data-vv-as="tipoParceiro"
                          :error-messages="errors.collect('tipoParceiro')"
                          :state="tipoParceiroState"
                         :onchange="mostrarCombos()"
                        >
                        <template  #first>
                          <b-form-select-option  value="FAMILIA" > Família  </b-form-select-option>
                        </template> 
                        
                        
                                <option  value='DOADOR' > Doador  </option>
                                <option  value='INSTITUICAO' > Instituição  </option>

                        </b-form-select>
                  </b-form-group>

              </b-col>
              <b-col lg="12" sm="12">
                  <b-form-group
                    label="Doador"
                    label-for="doador"
                    v-if="mostrarDoador"
                  >
                  <model-list-select 
                          id="doador"
                          :plain="true"
                          v-model="transacao.idDoador"
                          :list="listaDoador"
                          option-value="id"
                          placeholder="Pesquise"
                          option-text="nome"
                          data-vv-name="doador"
                          data-vv-as="doador"
                          :error-messages="errors.collect('doador')"
                          :state="doadorState"
                        >
                        </model-list-select >

                  </b-form-group>

                  <b-form-group
                    label="Família"
                    label-for="familia"
                    v-if="mostrarFamilia"
                  >
                  <model-list-select 
                          id="familia"
                          :list="listaFamilia"
                          option-value="id"
                          option-text="nomeResponsavel"
                          placeholder="Pesquise"
                          v-model="transacao.idFamilia"
                          data-vv-name="familia"
                          data-vv-as="familia"
                          :error-messages="errors.collect('familia')"
                          :state="familiaState"
                        >
                        </model-list-select >

                  </b-form-group>



                  <b-form-group
                    label="Instituição"
                    label-for="instituicao"
                    v-if="mostrarInstituicao"
                  >
                  <model-list-select 
                          id="instituicao"
                          :list="listaInstituicao"
                          placeholder="Pesquise"
                          option-value="id"
                          option-text="nome"
                          v-model="transacao.idInstituicao"
                          data-vv-name="instituicao"
                          data-vv-as="instituicao"
                          :error-messages="errors.collect('instituicao')"
                          :state="instituicaoState">
                          </model-list-select>
                  </b-form-group>
              </b-col>

              <b-col lg="6" sm="6">
                  <b-form-group
                      label="Centro de custo"
                      label-for="centroCusto"
                      invalid-feedback="centroCusto"
                    >

                    <b-form-select
                            id="centroCusto"
                            required
                            v-model="transacao.centroCusto.id"
                            data-vv-name="centroCusto"
                            data-vv-as="centroCusto"
                            :error-messages="errors.collect('centroCusto')"
                            :state="centroCustoState"
                          >
                          <option  :value="-1" disabled  :selected="true" > Selecione  </option>
                        
                          <option v-for="cc in listaCentroCusto" :value="cc.id" :key="cc.id" > {{cc.nome}}  </option>

                          </b-form-select>
                    </b-form-group>

                </b-col>

                <b-col lg="6" sm="6">
                  <b-form-group
                      label="Categoria"
                      label-for="categoria"
                      invalid-feedback="categoria"
                    >

                          <b-form-select
                            id="categoria"
                            v-if="mostrarComboReceita"
                            required
                            v-model="transacao.categoria.id"
                            data-vv-name="categoria"
                            data-vv-as="categoria"
                            :error-messages="errors.collect('categoria')"
                            :state="centroCustoState"
                            :options="grupoCategoriaReceitaCombo"
                          />

                          <b-form-select
                            id="categoria"
                            v-if="!mostrarComboReceita"
                            required
                            v-model="transacao.categoria.id"
                            data-vv-name="categoria"
                            data-vv-as="categoria"
                            :error-messages="errors.collect('categoria')"
                            :state="centroCustoState"
                            :options="grupoCategoriaDespesaCombo"
                          />
                  
                  
                   </b-form-group>

                </b-col>


            </b-row>
          </form>
        </b-modal>
      </div>
    </b-card>
  
</template>

<script>
    
    
import events from '@/util/events'
import Api from '@/api/social'
import formatar from '@/mixins/formatarMixins'
import { ModelSelect } from 'vue-search-select'
import { ModelListSelect } from 'vue-search-select'
export default {
  components: {
      ModelListSelect
    },
  name: 'Transacao',
  mixins: [formatar],
  data () {
    return {
      name: '',
      teste1:'FAMILIA',
        nameState: null,
        descricaoState: null,
        valorState: null,
        dataState: null,
        tipoTransacaoState: null,
        contaState: null,
        centroCustoState: null,
        tipoParceiroState: null,
        doadorState: null,
        familiaState: null,
        instituicaoState:null,
        erros:[],
        valorState: null,
        submittedNames: [],
        contas:[],
        listaCentroCusto:[],
        listaInstituicao:[],
        listaDoador:[],
        listaFamilia:[],
        mostrarFamilia:true,
        mostrarDoador:false,
        mostrarInstituicao:false,
        listaCategoriaDespesa:[],
        listaCategoriaReceita:[],
        grupoCategoriaCombo:[],
        grupoCategoriaReceitaCombo:[],
        grupoCategoriaPagamentoCombo:[],
        mostrarComboReceita : true,
        testeTipo:''
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
        let valid = true

        if (this.transacao.descricao == null || this.transacao.descricao == "" || this.transacao.descricao == undefined){
          valid = false;
          this.descricaoState= false;
        } else {
          this.descricaoState= true;
        }

        if (this.transacao.valor == null || this.transacao.valor == "" || this.transacao.valor == undefined){
          valid = false;
          this.valorState= false;
        } else {
          this.valorState= true;
        }

        if (this.transacao.data== null || this.transacao.data== "" || this.transacao.data == undefined){
          valid = false;
          this.dataState= false;
        } else {
          this.dataState= true;
        }

        if (this.transacao.tipoTransacaoEnum == null || this.transacao.tipoTransacaoEnum == "" || this.transacao.tipoTransacaoEnum == undefined){
          valid = false;
          this.tipoTransacaoState= false;
        } else {
          this.tipoTransacaoState= true;
        }


        if (this.transacao.conta == null || this.transacao.conta == "" || this.transacao.conta == undefined){
          valid = false;
          this.contaState= false;
        } else {
          this.contaState= true;
        }

        if (this.transacao.conta == null || this.transacao.conta == "" || this.transacao.conta == undefined){
          valid = false;
          this.contaState= false;
        } else {
          this.contaState= true;
        }


        if (this.transacao.tipoParceiro == 'FAMILIA' && ((this.transacao.idFamilia == null || this.transacao.idFamilia == "" || this.transacao.idFamilia == undefined))){
          valid = false;
          this.familiaState= false;
        } else {
          this.familiaState= true;
        }


        //this.nameState = valid
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
        this.transacao.centroCusto = {}
        

        var objConta = this.$store.getters.getContaPesquisa
        var thisExterno = this
       
        if (objConta === null || objConta === undefined || objConta.id === undefined) {
          this.transacao = {conta:thisExterno.contas[0],centroCusto:{}}
        } else {
          for(let i=0; i<thisExterno.contas.length; i++){
            if (thisExterno.contas[i].id == objConta.id) {
              thisExterno.transacao = {conta:thisExterno.contas[i],centroCusto:{}}
            }
          }
        }

        this.transacao.categoria = {}

      },
      handleOk(bvModalEvent) {
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
      montarGrupoCategoriaCombo(){
          if (this.transacao.tipoTransacaoEnum === 'PAGAMENTO'){
            this.mostrarComboReceita = false
          } else if(this.transacao.tipoTransacaoEnum === 'RECEITA' ){
            this.mostrarComboReceita = true
          }

      },
      montarGrupoCategoriaComboAntigo(){
        let lista = [];
      //  if (this.transacao.tipoTransacaoEnum === null || this.transacao.tipoTransacaoEnum === undefined){
      //   this.transacao.tipoTransacaoEnum = 'RECEITA'
      //   this.testeTipo = 'RECEITA'
      //  }
       
        if (this.transacao.tipoTransacaoEnum == 'PAGAMENTO' && this.testeTipo != 'PAGAMENTO'){
          this.listaCategoriaDespesa.forEach(d => {
            let options = [];
            d.listaCategoria.forEach( c =>{
              options.push({value:c,text:c.nome})
            });
            
            lista.push({ label : d.nome, options: options})

          });

          this.testeTipo = 'PAGAMENTO'
          this.grupoCategoriaCombo = lista;

        } else if(this.transacao.tipoTransacaoEnum == 'RECEITA' && this.testeTipo != 'RECEITA'){

              this.listaCategoriaReceita.forEach(d => {
                let options = [];
                d.listaCategoria.forEach( c =>{
                  options.push({value:c,text:c.nome})
                });
                
                lista.push({ label : d.nome, options: options})

              });

              this.grupoCategoriaCombo = lista;
              this.testeTipo = 'RECEITA'
        }


      },
      carregarListaCentroCusto(){
        Api.getListaCentroCusto()
            .then(res => {
                this.listaCentroCusto = res.data;
          })
          .catch(err => {
            this.$store.commit('setMessages', err.response.data)
          })
      },
      montarParceiros(){
        Api.getParceiros()
            .then(res => {

                this.listaDoador = res.data.listaDoador;
                this.listaFamilia = res.data.listaFamilia
                this.listaInstituicao = res.data.listaInstituicaoDTOs
          })
          .catch(err => {
            this.$store.commit('setMessages', err.response.data)
          })
    
      },
      montarCategoria(){
        Api.getListaGrupoCategoria()
            .then(res => {
                this.listaCategoriaDespesa = res.data.despesas;
                this.listaCategoriaReceita = res.data.receitas;

                let listaR = [];
                let listaD = [];
                this.listaCategoriaDespesa.forEach(d => {
                      let options = [];
                      d.listaCategoria.forEach(c => {
                        options.push({ value: c.id, text: c.nome })
                      });

                      listaD.push({ label: d.nome, options: options })

                });
                this.grupoCategoriaDespesaCombo = listaD;

                this.listaCategoriaReceita.forEach(d => {
                      let options = [];
                      d.listaCategoria.forEach(c => {
                        options.push({ value: c.id, text: c.nome })
                      });

                      listaR.push({ label: d.nome, options: options })

                });
                this.grupoCategoriaReceitaCombo = listaR;




                this.montarGrupoCategoriaCombo()
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
      },
      mostrarCombos(){
        if (this.transacao.tipoParceiro == 'DOADOR'){
          this.mostrarInstituicao = false
          this.mostrarFamilia = false
          this.mostrarDoador = true

          //this.transacao.familia = {id:null}
          //this.transacao.instituicao = {id:null}

        } else if(this.transacao.tipoParceiro == 'INSTITUICAO'){
          this.mostrarInstituicao = true
          this.mostrarFamilia = false
          this.mostrarDoador = false

          //this.transacao.familia = {id:null}
          //this.transacao.doador = {id:null}

        } else {
          this.mostrarInstituicao = false
          this.mostrarFamilia = true
          this.mostrarDoador = false

          //this.transacao.instituicao = {id:null}
          //this.transacao.doador = {id:null}

        }
      },

      emitirRazao(){

        let fluxoPesquisa = this.$store.getters.getFluxoCaixaPesquisa
        let contaPesquisa = this.$store.getters.getContaPesquisa

        Api.teste22(fluxoPesquisa.periodo, fluxoPesquisa.dataInicial,fluxoPesquisa.dataFinal);

        // Api.emitirRelatorioRazao(fluxoPesquisa.periodo, fluxoPesquisa.dataInicial,fluxoPesquisa.dataFinal)
        //     .then(res => {
        //       const blob = new Blob([res.data], { type: 'application/pdf' });
        //       console.log(blob)
        //       const url = window.URL.createObjectURL(blob);
        //       const link = document.createElement('a');
        //       link.href = url;
        //       link.setAttribute('download', 'teste.pdf');
        //       document.body.appendChild(link);
        //       link.click();
        //       })
        //   .catch(err => {
        //     this.$store.commit('setMessages', err.response.data)
        //   })
      }
      
    },
    created(){

      events.$on('editarTransacao', (t) => {
        this.$bvModal.show('modal-prevent-closing')
      }) 
      this.testeTipo = 'PAGAMENTO'
      this.transacao.tipoTransacaoEnum = 'RECEITA'
      this.transacao.centroCusto = {}
      this.fluxoCaixaPesquisa = {periodo:"30"}
       
      this.montarParceiros();
      this.mostrarCombos();
      this.montarCategoria();
      this.transacao.categoria = {}
    },
    beforeDestroy() {
    // removing eventBus listener
    //events.$off('editarTransacao')
  },
    mounted(){
      this.montarContas();
      this.carregarListaCentroCusto();
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