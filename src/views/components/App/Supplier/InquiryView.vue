<template>
<div class="text-xs-center">
<v-dialog 
:value="openInquiry" 
@input="closeOpenInquiry()" 
@keydown.escape="keyPress">


    <v-card>
    	<v-card-title class="black darken-4 ">
			<h2 v-if="stateInquiry" class="font-weight-bold white--text">
				INQUIRY # {{ stateInquiry.id }}
			</h2>
			<v-spacer></v-spacer>
	        <v-btn dark flat @click="closeOpenInquiry()">
	            <v-icon>close</v-icon>
	        </v-btn>

    	</v-card-title>
        <v-divider></v-divider>
        <v-card-text id="inquiryView">
			<v-container fluid grid-list-xl pa-0>
			    <v-layout row wrap>

			        <v-flex xs5>
                		<inquiry-details-card 
                		v-if="stateInquiry" 
                		:inquiry="stateInquiry"></inquiry-details-card>
			        </v-flex>

			        <v-flex xs7>
	                	<quote-details 
	                	v-if="stateInquiry" 
	                	:inquiry="stateInquiry"></quote-details>
			        </v-flex>

			    </v-layout>
			</v-container>	

	   	</v-card-text>
    </v-card>





    </v-dialog>
  </div>
</template>
<script>
import QuoteDetails from "@/views/Components/App/Supplier/QuoteDetails"
import InquiryPostList from "@/views/Components/App/Supplier/InquiryPostList"
import InquiryDetailsCard from "@/views/Components/App/Supplier/InquiryDetailsCard"
import BidDialog from "@/views/Components/App/Supplier/BidDialog"

import inqEvntBs from "@/bus/inquiry";

import inqMixin from "@/mixins/inquiry";


export default {

mixins: [
	inqMixin,
],

components: {

    QuoteDetails,
    InquiryPostList,
    InquiryDetailsCard,
    BidDialog,

},

  // props: ['inquiry', 'openInquiry'],

  // props: {
  //  inq_id: {
  //    type: String,
  //  },
  // },

data: () => ({

    title: 'Inquiry Details',
    icon: null,
    bidDialog: false,
    bids: false,

}),

computed: {

    buyer: {

        set(data) {
            this.$store.commit('auth/CHANGE_TEST_M', data);
        },

        get() {
            return this.$store.state.auth.auth_user.name;
        },
    },

    // openInquiry: {
    //     get() {
    //         return this.$store.state.inq.openInquiryView;
    //     },
    //     set(nVal){
    //         if(nVal)
    //         this.$store.commit('inq/SHOW_OPENINQUIRYVIEW_M');
    //         else
    //         this.$store.commit('inq/HIDE_OPENINQUIRYVIEW_M');
    //     },
    // },

    // inquiry: {
    //     get() {
    //         return this.$store.state.inq.inquiry;
    //     },
    //     set(nVal) {
    //         // console.log('setVal');
    //         // console.log(nVal);
    //         this.$store.commit('inq/UPDATE_INQUIRY_M',{inquiry:nVal});
    //     },
    // },       

},

methods: {

    Refresh: () => {

      alert('Refresh')

    },

    Sort: () => {

      alert('SOrt')

    },

    closeOpenInquiry() {
        this.$store.commit('inq/HIDE_OPENINQUIRYVIEW_M');
    },

    keyPress(e) {
        if (e.target.querySelector("#InquiryView"))
        this.$store.commit('inq/HIDE_OPENINQUIRYVIEW_M');
    },
},



}

</script>
<style scoped lang="scss">
.scopedcontainer a {
  text-decoration: none;
}

</style>
