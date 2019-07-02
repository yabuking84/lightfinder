// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'

let base_url = config.main.apiURL;
const state = {
	api: {
		getInquiries: {
			method: 'get',
			url: base_url+'/v1/supplier/inquiries',
		},
		getInquiry: {
			method: 'get',
			url: base_url+'/v1/supplier/inquiries',
		},
		addInquiry: {
			method: 'post',
			url: base_url+'/v1/supplier/inquiries',
		},
		addInquiryBid: {
			method: 'post',
			url: base_url+'/v1/supplier/inquiries',
			url2: 'bids',
		},
		editInquiryBid: {
			method: 'patch',
			url: base_url+'/v1/supplier/inquiries',
			url2: 'bids',
		},
		getInquiryBids: {
			method: 'get',
			url: base_url+'/v1/supplier/inquiries',
			url2: 'bids',
		},
		getInquiryBid: {
			method: 'get',
			url: base_url+'/v1/supplier/inquiries',
			url2: 'bids/own-bid',
		},
		confirmAward: {
			method: 'put',
			url: base_url+'/v1/supplier/inquiries',
			url2: 'confirm-award',
		},
		setSampleStage: {
			method: 'put',
			url: base_url+'/v1/supplier/inquiries',
			url2: 'bids',
			url3: 'stage',
		},
		
		updateProfile: {
			method  : 'patch',
			url     : base_url+'/v1/profile',
		},

		updatePassword: {
			method  : 'patch',
			url     : base_url+'/v1/password',
		},

	},
	
	// inquiries: [],    
	// inquiry: null,
	// openInquiryView: false,

}



const mutations = {
	
	// SHOW_OPENINQUIRYVIEW_M(state){
	//     state.openInquiryView = true;
	// },

	// HIDE_OPENINQUIRYVIEW_M(state){
	//     state.openInquiryView = false;
	// },

	// UPDATE_INQUIRY_M(state,data){
	//     state.inquiry = data.inquiry;
	// },

}

	
const actions = {





	updateProfile_a(context, data) {
		return new Promise((resolve, reject) => {
			var headers = {
				token: localStorage.access_token,
				"content-type": "application/json",
			};

			axios({
				method: state.api.updateProfile.method,
				url: state.api.updateProfile.url,
				headers: headers,
				data: JSON.stringify(data.data)
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
					console.log("EXPIRED")
					router.push({'name': 'Logout'});
				} else {
					console.log("normal error!")
					reject(error)
				}
			});
		})
	},

	updatePassword_a(context, data) {
		return new Promise((resolve, reject) => {

			var headers = {
				token: localStorage.access_token,
				"content-type": "application/json",
			};

			axios({
				method: state.api.updatePassword.method,
				url: state.api.updatePassword.url,
				headers: headers,
				data: JSON.stringify(data.data)
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
					console.log("EXPIRED")
					router.push({'name': 'Logout'});
				} else {
					console.log("normal error!")
					reject(error)
				}
			});

		})
	},



	getInquiries_a(context, data){
		return new Promise((resolve, reject) => {
			var method = state.api.getInquiries.method;
			var url = state.api.getInquiries.url;
			var headers = {token:localStorage.access_token};

			var stage_id = (data && data.stage_id)?"stage_id="+data.stage_id:"";
			var with_bids = (data && data.with_bids)?"with_bids="+data.with_bids:"";

			axios({
				method: method,
				url: url+"?"+stage_id+"&"+with_bids,
				headers: headers,
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {

				if(actions.checkToken(error)) {
					reject(error);
				}
				
			})
		});
	},

	getInquiry_a(context,data){
		return new Promise((resolve, reject) => {
			var method = state.api.getInquiry.method; 
			var url = state.api.getInquiry.url+"/"+data.inq_id; 
			var headers = {token:localStorage.access_token};
			axios({
				method: method,
				url: url,
				headers: headers,
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {

				if(actions.checkToken(error)) {
					reject(error);
				}
				

			})
		});
	},


	getAllInquiryBids_a(context,data){
		return new Promise((resolve, reject) => {
			var method = state.api.getInquiryBids.method; 
			var url = state.api.getInquiryBids.url+"/"+data.inq_id+"/"+state.api.getInquiryBids.url2; 
			var headers = {token:localStorage.access_token};
			axios({
				method: method,
				url: url,
				headers: headers,
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {

				if(actions.checkToken(error)) {
					reject(error);
				}
				
			})
		});
	},

	getInquiryBid_a(context,data){
		return new Promise((resolve, reject) => {
			var method = state.api.getInquiryBid.method; 
			var url = state.api.getInquiryBid.url+"/"+data.inq_id+"/"+state.api.getInquiryBid.url2; 
			var headers = {token:localStorage.access_token};
			axios({
				method: method,
				url: url,
				headers: headers,
			})
			.then(response => {

				if(response.data) {
					response.data.id = (response.data.reference) ? response.data.reference : null; 
					resolve(response.data);
				}
				else 
				resolve(null);
			})
			.catch(error => {

				if(actions.checkToken(error)) {
					reject(error);
				}
				
			})
		});
	},


	addInquiryBid_a(context,data){
		return new Promise((resolve, reject) => {
			var method = state.api.addInquiryBid.method;
			var url = state.api.addInquiryBid.url+"/"+data.inq_id+"/"+state.api.addInquiryBid.url2;
			var headers = {
				token:localStorage.access_token,
				"content-type": "application/json",
			};
			axios({
				method: method,
				url: url,
				headers: headers,
				data: JSON.stringify(data.formData),
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				if(actions.checkToken(error)) {
					reject(error);
				}
			});

		});
	},


	editInquiryBid_a(context,data){
		return new Promise((resolve, reject) => {
			var method = state.api.editInquiryBid.method;
			var url = state.api.editInquiryBid.url+"/"+data.inq_id+"/"+state.api.editInquiryBid.url2+"/"+data.bid_ref;
			var headers = {
				token:localStorage.access_token,
				"content-type": "application/json",
			};
			axios({
				method: method,
				url: url,
				headers: headers,
				data: JSON.stringify(data.formData),
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {

				if(actions.checkToken(error)) {
					reject(error);
				}
				
			});

		});
	},

	confirmAward_a(context,data){
		return new Promise((resolve, reject) => {
			
			var method = state.api.confirmAward.method;
			var url = state.api.confirmAward.url+"/"+data.inq_id+"/"+state.api.confirmAward.url2;
			console.log(data.formData);
			var headers = {
				token:localStorage.access_token,
				"content-type": "application/json",
			};
			axios({
				method: method,
				url: url,
				headers: headers,
				data: JSON.stringify(data.formData),
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {

				if(actions.checkToken(error)) {
					reject(error);
				}

			});

		});
	},





	setSampleStage_a(context,data){
		return new Promise((resolve, reject) => {
			var method = state.api.setSampleStage.method;
			var url = state.api.setSampleStage.url+
			"/"+data.inq_id+
			"/"+state.api.setSampleStage.url2;
			"/"+data.bid_id+
			"/"+state.api.setSampleStage.url3;
			var headers = {
				token:localStorage.access_token,
				"content-type": "application/json",
			};


			axios({
				method: method,
				url: url,
				headers: headers,
				data: JSON.stringify({
					stage_id: data.stage_id,
				}),
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				if(actions.checkToken(error)) {
					reject(error);
				}
			});

			setTimeout(()=>{ 
				resolve('Success Stage_id = '+data.stage_id);
			}, 3000);
		});
	},










	checkToken(error){

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