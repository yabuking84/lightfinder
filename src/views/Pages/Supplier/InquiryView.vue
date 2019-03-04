<template>
	<div class="scopedcontainer">
		<v-container fluid grid-list-xl >
				
				
				<v-layout row wrap>

					<v-flex xs12>
						<inquiry-details-card :inquiry="inquiry"> </inquiry-details-card>
					</v-flex>
					<!-- end of detils  -->

					
					<!-- supplier quote -->
					<v-flex xs8>
						<quote-details :inquiry="inquiry"> </quote-details>
					</v-flex>  
					<!-- supplier quote -->


					<!-- proposal list -->
					<v-flex xs4>
					  	<inquiry-post-list :inquiry="inquiry"> </inquiry-post-list>
					</v-flex>
					<!-- proposal list -->

				</v-layout>
		</v-container>



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

	props: ['inq_id'],

	// props: {
	// 	inq_id: {
	// 		type: String,
	// 	},
	// },

	data: () => ({

		title: 'Inquiry Details',
		icon: null,
		bidDialog:false,
		inquiry: {
		    "id": null,
		    "subject": null,
		    "keyword": null,
		    "warranty": null,
		    "quantity": null,
		    "desired_price": null,
		    "desired_shipping_date": null,
		    "message": null,
		    "status_id": null,
		    "stage_id": null,
		    "payment_method_id": null,
		    "shipping_method_id": null,
		    "shipping_date": null,
		    "awarded": null,
		    "paid": null,
		    "created_at": null,
		    "updated_at": null,
		    "categories": [],
		},

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

		getInquiry(){
			
		},

	},

	created() {

		this.$store.dispatch('spplrInq/getInquiry_a',{inq_id:this.inq_id})
		.then((data)=>{
			this.inquiry = data;
			inqEvntBs.inquiry = this.inquiry;

		})
		.catch((error)=>{
			console.log(error);
		});
	},
}
	
</script>

<style scoped lang="scss">
	.scopedcontainer a {
	  	text-decoration:none;
	}

</style>

