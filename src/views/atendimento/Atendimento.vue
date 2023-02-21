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
     Api.getCrianca(this.$route.params.idCrianca).then(res => {
            this.$store.commit('setCrianca', res.data)
  })

  }
}
</script>

<style>
</style>
