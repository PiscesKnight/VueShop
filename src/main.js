// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import Vuelazyload from 'vue-lazyload'
import vueLayer from 'vue2-layer-mobile'

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.use(Vuelazyload)
Vue.use(vueLayer)

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
