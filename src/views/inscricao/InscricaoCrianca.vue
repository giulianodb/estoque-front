<template>
  <div>
    <ListarInscricaoCrianca />
    <EditarInscricaoCrianca />
  </div>
</template>

<script>
import EditarInscricaoCrianca from './components/EditarInscricaoCrianca'
import ListarInscricaoCrianca from './components/ListarInscricaoCrianca'

import Api from '@/api/social'

export default {
  name: 'InscricaoCrianca',
  components: { EditarInscricaoCrianca, ListarInscricaoCrianca },
  data () {
    return {
      familia: { nome: 'OPA' }
    }
  },

  created () {
    //TODO REVER SE PRECISA DISSO
    this.listarInscricao(this.$route.params.idCrianca)
    this.buscarCrianca(this.$route.params.idCrianca)
    this.$store.dispatch('novaInscricao')
  },
  mounted () {

  },
  methods: {
    listarInscricao (idCrianca) {
      Api.getInscricaoPorCrianca(null, null, null, null, idCrianca)

        .then((res) => {
          console.log(res.data.content)
          this.$store.commit('setListaInscricao', res.data.content)
        })
        .catch((err) => {
          this.$store.commit('setListaInscricao', [])
          this.$store.commit('setMessages', err.response.data)
        })
    },


    buscarCrianca (idCrianca) {
      Api.getCrianca(idCrianca)
        .then((res) => {
          console.log(res.data)
          let obj = JSON.parse(JSON.stringify(res.data))
          console.log(obj.id)
          this.$store.commit('setCrianca', obj)
        })
        .catch((err) => {
          console.log(err)
          this.$store.commit('setCrianca', {})
          this.$store.commit('setMessages', err.response.data)
        })
    }

  }
}
</script>

<style></style>
