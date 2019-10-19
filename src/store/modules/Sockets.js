// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'

import hlprs from '@/mixins/helpers'

import vm from '@/main.js';


const state = {

	isConnected: false,

}





const mutations = {

    CONNECTED_M(state) {
        console.log("CONNECTED_M auth,js");
        state.isConnected = true;
    },

    DISCONNECTED_M(state) {
        console.log("DISCONNECTED_M auth,js");
        state.isConnected = false;
    },
}







    
const actions = {

    SOCKET_connect(context, data){
        context.commit('CONNECTED_M');
        
        // console.log(context.rootState.auth.auth_user.uuid);
        // console.log(typeof context.rootState.auth.auth_user.uuid);
        // set socket user
        // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        if(
        	typeof context.rootState.auth.auth_user.uuid !== 'undefined' &&
        	context.rootState.auth.auth_user.uuid
        ) {
	    	context.dispatch('joinRoom_a', context.rootState.auth.auth_user.uuid);    
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
		context.dispatch('ntfctns/adminApprovedInquiry_a',data,{root:true});
    },

    SOCKET_adminRejectedInquiry(context, data){
		context.dispatch('ntfctns/adminRejectedInquiry_a',data,{root:true});
    },
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // admin

    // buyer
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    SOCKET_buyerCreatedInquiry(context, data){

    },

    SOCKET_buyerAwardedBid(context, data){
		context.dispatch('ntfctns/buyerAwardedBid_a',data,{root:true});
    },
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // buyer

    // supplier
    // xxxxxxxxxxxxxxx
    SOCKET_supplierCreatedBid(context, data){
		context.dispatch('ntfctns/supplierCreatedBid_a',data,{root:true});
    },

    SOCKET_supplierConfirmedAward(context, data){
		context.dispatch('ntfctns/supplierConfirmedAward_a',data,{root:true});    	             
    },

    SOCKET_supplierModifiedBid(context, data){
    	context.dispatch('ntfctns/supplierModifiedBid_a',data,{root:true});
    },

    SOCKET_supplierSubmittedBid(context, data){
    },

    SOCKET_deadlineNear(context, data){
    },
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // supplier


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx




// Messaging
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    SOCKET_newMessage(context, data){
		context.dispatch('ntfctns/newMessage_a',data,{root:true});
    },


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Messaging











	joinRoom_a(context, data){
		var uuid = data;
        
        console.log('joinRoom_a = '+uuid);
        vm.$socket.emit('join', uuid);
	},

    unsubscribeSocket_a() {
        // console.log('unsubscribeSocket_a');
        vm.$socket.emit('logout');
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

