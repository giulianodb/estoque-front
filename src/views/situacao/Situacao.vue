<template>
  <div>
      <EditarSituacao />
      <ListarSituacao/>
  </div>
</template>

<script>
import EditarSituacao from './components/EditarSituacao'
import ListarSituacao from './components/ListarSituacao'

import Api from '@/api/social'
export default {
  name: 'Situacao',
  components: { EditarSituacao, ListarSituacao },
  beforeCreate() {
    console.log(this.$route.params.idFamilia)
     Api.getFamilia(this.$route.params.idFamilia).then(res => {
        this.$store.commit('setFamilia', res.data)
  })

  }
}
</script>

<style>
</style>
