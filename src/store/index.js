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
// import adminHelper from './modules/adminHelper'
import admnByr from './modules/AdminBuyer'
import admnSpplr from './modules/AdminSupplier'
import admnInq from './modules/AdminInquiries'

import byrMyHm from './modules/BuyerMyHome'

import inq from './modules/Inquiry'

import sckts from './modules/Sockets'
import ntfctns from './modules/Notifications'

import msg from './modules/Messaging'
 
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
    sckts,
    msg,
    ntfctns,
    cat,
    inq,
    byrInq,
    byrMyHm,
    spplrInq,
    admnByr,
    admnSpplr,
    admnInq

  }
})
