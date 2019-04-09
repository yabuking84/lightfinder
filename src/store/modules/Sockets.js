// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'

import vm from '@/main.js';

const state = {

	isConnected: false,

}





const mutations = {

    CONNECTED_M(state) {
        // console.log("CONNECTED_M auth,js");
        state.isConnected = true;
    },

    DISCONNECTED_M(state) {
        // console.log("DISCONNECTED_M auth,js");
        state.isConnected = false;
    },
}







    
const actions = {

    SOCKET_connect(context, data){
        context.commit('CONNECTED_M');

        // set socket user
        // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        if(
        	typeof context.rootState.auth.auth_user.uuid !== 'undefined' &&
        	context.rootState.auth.auth_user.uuid
        ) {
	    	context.dispatch('joinRoom_a', context.rootState.auth.auth_user.uuid);    
	    	console.log('joinRoom_a');
        }
        // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        // set socket user

        // console.log("context.rootState.auth.auth_user.uuid = "+context.rootState.auth.auth_user.uuid);
        // console.log("context.rootState.auth.auth_user.role = "+config.auth.roleIndex[context.rootState.auth.auth_user.role]);

    },

    SOCKET_disconnect(context, data){
        context.commit('DISCONNECTED_M');
    },





    
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    
    // admin
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    SOCKET_adminApprovedInquiry(context, data){
    	// console.log('SOCKET_adminApprovedInquiry');
		// inquiry_id: "1553672466844"
		// room: "7e1292c6-3d84-11e9-9c72-0a0027000001"
		// socket: "PoBz0Huu8uTbp2shAABQ"    	

		context.dispatch('byrInq/getInquiry_a',{inq_id:data.inquiry_id},{root:true})
		.then((response)=>{
			var ntfctn = {
				title: 			"Inquiry \""+response.keyword+"\" approved!",
				dataType: 		'inquiry',
				data: 			response,
				textSnackbar: 	'Inquiry "'+response.keyword+'" approved!',
			}
			context.dispatch('ntfctns/updateNotification_a',ntfctn,{root:true});

        	// context.commit('byrInq/UPDATE_INQUIRY_M',{inquiry:response},{root:true});
        	// context.commit('byrInq/SHOW_OPENINQUIRYVIEW_M',null,{root:true});

		});


    },

    SOCKET_adminRejectedInquiry(context, data){
        
    },
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // admin

    // buyer
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    SOCKET_buyerCreatedInquiry(context, data){
    },

    SOCKET_buyerAwardedBid(context, data){
    },
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // buyer

    // supplier
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    SOCKET_supplierCreatedQuote(context, data){
    },

    SOCKET_supplierConfirmedAward(context, data){
    },

    SOCKET_supplierModifiedBid(context, data){
    },

    SOCKET_supplierSubmittedBid(context, data){
    },
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // supplier


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx











	joinRoom_a(context, data){
		var uuid = data;
        vm.$socket.emit('join', uuid);
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

