<template>
  <div>
      <EditarConta />
      <ListarConta />
  </div>
</template>

<script>
import EditarConta from './components/EditarConta'
import ListarConta from './components/ListarConta'
export default {
  name: 'Conta',
  components: { EditarConta, ListarConta }
}
</script>

<style>
</style>
