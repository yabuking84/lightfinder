<template>
	<div>
		<v-container fluid>

			<!-- start here -->

			<v-layout row wrap ml-5>

	 		   		<v-flex xs2 pa-1 >
			  		<v-card>
			  	  	   <h1 class="pa-3 title text-xs-center font-weight-light">Total Earnings: <span class="font-weight-bold subheading"> $100.00 </span> </h1>
			  	  	</v-card>  
		  		</v-flex>

		  	  	<v-flex xs2 offset-xs8 pa-1 text-xs-center>
				    <v-chip color="grey darken-3" text-color="white">
				      <v-avatar>
				        <v-icon color="white">star</v-icon>
				      </v-avatar>
				     	 Verified Supplier
				    </v-chip>			  
		  		</v-flex>

		  	</v-layout>

		  	<!-- end here -->

			<!-- start here -->

		  	<v-layout row wrap>

		  	  		<v-container fluid>
						  <v-card>
						  	<v-layout row wrap mb-3>
									<!-- toolbar -->
								<v-toolbar dark color="grey darken-4">
										 <v-btn-toggle>
		    							    <span class="grey darken-4 pa-2">
		    							    	<v-btn flat value="" @click="component='inquiries-table' ">
								                	<i class="fas fa-envelope-open-text white--text"></i> 
								                	<span class="ml-1 font-weight-light white--text">All</span>
								             	</v-btn>	
		    							    </span>
											<span class="grey darken-4 pa-2">
												<v-btn flat>
									                <i class="fas fa-tasks white--text"></i> 
									                <span class="ml-1 font-weight-light white--text">Priority</span>
									            </v-btn>	
											</span>
											<span class="grey darken-4 pa-2">
												<v-btn flat>
									               <i class="far fa-envelope-open white--text"></i> 
									               <span class="ml-1 font-weight-light white--text">Open</span>
									            </v-btn>
											</span>
												<span class="grey darken-4 pa-2">
												<v-btn flat>
									               <i class="fas fa-handshake white--text"></i>
									               <span class="ml-1 font-weight-light white--text">Confirmation</span>
									            </v-btn>
											</span>
												<span class="grey darken-4 pa-2">
												<v-btn flat>
									               <i class="far fa-credit-card white--text"></i>
									               <span class="ml-1 font-weight-light white--text">Payment</span>
									            </v-btn>
											</span>
												<span class="grey darken-4 pa-2">
												<v-btn flat>
									               <i class="fas fa-industry white--text"></i>
									               <span class="ml-1 font-weight-light white--text">Production</span>
									            </v-btn>
											</span>
												<span class="grey darken-4 pa-2">
												<v-btn flat>
									               <i class="fas fa-truck white--text"></i>
									               <span class="ml-1 font-weight-light white--text">Shipment</span>
									            </v-btn>
											</span>
												<span class="grey darken-4 pa-2">
												<v-btn flat>
									               <i class="fas fa-envelope white--text"></i>
									               <span class="ml-1 font-weight-light white--text">Closed Inquiry</span>
									            </v-btn>
											</span>
												<span class="grey darken-4 pa-2">
												<v-btn flat>
									               <i class="fas fa-sign-in-alt white--text"></i>
									               <span class="ml-1 font-weight-light white--text">Receiving</span>
									            </v-btn>
											</span>
												<span class="grey darken-4 pa-2">
												<v-btn flat>
									               <i class="fas fa-exchange-alt white--text"></i>
									               <span class="ml-1 font-weight-light white--text">Return</span>
									            </v-btn>
											</span>
											<span class="grey darken-4 pa-2">
												<v-btn flat>
									               <i class="fas fa-ban white--text"></i>
									               <span class="ml-1 font-weight-light white--text">Cancelled</span>
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
							</v-layout>
						  	  <!-- dynamic table -->
						  	  <div>
						  	  	<keep-alive>
						  		  	<component :is="component" ></component>	
						  		</keep-alive>
						  	  </div>
						  	  <!-- dynamic table -->
						  </v-card>
					</v-container>
		  	</v-layout>

		  	<!-- end here -->

		</v-container>
	</div>
</template>

<script>


import InquiriesTable from "@/views/Components/App/Supplier/InquiriesTable"

	// import OpenInquiry from '@/views/'
	export default {

		components: {
				InquiriesTable,
		},

		data: () => ({
			component: InquiriesTable
		}),

		methods: {

			Sort: () => {

			},

			Refresh: () => {

			}
		}

	}

</script>