import axios from 'axios'
import router from '@/router'
import config from '@/config/index'

let base_url = 'http://192.168.1.200:8000';
const state= {
	api: {
		/* GET */
		get: {
			method: 'get',
			getAllInquiries: {
				url: base_url + `/v1/admin/inquiries`
			},
			getInquiry: {
				url: base_url + `/v1/admin/inquiries`
			},

			getInquiryBids: {
				url: base_url + `/v1/admin/inquiries`
			}
		},
		/* POST */
		post: {},
		/* PUT */
		put: {
			/* APPROVED INQUIRY */
			method: 'put',
			approvedInquiry: {
				url: base_url + `/v1/admin/inquiries`
			},
			/* DECLINED INQUIRY */
			declinedInquiry: {
				url: base_url + `/v1/admin/inquiries`
			},
			approveBid: {
				url: base_url + `/v1/admin/inquiries/`
			}
		}
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
	inquiry: null,
	openInquiryView: false,

}

const getters = {

}


const mutations = {
	SHOW_OPENINQUIRYVIEW_M(state){
		state.openInquiryView = true;
	},

	HIDE_OPENINQUIRYVIEW_M(state){
		state.openInquiryView = false;
	},

	UPDATE_INQUIRY_M(state,data){
		state.inquiry = data.inquiry;
	},
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
		  method: state.api.get.method,
		  url: state.api.get.getInquiry.url + '/' + data.inq_id,
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


  getAllInquiries_a() {

	return new Promise((resolve, reject) => {
	  var headers = {
		token: localStorage.access_token,
		"content-type": "application/json",
	  };

	  axios({
		  method: state.api.get.method,
		  url: state.api.get.getAllInquiries.url,
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

            var method = state.api.get.method; 
            var url = state.api.get.getInquiryBids.url + "/" + data.inq_id + "/bids" 
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
		  method: state.api.put.method,
		  url: state.api.put.approveBid.url + data.inquiry_id +'/bids/' + data.bid_id + '/evaluation',
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
		  method: state.api.put.method,
		  url: state.api.put.approvedInquiry.url + '/' + data.inquiry_id + '/evaluation',
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
		  method: state.api.put.method,
		  url: state.api.put.declinedInquiry.url + '/' + data.inquiry_id + '/evaluation',
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
