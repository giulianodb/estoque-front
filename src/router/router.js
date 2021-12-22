import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import Home from '@/views/home/Home.vue'
import Serie from '@/views/serie/Serie.vue'

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
      path: '/',
      name: 'inicial',
      component: Home,
      meta: {
        requiresAuth: true,
        groups: ['VJE-Administrador', 'VJE-Coordenacao', 'VJE-Aluno', 'VJE-Professor', 'VJE-Secretaria']
      }
    },
    {
      path: '/info',
      name: 'Informações',
      component: InformacoesLegais,
      meta: {
        requiresAuth: true,
        groups: ['VJE-Administrador', 'VJE-Coordenacao', 'VJE-Aluno', 'VJE-Professor', 'VJE-Secretaria']
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
        groups: ['VJE-Administrador', 'VJE-Coordenacao', 'VJE-Aluno', 'VJE-Professor', 'VJE-Secretaria']
      }
    },
    {
      path: '/serie',
      name: 'serie',
      component: Serie,
      meta: {
        breadcrumb: true,
        label: 'Coordenação / Incluir Serie',
        requiresAuth: true,
        groups: ['VJE-Administrador', 'VJE-Coordenacao']
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
