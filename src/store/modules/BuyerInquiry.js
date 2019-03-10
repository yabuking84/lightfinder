// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'


const state = {
    api: {
        getInquiries: {
            method  : 'get',
            url     : 'http://192.168.1.200:8000/v1/buyer/inquiries',
        },

        getInquiry: {
            method  : 'get',
            url     :'http://192.168.1.200:8000/v1/buyer/inquiries'
        },

        addInquiry: {
            method  : 'post',
            url     : 'http://192.168.1.200:8000/v1/buyer/inquiries',
        },

        getInquiryBids: {
            method  : 'get',
            url     : 'http://192.168.1.200:8000/v1/buyer/inquiries',
            url2    : 'bids',
        },
        getInquiryBid: {
            method: 'get',
            url: 'http://192.168.1.200:8000/v1/buyer/inquiries',
            url2: 'bids/own-bid',
        },
        awardBid: {
            method: 'post',
            url: 'http://192.168.1.200:8000/v1/buyer/inquiries',
            url2: 'bids',
            url3: 'award',
        },

    },
    inquiries: [],

}



const mutations = {

}

    
const actions = {
    getInquiries_a(context){
        return new Promise((resolve, reject) => {
            var headers = {token:localStorage.access_token};
            // console.log(state.api.getInquiries.url);
            // console.log(state.api.getInquiries.method);
            // console.log(headers);
            axios({
                method: state.api.getInquiries.method,
                url: state.api.getInquiries.url,
                headers: headers,
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {

                // console.log(error);

                if(typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
                    console.log("EXPIRED");
                    router.push({'name': 'Logout'})
                }
                else {
                    // console.log("normal error!");
                    reject(error);
                }

            })
        });
    },


    getInquiry_a(context, data) {
        return new Promise((resolve, reject) => {

            var headers = { token: localStorage.access_token }

            axios({

                method  : state.api.getInquiry.method,
                url     : state.api.getInquiry.url + "/" + data.inq_id,
                headers : headers

            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {

              if(typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
                    console.log("EXPIRED");
                    router.push({'name': 'Logout'})
                }
                else {
                    reject(error);
                }

            })

        }) 
    },

    addInquiry_a(context,data){
        return new Promise((resolve, reject) => {

            // console.log(data.formData);
            // console.log(JSON.stringify(data.formData));

            var headers = {
                token:localStorage.access_token,
                "content-type": "application/json",
            };
            axios({
                method: state.api.addInquiry.method,
                url: state.api.addInquiry.url,
                headers: headers,
                data: JSON.stringify(data.formData),
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {

                if(typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
                    console.log("EXPIRED");
                    router.push({'name': 'Logout'})
                }
                else {
                    console.log("normal error!");
                    reject(error);
                }

            });

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

                // console.log(error);

                if(typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
                    console.log("EXPIRED");
                    router.push({'name': 'Logout'})
                }
                else {
                    // console.log("normal error!");
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
                resolve(response.data);
            })
            .catch(error => {

                // console.log(error);

                if(typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
                    console.log("EXPIRED");
                    router.push({'name': 'Logout'})
                }
                else {
                    // console.log("normal error!");
                    reject(error);
                }

            })
        });
    },


    awardBid_a(context,data){
        return new Promise((resolve, reject) => {
            var method = state.api.awardBid.method; 
            var url = state.api.getInquiryBid.url+"/"+data.inq_id+"/"+state.api.getInquiryBid.url2; 
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

                // console.log(error);

                if(typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
                    console.log("EXPIRED");
                    router.push({'name': 'Logout'})
                }
                else {
                    // console.log("normal error!");
                    reject(error);
                }

            })
        });
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





// http://192.168.1.200:8000/v1/login

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