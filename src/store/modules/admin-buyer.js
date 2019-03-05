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
			url: 	'http://192.168.1.200:8000/v1/admin/buyers'
		},

		
		/*
		    post single buyer
		*/
		
		post: {
			method: 'post',
			url: 	'http://192.168.1.200:8000/v1/admin/buyers'
		},

		




	},

	token: localStorage.getItem('access_token') || null,
	axios: {

		config: {

			headers: { 'Authorization': "bearer" + (localStorage.getItem('access_token') || null) }

		}
	}
}


const mutations = {

}



const getters = {

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


	postBuyer(context,data) {

		return new Promise((resolve, reject) => {

			var headers = {
				token:localStorage.access_token,
              	"content-type": "application/json",
			};

			axios({

				method	: state.api.post.method,
				url     : state.api.post.url,
				headers : headers,
				data 	: JSON.stringify(data)
				
			})
			.then(response => {	
				resolve(response.data);
			})
			.catch(error => {
				  
				  if(typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
	                    console.log("EXPIRED")
	                    router.push({'name': 'Logout'})
	                } else {
	                    console.log("normal error!")
	                    reject(error)
	                }

			});

		});

	},


	getCountries() {

		return new Promise(() => {

		})

	},


	// getAllBuyer() {

	// 	return new Promise((resolve, reject) => {
				
	// 		axios({
	// 			method	: state.api.post.method,
	// 			url 	: state.api.post.url

	// 		})

	// 	})

	// }

}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	
}


