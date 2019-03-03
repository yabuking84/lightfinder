<template>
	<div class="scopedcontainer">
		<v-container fluid grid-list-xl >
				
				<v-layout row wrap>

						<v-btn flat value="left"  class="v-btn--active blue-grey">
				    		<router-link :to="{ name: 'SupplierHome' }">
			                	<i class="fas fa-arrow-left white--text"></i>
			                	<span class="ml-1 white--text font-weight-light subheading">back</span>
		                	 </router-link>
		             	</v-btn>

		             	<v-spacer></v-spacer>
		             	


				</v-layout>
				
				<v-layout row wrap>

					<v-flex xs12>
						<inquiry-details-card> </inquiry-details-card>
					</v-flex>
					<!-- end of detils  -->

					
					<!-- supplier quote -->
					<v-flex xs8>
						<quote-details> </quote-details>
					</v-flex>  
					<!-- supplier quote -->


					<!-- proposal list -->
					<v-flex xs4>
					  	<inquiry-post-list> </inquiry-post-list>
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

export default {

	components: {

		QuoteDetails,
	    InquiryPostList,
	    InquiryDetailsCard,
	    BidDialog,

	},

	props: {
		inq_id: {
			type: String,
		},
	},

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

		Refresh: () => {

			alert('Refresh')

		},

		Sort: () => {

			alert('SOrt')

		}	
	},

	created() {

		console.log("inq_id = "+this.inq_id);

		// this.dispatch('')
		// .then((data)=>{
		// 	console.log(data);
		// })
		// .catch((error)=>{

		// });		
	},
}
	
</script>

<style scoped>
	.scopedcontainer a {
	  	text-decoration:none;
	}
</style>

