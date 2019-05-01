// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'


const state = {
    // inquiries: [],
    inquiry: null,
    openInquiryView: false,
    // bid: null,
    bid_id: null,
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

    UPDATE_BID_ID_M(state,data){
        state.bid_id = data.bid_id;
    },

}
    
const actions = {



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