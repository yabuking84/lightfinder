<template>
<div class="text-xs-center">
<v-dialog 
	:value="openInquiry" 
	@input="$emit('update:openInquiry', false)" 
	@keydown="keyPress"
	width="90%"
	scrollable>

    <v-card id="InquiryView">
        <!-- <v-card-title class="headline grey lighten-2" primary-title>
            Privacy Policy
        </v-card-title> -->

        <v-card-text>	






	<div class="scopedcontainer">
		<v-container fluid grid-list-xl>				
				<v-layout row wrap>

					<!-- Inquiry Details  -->
					<v-flex xs12>
						<inquiry-details-card v-if="inquiry" :inquiry="inquiry"> </inquiry-details-card>						
					</v-flex>
					<!-- Inquiry Details  -->

					
					<!-- supplier QuoteDetails -->
					<v-flex xs8>
						<quote-details v-if="inquiry" :inquiry="inquiry"> </quote-details>
					</v-flex>  
					<!-- supplier QuoteDetails -->


					<!-- proposal list -->
					<v-flex xs4>
					  	<inquiry-post-list v-if="inquiry" :openInquiry="openInquiry" :inquiry="inquiry"> </inquiry-post-list>
					</v-flex>
					<!-- proposal list -->

				</v-layout>
		</v-container>
	</div>




        </v-card-text>

        <v-divider ></v-divider>

        <v-card-actions >
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="closeOpenInquiry()">
                close
            </v-btn>
        </v-card-actions>
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

export default {


	components: {

		QuoteDetails,
	    InquiryPostList,
	    InquiryDetailsCard,
	    BidDialog,

	},

	props: ['inquiry','openInquiry'],

	// props: {
	// 	inq_id: {
	// 		type: String,
	// 	},
	// },

	data: () => ({

		title: 'Inquiry Details',
		icon: null,
		bidDialog:false,
		bids: false,

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
	},

	methods: {

		Refresh: () => {

			alert('Refresh')

		},

		Sort: () => {

			alert('SOrt')

		},

		closeOpenInquiry(){
            this.$emit('update:openInquiry', false);
             inqEvntBs.EmitClosed()
		},

    	keyPress(e){

    		if(e.target.querySelector("#InquiryView"))
    		this.$emit('update:openInquiry', false)
    		
    		// console.log(e.target);

    	},
	},

	watch: {

	},

	created() {

	},

    mounted() {


    },

}
	
</script>

<style scoped lang="scss">
	.scopedcontainer a {
	  	text-decoration:none;
	}

</style>

