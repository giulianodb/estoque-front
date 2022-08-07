
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
    }
  }
}
