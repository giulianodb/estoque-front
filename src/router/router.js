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

// import apiCentralSeguranca from '@/api/centralseguranca'

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
      path: '/',
      name: 'inicial',
      component: Home,
      meta: {
        requiresAuth: false,
        groups: ['']
      }
    },
    {
      path: '/info',
      name: 'Informações',
      component: InformacoesLegais,
      meta: {
        requiresAuth: false,
        groups: ['']
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        breadcrumb: true,
        label: 'Página Inicial',
        requiresAuth: false,
        groups: ['']
      }
    },
    {
      path: '/aluno',
      name: 'aluno',
      component: Aluno,
      meta: {
        breadcrumb: true,
        label: 'Aluno / Incluir Aluno',
        requiresAuth: false,
        groups: ['']
      }
    },
    {
      path: '/editar_familia',
      name: 'editarFamilia',
      component: EditarFamilia,
      meta: {
        breadcrumb: true,
        label: 'Familia / Editar Família',
        requiresAuth: false,
        groups: ['']
      }
    },

    {
      path: '/listar_familia',
      name: 'listarFamilia',
      component: ListarFamilia,
      meta: {
        breadcrumb: true,
        label: 'Familia / Listar Família',
        requiresAuth: false,
        groups: ['']
      }
    },

    {
      path: '/familia/:idFamilia/crianca',
      name: 'criancaFamilia',
      component: CriancaFamilia,
      meta: {
        breadcrumb: true,
        label: 'Familia / Crianca',
        requiresAuth: false,
        groups: ['']
      }
    },
    {
      path: '/crianca/:idCrianca/avaliacao_contexto',
      name: 'avaliacaoContexto',
      component: AvaliacaoContexto,
      meta: {
        breadcrumb: true,
        label: 'Crianca / Avaliacao Contexto',
        requiresAuth: false,
        groups: ['']
      }
    },
    {
      path: '/crianca/:idCrianca/atendimento',
      name: 'Atendimento',
      component: Atendimento,
      meta: {
        breadcrumb: true,
        label: 'Crianca / Atendimento',
        requiresAuth: false,
        groups: ['']
      }
    },
    {
      path: '/crianca',
      name: 'crianca',
      component: Crianca,
      meta: {
        breadcrumb: true,
        label: 'Crianca',
        requiresAuth: false,
        groups: ['']
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
  store.commit('setMessages', null)
  store.commit('setLayout', 'admin')
  // public access
  next()
})

export default router
