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

    },
    inquiries: [],

}



const mutations = {

}

    
const actions = {
    getInquiries_a(context){
        return new Promise((resolve, reject) => {
            var headers = {token:localStorage.access_token};
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

    getInquiry_a(context,data){
        return new Promise((resolve, reject) => {
            var headers = {token:localStorage.access_token};
            axios({
                method: state.api.getInquiry.method,
                url: state.api.getInquiry.url+"/"+data.inq_id,
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