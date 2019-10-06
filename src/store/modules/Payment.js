// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'

import xmlToJSON from "xmlToJSON";

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

		payByBankTransfer: {
			method  : 'post',
			url     : base_url+'/v1/pay/bank-transfer',
		},

		payByCryptoCurrency: {
			method  : 'post',
			url     : base_url+'/v1/pay/crypto-currency-transfer',
		},


	},

	paymentMethod: {
		creditCard: 1,
		bankTransfer: 2,
		cryptoCurrency: 3,
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
			var plan = (data.plan)?data.plan:'';
			axios({

				method  : state.api.getCreditCardResource.method,
				url     : state.api.getCreditCardResource.url,
				headers : headers,
				data 	: JSON.stringify({
					id: 	 data.id,
					type:    data.type,
					payment_method_id: state.paymentMethod.creditCard,
					plan : plan,
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

			// defaults to credit Card
			var paymentMethod = (data.paymentMethod)?data.paymentMethod:state.paymentMethod.creditCard;
			var plan = (data.plan)?data.plan:'';

			axios({
				method  : state.api.setPurchaseAsPaid.method,
				url     : state.api.setPurchaseAsPaid.url,
				headers : headers,
				data 	: JSON.stringify({
					"transaction_id": data.transaction_id,
					"id": data.id,
					"type": data.type,
					payment_method_id: paymentMethod,
					plan: plan,
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




	payByBankTransfer_a(context, data) {
		return new Promise((resolve, reject) => {

			var headers = { token:localStorage.access_token, "content-type": "application/json", };
			var plan = (data.plan)?data.plan:'';
			axios({
				method  : state.api.payByBankTransfer.method,
				url     : state.api.payByBankTransfer.url,
				headers : headers,
				data 	: {
					id: 	 data.id,
					type:    data.payment_type,
					payment_method_id: state.paymentMethod.bankTransfer,
					plan: plan,
				},
			})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				// if(actions.checkToken(error)) {
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})

		}) 
	},



	payByCryptoCurrency_a(context, data) {
		return new Promise((resolve, reject) => {

			var headers = { token:localStorage.access_token, "content-type": "application/json", };
			var plan = (data.plan)?data.plan:'';
			axios({
				method  : state.api.payByCryptoCurrency.method,
				url     : state.api.payByCryptoCurrency.url,
				headers : headers,
				data 	: {
					id: 	 data.id,
					type:    data.payment_type,
					payment_method_id: state.paymentMethod.cryptoCurrency,
					plan: plan,
				},
			})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				// if(actions.checkToken(error)) {
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})

		}) 
	},




	getCryptoCurrency_a(context, data){
		return new Promise((resolve, reject) => {

			var url = config.main.crypto_convesion_url+'/'+data.coin_currency+'/spot';

			// https://api.coinbase.com/v2/prices/BTC-USD/spot

			axios({
				method: 'get',
				url: url,
				headers: {
					'Access-Control-Allow-Origin':'*',
				},
			})
			.then((response) => {
				// console.log('getCryptoCurrency_a response',response);

				// var crypto_convesion = JSON.parseString(response);
				// console.log('crypto_convesion',crypto_convesion);
				// resolve(crypto_convesion);

				resolve(response.data.data);
			})
			.catch((e)=>{
				reject(e);
			});
		});
	},


	getCurrency_a(context){
		return new Promise((resolve, reject) => {
			axios({
				method: 'get',
				url: config.main.eur_convesion_url,
				headers: {
					'Access-Control-Allow-Origin':'*',
				},
			})
			.then((response) => {
				// console.log('setCurrency_a',response.data);

				// var parser = new DOMParser();
				// var xml = parser.parseFromString(response.data,"text/xml");
				// var conversion_eur_rates = hlprs.methods.xmlToJson(xml);

				var xml = xmlToJSON.parseString(response.data);
				// console.log('setCurrency_a xml',xml.Envelope[0]);
				var conversion_eur_rates = {};
				var cer = xml.Envelope[0].Cube[0].Cube[0].Cube.map((item)=>{
					return {
						currency: item._attr.currency._value,
						rate: item._attr.rate._value,
					};
				}).forEach((item,i)=>{
					conversion_eur_rates[item.currency] = item.rate;
				});

				// console.log('setCurrency_a conversion_eur_rates',conversion_eur_rates);
				// localStorage.setItem('currency_rates', JSON.stringify(conversion_eur_rates));
				// state.currency_rates = conversion_eur_rates;

				resolve(conversion_eur_rates);

			})
			.catch((e)=>{
				reject(e);
			});
		});
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