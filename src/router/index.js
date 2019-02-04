import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Ranking from '@/components/Ranking'
import Me from '@/components/Me'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/index',
      component: Index,
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/me',
      name: 'me',
      component: Me
    }
  ]
})
