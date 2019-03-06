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

			method:  'get',
			getAllBuyer: {
				url 	: 'http://192.168.1.200:8000/v1/admin/buyers'
			
			},

			getBuyer: {
				url 	: 'http://192.168.1.200:8000/v1/admin/buyers'

			},


			
		},

		
		/*
		    post single buyer
		*/
		
		post: {


			method:  'post',

			addBuyer: {
				url 	: 'http://192.168.1.200:8000/v1/admin/buyers'

			}

		},

		patch: {

			method: 'patch',
			editBuyer: {
				url 	: 'http://192.168.1.200:8000/v1/admin/buyers'

			}
		}

		




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


	getBuyer_a(context, data) {

		return new Promise((resolve, reject) => {

			var headers = { token: localStorage.access_token }

			axios({

				method	: state.api.get.method,
				url 	: state.api.get.getBuyer.url + '/' + data.user_id ,
				headers : headers

			})
			.then(response => {

				resolve(response.data);

			})
			.catch(error => {

				if(typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {

                    console.log("EXPIRED");
                    router.push({'name': 'Logout'})
                    
                } else {

                    reject(error);

                }

			})


		});
	},


	getAllBuyer_a() {

		return new Promise((resolve, reject) => {

			var headers = { token: localStorage.access_token }

			axios({

				method	: state.api.get.method,
				url 	: state.api.get.getAllBuyer.url,
				headers : headers

			})
			.then(response => {

				resolve(response.data);

			})
			.catch(error => {

				if(typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {

                    console.log("EXPIRED");
                    router.push({'name': 'Logout'})

                } else {

                    reject(error);

                }

			})


		});

	},


	/* POST */


	postBuyer_a(context,data) {

		return new Promise((resolve, reject) => {

			var headers = {
				token:localStorage.access_token,
              	"content-type": "application/json",
			};

			axios({

				method	: state.api.post.method,
				url     : state.api.post.addBuyer.url,
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



}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	
}


