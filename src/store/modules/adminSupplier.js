/*
	
*/

import axios from 'axios'
import router from '@/router'

import config from '@/config/index'

const state = {

	api: {

		/*
			get single supplier
		*/

		get: {
			method: 'get',
			url: 	'http://192.168.1.200:8000/v1/login'
		}

		/*
			post single supplier
		*/

		post: {
			method: 'post',
			url: 	'http://192.168.1.200:8000/v1/login'
		}


		






	},
	
	token: localStorage.getItem('access_token') || null,
	
	axios: {

		config: {
			headers: {'Authorization': "bearer" + (localStorage.getItem('access_token') || null ) }
		}
	},


}

const actions = {

	getSupplier() {

		return new Promise((resolve, reject) => {
			axios({
				method	: state.api.get.method,
				url 	: state.api.get.url
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(response => {
				reject(error);
			})
		});
	},


	postSupplier() {

		return new Promise((resolve, reject) => {
			axios({
				method 	: state.api.post.method,
				url 	: state.api.post.url
			}).
			then(response => {
				resolve(response.data);
			})
			.catch(response => {
				reject(error);
			})

		});
	},

	getCountries() {

	},

	getAllSupplier() {

	}

}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	
}


