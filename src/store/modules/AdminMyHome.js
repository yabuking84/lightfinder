import axios from 'axios';
import router from '@/router'

import config from '@/config/index'
import {projectsTest,filesTest,itemsTest} from '@/data/ProjectDummyData'

const base_url = config.main.apiURL;

const state = {
	api: {
		addProject: {
			method  : 'post',
			url     : base_url+'/v1/admin/projects',
		},
		getProjects: {
			method  : 'get',
			url     : base_url+'/v1/admin/projects',
		},
		getProject: {
			method  : 'get',
			url     : base_url+'/v1/admin/projects',
		},
		editProject: {
			method  : 'patch',
			url     : base_url+'/v1/admin/projects',
		},
		getQuotations: {
			method  : 'get',
			url     : base_url+'/v1/admin/projects',
			url2    : 'quotations',
		},
		getQuotation: {
			method  : 'get',
			url     : base_url+'/v1/admin/projects',
			url2    : 'quotations',
		},
		editQuotation: {
			method  : 'patch',
			url     : base_url+'/v1/admin/projects',
			url2    : 'quotations',
		},
		createQuotation: {
			method  : 'post',
			url     : base_url+'/v1/admin/projects',
			url2    : 'quotations',
		},
	},

}


const mutations = {



}
	
const actions = {


	getProjects_a(context, data){
		return new Promise((resolve, reject) => {

			var headers = {token:localStorage.access_token};
			axios({
				method: state.api.getProjects.method,
				url: state.api.getProjects.url,
				headers: headers,
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				console.log('error',error);
				// if(actions.checkToken(error)) {                
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})


			// resolve(projectsTest);

		});
	},

	getProject_a(context, data){
		return new Promise((resolve, reject) => {

			var headers = {token:localStorage.access_token};

			axios({
				method: state.api.getProject.method,
				url: state.api.getProject.url+"/"+data.proj_id,
				headers: headers,
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				console.log('error getInquiries_a',error);
				// if(actions.checkToken(error)) {                
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})


			// resolve(projectsTest[0]);

		});
	},


	editProject_a(context, data){
		return new Promise((resolve, reject) => {

			var headers = {
				token:localStorage.access_token,
				"content-type": "application/json",
			};

			axios({
				method: state.api.editProject.method,
				url: state.api.editProject.url+'/'+data.proj_id,
				headers: headers,
				data: JSON.stringify(data.formData)
			})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				console.log('error ',error);
				// if(actions.checkToken(error)) {                
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})


		});
	},


	createQuotation_a(context,data) {
		return new Promise((resolve,reject)=>{
			var headers = {
				token:localStorage.access_token,
				"content-type": "application/json",
			};

			axios({
				method: state.api.createQuotation.method,
				url: state.api.createQuotation.url+"/"+data.proj_id+"/"+state.api.createQuotation.url2,
				headers: headers,
				data: JSON.stringify(data.formData),
			})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				console.log('error getInquiries_a',error);
				// if(actions.checkToken(error)) {                
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})



		});
	},

	editQuotation_a(context,data) {
		return new Promise((resolve,reject)=>{
			var headers = {
				token:localStorage.access_token,
				"content-type": "application/json",
			};

			axios({
				method: state.api.editQuotation.method,
				url: state.api.editQuotation.url+"/"+data.proj_id+"/"+state.api.editQuotation.url2+"/"+data.rev_id,
				headers: headers,
				data: JSON.stringify(data.formData),
			})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				console.log('error getInquiries_a',error);
				// if(actions.checkToken(error)) {                
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})



		});
	},



	getQuotations_a(context, data){
		return new Promise((resolve, reject) => {
			var headers = {token:localStorage.access_token};
			axios({
				method: state.api.getQuotations.method,
				url: state.api.getQuotations.url+"/"+data.proj_id+"/"+state.api.getQuotations.url2,
				headers: headers,
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				console.log('error',error);
				// if(actions.checkToken(error)) {                
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})

			// resolve(itemsTest);

		});
	},

	getQuotation_a(context, data){
		return new Promise((resolve, reject) => {
			var headers = {token:localStorage.access_token};
			axios({
				method: state.api.getQuotation.method,
				url: state.api.getQuotation.url+"/"+data.proj_id+"/"+state.api.getQuotation.url2+"/"+data.rev_id,
				headers: headers,
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				console.log('error',error);
				// if(actions.checkToken(error)) {                
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})

			// resolve(itemsTest);

		});
	},

	getOrderedSamples_a(context, data){
		return new Promise((resolve, reject) => {
			// var headers = {token:localStorage.access_token};
			// var stage_id = (data && data.stage_id)?"stage_id="+data.stage_id:"";
			// var with_bids = (data && data.with_bids)?"with_bids="+data.with_bids:"";

			// axios({
			// 	method: state.api.getInquiries.method,
			// 	url: state.api.getInquiries.url+"?"+stage_id+"&"+with_bids,
			// 	headers: headers,
			// })
			// .then(response => {
			// 	resolve(response.data);
			// })
			// .catch(error => {
			// 	console.log('error getInquiries_a',error);
			// 	// if(actions.checkToken(error)) {                
			// 	if(context.dispatch('checkToken',error)) {
			// 		reject(error);
			// 	}
			// })

			resolve(itemsTest);

		});
	},

	checkToken(context,error){

		if(typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
			console.log("EXPIRED");
			router.push({'name': 'Logout'})
		}
		else {
			// reject(error);
			return true;
		}
	},


}


const getters = {

}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	
}






// Admin Buyanylight

// Supplier Buyanylight

// Buyer Buyanylight
// info@bal.com






// {   
//     uuid,
//     token,
//     user: {     
//         firstname,
//         lastname,
//         email,
//         role,
//         avatar,
//     },
// }