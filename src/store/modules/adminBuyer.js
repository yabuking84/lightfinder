/*
	
*/

import axios from 'axios';
import router from '@/router';

import config from '@/config/index';

const state =  {

	api: {
		
		
		get: {

			/*
				get all buyer
			*/

			method:  'get',
			getAllBuyer: {
				url 	: 'http://192.168.1.200:8000/v1/admin/buyers'
			
			},


			/*
				get single buyer
			*/
		

			getBuyer: {
				url 	: 'http://192.168.1.200:8000/v1/admin/buyers'

			},


			
		},

		
		
		post: {


			method:  'post',


			/*
			    post single buyer
			*/

			addBuyer: {
				url 	: 'http://192.168.1.200:8000/v1/admin/buyers'

			}

		},


		/* PATCH */

		patch: {

			method: 'patch',

			/* patch single buyer */

			editBuyer: {
				url 	: 'http://192.168.1.200:8000/v1/admin/buyers'
			}
		},



		/* DELETE */


		delete: {


			method: 'delete',

			/* delete single buyer */

			deleteBuyer: {

				url 	 : 'http://192.168.1.200:8000/v1/admin/buyers'

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
				url 	: state.api.get.getBuyer.url + '/' + data.data.id ,
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
				data 	: JSON.stringify(data.data)
				
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


	/* PATCH */


   updateBuyer_a(context, data) {

   		return new Promise((resoleve, reject) => {

	   			var headers = {
					token:localStorage.access_token,
	              	"content-type": "application/json",
				};

				axios({

					method	: state.api.patch.method,
					url     : state.api.patch.editBuyer.url + "/" + data.id,
					headers : headers,
					data 	: JSON.stringify(data.data)
					
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

   		})

   },




}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	
}


