<template>
<v-dialog :value="openInquiry" @input="$emit('update:openInquiry', false)" fullscreen>
<!-- <v-dialog :value="openInquiry" @input="$emit('update:openInquiry', false)" fullscreen scrollable> -->
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
		        	<!-- :openInquiry="openInquiry" -->
		            <inquiry-details-card v-if="inquiry" :inquiry="inquiry"> </inquiry-details-card>
		        </v-flex>
		        <!-- end of detils  -->

		        <!-- supplier quote / bids -->
		        <v-flex xs7>
		        	<!-- :openInquiry="openInquiry" -->
		            <inquiry-post-list v-if="inquiry" :inquiry="inquiry"> </inquiry-post-list>
		        </v-flex>
		        <!-- supplier quote -->

		    </v-layout>
		</v-container>	
	
    </v-card>
</v-dialog>   	
</template>

<script>

import InquiryPostList from "@/views/Components/App/Buyer/InquiryPostList"
import InquiryDetailsCard from "@/views/Components/App/Buyer/InquiryDetailsCard"
import InquiryAwardCard from "@/views/Components/App/Buyer/InquiryAwardCard"

import inqEvntBs from "@/bus/inquiry";

export default {

	components: {

	    InquiryPostList,
	    InquiryDetailsCard,
	    InquiryAwardCard

	},

	props: ['inquiry','openInquiry'],

	data: () => ({

		title: 'Inquiry Details',
		icon: null,
		bidDialog:false,
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

		closeOpenInquiry(){
            this.$emit('update:openInquiry', false);
            inqEvntBs.EmitClosed()
		},

	},

	created() {

		// console.log(this.inquiry);

	},
}
	
</script>

<style scoped lang="scss">
	.scopedcontainer a {
	  	text-decoration:none;
	}

</style>

