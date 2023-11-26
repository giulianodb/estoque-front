import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import Home from '@/views/home/Home.vue'
import Aluno from '@/views/aluno/Aluno.vue'
import EditarFamilia from '@/views/familia/EditarFamilia.vue'
import ListarFamilia from '@/views/familia/ListarFamilia.vue'
import CriancaFamilia from '@/views/familia/CriancaFamilia.vue'
import Crianca from '@/views/crianca/Crianca.vue'
import AvaliacaoContexto from '@/views/familia/components/crianca/AvaliacaoContexto'
import Atendimento from '@/views/atendimento/Atendimento'
import PlanoFamiliar from '@/views/plano_familiar/PlanoFamiliar'
import SituacaoIdentificada from '@/views/situacao/Situacao'
import InscricaoCrianca from '@/views/inscricao/InscricaoCrianca'
import Inscricao from '@/views/inscricao/Inscricao'
import Login from '@/views/login/Login'
import FluxoCaixa from '@/views/conta/FluxoCaixa'
import Conta from '@/views/conta/Conta'
import Razao from '@/views/conta/Razao'
import ListarEmpresa from '@/views/empresa/ListarEmpresa'
import EditarEmpresa from '@/views/empresa/EditarEmpresa'

import apiCentralSeguranca from '@/api/centralseguranca'

// error pages
import AccessDenied from '@/layout/errors/Deny'
import NotFound from '@/layout/errors/NotFound'

