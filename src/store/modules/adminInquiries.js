import axios from 'axios'
import router from '@/router'
import config from '@/config/index'

const base_url = config.main.appUrl;

const state= {
	// api: {
	// 	/* GET */
	// 	get: {
	// 		method: 'get',
	// 		getAllInquiries: {
	// 			url: base_url + `/v1/admin/inquiries`
	// 		},
	// 		getInquiry: {
	// 			url: base_url + `/v1/admin/inquiries`
	// 		},

	// 		getInquiryBids: {
	// 			url: base_url + `/v1/admin/inquiries`
	// 		}
	// 	},
	// 	/* POST */
	// 	post: {},
	// 	/* PUT */
	// 	put: {
	// 		/* APPROVED INQUIRY */
	// 		method: 'put',
	// 		approvedInquiry: {
	// 			url: base_url + `/v1/admin/inquiries`
	// 		},
	// 		/* DECLINED INQUIRY */
	// 		declinedInquiry: {
	// 			url: base_url + `/v1/admin/inquiries`
	// 		},
	// 		approveBid: {
	// 			url: base_url + `/v1/admin/inquiries/`
	// 		}
	// 	}
	// },

	api: {

		getAllInquiries: {
			url: base_url + `/v1/admin/inquiries`,
			method: 'get',
		},
		getInquiry: {
			url: base_url + `/v1/admin/inquiries`,
			method: 'get',
		},
		getInquiryBids: {
			url: base_url + `/v1/admin/inquiries`,
			method: 'get',
		},


		approvedInquiry: {
			url: base_url + `/v1/admin/inquiries`,
			method: 'put',
		},
		declinedInquiry: {
			url: base_url + `/v1/admin/inquiries`,
			method: 'put',
		},
		approveBid: {
			url: base_url + `/v1/admin/inquiries`,
			method: 'put',
		},


		confirmBankTransfer: {
			url: base_url + `/v1/admin/inquiries`,
			url2: 'confirm-payment',
			method: 'put',
		},

	},


	
	
	token: localStorage.getItem('access_token') || null,
	axios: {
		config: {
			headers: {
				'Authorization': "bearer" + (localStorage.getItem('access_token') || null)
			}
		}
	},

	// inquiries: [],
	// inquiry: null,
	// openInquiryView: false,

}

const getters = {

}


const mutations = {
	// SHOW_OPENINQUIRYVIEW_M(state){
	// 	state.openInquiryView = true;
	// },

	// HIDE_OPENINQUIRYVIEW_M(state){
	// 	state.openInquiryView = false;
	// },

	// UPDATE_INQUIRY_M(state,data){
	// 	state.inquiry = data.inquiry;
	// },
}

const actions = {

  /* GET  */

  getInquiry_a(context, data) {

	return new Promise((resolve, reject) => {
	  var headers = {
		token: localStorage.access_token,
		"content-type": "application/json",
	  };
	  axios({
		  // method: state.api.get.method,
		  // url: state.api.get.getInquiry.url + '/' + data.inq_id,
		  method: state.api.getInquiry.method,
		  url: state.api.getInquiry.url + '/' + data.inq_id,
		  
		  headers: headers
		})
		.then(response => {
		  resolve(response.data);
		})
		.catch(error => {
		  if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
			console.log("EXPIRED");
			router.push({ 'name': 'Logout' })
		  } else {
			reject(error);
		  }
		})
	});
  },


  getInquiries_a() {

	return new Promise((resolve, reject) => {
	  var headers = {
		token: localStorage.access_token,
		"content-type": "application/json",
	  };

	  axios({
		  // method: state.api.get.method,
		  // url: state.api.get.getAllInquiries.url,
		  method: state.api.getAllInquiries.method,
		  url: state.api.getAllInquiries.url,
		  headers: headers
		})
		.then(response => {
		  resolve(response.data);
		})
		.catch(error => {
		  if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
			console.log("EXPIRED");
			router.push({ 'name': 'Logout' })
		  } else {
			reject(error);
		  }
		})
	});

  },


   getAllInquiryBids_a(context,data){


		return new Promise((resolve, reject) => {

			var method = state.api.getInquiryBids.method; 
			var url = state.api.getInquiryBids.url + "/" + data.inq_id + "/bids" 
			// var url = `${state.api.get.getInquiryBids}/${data.inq_id}/bids`

			var headers = {
								 token:localStorage.access_token,
								 "content-type": "application/json",
						   };
			axios({
				method: method,
				url: url,
				headers: headers,
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {

			 if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
				console.log("EXPIRED");
				router.push({ 'name': 'Logout' })
			  } else {
				reject(error);
			  }
				
			})
		});
	},


  /* PUT  */


	approvedBid_a(context, data) {

	// console.log(data.inquiry_id);
	return new Promise((resolve, reject) => {
	  var headers = {
		token: localStorage.access_token,
		"content-type": "application/json",
	  };
	  axios({
		  method: state.api.approveBid.method,
		  url: state.api.approveBid.url +'/'+ data.inquiry_id +'/bids/' + data.bid_id + '/evaluation',
		  headers: headers,
		  data: JSON.stringify({ 'approve': 1 })
		})
		.then(response => {
		  resolve(response.data);
		})
		.catch(error => {
		  if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
			console.log("EXPIRED");
			router.push({ 'name': 'Logout' })
		  } else {
			reject(error);
		  }
		})
	});

  },




  approvedInquiry_a(context, data) {

	return new Promise((resolve, reject) => {
	  var headers = {
		token: localStorage.access_token,
		"content-type": "application/json",
	  };
	  axios({
		  method: state.api.approvedInquiry.method,
		  url: state.api.approvedInquiry.url + '/' + data.inquiry_id + '/evaluation',
		  headers: headers,
		  data: JSON.stringify({ 'approve': 1 })
		})
		.then(response => {
		  resolve(response.data);
		})
		.catch(error => {
		  if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
			console.log("EXPIRED");
			router.push({ 'name': 'Logout' })
		  } else {
			reject(error);
		  }
		})
	});

  },


  declinedInquiry_a(context, data) {
	return new Promise((resolve, reject) => {
	  var headers = {
		token: localStorage.access_token,
		"content-type": "application/json",
	  };
	  axios({
		  method: state.api.declinedInquiry.method,
		  url: state.api.declinedInquiry.url + '/' + data.inquiry_id + '/evaluation',
		  headers: headers,
		  data: JSON.stringify({ 'approve': 0 })
		})
		.then(response => {
		  resolve(response.data);
		})
		.catch(error => {
		  if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
			console.log("EXPIRED");
			router.push({ 'name': 'Logout' })
		  } else {
			reject(error);
		  }
		})
	});

  },

  confirmBankTransfer_a(context, data) {
	return new Promise((resolve, reject) => {
	  var headers = {
		token: localStorage.access_token,
		"content-type": "application/json",
	  };
	  axios({
		  method: state.api.confirmBankTransfer.method,
		  url: state.api.confirmBankTransfer.url + '/' + data.inquiry_id + '/' +state.api.confirmBankTransfer.url2,
		  headers: headers,
		  data: JSON.stringify({ 'received': 1 })
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

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
