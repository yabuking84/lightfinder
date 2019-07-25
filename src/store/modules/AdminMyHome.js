import axios from 'axios';
import router from '@/router'

import config from '@/config/index'
import {projectsTest,filesTest,itemsTest} from '@/data/ProjectDummyData'

const base_url = config.main.apiURL;

const state = {
	api: {

		getProjects: {
			method  : 'get',
			url     : base_url+'/v1/admin/projects',
		},
		getProject: {
			method  : 'get',
			url     : base_url+'/v1/admin/projects',
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

	getProjectFiles_a(context, data){
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

			resolve(filesTest);

		});
	},

	getSamples_a(context, data){
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



	getItems_a(context, data){
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
				data: data.formData,
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