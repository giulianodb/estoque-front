<template>
  <b-row>
    <b-col md="12">
      <Configuracao />
    </b-col>
    
    <b-col md="3">
      <b-card v-for="item in contasPorTipo" :key="item.tipoConta.id" :header="mostrarHEader(item)" class="text-center"  >
        <b-card-text v-for="c in item.contas" :key="c.id" style="cursor: pointer;" @click="listarTransacao(c)">
          {{c.nomeConta}} (<span :style="definirStyleValor(c.saldo.valor)">{{formatarMoeda(c.saldo.valor)}}</span>) 
        </b-card-text>
        
      </b-card>
    </b-col>
    
    <b-col align-self="center">
      <Transacao  v-if="contaPesquisa.id>0"/>
    </b-col>
  </b-row>
</template>

<script>
import Configuracao from './components/Configuracao.vue'
import Transacao from './components/Transacao'

import Api from '@/api/social'
import events from '@/util/events'

import formatar from '@/mixins/formatarMixins'

export default {
  name: 'Conta',
  components: { Transacao, Configuracao },
  mixins: [formatar],
  data () {
    return {
      param: "",
    }
  },
  computed: {
    contaPesquisa: {
      get () {
        return this.$store.getters.getContaPesquisa
      },
      set (c) {
        this.$store.commit('setContaPesquisa', c)
      }
    },
    contasPorTipo :{
      get () {
        return this.$store.getters.getContasPorTipo
      },
      set (c) {
        this.$store.commit('setContasPorTipo', c)
      }
    }
  },
  methods: {
      check() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      listarTransacao (conta){
        this.$store.commit('setContaPesquisa', conta)
        events.$emit('pesquisarTransacao')

      },
      mostrarHEader(item){
        let msg = item.tipoConta.descricao + "     (      " +this.formatarMoeda(item.saldoContas) + " )"
        return msg
      },

      pesquisarTransacao(){
        let fluxoPesquisa = this.$store.getters.getFluxoCaixaPesquisa
        let contaPesquisa = this.$store.getters.getContaPesquisa
        Api.getTransacao (fluxoPesquisa.periodo, fluxoPesquisa.dataInicial,fluxoPesquisa.dataFinal,contaPesquisa.id)

        .then(res => {
            this.$store.commit('setListaTransacao', res.data)

          })
          .catch(err => {
            this.$store.commit('setMessages', err.response.data)
          })


      },
      pesquisarContasPorTipo(){
        Api.getTodasContasPorTipo()
        .then(res => {
            this.contasPorTipo = res.data
          })
          .catch(err => {
            this.$store.commit('setMessages', err.response.data)
          })
      },
    },
    created(){
      events.$on('pesquisarTransacao', () => {
        this.pesquisarTransacao()
      })

      events.$on('pesquisarContasPorTipo', () => {
        this.pesquisarContasPorTipo()
      })

    },
    mounted(){
      this.pesquisarContasPorTipo()
    }
}
</script>


<style>
    .columns {
       display: flex;
    }

    .column {  
      display: flex;
      flex-direction: column; /* Makes the articles stacked vertically */
    } 
    
    .main-column {
      flex: 2;
    }

    .article {
      display: flex;
      flex-direction: column;
    }

    .article-body {
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    .article-content {
      flex: 1; /* This will make the content fill up the remaining space, and thus push the information bar at the bottom */
    }

</style>
