import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { secretkeyMiddleware } from '@/middleware/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    beforeEnter: [secretkeyMiddleware]
  },
  {
    path: '/secret-keys',
    name: 'secret-keys',
    component: () => import('@/views/SecretKeysView.vue'),
  }
]


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