// Informações legais
const InformacoesLegais = () => import('@/views/info/Info')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false,
        groups: []
      }
    },
    {
      path: '/',
      name: 'inicial',
      component: Home,
      meta: {
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_AssistenteSocial','ROLE_Estoque','ROLE_Financeiro']
      }
    },
    {
      path: '/info',
      name: 'Informações',
      component: InformacoesLegais,
      meta: {
        requiresAuth: false,
        groups: []
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        breadcrumb: true,
        label: 'Página Inicial',
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_AssistenteSocial','ROLE_Estoque','ROLE_Financeiro']
      }
    },
    {
      path: '/aluno',
      name: 'aluno',
      component: Aluno,
      meta: {
        breadcrumb: true,
        label: 'Aluno / Incluir Aluno',
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_AssistenteSocial','ROLE_Estoque']
      }
    },
    {
      path: '/editar_familia',
      name: 'editarFamilia',
      component: EditarFamilia,
      meta: {
        breadcrumb: true,
        label: 'Familia / Editar Família',
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_AssistenteSocial']
      }
    },

    {
      path: '/listar_familia',
      name: 'listarFamilia',
      component: ListarFamilia,
      meta: {
        breadcrumb: true,
        label: 'Familia / Listar Família',
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_AssistenteSocial']
      }
    },

    {
      path: '/familia/:idFamilia/crianca',
      name: 'criancaFamilia',
      component: CriancaFamilia,
      meta: {
        breadcrumb: true,
        label: 'Familia / Crianca',
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_AssistenteSocial']
      }
    },
    {
      path: '/familia/:idFamilia/plano_acao_familiar',
      name: 'planoFamiliar',
      component: PlanoFamiliar,
      meta: {
        breadcrumb: true,
        label: 'Família / Plano ação familiar',
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_AssistenteSocial']
      }
    },
    {
      path: '/familia/:idFamilia/situacao_identificada_com_a_familia',
      name: 'situacaoIdentificada',
      component: SituacaoIdentificada,
      meta: {
        breadcrumb: true,
        label: 'Família / Situação identificada com a família',
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_AssistenteSocial']
      }
    },
    {
      path: '/crianca/:idCrianca/avaliacao_contexto',
      name: 'avaliacaoContexto',
      component: AvaliacaoContexto,
      meta: {
        breadcrumb: true,
        label: 'Crianca / Avaliacao Contexto',
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_AssistenteSocial']
      }
    },
    {
      path: '/crianca/:idCrianca/atendimento',
      name: 'Atendimento',
      component: Atendimento,
      meta: {
        breadcrumb: true,
        label: 'Crianca / Atendimento',
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_AssistenteSocial']
      }
    },
    {
      path: '/crianca/:idCrianca/inscricao',
      name: 'Inscrição',
      component: InscricaoCrianca,
      meta: {
        breadcrumb: true,
        label: 'Crianca / Inscricao Crianca',
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_AssistenteSocial']
      }
    },
    {
      path: '/crianca',
      name: 'crianca',
      component: Crianca,
      meta: {
        breadcrumb: true,
        label: 'Crianca',
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_AssistenteSocial']
      }
    },
    {
      path: '/inscricao',
      name: 'inscricao',
      component: Inscricao,
      meta: {
        breadcrumb: true,
        label: 'Inscrição',
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_AssistenteSocial']
      }
    },
    {
      path: '/fluxo_caixa',
      name: 'fluxoCaixa',
      component: FluxoCaixa,
      meta: {
        breadcrumb: true,
        label: 'Fluxo de caixa',
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_Financeiro']
      }
    },

    {
     path: '/conta',
      name: 'conta',
      component: Conta,
      meta: {
        breadcrumb: true,
        label: 'Conta',
        requiresAuth: true,
        groups: ['ROLE_Administrador','ROLE_Financeiro']
      }
    },
    {
      path: '/razao',
       name: 'razao',
       component: Razao,
       meta: {
         breadcrumb: true,
         label: 'Razão',
         requiresAuth: true,
         groups: ['ROLE_Administrador','ROLE_Financeiro']
       }
     },

     {
      path: '/empresa/listar',
       name: 'listarEmpresa',
       component: ListarEmpresa,
       meta: {
         breadcrumb: true,
         label: 'ListarEmpresa',
         requiresAuth: true,
         groups: ['ROLE_Administrador','ROLE_Financeiro','ROLE_Estoque']
       }
     },

     {
      path: '/empresa/editar',
       name: 'editarEmpresa',
       component: EditarEmpresa,
       meta: {
         breadcrumb: true,
         label: 'EditarEmpresa',
         requiresAuth: true,
         groups: ['ROLE_Administrador','ROLE_Financeiro','ROLE_Estoque']
       }
     },


     

    // error pages
    {
      path: '/accessdenied',
      name: 'AccessDenied',
      component: AccessDenied,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/*',
      name: 'NotFound',
      components: {
        secundario: NotFound,
        default: NotFound
      },
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {

 // protected access
 if (to.meta.requiresAuth) {
  (async () => {
    if (await store.dispatch('authFilter')) {
      if (store.getters.isAuthenticated === true) {
        if (to.path === '/') {
          store.commit('setLayout', 'admin')
          next('/home')
        }
        // permission groups
        if (to.meta.groups && to.meta.groups.length > 0) {
          let userData = apiCentralSeguranca.decodeJwtToken(store.getters.getJwtToken)

          if (userData.groups) {
            let permission = false; let groupName = ''
            for (let i = 0; i < userData.groups.length; i++) {
              groupName = userData.groups[i]
              if (to.meta.groups.indexOf(groupName) !== -1) {
                permission = true
                break
              }
            }
            if (to.meta.groups === ['']) {
              permission = true
            }
            if (permission) { // permission granted
              store.commit('setLayout', 'admin')
              next()
            } else { // permission denied
              console.log("sem permission")
              store.commit('setLayout', 'blank')
              next('/accessdenied')
            }
          // eslint-disable-next-line brace-style
          }
          // Sem grupos para função que exige grupo
          else {
            store.commit('setLayout', 'blank')
            console.log("sem permission 2")
            next('/accessdenied')
          }
        }
      } else {
        console.log("sem permission3")
        store.commit('limparJwtTokenState')
        store.commit('setLayout', 'blank')
        next('/accessdenied')
      }
    }
  else {
    console.log("FALSEEE") 
    store.commit('setLayout', 'blank')

    next('/login')
  }

  })()
} else {
  if (to.name === 'AccessDenied' || to.name === 'NotFound' || to.name === 'login') {
    store.commit('setLayout', 'blank')
  } else {
    store.commit('setLayout', 'admin')
  }
}

  
  
  // public access
  next()
})

export default router
