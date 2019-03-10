
import axios from 'axios'
import router from '@/router'

import config from '@/config/index'


let base_url = 'http://192.168.1.200:8000';

const state =  {

	api: {
		
		/* GET */
		
		get: {
				
				method: 'get',

				getAllInquiries: {
					
					url 	: base_url + `/v1/admin/inquiries`

				},

				getInquiry: {

					url 	: base_url + `/v1/admin/inquiries`
				}

		},


		/* POST */

		post: {



		},


		/* PUT */

		put: {

			/* APPROVED INQUIRY */

			method: 'put',

			approvedInquiry: {

				url 	: base_url + `/v1/admin/inquiries`

			},


			/* DECLINED INQUIRY */

			declinedInquiry: {

				url 	: base_url + `/v1/admin/inquiries`

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



const getters = {


}




const mutations = {


}



const actions = {


	/* GET  */



	getInquiry_a(context, data) {

			return new Promise((resolve, reject) => {

				var headers = { token: localStorage.access_token }


					axios({

						method	: state.api.get.method,
						url 	: state.api.get.getInquiry.url + '/' + data.data.id ,
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




	getAllInquiries_a() {


			return new Promise((resolve, reject) => {

				var headers = { token: localStorage.access_token }


					axios({

						method	: state.api.get.method,
						url 	: state.api.get.getAllInquiries.url,
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














	/* PUT  */



	approvedInquiry_a() {


			return new Promise((resolve, reject) => {

				var headers = { token: localStorage.access_token }


					axios({

						method	: state.api.put.method,
						url 	: state.api.put.approvedInquiry.url + '/' + data.id + '/evaluation',
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




	declinedInquir_a() {

		return new Promise((resolve, reject) => {

				var headers = { token: localStorage.access_token }


					axios({

						method	: state.api.put.method,
						url 	: state.api.put.declinedInquiry.url +'/'+ data.id + '/evaluation',
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



	}







}



export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	
}