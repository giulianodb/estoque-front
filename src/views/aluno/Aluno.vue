<template>
  <div>
      <EditarAluno />
      <ListarAluno/>
  </div>
</template>

<script>
import EditarAluno from './components/EditarAluno'
import ListarAluno from './components/ListarAluno'
export default {
  name: 'Aluno',
  components: { EditarAluno, ListarAluno }
}
</script>

<style>
</style>
