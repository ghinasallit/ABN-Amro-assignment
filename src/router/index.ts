import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/show/:id(\\d+)',
      name: 'show',
      component: () => import('../pages/DetailsPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../pages/NotFoundPage.vue'),
    },
  ],

  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
