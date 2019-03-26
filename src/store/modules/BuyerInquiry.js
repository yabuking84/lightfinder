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
            method: 'put',
            url: 'http://192.168.1.200:8000/v1/buyer/inquiries',
            url2: 'bids',
            url3: 'award',
        },

    },
    inquiries: [],

    // sockets
    /////////////////////////////////
    test_vuex: "",
    isConnected: false,
    socketMessage: '',
    // notifications: [ {title:'ertet'} ],
    notifications: [],
    /////////////////////////////////
    // sockets
}



const mutations = {
    CONNECTED_M(state) {
      state.isConnected = true;
    },

    DISCONNECTED_M(state) {
      state.isConnected = false;
    },

    UPDATE_NOTIFICATIONS_M(state, data) {
        state.notifications.push(data);
    },

    RESET_NOTIFICATIONS_M(state) {
        state.notifications = [];
    },
}
    
const actions = {


    // sockets
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    SOCKET_connect(context){
        // console.log("byrInqr connect");
        context.commit('CONNECTED_M')
    },
    SOCKET_disconnect(context){
        // console.log("byrInqr disconnect");
        context.commit('DISCONNECTED_M')
    },

    SOCKET_supplierNewQuoteCreated(context, data){
        context.dispatch('getInquiry_a',data).then(response=>{

            // console.log("VUEX");
            // console.log(response);

            var notf = {};
            notf.title = response.keyword;
            if(response)
            context.commit('UPDATE_NOTIFICATIONS_M',notf);
        });
    },
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // sockets

    resetNotification_a(context){
        context.commit('RESET_NOTIFICATIONS_M');
    },

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

                if(actions.checkToken(error)) {
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

                if(actions.checkToken(error)) {
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

                if(actions.checkToken(error)) {
                    reject(error);
                }
                
            });

        });
    },


    getAllInquiryBids_a(context,data){
        
        return new Promise((resolve, reject) => {

            var method = state.api.getInquiryBids.method; 
            var url = state.api.getInquiryBids.url + "/" + data.inq_id + "/" + state.api.getInquiryBids.url2; 
            
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

                // console.log(error);
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
            var headers = {token:localStorage.access_token,
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

                // console.log(error);
                if(actions.checkToken(error)) {
                    reject(error);
                }
                

            })
        });
    },


    awardBid_a(context,data){
        return new Promise((resolve, reject) => {

            var method = state.api.awardBid.method; 
            var url = state.api.awardBid.url+"/"+data.inquiry_id+"/"+state.api.awardBid.url2+"/"+data.bid_id+"/"+state.api.awardBid.url3; 

            var headers = {
                token:localStorage.access_token,
                "content-type": "application/json",
            };
            
            axios({

                method: method,
                url: url,
                headers: headers,
                data    : JSON.stringify(data)

            })

            .then(response => {
                resolve(response.data);
            })
            .catch(error => {

                // console.log(error);
                if(actions.checkToken(error)) {
                    reject(error);
                }
                
            })
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