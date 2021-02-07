import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: () => import('@pc/components/HomePage.vue')
  },
  {
    path: '/with-router',
    name: 'with-router',
    component: () => import('@pc/components/WithRouter.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
