// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'
import hlprs from '@/mixins/helpers'

import vm from '@/main.js';

const state = {

    notifications: [],

    // [
    //     {
    //         title:"title to display",
    //         dataType: "inquiry,quote,user, etc..",
    //         data:"any data that is related to the notification",
    //     }
    // ]

    showSnackbar: false,
    dataSnackbar: null,

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

