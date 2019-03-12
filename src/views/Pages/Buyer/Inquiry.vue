<template>
	<div>
		<v-container fluid>

			<v-layout row wrap>
				<v-flex>
					<v-layout row wrap>
					  <v-spacer></v-spacer>
					</v-layout>
					<v-layout row wrap>
						<span class="grey darken-4 pa-1">									
					    	<v-btn flat value="left" class="v-btn--active" @click="openInquiryCreate=true">
			                	<i class="ml-1 white--text font-weight-light subheading far fa-edit white--text"></i>
			                	<span class="ml-1 white--text font-weight-light subheading">					                	
				                	Compose Inquiry
				                </span>
			             	</v-btn>						            
					  	</span>  

					  	<v-spacer></v-spacer>
<!-- 
						<span class="red accent-4 pa-0">
					    	<v-btn red accent-4 flat value="left" class="">
			                	<span class="ml-1 white--text font-weight-light subheading">1 Inquiry Remaining </span>
			             	</v-btn>	
					  	</span>
 -->
					</v-layout>
				</v-flex>
			</v-layout>

		  	<v-spacer class="my-4"></v-spacer>

		  	<v-layout row wrap>
				<v-flex>
						<inquiries-table> </inquiries-table>
				</v-flex>
			</v-layout>

		</v-container>
		<inquiry-create :dialog.sync="openInquiryCreate"></inquiry-create>
	</div>
</template>


<script>


import InquiriesTable from "@/views/Components/App/Buyer/InquiriesTable";
import InquiryCreate from "@/views/Components/App/Buyer/InquiryCreate";

export default {

	components: {

	    InquiriesTable,
	    InquiryCreate,

	},

	data: () => ({

		search:'',
		title: 'Home',
		icon: null,
		packageLink: '/buyer/packages',
		isActive: false,
		component: 'InquiriesTable',
		openInquiryCreate: false,

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

		

		Search: () => {

		},

		Refresh: () => {

			alert('Refresh')

		},
		Sort: () => {

			alert('SOrt')

		},

	},


	created: function() {

	},
}
	
</script>

<style scoped lang="stylus">
	
</style>

