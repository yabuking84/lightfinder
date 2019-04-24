// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'

import hlprs from '@/mixins/helpers'

import vm from '@/main.js';

import MsgBus from "@/bus/messaging";

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
    	// console.log('SOCKET_adminApprovedInquiry');
		// inquiry_id: "1553672466844"
		// room: "7e1292c6-3d84-11e9-9c72-0a0027000001"
		// socket: "PoBz0Huu8uTbp2shAABQ"    	

		context.dispatch('byrInq/getInquiry_a',{inq_id:data.inquiry_id},{root:true})
		.then((response)=>{
			var ntfctn = {
				title: 			"Inquiry \""+response.keyword+"\" APPROVED!",
				dataType: 		'inquiry',
				data: 			response,
				textSnackbar: 	'Inquiry "'+response.keyword+'" APPROVED!',
			}
			context.dispatch('ntfctns/updateNotification_a',ntfctn,{root:true});
			console.log('-------------------------------------------------------')
			console.log(response)
			console.log('-------------------------------------------------------')
        	// context.commit('byrInq/UPDATE_INQUIRY_M',{inquiry:response},{root:true});
        	// context.commit('byrInq/SHOW_OPENINQUIRYVIEW_M',null,{root:true});

		});


    },

    SOCKET_adminRejectedInquiry(context, data){
        context.dispatch('byrInq/getInquiry_a',{inq_id:data.inquiry_id},{root:true})
        .then((response)=>{
            var ntfctn = {
                title:          "Inquiry \""+response.keyword+"\" REJECTED!",
                dataType:       'inquiry',
                data:           response,
                textSnackbar:   'Inquiry "'+response.keyword+'" REJECTED!',
            }
            context.dispatch('ntfctns/updateNotification_a',ntfctn,{root:true});

            // context.commit('byrInq/UPDATE_INQUIRY_M',{inquiry:response},{root:true});
            // context.commit('byrInq/SHOW_OPENINQUIRYVIEW_M',null,{root:true});

        });

    },
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // admin

    // buyer
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    SOCKET_buyerCreatedInquiry(context, data){
    },

    SOCKET_buyerAwardedBid(context, data){
        context.dispatch('spplrInq/getInquiry_a',{inq_id:data.inquiry_id},{root:true})
        .then((response)=>{
            var ntfctn = {
                title:          "Bid \""+response.keyword+"\" AWARDED!",
                dataType:       'inquiry',
                data:           response,
                textSnackbar:   'Bid "'+response.keyword+'" AWARDED!',
            }
            context.dispatch('ntfctns/updateNotification_a',ntfctn,{root:true});

            // context.commit('byrInq/UPDATE_INQUIRY_M',{inquiry:response},{root:true});
            // context.commit('byrInq/SHOW_OPENINQUIRYVIEW_M',null,{root:true});

        });        
    },
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // buyer

    // supplier
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    SOCKET_supplierCreatedBid(context, data){

        var store = "";       

        if(hlprs.methods.isRole('admin')) 
        store = 'admnInq';
        else if(hlprs.methods.isRole('buyer')) 
        store = 'byrInq';
        else if(hlprs.methods.isRole('supplier')) 
        store = 'spplrInq';


        if(store!='supplier') {
            context.dispatch(store+'/getInquiry_a',{inq_id:data.inquiry_id},{root:true})
            .then((response)=>{
                var ntfctn = {
                    title:          "Supplier Created Bid for Inquiry # "+data.inquiry_id+"!",
                    dataType:       'inquiry',
                    data:           response,
                    textSnackbar:   'Supplier Created Bid for Inquiry # '+data.inquiry_id+'!',
                }
                context.dispatch('ntfctns/updateNotification_a',ntfctn,{root:true});

                // context.commit('byrInq/UPDATE_INQUIRY_M',{inquiry:response},{root:true});
                // context.commit('byrInq/SHOW_OPENINQUIRYVIEW_M',null,{root:true});
            });
        }


    },

    SOCKET_supplierConfirmedAward(context, data){
        context.dispatch('byrInq/getInquiry_a',{inq_id:data.inquiry_id},{root:true})
        .then((response)=>{
            var ntfctn = {
                title:          "Supplier Confirmed \""+response.keyword+"\"!",
                dataType:       'inquiry',
                data:           response,
                textSnackbar:   'Supplier Confirmed "'+response.keyword+'"!',
            }
            context.dispatch('ntfctns/updateNotification_a',ntfctn,{root:true});

            // context.commit('byrInq/UPDATE_INQUIRY_M',{inquiry:response},{root:true});
            // context.commit('byrInq/SHOW_OPENINQUIRYVIEW_M',null,{root:true});

        });               
    },

    SOCKET_supplierModifiedBid(context, data){
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
		
		MsgBus.emitNewMessage(data);
		
        // var ntfctn = {
        //     title:          "Supplier Confirmed \""+response.keyword+"\"!",
        //     dataType:       'inquiry',
        //     data:           response,
        //     textSnackbar:   'Supplier Confirmed "'+response.keyword+'"!',
        // }
        // context.dispatch('ntfctns/updateNotification_a',ntfctn,{root:true});
    },


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Messaging











	joinRoom_a(context, data){
		var uuid = data;
        
        console.log('joinRoom_a = '+uuid);
        vm.$socket.emit('join', uuid);
	},

    unsubscribeSocket_a() {
        console.log('unsubscribeSocket_a');
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

