<template>
    <!-- <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Charts_SVG_Example_1_-_Simple_Bar_Chart.svg" alt=""> -->
  <div id="chart">
    <strong>Famílias impactadas doações</strong>
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
          colors:['#00CED1'],
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
              text: 'Quantidade'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val  
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

       Api.getGraficoEstoque()
        .then(res => {
               
            let retorno = JSON.parse(JSON.stringify(res.data))

            this.series = [{data : retorno.quantidade,name:"Famílias"}]

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
  