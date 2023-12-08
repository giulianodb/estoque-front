<template>
  <div class="fluid">
    <h1 class="app-title">ENTRADA</h1>

    <b-row>
      <b-col sm="12">
        <b-card>
          <DashboardInfo />
        </b-card>
      </b-col>
    </b-row>


    <b-row>
      <b-col sm="12" class="d-flex align-items-stretch">
        <b-card class="flex-fill">
          <b-card-body class="align-items-center justify-content-center">
          
            <Grafico />
          
          </b-card-body>
          
        </b-card>
      </b-col>


      <b-col sm="12" class="d-flex align-items-stretch">
        <b-card class="flex-fill">
          <b-card-body class="align-items-center justify-content-center">
          
            <GraficoEstoque />
          
          </b-card-body>
          
        </b-card>
      </b-col>




    </b-row>
  </div>

</template>

<script>
import Grafico from './FinanceiroGrafico'
import GraficoEstoque from './EstoqueGrafico'
import DashboardInfo from './DashboardInfo.vue'

export default {
  components: {
    Grafico,DashboardInfo,GraficoEstoque
  },
  name: 'Home'
}
</script>
