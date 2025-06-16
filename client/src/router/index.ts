// @ts-nocheck
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Room from '../components/Room.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/:id',
      component: Room,
    },
  ],
})

export default router
