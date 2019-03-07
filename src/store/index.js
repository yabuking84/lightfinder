import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import navigation from './modules/navigation'
import swatch from './modules/swatch'

// import axios from 'axios';
import auth from './modules/auth'
import cat from './modules/category'
import byrInq from './modules/BuyerInquiry'
import spplrInq from './modules/SupplierInquiry'
import adminHelper from './modules/adminHelper'
import adminBuyer from './modules/adminBuyer'
import adminSupplier from './modules/adminSupplier'
import adminInquiries from './modules/adminInquiries'
 
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {},
  getters,
  mutations,
  actions,
  modules: {
    navigation,
    swatch,
    auth,
    cat,
    byrInq,
    spplrInq,
    adminHelper,
    adminBuyer,
    adminSupplier,
    adminInquiries

  }
})
