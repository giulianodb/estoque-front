<template>
  <div>
    <!-- <EditarCrianca />
    <ListarCrianca /> -->
    <div>User {{ $route.params.id }}</div>
    <div>User {{ this.familia.nome }}</div>

  </div>
</template>

<script>
import EditarCrianca from './components/EditarCrianca'
import ListarCrianca from './components/ListarCrianca'
export default {
  name: 'Crianca',
  components: { EditarCrianca, ListarCrianca },
  data () {
    return {
      familia: { nome: 'OPA' }
    }
  },

  created () {},
  mounted () {
    alert(this.$route.params.id)
    this.familia.nome = 'Teste'
  },
  methods: {}
}
</script>

<style></style>
