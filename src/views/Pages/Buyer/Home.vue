<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex>
						<v-container>
							<v-layout row wrap>
							  <h2 class="font-weight-light title pb-3">MY INQUIRIES</h2>
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
								<span class="red accent-4 pa-1">
							    	<v-btn red accent-4 flat value="left" class="">
					                	<span class="ml-1 white--text font-weight-light subheading">1 Inquiry Remaining </span>
					             	</v-btn>	
							  	</span>
							</v-layout>
						</v-container>
						<v-divider></v-divider>		
						<v-container mt-2>
						  <v-card>
						  	<v-layout row wrap pa-2>
								<v-container>
									<!-- toolbar -->
									<v-toolbar dark color="grey darken-4">
										
	   									 <v-btn-toggle v-model="icon">
	   									 		<!-- set active v-btn if click -->
			    							    <span class="grey darken-4 pa-2">
			    							    	<v-btn flat value="left" @click="openInquiry(InquiriesTable)">
									                	<i class="fas fa-envelope-open-text white--text"></i> 
									                	<span class="ml-1 font-weight-light white--text">Open Inquiry</span>
									             	</v-btn>	
			    							    </span>
												<!-- set active v-btn if click -->
												<span class="grey darken-4 pa-2">
													<v-btn flat value="center" @click="Inprogress(InProgressTable)">
										                <i class="fas fa-tasks white--text"></i> 
										                <span class="ml-1 font-weight-light white--text">In-Progress Inquiry</span>
										            </v-btn>	
												</span>
												<!-- set active v-btn if click -->
												<span class="grey darken-4 pa-2">
													<v-btn flat value="right" @click="CloseInquiry(CloseTable);">
										               <i class="fas fa-envelope white--text"></i> 
										               <span class="ml-1 font-weight-light white--text">Closed Inquiry</span>
										            </v-btn>
												</span>
								          </v-btn-toggle>

									    <v-spacer></v-spacer>

		   						 	 <v-flex xs12 sm6 md3>
				   						 	 <v-text-field label="Search" placeholder="Search" prepend-inner-icon="search" solo clearable ></v-text-field>	  
							        </v-flex>

								    <v-btn icon>
								      <v-icon>sort</v-icon>
								    </v-btn>

								    <v-btn icon>
								      <v-icon>refresh</v-icon>
								    </v-btn>
								
									</v-toolbar>
									<!--/ toolbar -->
								</v-container>
							</v-layout>

						  	  <v-divider></v-divider>
						  	  <!-- dynamic table -->
						  	  <div>
						  	  	<keep-alive>
						  	  	<component v-bind:is="component"></component>	
						  		</keep-alive>

						  	  </div>
						  	  

							  
						  	  <!-- dynamic table -->
						  </v-card>
						</v-container>
				</v-flex>
			</v-layout>
		</v-container>

		<inquiry-create :dialog.sync="openInquiryCreate"></inquiry-create>

	</div>
</template>


<script>

import InquiriesTable from "@/views/Components/App/Buyer/InquiriesTable";
import InProgressTable from "@/views/Components/App/Buyer/InProgressTable";
import CloseTable from "@/views/Components/App/Buyer/CloseTable";

import InquiryCreate from "@/views/Components/App/Buyer/InquiryCreate";

let isActive = 'v-btn--active';

export default {

	components: {

		InquiriesTable,
		InProgressTable,
	    CloseTable,
	    InquiryCreate,

	},

	data: () => ({

		title: 'Home',
		icon: null,
		packageLink: '/buyer/packages',
		isActive: false,
		component: 'inquiries-table',
		openInquiryCreate: false,

	}),

	computed: {

		Compclasses: () => {
			return {
				isActive:this.isActive
			}
		},

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

		openInquiry: (component) => {
			this.component = component
			alert('openInquiry')
		},

		Inprogress: (component) => {
			this.component = component
			alert('Inprogress')
		},

		CloseInquiry: (component) => {
			this.component = component
			alert('CloseInquiry')
		}
	}
}
	
</script>

<style scoped lang="stylus">
	
</style>

