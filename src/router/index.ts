import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        layout: 'default'
      },
      component: HomeView,
    },
    {
      path: '/movies/:id',
      name: 'movie-detail',
      meta: {
        layout: 'empty'
      },
      component: () => import('../views/MovieDetailView.vue')
    },
    {
      path: '/my-tickets',
      name: 'MyTickets',
      meta: {
        layout: 'default'
      },
      component: () => import('../views/MyTickets.vue')
    }
  ]
})

export default router
