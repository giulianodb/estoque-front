<template>
  <div>
      <EditarAtendimento />
      <ListarAtendimento/>
  </div>
</template>

<script>
import EditarAtendimento from './components/EditarAtendimento'
import ListarAtendimento from './components/ListarAtendimento'

import Api from '@/api/social'
export default {
  name: 'Atendimento',
  components: { EditarAtendimento, ListarAtendimento },
  created() {
    console.log(this.$route.params.idCrianca)
    console.log("===")
     Api.getCrianca(this.$route.params.idCrianca).then(res => {
            this.$store.commit('setCrianca', res.data)
            console.log("1111111111")
            console.log(res.data)
            console.log(res.data)
            console.log("222222222")
  })

  }
}
</script>

<style>
</style>
