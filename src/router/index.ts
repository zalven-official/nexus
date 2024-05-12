import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/chatbot',
    name: 'chatbot',
    component: () => import('@/views/ChatBotView.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
