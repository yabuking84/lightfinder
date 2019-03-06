import axios from 'axios'
import router from '@/router'

import config from '@/config/index'

const state =  {

	api: {
		
		/*
			get countries
		*/
		
		get: {
			
				getCountries: {
					url: 'http://192.168.1.200:8000/v1/countries'
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

	getCountries(context) {

		return new Promise((resolve, reject) => {

				axios({
					method  : 'GET',
					url 	: state.api.get.getCountries.url
				})
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error);
				})

	 	});
    }

}



export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	
}
