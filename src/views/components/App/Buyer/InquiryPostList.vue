<template>
	<div>

		<v-toolbar color="grey darken-4" class="white--text" height="40px">
        	<v-toolbar-title class="subheading font-weight-light">My Bids</v-toolbar-title>
      	</v-toolbar>

      	<v-card class="proposal-section" color="grey lighten-5">
			<v-container fluid grid-list-md>

				<div v-for="item in items">
					
					<v-card class="mb-2 pa-2" >

			   	 	   <v-layout row wrap pa-0>


							<!-- section image -->
			   	 	     	<v-flex xs1 class="justify-center text-xs-center row column">
								<img class="pa-0" width="160px;" :src="img">
			   	 	     	</v-flex>
							<!-- section image -->

					
							<!-- section list -->
			   	 	     	<v-flex xs9 pl-5 pr-5>
		   	 	     			<h2 class="ml-2">{{ item.supplier_name }}</h2>
		   	 	     			<v-spacer></v-spacer>
		   	 	     			 <h5 class="font-weight-light mb-1 ml-2"> {{ dummy }} </h5>	  
			   	 	     	</v-flex>
			   	 	     	<!-- section list -->


							<!-- section pricing  -->
							  <v-flex xs2 mt-4>
						  		<v-layout align-end justify-end row column>
						  			<v-layout justify-end align-end row pa-0 mr-1>
										<v-chip color="blue" text-color="white">{{ item.supplier_status }}</v-chip>
							 		</v-layout>
							 		<v-layout justify-end align-end row pa-0 mr-3 mt-4 >
								     	  <h1 class="text-xs-center">$99.99/piece</h1>
							 		</v-layout>
						 		</v-layout>
							 </v-flex>
							 <!-- section pricing  -->


			   	 	   </v-layout>

			   	 	   <v-divider></v-divider>

			   	 	   <v-layout row wrap justify-end pl-2 pr-2 pb-2>
			   	 	   			<h5 class="font-weight-light mt-3 ml-2">January 6, 2017 10:00 AM</h5>
			   	 	   			<v-spacer></v-spacer>
			   	 	     		<v-btn flat value="left"  class="v-btn--active green" @click="dialog = true">
								    <i class="fas fa-eye white--text"></i>
								    <span class="ml-1 white--text font-weight-light body-2 font-weight-light" >View Proposal</span>
							    </v-btn>  
			   	 	   </v-layout>

			   	 	</v-card>
				</div>
			</v-container>
	    </v-card>
		
		<div>
			<inquiry-dialog :dialog.sync="dialog"> </inquiry-dialog>	
		</div>

	</div>

</template>

<script>

	import InquiryDialog from "@/views/Components/App/Buyer/BuyerInquiryViewDialog"

	export default {

		components: {
			InquiryDialog
		},

    data: function () {

			return {
				dialog: false,
				img: `/static/examples/Logo-Samples2-08-min.jpg`,
			    dummy: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishingrelease of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishin`,

				items: [
				  {
					supplier_name: 'China Lighting',
					supplier_status: 'Verified Badge'				  	
				  },

				  {
					supplier_name: 'Up Shine Labs',
					supplier_status: 'Verified Badge'
				  },

				  {
					supplier_name: 'Almani Ligthing',
					supplier_status: 'Verified Badge'				  	
				  },

				  {
					supplier_name: 'Go Light',
					supplier_status: 'Verified Badge'
				  },

				  {
					supplier_name: 'Lighting Labs',
					supplier_status: 'Verified Badge'									  	
				  },

				  {
					supplier_name: 'Binve Strip Lights',
					supplier_status: 'Verified Badge'				  	
				  },

				]
			}
		},

	}
</script>



<style scoped lang="stylus">
	.proposal-section
		height:40vh;
		overflow-y: auto;
</style>