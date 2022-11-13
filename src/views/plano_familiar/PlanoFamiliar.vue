<template>
  <div>
      <EditarPlanoFamiliar />
      <ListarPlanoFamiliar/>
  </div>
</template>

<script>
import EditarPlanoFamiliar from './components/EditarPlanoFamiliar'
import ListarPlanoFamiliar from './components/ListarPlanoFamiliar'

import Api from '@/api/social'
export default {
  name: 'PlanoFamiliar',
  components: { EditarPlanoFamiliar, ListarPlanoFamiliar },
  beforeCreate() {
    console.log(this.$route.params.idFamilia)
     Api.getFamilia(this.$route.params.idFamilia).then(res => {
        
        console.log("TESTE")
        console.log(res.data)
        this.$store.commit('setFamilia', res.data)
  })

  }
}
</script>

<style>
</style>
