/*
	
*/

import axios from 'axios';
import router from '@/router';

import config from '@/config/index';

const state =  {

	api: {
		
		/*
			get single buyer
		*/
		
		get: {
			method: 'get',
			url: 	'http://192.168.1.200:8000/v1/login'
		},

		
		/*
		    post single buyer
		*/
		
		post: {
			method: 'post',
			url: 	'http://192.168.1.200:8000/v1/login'
		},

		




	},

	token: localStorage.getItem('access_token') || null;

	axios: {

		config: {

			headers: { 'Authorization': "bearer" + (localStorage.getItem('access_token') || null) }

		}
	}
}


const mutations = {

}


const actions = {

	getBuyer() {

		return new Promise((resolve, reject) => {

			axios({

				method : state.api.get.method, 
				url    : state.api.get.url

			})
			.then(response => {
				resolve(response.data);
			})	
			.catch(error => {
				reject(error)
			})

		})
	},


	postBuyer() {

		return new Promise((resolve, reject) => {

			axios({
				method	: state.api.post.method,
				url     : state.api.post.url
			})
			.then(response => {	
				resolve(response.data);
			})
			.catch(response => {
				reject(error)
			})

		})

	},


	getCountries() {

		return new Promise(() => {

		})

	},


	getAllBuyer() {

		return new Promise((resolve, reject) => {
				
			axios({
				method	: state.api.post.method,
				url 	: state.api.post.url

			})

		})

	}

}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	
}


