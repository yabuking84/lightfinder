/*
	
*/

import axios from 'axios'
import router from '@/router'

import config from '@/config/index'
const base_url = config.main.apiURL;

const state = {

	api: {

		/*
			get single supplier
		*/

		get: {
			method: 'get',
			url: 	base_url+'/v1/register'
		}

		/*
			post single supplier
		*/

		post: {
			method: 'post',
			url: 	base_url+'/v1/register'
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


