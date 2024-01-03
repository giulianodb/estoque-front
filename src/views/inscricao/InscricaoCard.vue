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
    

    <b-card v-for="item in inscricoes" :key="item.id"  no-body class="" style="max-width: 100%; max-height:205px; padding: 1px;">
      <b-row no-gutters >
        <b-col md="2">
          <!-- <b-avatar size="200px"></b-avatar> -->
          <b-card-img :src="teste2(item)" @click="$bvModal.show('bv-modal-example');teste(item.crianca.id)" alt="Image"  link="" 
          :class="{ 'cursor-move': isHovered }" @mouseover="isHovered = true" @mouseout="isHovered = false" style="height: 200px; width : 250px ;"> </b-card-img>
        </b-col>
        <b-col md="9">
          <b-card-body :title="item.crianca.nome">
            <b-card-text>

              <div class="fluid">
                  <Strong>Período:</Strong> {{ item.periodoDescricao }}
                  <br> 
                  <Strong> idade:</Strong> {{ item.crianca.idade }}
                  <br> 
                  <Strong>Total Afirmação:</Strong> {{ item.crianca.totalAfirmacao }}
                  <br> 
                  <Strong> Total Situação: </Strong> {{ item.crianca.totalSituacao }}

            </div>

              <b-link title="Inscrição" @click="iniciarInscricao(item.crianca)" class="btn btn-outline-primary">
              <i class="fas fa-folder-open"></i>
            </b-link>&nbsp;
              <b-link title="Atendimento" @click="iniciarAtendimento(item.crianca)" class="btn btn-outline-danger" >
              <i class="fas fa-heart"></i>
            </b-link>&nbsp;
            <b-link title="Avaliação de contexto" @click="iniciarEditarAvaliacaoContexto(item.crianca)" class="btn btn-outline-info">
              <i class="fas fa-hand-holding-heart"></i>
            </b-link>&nbsp;
            <b-link title="Alterar" @click="iniciarEditar(item.crianca)" class="btn btn-outline-secondary">
            <i class="fas fa-pencil-alt"></i>
            </b-link>&nbsp;
            </b-card-text>
          </b-card-body>
        </b-col>

        <div>
   </div>

      </b-row>
  </b-card>



  <b-modal id="bv-modal-example" hide-footer>
    <template #modal-title>
      Atualizar foto
    </template>
    <div class="d-block text-center">
      <form @submit.prevent="uploadPhoto">
          <input type="file" ref="fileInput" @change="handleFileChange">
          <br>
          <button type="submit">Enviar Foto</button>
      </form>


    </div>
  </b-modal>



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
      idCrianca:null,
      isHovered: false,
      previewImage:null,
      selectedFile:null,
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
    this.pesquisarInscricao()
  },
  mounted () {

  },
  methods: {
    iniciarInscricao (crianca) {
      // let obj = JSON.parse(JSON.stringify(crianca))
      // this.$store.commit('setCrianca', obj)
      // console.log(obj)
      //  events.$emit('iniciarEditarCrianca')

       this.$router.push(`/crianca/${crianca.id}/inscricao`)

    },    iniciarEditar (crianca) {
      let obj = JSON.parse(JSON.stringify(crianca))
      this.$store.commit('setCrianca', obj)
      console.log(obj)
       events.$emit('iniciarEditarCrianca')

       this.$router.push(`/crianca?editar=true`)
    },
    iniciarEditarAvaliacaoContexto (crianca) {
      
      this.$router.push(`/crianca/${crianca.id}/avaliacao_contexto`)
      
    },
    iniciarAtendimento (crianca) {
      
      this.$router.push(`/crianca/${crianca.id}/atendimento`)
      
    },
    teste2(b64){
      return "data:image/png;base64,"+b64.crianca.foto
    },
    teste(id){
      this.idCrianca = id
      console.log("---")
      console.log(id)
    },
    uploadImage(e){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.previewImage = e.target.result;
                    console.log(this.previewImage);
                };
            },

            handleFileChange() {
      this.selectedFile = this.$refs.fileInput.files[0];
    },
    uploadPhoto() {
      
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
        if (this.selectedFile.size > maxSizeInBytes) {
          alert('A imagem selecionada é muito grande. Por favor, escolha uma imagem menor.');
          return;
        }
      
      const formData = new FormData();
      formData.append('file', this.selectedFile);



      Api.uploadFotoCrianca(this.idCrianca,formData)
        .then(res => {
               console.log('ok')

               this.$bvModal.hide('bv-modal-example')

               this.pesquisarInscricao()
           })
            .catch(err => {
                console.log(err)
                this.$store.commit('setMessages', err)
           })

    },


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
          
          this.$store.commit('setBusy', true)

          Api.getInscricao(this.currentPage, this.perPage, 'ano', this.sortDesc, nome,
            projeto,
            matriculado,
            espera,
            ano)
            .then(res => {
              //this.$store.commit('setCriancas', res.data.content)
              this.inscricoes = res.data.content
              this.totalRows = res.data.totalElements

                //your code to be executed after 1 second
                this.$store.commit('setBusy', false)

              
            })
            .catch(err => {
              this.inscricoes = []
              this.$store.commit('setMessages', err.response.data)
              this.$store.commit('setBusy', false)
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

<style>

.uploading-image{
     display:flex;
     width: 50px;
     height: 80px;
   }

   .cursor-move {
  cursor: pointer; /* Troque 'move' pelo cursor desejado */
}
</style>
