<template>

<!-- <div id="test" v-if="openInquiry" :value="openInquiry" @input="$emit('update:openInquiry', false)"></div> -->



<v-dialog :value="openInquiry" @input="$emit('update:openInquiry', false)" fullscreen>
    <v-card>
		<v-toolbar dark color="grey darken-4 ">
		    <h2 v-if="inquiry" class="font-weight-bold">INQUIRY # {{ inquiry.id }}</h2>
		    <v-spacer></v-spacer>
		    <v-toolbar-items>
		        <v-btn dark flat @click="closeOpenInquiry()">
		            <v-icon>close</v-icon>
		        </v-btn>
				

		    </v-toolbar-items>
		</v-toolbar>

		<v-container fluid grid-list-xl>
		    <v-layout row wrap>

		        <!-- inquiry details card -->
		        <v-flex xs5>
		            <inquiry-details-card :openInquiry="openInquiry" v-if="inquiry" :inquiry="inquiry"> </inquiry-details-card>
		        </v-flex>
		        <!-- end of detils  -->

		        <!-- supplier quote / bids -->
		        <v-flex xs7>
		            <inquiry-post-list :openInquiry="openInquiry" v-if="inquiry" :inquiry="inquiry"> </inquiry-post-list>
		        </v-flex>
		        <!-- supplier quote -->

		    </v-layout>
		</v-container>	
	
    </v-card>

<v-snackbar
        v-model="successSnackbar"
         color="green"
         top
         multi-line
         middle
         :timeout="6000"
        >

        Successfully Updated your Inquiry
        <v-btn
          dark
          flat
          @click="successSnackbar = false"
        >
          Close
        </v-btn>
  </v-snackbar>

</v-dialog>   






</template>

<script>

import InquiryPostList from "@/views/Components/App/Buyer/InquiryPostList"
import InquiryDetailsCard from "@/views/Components/App/Buyer/InquiryDetailsCard"
import InquiryAwardCard from "@/views/Components/App/Buyer/InquiryAwardCard"

import inqEvntBs from "@/bus/inquiry"

export default {

	components: {

	    InquiryPostList,
	    InquiryDetailsCard,
	    InquiryAwardCard

	},


	data: () => ({

		title: 'Inquiry Details',
		icon: null,
		bidDialog:false,
		successSnackbar:false,
	}),

	computed: {

		buyer: {

			set(data){
				this.$store.commit('auth/CHANGE_TEST_M',data);
			},

			get(){				
        		return this.$store.state.auth.auth_user.name;
			},			
		},


        openInquiry: {
            get() {
                return this.$store.state.byrInq.openInquiryView;
            },
            set(nVal){
                if(nVal)
                this.$store.commit('byrInq/SHOW_OPENINQUIRYVIEW_M');
                else
                this.$store.commit('byrInq/HIDE_OPENINQUIRYVIEW_M');
            },
        },

        inquiry: {
            get() {
                return this.$store.state.byrInq.inquiry;
            },
            set(nVal) {
                // console.log('setVal');
                // console.log(nVal);
                this.$store.commit('byrInq/UPDATE_INQUIRY_M',{inquiry:nVal});
            },
        },

	},

	methods: {

		closeOpenInquiry(){
            this.openInquiry = false;
		},

	},

	created() {

		// console.log(this.inquiry);
        inqEvntBs.$on('edited-inquiry', () => {
            this.successSnackbar = true;
        });

	},
}
	
</script>

<style scoped lang="scss">
.scopedcontainer a {
  	text-decoration:none;
}

#test {
    position: absolute;
    margin: 30px;
    top: 0;
    height: 80%;
    width: 80%;
    box-shadow: 0px 0px 30px red;
    overflow: hidden;	
}

</style>

