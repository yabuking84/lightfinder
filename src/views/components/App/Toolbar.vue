<template>
<div>

<v-toolbar 
:fixed="fixedToolbar" 
v-if="toolbar" 
:class="navToolbarScheme" 
:clipped-left="toolbarClippedLeft" 
background-color="red"
:style="style"
app 
flat>

    <!-- <v-toolbar-side-icon
      class="hidden-lg-and-up"
      @click.stop="$store.dispatch('toggleDrawer', ! navDrawer)"></v-toolbar-side-icon>
    <v-toolbar-title v-text="title" class="ml-0 hidden-lg-and-up"></v-toolbar-title>
    <v-btn
      icon
      light
      class="hidden-md-and-down"
      @click.stop="toggleMiniVariantMode"
    >
      <v-tooltip bottom v-if="navMiniVarient" color="sidebar">
        <v-icon slot="activator">fas fa-arrow-circle-right</v-icon>
        <span>Expand</span>
      </v-tooltip>
      <v-tooltip bottom v-else color="sidebar">
        <v-icon slot="activator">fas fa-arrow-circle-left</v-icon>
        <span>Collapse</span>
      </v-tooltip>
    </v-btn> -->

    <!-- <v-btn icon :to="{name: 'Contacts'}" flat>
      <v-icon>contacts</v-icon>
    </v-btn>

    <v-btn icon :to="{name: 'Chat'}" flat>
      <v-icon>chat</v-icon>
    </v-btn>  -->

    <!-- <v-icon>far fa-bell</v-icon> -->

    <v-menu offset-y transition="scale-transition" allow-overflow fixed>
    	
        <template v-slot:activator="{ on }">
            <v-btn flat v-on="on">
                <v-badge color="red">
                    <template v-slot:badge  v-if="unread>0">
                        <span>{{ unread }}</span>
                    </template>
                    <v-icon>far fa-bell</v-icon>
                </v-badge>
            </v-btn>
        </template>

        <v-list class="notification_list" dense  v-if="notifications && notifications.length" >
        	<!-- v-if="index <= 10" -->
            <template v-for="(notification, index) in notifications.slice().reverse()">
                <v-list-tile  :key="'not_'+index" @click="gotoNotfication(notification)">
                    <!-- <v-list-tile-title>{{notification.title  }}</v-list-tile-title> <br/> -->
                    <v-list-tile-sub-title 
                    :class="notification.isRead ? 'grey--text' : 'black--text'">
                		{{ notification.title }} 
                	</v-list-tile-sub-title>
                </v-list-tile>
                 <v-divider :key="'divider_'+index"></v-divider>
            </template>
                <v-list-tile @click="">
                <v-list-tile-sub-title class="black--text text-xs-center">See All</v-list-tile-sub-title>
           </v-list-tile>
        </v-list>
     
    </v-menu>

    <v-spacer></v-spacer>
    
    <!-- devMode -->
    <!-- dddddddddddddddddddddddddddddddddddddddddd -->
    <template v-if="devMode">
    <v-btn>
        <h3>{{ authUser.email }}</h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3>{{ authUser.name }}</h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3>{{ authUser.uuid }}</h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3 v-if="authUser.role==roles.admin.id">ADMIN</h3>
        <h3 v-else-if="authUser.role==roles.buyer.id">BUYER</h3>
        <h3 v-else-if="authUser.role==roles.supplier.id">SUPPLIER</h3>
    </v-btn>
    </template>
    <!-- dddddddddddddddddddddddddddddddddddddddddd -->
    <!-- devMode -->

    <v-menu offset-x>
        <v-avatar slot="activator" size="40">
            <div :style="avatarBgImage">
                <!-- <img :src="authUser.avatar" :alt="authUser.name"> -->
            </div>
        </v-avatar>

        <v-list dense>

            <v-list-tile avatar>
                <v-list-tile-avatar>
                    <div :style="avatarBgImage">
                    </div>
                    <!-- <img :src="authUser.avatar" :alt="authUser.name"> -->
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title v-text="authUser.name"></v-list-tile-title>

                    <v-list-tile-sub-title v-if="authUser.role==roles.admin.id">Administrator</v-list-tile-sub-title>
                    <v-list-tile-sub-title v-else-if="authUser.role==roles.buyer.id">Buyer</v-list-tile-sub-title>
                    <v-list-tile-sub-title v-else-if="authUser.role==roles.supplier.id">Supplier</v-list-tile-sub-title>
                    <v-list-tile-sub-title v-else>Unknown</v-list-tile-sub-title>

                </v-list-tile-content>

            </v-list-tile>

            <br>

            <v-divider></v-divider>

            <v-list-tile @click="() => {}">
                <v-list-tile-avatar>
                    <v-icon>person</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Edit Profile</v-list-tile-title>
            </v-list-tile>
            
            <v-list-tile @click="() => {}">
                <v-list-tile-avatar>
                    <v-icon>settings_applications</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Settings</v-list-tile-title>
            </v-list-tile>

            <v-list-tile @click="() => {}">
                <v-list-tile-avatar>
                    <v-icon>mail</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Inbox</v-list-tile-title>
            </v-list-tile>

            <v-divider></v-divider>

            <v-list-tile @click="logout()">
                <v-list-tile-avatar>
                    <v-icon>power_settings_new</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Sign Out</v-list-tile-title>
            </v-list-tile>

        </v-list>

    </v-menu>
