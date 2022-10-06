/* eslint-disable no-array-constructor */
import store from '@/store/store'
import apiCentralSeguranca from '@/api/centralseguranca'

export default {
  itens: [

    {
      name: 'Inicial',
      url: '/home',
      icon: 'fas fa-chart-line'
      // groups: ['VJE-Aluno', 'VJE-Administrador']
    },

    {
      name: 'Criança',
      url: '#',
      icon: 'fas fa-chalkboard-teacher',

      children: [
        {
          name: 'Listar Criança',
          url: '/crianca'

        }
      ]
    },
    {
      name: 'Familia',
      url: '#',
      icon: 'fas fa-chalkboard-teacher',

      children: [
        {
          name: 'Cadastrar Família',
          url: '/editar_familia'

        },
        {
          name: 'Listar Família',
          url: '/listar_familia'

        }
      ]
    }
  ],

  itensAcesso (itens) {
    return itens
  },

  filtrar (itens, pesquisa) {
    pesquisa = pesquisa.toLowerCase()
    var i
    var permitidos = new Array()

    for (i = 0; i < itens.length; i++) {
      var Cadastrar = itens[i].name.toLowerCase().includes(pesquisa)
      if (Cadastrar) {
        permitidos.push(itens[i])
      } else {
        if (itens[i].children !== undefined && itens[i].children.length > 0) {
          if (this.filtrar(itens[i].children, pesquisa).length > 0) {
            permitidos.push(itens[i])
          }
        }
      }
    }

    return permitidos
  }
}
