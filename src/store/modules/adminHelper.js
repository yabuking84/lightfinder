import axios from 'axios'
import router from '@/router'

import config from '@/config/index'

const state = {

  api: {

    /*
    	get countries
    */

    get: {

      getCountries: {
        url: config.main,.apiURL
      }

    },

  },

  token: localStorage.getItem('access_token') || null,
  axios: {

    config: {

      headers: { 'Authorization': "bearer" + (localStorage.getItem('access_token') || null) }

    }
  }
}


const getters = {

}

const mutations = {

}

const actions = {


}



export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
