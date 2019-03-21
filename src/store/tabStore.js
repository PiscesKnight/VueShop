import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navTab: [],
    tabIndex:0
  },
  plugins: [createPersistedState()],
  mutations: {
    getTab(state, navTab) {
      state.navTab = navTab;
    },
    getTabIndex(state,index){
      state.tabIndex = index
    }
  },
  getters: {}

})

