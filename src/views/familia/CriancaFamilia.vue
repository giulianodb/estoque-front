<template>
  <div>
    <ListarCrianca :porFamilia="true"/>
    <EditarCrianca />
  </div>
</template>

<script>
import EditarCrianca from './components/crianca/EditarCrianca'
import ListarCrianca from './components/crianca/ListarCrianca'

import Api from '@/api/social'

export default {
  name: 'Crianca',
  components: { EditarCrianca, ListarCrianca },
  data () {
    return {
      familia: { nome: 'OPA' }
    }
  },

  created () {
    this.listarCriancas(this.$route.params.idFamilia)
    this.buscarFamilia(this.$route.params.idFamilia)
     this.$store.dispatch('novaCrianca')
  },
  mounted () {

  },
  methods: {
    listarCriancas (idFamilia) {
      Api.getCriancasPorFamilia(null, null, null, null, idFamilia)
        .then((res) => {
          this.$store.commit('setCriancas', res.data.content)
        })
        .catch((err) => {
          this.$store.commit('setCriancas', [])
          this.$store.commit('setMessages', err.response.data)
        })
    },
    buscarFamilia (idFamilia) {
      Api.getFamilia(idFamilia)
        .then((res) => {
          console.log(res.data)
          this.$store.commit('setFamilia', res.data)
        })
        .catch((err) => {
          this.$store.commit('setFamilia', [])
          this.$store.commit('setMessages', err.response.data)
        })
    }

  }
}
</script>

<style></style>
