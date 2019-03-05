// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'


const state = {
    api: {
        getInquiries: {
            method: 'get',
            url: 'http://192.168.1.200:8000/v1/supplier/inquiries',
        },
        getInquiry: {
            method: 'get',
            url: 'http://192.168.1.200:8000/v1/supplier/inquiries',
        },
        addInquiry: {
            method: 'post',
            url: 'http://192.168.1.200:8000/v1/supplier/inquiries',
        },
        addInquiryBid: {
            method: 'post',
            url: 'http://192.168.1.200:8000/v1/supplier/inquiries',
            url2: 'bids',
        },
        getInquiryBids: {
            method: 'get',
            url: 'http://192.168.1.200:8000/v1/supplier/inquiries',
            url2: 'bids',
        },
        getInquiryBid: {
            method: 'get',
            url: 'http://192.168.1.200:8000/v1/supplier/inquiries',
            url2: 'bids',
        },

    },
    inquiries: [],

}



const mutations = {

}

    
const actions = {
    getInquiries_a(context){
        return new Promise((resolve, reject) => {
            var method = state.api.getInquiries.method;
            var url = state.api.getInquiries.url;
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


    getInquiryBids_a(context,data){
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