import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'overview',
      component: () => import('../pages/OverviewPage.vue'),
    },
    {
      path: '/shipments',
      name: 'shipments',
      component: () => import('../pages/ShipmentsPage.vue'),
    },
    {
      path: '/carriers',
      name: 'carriers',
      component: () => import('../pages/CarriersPage.vue'),
    },
    {
      path: '/regional',
      name: 'regional',
      component: () => import('../pages/RegionalPage.vue'),
    },
    {
      path: '/exceptions',
      name: 'exceptions',
      component: () => import('../pages/ExceptionsPage.vue'),
    },
  ],
})

export default router
