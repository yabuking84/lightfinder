// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'
import hlprs from '@/mixins/helpers'

import vm from '@/main.js';



import MsgBus from "@/bus/messaging";
import NtfctnBus from "@/bus/notification";











const state = {

    notifications: [],
    notificationsMsgs: [],
    unread:null,
    unreadMsgs:null,

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

    SET_NOTIFICATIONS_M(state, data) {
        state.notifications = data;
    },
    INSERT_NOTIFICATIONS_M(state, data) {
        state.notifications.push(data);
    },
    RESET_NOTIFICATIONS_M(state) {
        state.notifications = [];
    },
    SET_UNREAD_M(state,data) {
        state.unread = data;
    },

    SET_NOTIFICATIONSMSGS_M(state, data) {
        state.notificationsMsgs = data;
    },
    INSERT_NOTIFICATIONSMSGS_M(state, data) {
        state.notificationsMsgs.push(data);
    },
    RESET_NOTIFICATIONSMSGS_M(state) {
        state.notificationsMsgs = [];
    },
    SET_UNREADMSGS_M(state,data) {
        state.unreadMsgs = data;
    },



    UPDATE_SNACKBAR_M(state,data) {
        state.dataSnackbar = data;
    },

    SHOW_SNACKBAR_M(state) {
        state.showSnackbar = true;
    },

    HIDE_SNACKBAR_M(state) {
        state.showSnackbar = false;
    },

    // UPDATE_TEXTSNACKBAR_M(state,data) {        
    //     state.textSnackbar = data.textSnackbar;
    // },
}

 



















