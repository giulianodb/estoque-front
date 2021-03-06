import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import Home from '@/views/home/Home.vue'
import Aluno from '@/views/aluno/Aluno.vue'
import EditarFamilia from '@/views/familia/EditarFamilia.vue'

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
