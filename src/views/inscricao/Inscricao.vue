<template>
  <div>
      <div class="fluid">
    <h1 class="app-title">Pesquisar Inscrição</h1>

    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b>Informações para pesquisa</b>
          </div>

          <b-form >
            <!-- Nome Série -->
            <b-row>
              <b-col lg="3" sm="12">
                <b-form-group label="Nome:" label-for="nome" class="text-label">
                  <b-form-input id="nome"  v-model="inscricaoPesquisa.nomeCrianca" :autofocus="true"/>
                </b-form-group>
              </b-col>

              <b-col lg="3" sm="12">
                <b-form-group label="Projeto:" label-for="projeto">
                <b-form-select
                    id="projeto"
                    :plain="true"
                    v-model="inscricaoPesquisa.projeto"
                  >
                    <template slot="first">
                      <b-form-select-option :value="-1" >Selecione </b-form-select-option>
                    </template>
                    <option :value="1"> SCFV  </option>
                  </b-form-select>
                </b-form-group>
            </b-col>

            <b-col lg="3" sm="12">
                <b-form-group label="Ano:" label-for="ano" class="text-label">
                  <b-form-input id="ano"  v-model="inscricaoPesquisa.ano" :autofocus="true"/>
                </b-form-group>
              </b-col>

            <b-col lg="3" sm="12">
                <b-form-group label="Fila de espera ?" label-for="espera">
                <b-form-checkbox
                    id="espera"
                    v-model="inscricaoPesquisa.espera"
                  >
                
                  </b-form-checkbox>
                </b-form-group>
            </b-col>

            </b-row>
          
          </b-form>

          <div slot="footer" class="center-xy">
            <b-button @click="pesquisarInscricao()" variant="primary">
              <i class="fas fa-search"></i> Pesquisar
            </b-button>

            &nbsp;

            <b-button outline @click="clear" size="md" variant="secondary">Limpar</b-button>
            &nbsp;

            <b-button outline @click="gerarPdf()" size="md" variant="secondary">Gerar PDF</b-button>
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
          :items="inscricoes"
          :fields="fields"
          :current-page="currentPage"
          :per-page="0"
          @sort-changed="sortingChanged"
          :busy="pesquisando"
        >
        <template v-slot:cell(matriculado)="ma">
          <span v-if="ma.item.matriculado">Sim</span>
          <span v-else>Não</span>
         </template>
          <div slot="empty" colspan="2" align="center">Não existe conteúdo a ser exibido</div>
          <div slot="table-busy" class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Pesquisando...</strong>
        </div>
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


  </div>
</template>

<script>

import Api from '@/api/social'
import events from '@/util/events'
// import jsPDF from 'jspdf'
// import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";

