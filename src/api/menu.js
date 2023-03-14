/* eslint-disable no-array-constructor */
import store from '@/store/store'
import apiCentralSeguranca from '@/api/centralseguranca'

export default {
  itens: [

    {
      name: 'Inicial',
      url: '/home',
      icon: 'fas fa-chart-line',
      groups: ['ROLE_Administrador','ROLE_AssistenteSocial','ROLE_Estoque']
    },

    {
      name: 'Familia',
      url: '#',
      icon: 'fas fa-users',
      groups: ['ROLE_Administrador','ROLE_AssistenteSocial'],
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
      groups: ['ROLE_Administrador','ROLE_AssistenteSocial'],
      children: [
        {
          name: 'Listar Criança',
          url: '/crianca'

        }
      ]
    },
    {
      name: 'Inscrição',
      url: '#',
      icon: 'fas fa-folder-open', 
      groups: ['ROLE_Administrador','ROLE_AssistenteSocial'],
      children: [
        {
          name: 'Listar Inscrição',
          url: '/inscricao'

        }
      ]
    },
    {
      name: 'Produto',
      url: '#',
      icon: 'fas fa-users',
      groups: ['ROLE_Administrador','ROLE_Estoque'],
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
    groups: ['ROLE_Administrador','ROLE_Estoque'],
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
    groups: ['ROLE_Administrador','ROLE_Estoque'],
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
    groups: ['ROLE_Administrador','ROLE_Estoque'],
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
    var i
    var permitidos = new Array()

    var token = apiCentralSeguranca.decodeJwtToken(store.getters.getJwtToken)
    if (token != null) {
      var tokenGrupos = token.groups

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
