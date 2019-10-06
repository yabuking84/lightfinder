import axios from 'axios';
import router from '@/router'

import config from '@/config/index'
import {projectsTest,filesTest,itemsTest} from '@/data/ProjectDummyData'
import { groupBy, omit, mapValues } from 'lodash'

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

		getOrderedSamples: {
			method  : 'get',
			url     : base_url+'/v1/admin/projects',
			url2    : 'sample-order',
		},

		setOrderedSample: {
			method  : 'patch',
			url     : base_url+'/v1/admin/projects',
			url2    : 'sample-order',
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
			var headers = {
				token:localStorage.access_token
			};

			axios({
				method: state.api.getOrderedSamples.method,
				url: state.api.getOrderedSamples.url+"/"+data.proj_id+"/"+state.api.getOrderedSamples.url2+"?paid=1",
				headers: headers,
			})
			.then(response => {
				console.log(response.data);

				var orders = mapValues(
					groupBy(response.data, 'group_id'),
					clist => clist.map (
						order => {
							return {
								...order,
								loading: false,
							}
						}
					)
				);
				console.log(orders);

				resolve(orders);
			})
			.catch(error => {
				console.log('error getInquiries_a',error);
				// if(actions.checkToken(error)) {
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})

			// resolve(itemsTest);

		});
	},

	setOrderedSample_a(context, data){
		return new Promise((resolve, reject) => {
			var headers = {
				token:localStorage.access_token,
				"content-type": "application/json",				
			};

			axios({
				method: state.api.setOrderedSample.method,
				url: state.api.setOrderedSample.url+"/"+data.proj_id+"/"+state.api.setOrderedSample.url2+"/"+data.item_id,
				headers: headers,
				data: JSON.stringify({
					stage_id: data.stage_id
				}),
			})
			.then(response => {
				console.log(response);
				resolve(response);
			})
			.catch(error => {
				console.log('error getInquiries_a',error);
				// if(actions.checkToken(error)) {                
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})

			// resolve(itemsTest);

		});
	},



	getOrderedSamplesByGrpId_a(context, data){
		return new Promise((resolve, reject) => {
			var headers = {
				token:localStorage.access_token
			};

			axios({
				method: state.api.getOrderedSamples.method,
				url: state.api.getOrderedSamples.url+"/"+data.proj_id+"/"+state.api.getOrderedSamples.url2+"?paid=1&group_id="+data.group_id,
				headers: headers,
			})
			.then(response => {
				console.log('getOrderedSamplesByGrpId_a',response);
				resolve(response.data);

				var test = [
				  {
				    "group_id": "S3C78E3272B",
				    "item_number": "1",
				    "name": "Adjustable Spotlight",
				    "description": "Nice Spotlight",
				    "image": "http://s3-eu-central-1.amazonaws.com/storage.bal/tmp%2F%2F0e8PP2zUQ94NDpiw3vdJxTPJsFkDiuf6-8.4.jpg",
				    "quantity": 1,
				    "price": 23,
				    "sample_price": 30,
				    "reference": "ASP1",
				    "file": null,
				    "sample_shipment_price_less_5": 50,
				    "sample_shipment_price_5_10": 60
				  },
				  {
				    "group_id": "S3C78E3272B",
				    "item_number": "2",
				    "name": "Mega Industrial Light",
				    "description": "Rigid Industrial Light",
				    "image": "http://s3-eu-central-1.amazonaws.com/storage.bal/tmp%2F%2Fx6UNnIQD1FHK8Rtn2qN22xEfAedgJPdc-455.jpg",
				    "quantity": 2,
				    "price": 200,
				    "sample_price": 250,
				    "reference": "IL3",
				    "file": null,
				    "sample_shipment_price_less_5": 65,
				    "sample_shipment_price_5_10": 80
				  },
				  {
				    "group_id": "S3C78E3272B",
				    "item_number": "3",
				    "name": "Chandeler Ultra",
				    "description": "Fashionable Chandeler",
				    "image": "http://s3-eu-central-1.amazonaws.com/storage.bal/tmp%2F%2FPjliA9kjWkJE5HA7RPY4F8maAcjPA9f3-led-chandeliers-gotha-al-ch-0757-4646.jpg",
				    "quantity": 1,
				    "price": 150,
				    "sample_price": 200,
				    "reference": "CH33",
				    "file": null,
				    "sample_shipment_price_less_5": 100,
				    "sample_shipment_price_5_10": 150
				  }
				];				

				// resolve(test);
			})
			.catch(error => {
				console.log('error getInquiries_a',error);
				// if(actions.checkToken(error)) {                
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})

			// resolve(itemsTest);

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