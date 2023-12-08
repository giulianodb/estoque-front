<template>
    <!-- <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Charts_SVG_Example_1_-_Simple_Bar_Chart.svg" alt=""> -->
  <div id="chart">
    <strong>Receita / Despesa</strong>
          <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
  </template>
  
  <script>
  import VueApexCharts from 'vue-apexcharts'
  import Api from '@/api/social'
  
  export default {
    components: {
      apexchart: VueApexCharts
    },
    data () {
     return {
  
        series: [],

        chartOptions: {
          chart: {
            type: 'bar',
            height: 350
          },
          colors:['#007FFF','#ff0000'],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: []
          },
          yaxis: {
            title: {
              text: 'Valores'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return 'R$ ' + val  
              }
            }
          }
        }
  
      }
    },   
    created(){
  
    },
    mounted(){
        // this.series = [{
        //   name: 'AuteCommodo',
        //   data: [56,5]
        // }, {
        //   name: 'LoremIpsum',
        //   data: [25,65]
        // }]

       Api.getGraficoFinanceiro()
        .then(res => {
               
            let obj1 = {}
            obj1.name = "Receita"
            obj1.data = res.data.receita

            let obj2 = {}
            obj2.name = "Despesa"
            obj2.data = res.data.despesa

            this.series = [obj1,obj2]

            // this.chartOptions.xaxis.categories = res.data.mes
            
            let meuArray = Array.from(res.data.mes);
            
            meuArray.forEach(t => {
                this.chartOptions.xaxis.categories.push(t)
            });

           })
            .catch(err => {
                console.log(err)
                this.$store.commit('setMessages', err)
           })

    }


    

  }
  
  </script>
  
  <style>
  
  </style>
  