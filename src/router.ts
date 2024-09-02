import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from './utils/auth'
import {
  NavigationGuardNext,
  RouteLocationNormalizedLoadedGeneric,
  RouteLocationNormalizedGeneric
} from 'vue-router'

const redirectIfNotAuthenticated = (
  to: RouteLocationNormalizedLoadedGeneric,
  from: RouteLocationNormalizedGeneric,
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
      component: () => import('./views/OrdersView.vue'),
      beforeEnter: (to, from, next) => {
        redirectIfNotAuthenticated(to, from, next)
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/LoginView.vue'),
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next({ name: 'home' })
        } else {
          next()
        }
      }
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
