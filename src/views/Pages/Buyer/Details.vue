<template>
	<div>
		<v-container fluid grid-list-xl>

		    	<v-btn flat value="left"  class="v-btn--active blue-grey">
                	<i class="fas fa-arrow-left white--text"></i>
                	<span class="ml-1 white--text font-weight-light subheading">back</span>
             	</v-btn>

             	<v-btn flat value="left" class="v-btn--active blue">
                	<i class="ml-1 white--text font-weight-light subheading far fa-edit white--text"></i>
                	<span class="ml-1 white--text font-weight-light subheading">Edit Inquiry</span>
             	</v-btn>
             	
			<v-layout row wrap>

				<v-flex xs8>
					<details-container> </details-container>
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
					  	<proposal-list> </proposal-list>
					</v-flex>
				<!-- proposal list -->

			</v-layout>
		</v-container>
	</div>
</template>

<script>

import Bidlist from "@/views/Components/Buyer/Bidlist"
import ProposalList from "@/views/Components/Buyer/ProposalList"
import DetailsContainer from "@/views/Components/Buyer/DetailsContainer"

export default {

	components: {
		Bidlist,
	    ProposalList,
	    DetailsContainer

	},

	data: () => ({

		search:'',
		title: 'Inquiry Details',
		icon: null,

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

		openInquiry: (components) => {
			this.component = components
			alert('openInquiry')
		},

		Inprogress: (component) => {
			this.component = components
			alert('Inprogress')
		},

		CloseInquiry: (component) => {
			this.component = components
			alert('CloseInquiry')
		},

		Search: () => {

		},

		Refresh: () => {

			alert('Refresh')

		},
		Sort: () => {
			alert('SOrt')
		}	
	}
}
	
</script>

