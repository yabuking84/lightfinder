// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'

const base_url = config.main.apiURL;

const state = {
	api: {

		setPurchaseAsPaid: {
			method  : 'post',
			url     : base_url+'/v1/payment-response/success',
		},

		getCreditCardResource: {
			method  : 'post',
			url     : base_url+'/v1/pay/credit-card',
		},


	},

	paymentMethod: {
		creditCard: 1,
		bankTransfer: 2,
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


	getCreditCardResource_a(context, data) {
		return new Promise((resolve, reject) => {

			var headers = { token:localStorage.access_token, "content-type": "application/json", };

			axios({

				method  : state.api.getCreditCardResource.method,
				url     : state.api.getCreditCardResource.url,
				headers : headers,
				data 	: JSON.stringify({
					id: 	 data.id,
					type:    data.type,
					payment_method_id: state.paymentMethod.creditCard,
				}),
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				// if(actions.checkToken(error)) {
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})

		}) 
	},

	getSampleOrderCreditCardResource_a(context, data) {
		return new Promise((resolve, reject) => {
			
			// console.log(data);

			var headers = { token:localStorage.access_token, "content-type": "application/json", };
			axios({
				method  : state.api.getCreditCardResource.method,
				url     : state.api.getCreditCardResource.url,
				headers : headers,
				data 	: JSON.stringify({
				    "id": data.id,
				    "type": data.type,
				    "payment_method_id": state.paymentMethod.creditCard,
				    "data": {
				        "country_id": data.data.country_id,
				        "address": data.data.address,
				        "city": data.data.city,
				        "postal": data.data.postal,
				    },
				}),
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				// if(actions.checkToken(error)) {
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})

		}) 
	},



	setPurchaseAsPaid_a(context, data) {
		return new Promise((resolve, reject) => {

			var headers = { token:localStorage.access_token, "content-type": "application/json", };

			axios({

				method  : state.api.setPurchaseAsPaid.method,
				url     : state.api.setPurchaseAsPaid.url,
				headers : headers,
				data 	: JSON.stringify({
					"transaction_id": data.transaction_id,
					"id": data.id,
					"type": data.type,
				}),
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})

		}) 
	},


	checkToken(context,error){
		// console.log("checkToken = ",error);
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