// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'

const base_url = config.main.apiURL;

const state = {

	api: {
		sendMessage: {
			method  : 'post',
			url     : base_url+'/v1/messages',
		},        
		getMessages: {
			method  : 'get',
			url     : base_url+'/v1/messages',
		},
		sendProjectMessage: {
			method  : 'post',
			url     : base_url+'/v1/messages',
		},        
		getProjectMessages: {
			method  : 'get',
			url     : base_url+'/v1/messages',
		},
	},

	testMessages: [],
}



const mutations = {



}
	
const actions = {


	sendMessage_a(context,data){
		return new Promise((resolve, reject) => {
			console.log("data stringify",JSON.stringify(data));
			var headers = {
				token:localStorage.access_token,
				"content-type": "application/json",
			};
			axios({
				method: state.api.sendMessage.method,
				url: state.api.sendMessage.url,
				headers: headers,
				data: JSON.stringify(data),
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				// console.log(error);
				if(context.dispatch('checkToken',error))
				reject(error);
				
			})
		});
	},    


	getMessages_a(context,data){
		return new Promise((resolve, reject) => {
			var headers = {
				token:localStorage.access_token,
			};
			axios({
				method: state.api.getMessages.method,
				url: state.api.getMessages.url+"?type="+data.type+"&"+"id="+data.id,
				headers: headers,
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				if(context.dispatch('checkToken',error))
				reject(error);
				else
				console.log(error);
			})

		});
	},


	sendProjectMessage_a(context,data){
		return new Promise((resolve, reject) => {
			console.log("data stringify",JSON.stringify(data));
			var headers = {
				token:localStorage.access_token,
				"content-type": "application/json",
			};
			axios({
				method: state.api.sendProjectMessage.method,
				url: state.api.sendProjectMessage.url,
				headers: headers,
				data: JSON.stringify(data),
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				// console.log(error);
				if(context.dispatch('checkToken',error))
				reject(error);
				
			})
		});


		// // Test
		// ///////////////////////////////////////////////////////////////////
		// return new Promise((resolve, reject) => {
		// 	resolve();
		// });
		// ///////////////////////////////////////////////////////////////////
		// // Test

	},    


	getProjectMessages_a(context,data){
		return new Promise((resolve, reject) => {
			var headers = {
				token:localStorage.access_token,
			};
			axios({
				method: state.api.getProjectMessages.method,
				url: state.api.getProjectMessages.url+"?type="+data.type+"&"+"id="+data.id,
				headers: headers,
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				if(context.dispatch('checkToken',error))
				reject(error);
				else
				console.log(error);
			})

		});


		// // Test
		// ///////////////////////////////////////////////////////////////////
		// return new Promise((resolve, reject) => {
		// 	resolve([
		// 		{ own:true, 	content:'need total revision.', },
		// 		{ own:false, 	content:'okay.', },
		// 		{ own:true, 	content:'add 50w bulb.', },
		// 		{ own:false, 	content:'its costs more.', },
		// 		{ own:true, 	content:'im okay with that.', },				
		// 	]);
		// });
		// ///////////////////////////////////////////////////////////////////
		// // Test
	},



	checkToken(context, error){

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


