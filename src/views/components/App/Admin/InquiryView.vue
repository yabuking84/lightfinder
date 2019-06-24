<template>
  
  <!-- @input="$emit('update:openInquiry', false)"  -->
<v-dialog 
@input="closeOpenInquiry()" 
:value="openInquiry" 
@keydown.escape="keyPress">
    <!-- <v-dialog :value="openInquiry" @input="$emit('update:openInquiry', false)" fullscreen scrollable> -->
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

        <v-card-text id="inquiryView">
	        <v-container fluid grid-list-xl  pa-0>
	          	<v-layout row wrap>

		            <!-- inquiry details card -->
		            <v-flex xs5>
		              <inquiry-details-card 
		              v-if="stateInquiry" 
		              :inquiry="stateInquiry"
		              :openInquiry="openInquiry"
		              :isClosed.sync="isClosed"> </inquiry-details-card>
		            </v-flex>
		            <!-- end of detils  -->

		            <!-- supplier quote / bids -->
		            <v-flex xs7>
		             	<inquiry-post-list 
		             	v-if="stateInquiry" 
		             	:inquiry="stateInquiry"> </inquiry-post-list>
		            </v-flex>
		            <!-- supplier quote -->

	          	</v-layout>
	        </v-container>
      
	   	</v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import InquiryPostList from "@/views/Components/App/Admin/InquiryPostList"
import InquiryDetailsCard from "@/views/Components/App/Admin/InquiryDetailsCard"

import inqEvntBs from "@/bus/inquiry";

import inqMixin from "@/mixins/inquiry";

export default {

	mixins: [
		inqMixin,
	],


  components: {

    InquiryPostList,
    InquiryDetailsCard,

  },


  data: () => ({

    title: 'Inquiry Details',
    icon: null,
    isClosed: false,

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
    //         this.hideInquiry();
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

        closeOpenInquiry() {
            this.hideInquiry();
        },

        keyPress(e){

            if(e.target.querySelector("#InquiryView"))
            this.hideInquiry();
            
            // console.log(e.target);

        },
    },

  created() {

  },

  watch: { 

    isClosed: {

      handler(nVal, oVal) {

        if (nVal) {
            this.isClosed = false
            this.hideInquiry();
        }

      },

      deep: true
    }

  },






}

</script>
<style scoped lang="scss">
.scopedcontainer a {
  text-decoration: none;
}

</style>
