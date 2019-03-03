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
		             	
		             	<v-btn @click="QuoteDialog = true" class="font-weight-light" color="green" dark>
					    	<i class="fas fa-plus  white--text mr-1"> </i>
							Add Quote
						</v-btn>

				</v-layout>
				
				<v-layout row wrap>

					<v-flex xs12>
						<inquiry-details-card> </inquiry-details-card>
					</v-flex>
					<!-- end of detils  -->

					<!-- proposal list -->
					<v-flex xs8>
					  	<inquiry-post-list> </inquiry-post-list>
					</v-flex>
					<!-- proposal list -->


					<!-- recent bids -->
					<v-flex xs4 >
						<Bidlist> </Bidlist>
					</v-flex>  
					<!-- recebt bids -->

				</v-layout>
		</v-container>

		 <quote-dialog :QuoteDialog.sync="QuoteDialog"></quote-dialog>


	</div>
</template>

<script>

import Bidlist from "@/views/Components/App/Supplier/Bidlist"
import InquiryPostList from "@/views/Components/App/Supplier/InquiryPostList"
import InquiryDetailsCard from "@/views/Components/App/Supplier/InquiryDetailsCard"
import BidDialog from "@/views/Components/App/Supplier/BidDialog"
import QuoteDialog from "@/views/Components/App/Supplier/QuoteDialog"

export default {

	components: {

		Bidlist,
	    InquiryPostList,
	    InquiryDetailsCard,
	    BidDialog,
	    QuoteDialog

	},

	data: () => ({

		title: 'Inquiry Details',
		icon: null,
		bidDialog:false,
		QuoteDialog:false

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
	}
}
	
</script>

<style scoped>
	.scopedcontainer a {
	  	text-decoration:none;
	}
</style>

