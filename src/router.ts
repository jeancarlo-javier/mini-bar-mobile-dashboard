import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from './utils/auth'
import { NavigationGuardNext, RouteLocationNormalizedLoadedGeneric, RouteLocationNormalizedGeneric } from 'vue-router'

const redirectIfNotAuthenticated = (
  _: RouteLocationNormalizedLoadedGeneric,
  __: RouteLocationNormalizedGeneric,
  next: NavigationGuardNext
) => {
  if (!isAuthenticated()) {
    next({ name: 'login' })
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/HomeView.vue'),
      beforeEnter: redirectIfNotAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/LoginView.vue'),
      beforeEnter: (_, __, next) => {
        if (isAuthenticated()) {
          next({ name: 'home' })
        } else {
          next()
        }
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('./views/OrdersView.vue'),
      beforeEnter: redirectIfNotAuthenticated
    },
    {
      path: '/order-items',
      name: 'order-items',
      component: () => import('./views/OrderItems.vue'),
      beforeEnter: redirectIfNotAuthenticated
    },
    {
      path: '/orders/:orderId',
      name: 'order-details',
      component: () => import('./views/OrderDetailsView.vue'),
      beforeEnter: (to, from, next) => {
        redirectIfNotAuthenticated(to, from, next)
      }
    }
  ]
})

export default router
