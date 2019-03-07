<template>
	<div class="scopedcontainer">
		<v-container fluid grid-list-xl>
				
				<v-layout row wrap>

				  <v-btn flat value="left"  class="v-btn--active blue-grey">
		    		<router-link :to="{ name: 'BuyerHome' }">
	                	<i class="fas fa-arrow-left white--text"></i>
	                	<span class="ml-1 white--text font-weight-light subheading">back</span>
                	 </router-link>
             	</v-btn>

             	<v-spacer></v-spacer>

             	<v-btn flat value="left" class="v-btn--active blue">
                	<i class="ml-1 white--text font-weight-light subheading far fa-edit white--text"></i>
                	<span class="ml-1 white--text font-weight-light subheading">Request Edit</span>
             	</v-btn>
				</v-layout>
				
             	
			<v-layout row wrap>

				<v-flex xs8>
					<inquiry-details-card> </inquiry-details-card>
				</v-flex>
				<!-- end of detils  -->

				<div>
				</div>

				<!-- recent bids -->
					<v-flex xs4 >
						<Bidlist> </Bidlist>
					</v-flex>  
				<!-- recebt bids -->


				<!-- proposal list -->
					<v-flex xs12>
					  	<inquiry-post-list> </inquiry-post-list>
					</v-flex>
				<!-- proposal list -->

			</v-layout>
		</v-container>


		

	</div>
</template>

<script>

import Bidlist from "@/views/Components/App/Buyer/Bidlist"
import InquiryPostList from "@/views/Components/App/Buyer/InquiryPostList"
import InquiryDetailsCard from "@/views/Components/App/Buyer/InquiryDetailsCard"


export default {

	components: {
		Bidlist,
	    InquiryPostList,
	    InquiryDetailsCard,
	    
	},

	data: () => ({

		search:'',
		title: 'Inquiry Details',
		icon: null,
        dialog: false,
		packageLink: '/buyer/packages',
		isActive: false, 
		component: 'inquiries-table',
		sort: 'asc'

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

