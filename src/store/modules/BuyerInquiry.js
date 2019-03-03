// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'


const state = {
    api: {
        getInquiries: {
            method: 'get',
            url: 'http://192.168.1.200:8000/v1/buyer/inquiries',
        },
        addInquiry: {
            method: 'post',
            url: 'http://192.168.1.200:8000/v1/buyer/inquiries',
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