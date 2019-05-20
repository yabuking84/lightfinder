<template>

<!-- <div id="test" v-if="openInquiry" :value="openInquiry" @input="$emit('update:openInquiry', false)"></div> -->
<div>


<v-dialog 
:value="openInquiry" 
@input="$emit('update:openInquiry', false)" 
lazy
fullscreen
scrollable>
    <v-card>

    	<v-card-title class="black darken-4 ">
			<h2 v-if="inquiry" class="font-weight-bold white--text">INQUIRY # {{ inquiry.id }}</h2>
			<v-spacer></v-spacer>
	        <v-btn dark flat @click="closeOpenInquiry()">
	            <v-icon>close</v-icon>
	        </v-btn>

			<!-- <v-toolbar dark color="grey darken-4 ">
			    <h2 v-if="inquiry" class="font-weight-bold">INQUIRY # {{ inquiry.id }}</h2>
			    <v-spacer></v-spacer>
			    <v-toolbar-items>
			        <v-btn dark flat @click="closeOpenInquiry()">
			            <v-icon>close</v-icon>
			        </v-btn>
			    </v-toolbar-items>
			</v-toolbar> -->

    	</v-card-title>
        <v-divider></v-divider>

        <v-card-text id="inquiryView">
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

	   	</v-card-text>

        <!-- <v-divider></v-divider>
	   	<v-card-actions></v-card-actions> -->

	
    </v-card>

</v-dialog>   


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

</div>



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
                return this.$store.state.inq.openInquiryView;
            },
            set(nVal){
                if(nVal)
                this.$store.commit('inq/SHOW_OPENINQUIRYVIEW_M');
                else
                this.$store.commit('inq/HIDE_OPENINQUIRYVIEW_M');
            },
        },

        inquiry: {
            get() {
                return this.$store.state.inq.inquiry;
            },
            set(nVal) {
                // console.log('setVal');
                // console.log(nVal);
                this.$store.commit('inq/UPDATE_INQUIRY_M',{inquiry:nVal});
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

	mounted(){
		// console.log('querySelector',this.$refs);
		// console.log('querySelector',this.$refs.inquiryView);
		// console.log('querySelector',this.$el);

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

