// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'
import hlprs from '@/mixins/helpers'

import vm from '@/main.js';

const state = {

    notifications: [],
    unread:null,

    // [
    //     {
    //         title:"title to display",
    //         dataType: "inquiry,quote,user, etc..",
    //         data:"any data that is related to the notification",
    //     }
    // ]

    showSnackbar: false,
    dataSnackbar: null,

    api: {

    	getNotifications: {
            method  : 'get',
            url     : 'http://192.168.1.200:8000/v1/notifications',
	    },

	    markNotifasRead: {
	    	method  : 'put',
	    	url     : 'http://192.168.1.200:8000/v1/notifications'
	    },




    } 

}





const mutations = {

    UPDATE_NOTIFICATIONS_M(state, data) {
        state.notifications.push(data);
    },

    RESET_NOTIFICATIONS_M(state) {
        state.notifications = [];
    },

    // UPDATE_TEXTSNACKBAR_M(state,data) {        
    //     state.textSnackbar = data.textSnackbar;
    // },

    UPDATE_SNACKBAR_M(state,data) {        
        state.dataSnackbar = data.dataSnackbar;
    },

    SHOW_SNACKBAR_M(state) {
        state.showSnackbar = true;
    },

    HIDE_SNACKBAR_M(state) {
        state.showSnackbar = false;
    },

}

 

const actions = {

    resetNotification_a(context){
        context.commit('RESET_NOTIFICATIONS_M');
    },

    updateNotification_a(context, data){
        context.commit('UPDATE_NOTIFICATIONS_M',data);
        // context.commit('UPDATE_TEXTSNACKBAR_M',{textSnackbar:data.textSnackbar});
        context.commit('UPDATE_SNACKBAR_M',{dataSnackbar:data});
        context.commit('SHOW_SNACKBAR_M');
    },

    gotoNotfication_a(context,ntfctn){

        // if inquiry type
        if(ntfctn.dataType == 'inquiry') {

            var store = "";

            // admin
            if(hlprs.methods.isRole("admin")) {
                store = "admnInq";
            }
            // buyer
            else if(hlprs.methods.isRole("buyer")) {
                store = "byrInq";
            }
            // supplier
            else if(hlprs.methods.isRole("supplier")) {
                store = "spplrInq";
            }


            // add notification
            /////////////////////////////////////////////////////////
            context.dispatch(store+'/getInquiry_a', {
                inq_id: ntfctn.data.id
            }, {root:true})
            .then((data) => {
                context.commit(store+'/UPDATE_INQUIRY_M',{inquiry:data}, {root:true});
                context.commit(store+'/SHOW_OPENINQUIRYVIEW_M', null, {root:true});


            })
            .catch((error) => {
                console.log(error);
            });
            /////////////////////////////////////////////////////////
            // add notification

        }        
    },






	getNotifications_a(context) {
    	return new Promise((resolve, reject) => {

            var headers = {token:localStorage.access_token};

            axios({
                method: state.api.getNotifications.method,
                url: state.api.getNotifications.url,
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

   markNotifasRead_a(context,ntfctn) {

   		return new Promise((resolve, reject) => {

   			  var headers = {token:localStorage.access_token};

   			   axios({
	                method: state.api.markNotifasRead.method,
	                url: state.api.markNotifasRead.url + `/${ntfctn.data.notification_id}/read`,
	                headers: headers,
	            })
	            .then(response => {
	                resolve(response.data);
	                
	                // deduct unread
	                if(!ntfctn.isRead) {
						state.unread = parseInt(state.unread) - 1
	                }
	                
	                
	            })
	            .catch(error => {
	                // console.log(error);
	                if(actions.checkToken(error)) {
	                    reject(error);
	                }
	            })

   		});

   },



}




 
const methods = {



}
 
 

const getters = {

}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	methods,	
    actions, 
}