const actions = {






	// sockets
	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////


    // admin
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    adminApprovedInquiry_a(context, data){
		
    	// populate but not show snackbar yet until all notifications are loaded
		var textSnackbar = 'Inquiry #'+data.inquiry_id+' APPROVED!';        
        context.commit('UPDATE_SNACKBAR_M',textSnackbar);

		NtfctnBus.emitNewNotification(data);
    },


    // zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz







    adminRejectedInquiry_a(context, data){

    	// populate but not show snackbar yet until all notifications are loaded
		var textSnackbar = 'Inquiry #'+data.inquiry_id+' REJECTED!';        
        context.commit('UPDATE_SNACKBAR_M',textSnackbar);

		NtfctnBus.emitNewNotification(data);

        // context.dispatch('byrInq/getInquiry_a',{inq_id:data.inquiry_id},{root:true})
        // .then((response)=>{
        //     var ntfctn = {
        //         title:          "Inquiry \""+response.keyword+"\" REJECTED!",
        //         dataType:       'inquiry',
        //         data:           response,
        //         textSnackbar:   'Inquiry "'+response.keyword+'" REJECTED!',
        //     }
        //     context.dispatch('updateNotification_a',ntfctn);
        // });    	
    },
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // admin

    // buyer
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    buyerAwardedBid_a(context, data){

    	// populate but not show snackbar yet until all notifications are loaded
		var textSnackbar = 'Bid for Inquiry #'+data.inquiry_id+' AWARDED!';        
        context.commit('UPDATE_SNACKBAR_M',textSnackbar);

		NtfctnBus.emitNewNotification(data);

        // context.dispatch('spplrInq/getInquiry_a',{inq_id:data.inquiry_id},{root:true})
        // .then((response)=>{
        //     var ntfctn = {
        //         title:          "Bid \""+response.keyword+"\" AWARDED!",
        //         dataType:       'inquiry',
        //         data:           response,
        //         textSnackbar:   'Bid "'+response.keyword+'" AWARDED!',
        //     }
        //     context.dispatch('updateNotification_a',ntfctn,);
        // });

    },
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // buyer

    // supplier
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    supplierCreatedBid_a(context, data) {

    	// populate but not show snackbar yet until all notifications are loaded
		var textSnackbar = 'New Bid for Inquiry #'+data.inquiry_id+' AWARDED!';        
        context.commit('UPDATE_SNACKBAR_M',textSnackbar);

		NtfctnBus.emitNewNotification(data);

        // var store = hlprs.methods.getStore();
        // if(store!='supplier') {
        //     context.dispatch(store+'/getInquiry_a',{inq_id:data.inquiry_id},{root:true})
        //     .then((response)=>{
        //         var ntfctn = {
        //             title:          "New Bid for Inquiry # "+data.inquiry_id+"!",
        //             dataType:       'inquiry',
        //             data:           response,
        //             textSnackbar:   'Supplier Created Bid for Inquiry # '+data.inquiry_id+'!',
        //         }
        //         context.dispatch('updateNotification_a',ntfctn);
        //     });
        // }

    },

    supplierConfirmedAward_a(context, data) {
    	// populate but not show snackbar yet until all notifications are loaded
		var textSnackbar = 'Supplier Confirmed for Inquiry #'+data.inquiry_id+' AWARDED!';
        context.commit('UPDATE_SNACKBAR_M',textSnackbar);

		NtfctnBus.emitNewNotification(data);


        // context.dispatch('byrInq/getInquiry_a',{inq_id:data.inquiry_id},{root:true})
        // .then((response)=>{
        //     var ntfctn = {
        //         title:          "Supplier Confirmed \""+response.keyword+"\"!",
        //         dataType:       'inquiry',
        //         data:           response,
        //         textSnackbar:   'Supplier Confirmed "'+response.keyword+'"!',
        //     }
        //     context.dispatch('updateNotification_a',ntfctn);
        // });       	
    },
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    
    // supplier



    // messaging
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    
	newMessage_a(context, data){

		console.log('data',data);
		
    	// populate but not show snackbar yet until all notifications are loaded
		var textSnackbar = '';
    	if(data.type == 'bid.buyer.admin')
		textSnackbar = 'New Message on BID #'+data.id+'!';
    	else 
    	if(data.type == 'inquiry.buyer.admin')
		textSnackbar = 'New Message on INQUIRY #'+data.id+'!';
    	else
		textSnackbar = 'New Message!';

    	context.commit('UPDATE_SNACKBAR_M',textSnackbar);
		MsgBus.emitNewMessage(data);
		
        // var ntfctn = {
        //     title:          "Supplier Confirmed \""+response.keyword+"\"!",
        //     dataType:       'inquiry',
        //     data:           response,
        //     textSnackbar:   'Supplier Confirmed "'+response.keyword+'"!',
        // }
        // context.dispatch('ntfctns/updateNotification_a',ntfctn,{root:true});		

	},
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    
    // messaging

	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
	// sockets






















    resetNotification_a(context){
        context.commit('RESET_NOTIFICATIONS_M');
    },

    resetAllNotification_a(context){
        context.commit('RESET_NOTIFICATIONS_M');
        context.commit('RESET_NOTIFICATIONSMSGS_M');
    },



    // commented because when there's a notification the notifcation component will just refresh
    // updateNotification_a(context, data){
       
    //     context.commit('INSERT_NOTIFICATIONS_M',data);

    //     context.commit('UPDATE_SNACKBAR_M',{dataSnackbar:data});
    //     context.commit('SHOW_SNACKBAR_M');

    //     // if there's an update
    //     context.commit('SET_UNREAD_M', parseInt(state.unread) + 1);
    //     // state.unread = parseInt(state.unread) + 1

    // },



    gotoNotfication_a(context,ntfctn){

    	console.log('ntfctn',ntfctn);

        // if inquiry type
        if(ntfctn.dataType == 'inquiry' || ntfctn.dataType == 'bid') {

            var store = hlprs.methods.getStore();

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



	populateNotifications_a(context) {
    	return new Promise((resolve, reject) => {

            var headers = {token:localStorage.access_token};

            axios({
                method: state.api.getNotifications.method,
                url: state.api.getNotifications.url,
                headers: headers,
            })
            .then(response => {

            	var ntfctns = response.data.filter(item=>item.type!='newMessage');


            	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

	        	var notifications = ntfctns;

		    	var unreadCount = 0; // integer
		    	var isRead;
		    	var title = '';
				var dataType = '';
		        var data = {};

		  		var ntfctns = [];
		        for (var i = notifications.length - 1; i >= 0; i--) {

			       	isRead = true; 
		    		title = '';
					dataType = '';

		    	   	if(notifications[i].read_at == null || notifications[i].read_at == undefined) {    	   	
		    	   		unreadCount = parseInt(unreadCount) + 1
		    	   		isRead = false
		    	   	}

		            data = {
		      			'id':notifications[i].data.inquiry_id,
		      			'bid_id':notifications[i].data.bid_id,
		      			'notification_id': notifications[i].id,
		      			'type': notifications[i].type,
		          	}


			       	switch (notifications[i].type) {

					    case 'adminApprovedInquiry':
					    	title='Inquiry "'+notifications[i].data.inquiry_id+'" APPROVED!';
					    	dataType = 'inquiry';
					    break;

					    case 'adminRejectedInquiry':
					    	title="Inquiry \""+notifications[i].data.inquiry_id+"\" REJECTED!";
					    	dataType = 'inquiry';
					    break;

					    case 'supplierCreatedBid': 
					   		title="Supplier Created Bid for Inquiry #"+notifications[i].data.inquiry_id+"!";
					    	dataType = 'bid';
					    break;

					    case 'supplierConfirmedAward': 
					   		title="Supplier Confirmed \""+notifications[i].data.inquiry_id+"\"!";
					    	dataType = 'inquiry';
					    break;

					    // supplier
					    case 'buyerAwardedBid': 
					    	title=`Buyer has Awarded for Inquiry # ${ notifications[i].data.inquiry_id }  to you`;
					    	dataType = 'inquiry';
					    break;
					}

		 		    var ntfctn = {
		                title:         title,
		                dataType:      dataType,
		                data:          data,
		                textSnackbar:  title,
		                isRead: 	   isRead,
		            }

			        ntfctns.push(ntfctn);
			    }
			    
			    context.commit('SET_NOTIFICATIONS_M',ntfctns);
			    context.commit('SET_UNREAD_M',unreadCount);


			    resolve();
            	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

            })
            .catch(error => {
                // console.log(error);
                // if(actions.checkToken(error)) {
                    reject(error);
                // }
            })

        });
   },



	getNotificationsMsgs_a(context) {
    	return new Promise((resolve, reject) => {

            var headers = {token:localStorage.access_token};

            axios({
                method: state.api.getNotifications.method,
                url: state.api.getNotifications.url,
                headers: headers,
            })
            .then(response => {

            	var ntfctns = response.data.filter(item=>item.type=='newMessage');

            	console.log(ntfctns);

            	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	        	var notifications = ntfctns;

		    	var unreadCount = 0; // integer
		    	var isRead;
		    	var title = '';

		    	// Get the array of keys
				// var keys = Object.keys( notifications );
		  		// keys.sort( function ( a, b ) { return b.created_at - a.created_at; } );

		  		var ntfctns = [];

		        for (var i = notifications.length - 1; i >= 0; i--) {

			       	isRead = true; 

		    	   	if(notifications[i].read_at == null || notifications[i].read_at == undefined) {    	   	
		    	   		unreadCount = parseInt(unreadCount) + 1
		    	   		isRead = false
		    	   	}
		            var data = {
		      			'id':notifications[i].data.inquiry_id,
		      			'notification_id': notifications[i].id
		          	}
			    	title = 'New Message Received "'+notifications[i].data.content+'" ';

		 		    var ntfctn = {
		                title:         title,
		                data:          data,
		                textSnackbar:  title,
		                isRead: 	   isRead,
		            }

			        ntfctns.push(ntfctn);
			    }
			    
			    context.commit('SET_NOTIFICATIONSMSGS_M',ntfctns);
			    context.commit('SET_UNREADMSGS_M',unreadCount);            	
            	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

                resolve();
            })
            .catch(error => {
                // console.log(error);
                // if(actions.checkToken(error)) {
                    reject(error);
                // }
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
						ntfctn.isRead = true;
	                }
	                

	            })
	            .catch(error => {
	                // console.log(error);
	                // if(actions.checkToken(error)) {
	                    reject(error);
	                // }
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

