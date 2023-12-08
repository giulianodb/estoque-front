<template>
  <div class="info-panels">
    <strong>Quadro de inscrições</strong>
    
    <b-card-group deck>
      <b-card bg-variant="success" text-variant="white" align="center" class="my-2">
        <h3 class="text-white"><strong>Total Inscritos</strong></h3>
        <b-card-text class="text-white">
          <h1 class="text-white"> {{this.totalizadores.totalInscricao}} </h1>
        </b-card-text>
      </b-card>

      <b-card bg-variant="info" text-variant="white" align="center" class="my-2">
        <h3 class="text-white"><strong>Total Inscritos Manhã</strong></h3>
        <b-card-text class="text-white">
          <h1 class="text-white">{{this.totalizadores.totalInscricaoManha}}</h1>
        </b-card-text>
      </b-card>

      <b-card bg-variant="info" text-variant="white" align="center" class="my-2">
        <h3 class="text-white"><strong>Total Inscritos Tarde</strong></h3>
        <b-card-text class="text-white">
          <h1 class="text-white">{{this.totalizadores.totalInscricaoTarde}}</h1>
        </b-card-text>
      </b-card>

      <b-card bg-variant="warning" text-variant="white" align="center" class="my-2">
        <h3 class="text-white"><strong>Lista Espera</strong></h3>
        <b-card-text class="text-white">
          <h1 class="text-white">{{this.totalizadores.totalEspera}}</h1>
        </b-card-text>
      </b-card>

    </b-card-group>
  </div>
</template>

<script>
import Api from '@/api/social'
export default {

  data() {
    return {

      totalizadores: {},


    }


  },
  created() {
    Api.getTotalizadoresInscricao()
        .then(res => {
           
          let obj = JSON.parse(JSON.stringify(res.data))
           this.totalizadores = obj

           })
            .catch(err => {
                console.log(err)
                this.$store.commit('setMessages', err)
           })
    
  }

}





</script>

<style scoped>

</style>
