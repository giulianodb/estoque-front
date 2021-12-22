<template>
  <div>
      <EditarSerie />
      <ListarSerie/>
  </div>
</template>

<script>
import EditarSerie from './components/EditarSerie'
import ListarSerie from './components/ListarSerie'
export default {
  name: 'Serie',
  components: { EditarSerie, ListarSerie }
}
</script>

<style>
</style>
