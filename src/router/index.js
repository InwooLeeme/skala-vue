import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from '@/views/WeatherHomeView.vue'
import WeatherAboutView from '@/views/WeatherAboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WeatherHomeView,
    },
    {
      path : '/about',
      name : 'about',
      component : WeatherAboutView
    }
  ],
})

export default router