export default {
  name: 'Inscricao',
  components: { },
  data () {
    return {
      inscricaoPesquisa: { nomeCrianca : '' , projeto: "-1", matriculado: true, espera: false , ano : this.getAno()},
      inscricoes: [],
      fields: [
        { label: 'Nome criança', key: 'crianca.nome', sortable: false, sortDirection: 'desc' },
        { label: 'Projeto', key: 'projeto', sortable: false, sortDirection: 'desc' },
        { label: 'Matriculado', key: 'matriculado', sortable: false, sortDirection: 'desc' },
        { label: 'Total Afirmação', key: 'crianca.totalAfirmacao', sortable: false, sortDirection: 'desc' },
        { label: 'Total Situação', key: 'crianca.totalSituacao', sortable: false, sortDirection: 'desc' },
        { label: 'Ano', key: 'ano', sortable: false, sortDirection: 'desc' },
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
  computed : {
    //  criancaPesquisa: {
    //   get () {
    //     return this.$store.getters.getCriancaPesquisa
    //   },
    //   set () {
    //     this.$store.commit('setCriancaPesquisa', this.criancaPesquisa)
    //   }
    // }
  },

  created () {
  },
  mounted () {

  },
  methods: {
    clear () {

      this.inscricaoPesquisa = { nomeCrianca : '' , projeto: "-1", matriculado: true, espera: false , ano : this.getAno()}
      this.$store.dispatch('limparMensagens')
    },
    getAno(){
      return new Date().getFullYear();
    },
    
    pesquisarInscricao () {
      this.pesquisando = true
       // console.log("testeee")
          
          let nome = this.inscricaoPesquisa.nomeCrianca
          let projeto = this.inscricaoPesquisa.projeto
          let matriculado = this.inscricaoPesquisa.matriculado
          let espera =  this.inscricaoPesquisa.espera
          let ano =  this.inscricaoPesquisa.ano
          //page, perPage, sortBy, sortDesc, nome
          
          Api.getInscricao(this.currentPage, this.perPage, 'ano', this.sortDesc, nome,
            projeto,
            matriculado,
            espera,
            ano)
            .then(res => {
              //this.$store.commit('setCriancas', res.data.content)
              this.inscricoes = res.data.content
              this.totalRows = res.data.totalElements
            })
            .catch(err => {
              this.inscricoes = []
              this.$store.commit('setMessages', err.response.data)
            })

      this.pesquisando = false
    },
      changePage () {

        let nome = this.inscricaoPesquisa.nomeCrianca
          let projeto = this.inscricaoPesquisa.projeto
          let matriculado = this.inscricaoPesquisa.matriculado
          let espera =  this.inscricaoPesquisa.espera
          let ano =  this.inscricaoPesquisa.ano
              Api.getInscricao(
                this.currentPage,
                this.perPage,
                this.sortBy,
                this.sortDesc,
                nome,
                projeto,
                matriculado,
                espera,
                ano
              ).then(res => {
                this.inscricoes = res.data.content
                this.totalRows = res.data.totalElements
              })
      },
      sortingChanged (ctx) {
          this.sortBy = ctx.sortBy
          this.sortDesc = ctx.sortDesc

            let nome = this.inscricaoPesquisa.nomeCrianca
          let projeto = this.inscricaoPesquisa.projeto
          let matriculado = this.inscricaoPesquisa.matriculado
          let espera =  this.inscricaoPesquisa.espera
          let ano =  this.inscricaoPesquisa.ano
              
              
              Api.getInscricao(
                this.currentPage,
                this.perPage,
                this.sortBy,
                this.sortDesc,
                nome,
                projeto,
                matriculado,
                espera,
                ano
              ).then(res => {
                this.inscricoes = res.data.content
                this.totalRows = res.data.totalElements
              })  
        },
            gerarPdf() {

                  this.pesquisando = true
                    // console.log("testeee")
                        
                        let nome = this.inscricaoPesquisa.nomeCrianca
                        let projeto = this.inscricaoPesquisa.projeto
                        let matriculado = this.inscricaoPesquisa.matriculado
                        let espera =  this.inscricaoPesquisa.espera
                        let ano =  this.inscricaoPesquisa.ano
                        //page, perPage, sortBy, sortDesc, nome
                        
                        Api.getInscricaoRelatorio(this.currentPage, this.perPage, 'ano', this.sortDesc, nome,
                          projeto,
                          matriculado,
                          espera,
                          ano)
                          .then(res => {
                            //this.$store.commit('setCriancas', res.data.content)
                            var dto = res.data
                            console.log(dto)
                            this.gerarPdfMesmo(dto);
                          })
                          .catch(err => {
                            this.inscricoes = []
                            console.log(err)
                            this.$store.commit('setMessages', err.response.data)
                          })

                    this.pesquisando = false
                        },

              gerarPdfMesmo(dto) {
                  // //or in browser
                  // var pdfObject = jsPDFInvoiceTemplate.default(props); //returns number of pages created
                  var teste = "15/03/2023"
                  var props = {
                      outputType: OutputType.Save,
                      returnJsPDFDocObject: true,
                      fileName: "Invoice 2021",
                      orientationLandscape: false,
                      compress: true,
                      logo: {
                          src: "http://localhost:8081/logo.png",
                          type: 'PNG', //optional, when src= data:uri (nodejs case)
                          width: 25, //aspect ratio = width/height
                          height: 25,
                          margin: {
                              top: 0, //negative or positive num, from the current position
                              left: 0 //negative or positive num, from the current position
                          }
                      },
                      business: {
                          name: "De Mãos Unidas "+teste,
                          address: "Rua Raul Felix, 277",
                          phone: "(41) 3079-2034",
                          email: "contato@demaosunidas.org.br",
                          website: "https://demaosunidas.org.br",
                      },
                      contact: {
                        label: " ",
                          name: "Inscrições",
                          address: " "
                      },
                      invoice: {
                          label: "Invoice #: ",
                          headerBorder: false,
                          tableBodyBorder: false,
                          header: [
                            {
                              title: "#", 
                              style: { 
                                width: 10 
                              } 
                            }, 
                            { 
                              title: "Criança",
                              style: {
                                width: 30
                              } 
                            }, 
                            { 
                              title: "Projeto",
                              style: {
                                width: 80
                              } 
                            }, 
                            { title: "Turno"},
                          ],
                          table: Array.from(dto.listInscricao, (item, index)=>([
                              index + 1,
                              item.crianca.nome,
                             item.projeto,
                             item.periodo
                              
                          ])),
                          additionalRows: [{
                              col1: 'Total:',
                              col2: dto.totalInscritos.toString(),
                              style: {
                                  fontSize: 14 //optional, default 12
                              }
                          },
                          {
                              col1: 'Manhã:',
                              col2: dto.totalManha.toString(),
                              style: {
                                  fontSize: 10 //optional, default 12
                              }
                          },
                          {
                              col1: 'Tarde:',
                              col2: dto.totalTarde.toString(),
                              style: {
                                  fontSize: 10 //optional, default 12
                              }
                          },
                          {
                              col1: 'FOCAR:',
                              col2: dto.totalFocar.toString(),
                              style: {
                                  fontSize: 10 //optional, default 12
                              }
                          },
                          {
                              col1: 'NFCS:',
                              col2: dto.totalSCFV.toString(),
                              style: {
                                  fontSize: 10 //optional, default 12
                              }
                          },
                        
                           ],
                          invDescLabel: " ",
                          invDesc: " ",
                      },
                      footer: {
                          text: "DMU",
                      },
                      pageEnable: true,
                      pageLabel: "Página ",
                };

                const pdfObject = jsPDFInvoiceTemplate(props); //returns number of pages created

    },

}}
</script>

<style></style>
