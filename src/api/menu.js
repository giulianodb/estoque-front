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
      name: 'Familia',
      url: '#',
      icon: 'fas fa-users',

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
    },
    {
      name: 'Criança',
      url: '#',
      icon: 'fas fa-child', 

      children: [
        {
          name: 'Listar Criança',
          url: '/crianca'

        }
      ]
    },
    {
      name: 'Produto',
      url: '#',
      icon: 'fas fa-users',

      children: [
        {
          name: 'Listar produtos',
          url: '/'

        },
        {
          name: 'Cadastrar produtos',
          url: '/'
        } ,
        {
          name: 'Entrada produto',
          url: '/'
        } ,
        {
          name: 'Saída produto',
          url: '/'
        } ,
        {
          name: 'Listar movimentações',
          url: '/'
        },
        {
          name: 'Pesquisar recibo',
          url: '/'
        }
      ]
    } ,
    { 
    name: 'Campanha',
    url: '#',
    icon: 'fas fa-users',

    children: [
      {
        name: 'Listar campanhas',
        url: '/'

      },
      {
        name: 'Cadastrar campanhas',
        url: '/'
      } 
      
    ]
  } ,
  { 
    name: 'Instituição',
    url: '#',
    icon: 'fas fa-users',

    children: [
      {
        name: 'Listar instituição',
        url: '/'

      },
      {
        name: 'Cadastrar instituição',
        url: '/'
      } 
      
    ]
  } ,
  { 
    name: 'Relatórios',
    url: '#',
    icon: 'fas fa-users',

    children: [
      {
        name: 'Relatório 1',
        url: '/'

      },
      {
        name: 'Relatórios 2',
        url: '/'
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
