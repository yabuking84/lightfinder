// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'


const state = {
    api_url: {
        // login: "http://192.168.1.205/liliwatersapi/public/api/v1/auth/login",
        // logout: "http://192.168.1.205/liliwatersapi/public/api/v1/auth/logout",

        login: "http://192.168.1.200:8000/v1/login",
        logout: "http://192.168.1.200:8000/v1/logout",
    },
    inquiries: [],

}



const mutations = {

}

    
const actions = {
    getInquiries_a(context){

        return new Promise((resolve, reject) => {
            var url = 'http://192.168.1.200:8000/v1/buyer/inquiries';
            var headers = {token:localStorage.access_token};
            axios({
                method: 'get',
                url: url,
                headers: headers,
            })
            .then(response => {
                resolve(response.data);
                console.log(response.data);
            })
            .catch(error => {

                // console.log(error);

                if(typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
                    console.log("EXPIRED");
                    router.push({'name': 'Logout'})
                }
                else {
                    console.log("normal error!");
                    reject(error);
                }

            })
        });
    },

    addInquiry_a(context,data){

        return new Promise((resolve, reject) => {
            var url = 'http://192.168.1.200:8000/v1/buyer/inquiries';
            var headers = {token:localStorage.access_token};
            axios({
                method: 'get',
                url: url,
                headers: headers,
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