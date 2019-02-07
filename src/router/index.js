import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Ranking from '@/components/Ranking'
import Me from '@/components/Me'
import IndexContent from '@/components/IndexContent'
import ProductContent from '@/components/ProductContent'

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
    },
    {
      path:'/indexContent',
      name:'indexContent',
      component:IndexContent
    },
    {
      path:'/productContent:productId',
      name:'productContent',
      component:ProductContent
    }
  ]
})
