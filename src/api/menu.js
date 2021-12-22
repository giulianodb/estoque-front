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
      name: 'Menu principal',
      url: '#',
      icon: 'fas fa-chalkboard-teacher',

      children: [
        {
          name: 'Menu filho',
          url: '/serie'

        }
      ]
    }
  ],

  itensAcesso (itens) {
    var i
    var permitidos = new Array()

    var tokenGrupos = apiCentralSeguranca.decodeJwtToken(store.getters.getJwtToken).groups

    for (i = 0; i < itens.length; i++) {
      if (itens[i].groups === undefined || itens[i].groups.length === 0) {
        if (itens[i].children !== undefined) {
          itens[i].children = this.itensAcesso(itens[i].children)
        }
        permitidos.push(itens[i])
      } else {
        var y
        for (y = 0; y < tokenGrupos.length; y++) {
          if (itens[i].groups.includes(tokenGrupos[y])) {
            if (itens[i].children !== undefined) {
              itens[i].children = this.itensAcesso(itens[i].children)
            }
            permitidos.push(itens[i])
            break
          }
        }
      }
    }

    return permitidos
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
