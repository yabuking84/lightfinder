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

			<!-- start h	ere -->

		  	<v-layout row wrap>

		  	  		<v-container fluid>
						  <v-card>

						  	<v-layout row wrap mb-3>
									<!-- toolbar -->
								<v-toolbar dark color="grey darken-4">
										 <v-btn-toggle v-model="inquiryStatus">

											<!-- for loop -->
											<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
											<span v-for="(status, index) in statusesSupplier" class="grey darken-4 pa-2">
												<v-btn flat @click="inquiryStatus=status.id+''" :value="status.id+''" :title="status.name">
									                <i class="white--text" :class="status.icon"></i> 
									                <!-- <span class="ml-1 font-weight-light white--text">{{ status.name }}</span> -->
									            </v-btn>	
											</span>
											<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
											<!-- for loop -->
											

											<!-- for loop -->
											<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
											<span v-for="(status, index) in statuses" class="grey darken-4 pa-2">
												<v-btn flat @click="inquiryStatus=status.id+''" :value="status.id+''" :title="status.name">
									                <i class="white--text" :class="status.icon"></i> 
									                <!-- <span class="ml-1 font-weight-light white--text">{{ status.name }}</span> -->
									            </v-btn>	
											</span>
											<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
											<!-- for loop -->

								
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
						  	  	<!-- <keep-alive>
						  		  	<component :is="component" ></component>
						  		</keep-alive> -->
						  		<inquiries-table :inquiryStatus.sync="inquiryStatus"></inquiries-table>
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


import main from "@/config/main"

import InquiriesTable from "@/views/Components/App/Supplier/InquiriesTable"

	// import OpenInquiry from '@/views/'
	export default {

		components: {
			InquiriesTable,
		},

		data: () => ({
			component: InquiriesTable,
			statuses: main.inquiry_statuses.default,
			statusesSupplier: main.inquiry_statuses.suppliers,
			inquiryStatus: 'all',
		}),

		created() {

		},

		methods: {

			Sort: () => {

			},

			Refresh: () => {

			}
		},




	}

</script>