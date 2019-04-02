// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'

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
    textSnackbar: "",

}





const mutations = {

    UPDATE_NOTIFICATIONS_M(state, data) {
        state.notifications.push(data);
    },

    RESET_NOTIFICATIONS_M(state) {
        state.notifications = [];
    },

    UPDATE_TEXTSNACKBAR_M(state,data) {        
        state.textSnackbar = data.textSnackbar;
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
        context.commit('UPDATE_TEXTSNACKBAR_M',{textSnackbar:data.textSnackbar});
        context.commit('SHOW_SNACKBAR_M');
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

