import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import NavFood from '@/views/NavFood'
import Ranking from '@/components/Ranking'
import Me from '@/components/Me'
import IndexContent from '@/components/IndexContent'
import ProductContent from '@/components/ProductContent'
import CarList from '@/components/CarList'
import Oder from '@/components/Oder'
import Address from '@/components/Address'
import Pay from '@/components/Pay'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: NavFood,
      component: NavFood,
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index
        },
        {
          path: 'ranking',
          name: 'ranking',
          component: Ranking
        },{
          path: 'me',
          name: 'me',
          component: Me
        }
      ]
    },
    {
      path: '/indexContent',
      name: 'indexContent',
      component: IndexContent
    },
    {
      path: '/productContent',
      name: 'productContent',
      component: ProductContent
    },
    {
      path: '/carList',
      name: 'carList',
      component: CarList
    },
    {
      path:'/oders',
      name:'oders',
      component:Oder
    },
    {
      path:'/address',
      name:'address',
      component:Address
    },
    {
      path:'/pay',
      name:'pay',
      component:Pay
    }
  ]
})