</v-toolbar>

<v-snackbar 
:value="showSnackbar" 
:timeout="timeoutSnackbar"
right
top
multi-line
color="white"
v-if="sbNtfctnData"
style="cursor: pointer;">
    <h4 style="color:#000;" @click="gotoNotfication(sbNtfctnData)">
        {{ sbNtfctnData.textSnackbar }}
    </h4>
    <v-btn color="pink" flat @click="showSnackbar = false">
        Close
    </v-btn>
</v-snackbar>




</div>
</template>














<script>

import { mapGetters } from 'vuex'
import config from '@/config/index'

import hlprs from "@/mixins/helpers";
// console.log(config);

export default {
data: () => ({
    title: 'BuyAnyLight.com',
    roles: config.auth.role,
    timeoutSnackbar: 8000,
    devMode: true,
    notificationList:null,
    isReadnow:false,
    isReadColor: 'grey--text',
    isunReadColor: 'black--text'

}),


computed: {
    ...mapGetters({
        navDrawer: 'navDrawer',
        toolbarClippedLeft: 'toolbarClippedLeft',
        fixedToolbar: 'fixedToolbar',
        toolbar: 'toolbarVisibility',
        navToolbarScheme: 'navToolbarScheme',
        navMiniVarient: 'navMiniVarient'
    }),

    authUser () {        
        return this.$store.state.auth.auth_user;
    },

    testVuex () {        
        return this.$store.state.auth.test_vuex;
    },

    avatarBgImage() {
      
      if(!this.$store.state.auth.auth_user.avatar)
      // default image to be download later - https://image.flaticon.com/icons/svg/149/149071.svg
      this.$store.state.auth.auth_user.avatar = 'https://image.flaticon.com/icons/svg/149/149071.svg'

        return {
            backgroundImage:'url('+this.$store.state.auth.auth_user.avatar+')',
        };
    },













   unread() {

   	return this.$store.state.ntfctns.unread

   },

    notifications(){

        return this.$store.state.ntfctns.notifications;

        // // testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
        // // testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
        // // testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
        // // testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest

        // return [
        //   {
        //     "title": "Inquiry \"Template Test Inquiry\" APPROVED!",
        //     "dataType": "inquiry",
        //     "data": {
        //       "id": "1554795137726",
        //       "subject": null,
        //       "keyword": "Template Test Inquiry",
        //       "warranty": 0,
        //       "quantity": 525,
        //       "desired_price": 20,
        //       "desired_shipping_date": "2019-04-09",
        //       "message": "Need this for a accomodation project.",
        //       "status_id": 1,
        //       "stage_id": 1003,
        //       "shipping_city": "Taliban",
        //       "shipping_country_id": 1,
        //       "shipping_postal": "6000",
        //       "sample_quantity": 2,
        //       "sample_shipping_address": "12",
        //       "sample_shipping_city": "Taliban",
        //       "sample_shipping_country_id": 1,
        //       "sample_shipping_postal": "6000",
        //       "oem": 0,
        //       "oem_service": null,
        //       "oem_description": null,
        //       "shipping_address": "12",
        //       "shipping_method_id": 1,
        //       "payment_method_id": 1,
        //       "shipping_date": "2019-04-09",
        //       "awarded": 0,
        //       "paid": 0,
        //       "user_id": 3,
        //       "awarded_user_id": null,
        //       "created_at": "2019-04-09 07:32:17",
        //       "updated_at": "2019-04-09 11:09:08",
        //       "categories": [
        //         "LED DOWNLIGHTS"
        //       ],
        //       "specifications": [
        //         {
        //           "name": "Power",
        //           "value": "20"
        //         },
        //         {
        //           "name": "Lumen",
        //           "value": null
        //         },
        //         {
        //           "name": "Efficiency",
        //           "value": "3000"
        //         },
        //         {
        //           "name": "Beam Angle",
        //           "value": null
        //         },
        //         {
        //           "name": "CCT",
        //           "value": null
        //         },
        //         {
        //           "name": "IP",
        //           "value": "55"
        //         },
        //         {
        //           "name": "Finish",
        //           "value": "matt black"
        //         },
        //         {
        //           "name": "Size",
        //           "value": null
        //         },
        //         {
        //           "name": "Dimmable",
        //           "value": "Non-Dim"
        //         }
        //       ],
        //       "bids": [
        //         {
        //           "id": "1554795137726-88",
        //           "price": 20,
        //           "remarks": "supplier@bal.com remarks",
        //           "sample_cost": 0,
        //           "sample_shipment_cost": 0,
        //           "total_price": 10,
        //           "description": "test data",
        //           "created_at": "2019-04-09 09:27:48",
        //           "updated_at": "2019-04-09 09:27:48"
        //         }
        //       ]
        //     },
        //     "textSnackbar": "Inquiry \"Template Test Inquiry\" APPROVED!"
        //   },




        //   {
        //     "title": "Inquiry \"DOWNLIGHT -  RENE TEST INQUIRY!!\" APPROVED!",
        //     "dataType": "inquiry",
        //     "data": {
        //       "id": "1554808394327",
        //       "subject": null,
        //       "keyword": "DOWNLIGHT -  RENE TEST INQUIRY!!",
        //       "warranty": 0,
        //       "quantity": 100,
        //       "desired_price": 25.36,
        //       "desired_shipping_date": "2019-04-09",
        //       "message": "So much nice I want it maximum!",
        //       "status_id": 1,
        //       "stage_id": 1002,
        //       "shipping_city": "Iligan City",
        //       "shipping_country_id": 178,
        //       "shipping_postal": "9200",
        //       "sample_quantity": 0,
        //       "sample_shipping_address": null,
        //       "sample_shipping_city": null,
        //       "sample_shipping_country_id": null,
        //       "sample_shipping_postal": "9200",
        //       "oem": 0,
        //       "oem_service": null,
        //       "oem_description": null,
        //       "shipping_address": "Kaimito St",
        //       "shipping_method_id": 1,
        //       "payment_method_id": 1,
        //       "shipping_date": "2019-04-09",
        //       "awarded": 0,
        //       "paid": 0,
        //       "user_id": 3,
        //       "awarded_user_id": null,
        //       "created_at": "2019-04-09 11:13:14",
        //       "updated_at": "2019-04-09 11:13:26",
        //       "categories": [
        //         "LED DOWNLIGHTS"
        //       ],
        //       "specifications": [
        //         {
        //           "name": "Power",
        //           "value": "00"
        //         },
        //         {
        //           "name": "Lumen",
        //           "value": "00"
        //         },
        //         {
        //           "name": "Efficiency",
        //           "value": "00"
        //         },
        //         {
        //           "name": "Beam Angle",
        //           "value": "00"
        //         },
        //         {
        //           "name": "CCT",
        //           "value": "00"
        //         },
        //         {
        //           "name": "IP",
        //           "value": "00"
        //         },
        //         {
        //           "name": "Finish",
        //           "value": "00"
        //         },
        //         {
        //           "name": "Size",
        //           "value": "00"
        //         },
        //         {
        //           "name": "Dimmable",
        //           "value": "00"
        //         }
        //       ],
        //       "bids": []
        //     },
        //     "textSnackbar": "Inquiry \"DOWNLIGHT -  RENE TEST INQUIRY!!\" APPROVED!"
        //   }
        // ];
        // // testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
        // // testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
        // // testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
        // // testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
        // // testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest

    },








    showSnackbar:{
        get(){
            return this.$store.state.ntfctns.showSnackbar;
        },
        set(nVal){
            if(nVal)
            this.$store.commit('ntfctns/SHOW_SNACKBAR_M');
            else
            this.$store.commit('ntfctns/HIDE_SNACKBAR_M');
        },
    },

    sbNtfctnData(){
        return this.$store.state.ntfctns.dataSnackbar;
    },

    style(){
        var style = '';
        
        
        // Dev mode, some markers for easier to know the user and type.
        if(this.devMode) {            
            if(hlprs.methods.isRole("admin"))
            style = 'background-color:yellow !important;';
            else if(hlprs.methods.isRole("buyer"))
            style = 'background-color:blue !important;';
            else if(hlprs.methods.isRole("supplier"))
            style = 'background-color:red !important;';
        }
        
        return style;
    },
},


methods: {

    toggleMiniVariantMode () {
      this.$store.dispatch('toggleMiniVariantMode')
      this.$store.dispatch('toggleMiniVarient')
    },

    logout() {
        this.$router.push({name:'Logout'});                
    },


    getNotifications() {

        this.$store.dispatch('ntfctns/getNotifications_a')
        .then((response) => {
        	this.getSortNotification(response);
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {

        });

    },

     getSortNotification(notifications) {

    	var unreadCount = 0; // integer
    	var isRead;
    	var title = '';

    	// Get the array of keys
		// var keys = Object.keys( notifications );
  		// keys.sort( function ( a, b ) { return b.created_at - a.created_at; } );

        for (var i = notifications.length - 1; i >= 0; i--) {


    	       var isRead = true; 

        	   if(notifications[i].read_at == null || notifications[i].read_at == undefined) {
        	   	
        	   	  unreadCount = parseInt(unreadCount) + 1
        	   	  isRead = false

        	   }

	            var data = {

	          			'id':notifications[i].data.inquiry_id,
	          			'notification_id': notifications[i].id
	          	}


	       switch (notifications[i].type) {

			    case 'adminApprovedInquiry':
			    	 title='Inquiry "'+notifications[i].data.inquiry_id+'" APPROVED!';
			    break;

			    case 'adminRejectedInquiry':
			    	 title="Inquiry \""+notifications[i].data.inquiry_id+"\" REJECTED!";
			    break;

			    case 'supplierCreatedBid': 
			   		 title="Supplier Created Bid for Inquiry # "+notifications[i].data.inquiry_id+"!";
			    break;

			    case 'supplierConfirmedAward': 
			   		 title="Supplier Confirmed \""+notifications[i].data.inquiry_id+"\"!";
			    break;

			    // supplier
			    case 'buyerAwardedBid': 
			    	title=`Buyer has Awarded for Inquiry # ${ notifications[i].data.inquiry_id }  to you`;
			    break;

			    // admin
			    case 'newMessage': 
			    	title=`New Message Received "${notifications[i].data.content}" `
			     break;
			}

 		     	var ntfctn = {

                    title:         title,
                    dataType:      'inquiry',
                    data:          data,
                    textSnackbar:  title,
                    isRead: 	   isRead,

                }

	           this.$store.state.ntfctns.notifications.push(ntfctn);
	           this.$store.state.ntfctns.unread = unreadCount
	    }
		     
    },




   






    // notificationsnotificationsnotificationsnotificationsnotificationsnotifications
    // notificationsnotificationsnotificationsnotificationsnotificationsnotifications
    // notificationsnotificationsnotificationsnotificationsnotificationsnotifications

    gotoNotfication(ntfctn){

        this.showSnackbar = false;
        this.$store.dispatch('ntfctns/gotoNotfication_a',ntfctn);
    	this.$store.dispatch('ntfctns/markNotifasRead_a',ntfctn);
        // console.log(this.$refs);

    },
 

    // notificationsnotificationsnotificationsnotificationsnotificationsnotifications
    // notificationsnotificationsnotificationsnotificationsnotificationsnotifications
    // notificationsnotificationsnotificationsnotificationsnotificationsnotifications



},

created()  {
	this.getNotifications()
}



}
</script>



<style lang="scss" scoped>

.v-avatar {
    div {
        overflow: hidden;
        height: 100%;
        width: 100%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-size: cover;
        background-position: center;
        border-radius: 50%;
        img {
            height: auto;
            border-radius: 0;
        }
    }
}

.read {
	color: gray;
}

.notification_list {
	max-height: 500px;
	overflow-y: auto;
}

</style>
