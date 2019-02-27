<template>
	<div>
		<v-container fluid grid-list-xl>
				<v-container>
					  <v-layout row wrap>
					 	 <span class="grey darken-4 ml-3">

								<v-btn flat value="left" class="v-btn--active" @click="openInquiryCreate=true">
							    	<i class="ml-1 white--text font-weight-light subheading far fa-edit white--text"></i>
							    	<span class="ml-1 white--text font-weight-light subheading">					Compose Inquiry
							        </span>
							 	</v-btn>	
						</span>  
						<v-spacer></v-spacer>
						<span class="red accent-4 mr-3">
							<v-btn red accent-4 flat value="left" class="">
						    	<span class="ml-1 white--text font-weight-light subheading">1 Inquiry Remaining </span>
						 	</v-btn>	
						</span>
					</v-layout>
				</v-container>

				<v-container fluid>
					  <v-card>
							<!-- toolbar -->
							<v-toolbar dark color="grey darken-4 mb-4">
									 <v-btn-toggle>
									    <span class="grey darken-4 pa-2">
									    	<v-btn flat value="left" @click="component='inquiries-table' ">
							                	<i class="fas fa-envelope-open-text white--text"></i> 
							                	<span class="ml-1 font-weight-light white--text">Open Inquiry</span>
							             	</v-btn>	
									    </span>
										<span class="grey darken-4 pa-2">
											<v-btn flat value="center" @click="component='in-progress-table'">
								                <i class="fas fa-tasks white--text"></i> 
								                <span class="ml-1 font-weight-light white--text">In-Progress Inquiry</span>
								            </v-btn>	
										</span>
										<span class="grey darken-4 pa-2">
											<v-btn flat value="right" @click="component='close-table'">
								               <i class="fas fa-envelope white--text"></i> 
								               <span class="ml-1 font-weight-light white--text">Closed Inquiry</span>
								            </v-btn>
										</span>
						         </v-btn-toggle>
							    <v-spacer></v-spacer>
							    <v-btn icon @click="Sort('desc')">
							      <v-icon>sort</v-icon>
							    </v-btn>
							    <v-btn icon @click="Refresh()">
							      <v-icon>refresh</v-icon>
							    </v-btn>
							</v-toolbar>
							<!--/ toolbar -->
				
					  	  <!-- dynamic table -->
					  	  <div>
					  	  	<keep-alive>
					  		  	<component v-bind:is="component" ></component>	
					  		</keep-alive>
					  	  </div>
					  	  <!-- dynamic table -->
					  </v-card>
				</v-container>
		</v-container>

		<inquiry-create :dialog.sync="openInquiryCreate"></inquiry-create>
	</div>
</template>


<script>

import DashboardOpenInquiriesTable from "@/views/Components/App/Buyer/DashboardOpenInquiriesTable";
import DashboardInprogressTable from "@/views/Components/App/Buyer/DashboardInprogressTable";
import DashboardCloseTable from "@/views/Components/App/Buyer/DashboardCloseTable";

import InquiriesTable from "@/views/Components/App/Buyer/InquiriesTable";

import InquiryCreate from "@/views/Components/App/Buyer/InquiryCreate";

let isActive = 'v-btn--active';

export default {

	components: {

		'inquiries-table':DashboardOpenInquiriesTable,
		'in-progress-table':DashboardInprogressTable,
	    'close-table':DashboardCloseTable,
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
	},


	created: function() {

	},
}
	
</script>

<style scoped lang="stylus">
	
</style>

