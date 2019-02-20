<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex>
						<v-container fluid>
							<v-layout row wrap>
							  <h2 class="font-weight-light title pb-3">MY INQUIRIES</h2>
							  <v-spacer></v-spacer>
							</v-layout>
							<v-layout row wrap>

								<span class="grey darken-4 pa-0">
							    	<v-btn flat value="left" class="v-btn--active">
					                	<i class="ml-1 white--text font-weight-light subheading far fa-edit white--text"></i>
					                	<span class="ml-1 white--text font-weight-light subheading">Compose Inquiry</span>
					             	</v-btn>	
							  	</span>  

							  	<v-spacer></v-spacer>

								<span class="red accent-4 pa-0">
							    	<v-btn red accent-4 flat value="left" class="">
					                	<span class="ml-1 white--text font-weight-light subheading">1 Inquiry Remaining </span>
					             	</v-btn>	
							  	</span>


							</v-layout>
						</v-container>
						<v-divider></v-divider>		
						<v-container fluid >
						  <v-card>
						  	<v-layout row wrap >
								<v-container fluid>
									<!-- toolbar -->
									<v-toolbar dark color="grey darken-4">
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
								</v-container>
							</v-layout>
						  	  <!-- dynamic table -->
						  	  <div>
						  	  	<keep-alive>
						  		  	<component v-bind:is="component" ></component>	
						  		</keep-alive>
						  	  </div>
						  	  <!-- dynamic table -->
						  </v-card>
						</v-container>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>


<script>

import DashboardOpenInquiriesTable from "@/views/Components/App/Buyer/DashboardOpenInquiriesTable";
import DashboardInprogressTable from "@/views/Components/App/Buyer/DashboardInprogressTable";
import DashboardCloseTable from "@/views/Components/App/Buyer/DashboardCloseTable";

let isActive = 'v-btn--active';

export default {

	components: {

		'inquiries-table':DashboardOpenInquiriesTable,
		'in-progress-table':DashboardInprogressTable,
	    'close-table':DashboardCloseTable

	},

	data: () => ({
		search:'',
		title: 'Home',
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

<style scoped lang="stylus">
	
</style>

