import axios from 'axios'
import router from '@/router'

import config from '@/config/index'


const state =  {

	api: {
		
		/*
			get countries
		*/
		
		get: {
			
			getInquiries: {
				url: ''
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

	getInquiries(context) {
		return new Promise((resolve, reject) => {

			axios({
				method: "GET",
				url: state.api.get.getInquiries
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			})

		}); 
	},

	// get





}



export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	
}
