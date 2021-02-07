import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: () => import('@buy/components/HomePage.vue')
  },
  {
    path: '/with-router',
    name: 'with-router',
    component: () => import('@buy/components/WithRouter.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
