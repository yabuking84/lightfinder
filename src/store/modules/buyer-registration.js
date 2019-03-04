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
			url: 	'http://192.168.1.200:8000/v1/register'
		}

		/*
			post single supplier
		*/

		post: {
			method: 'post',
			url: 	'http://192.168.1.200:8000/v1/register'
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


}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	
}


