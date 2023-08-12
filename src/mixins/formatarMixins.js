
import moment from 'moment'

export default {

  filters: {
    mascaraCpf (valor) {
      const arr = valor.split('')
      arr.splice(3, 0, '.')
      arr.splice(7, 0, '.')
      arr.splice(11, 0, '-')
      return arr.join('')
    }
  },
  methods: {
    formatarData (data) {
      return moment(data).format('DD/MM/YYYY')
    },
    arrayRemove (arr, value) {
      return arr.filter(function (ele) {
        return ele != value
      })
    },
    simNao(condicao){
      if (condicao) 
        return "Sim"
      return "Não"
    },
    formatarMoeda(valor){
      var f = valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
      return f
    },
    definirStyleValor(valor){
      if (valor > 0 ) {
        return "color:green"
      } else {
        return "color:red"
      }
    },
    
    formatarMoedaToServer(valor){
      return String(valor).replaceAll(",",".")
    },
  }
}
