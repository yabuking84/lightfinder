<template>
	<div>
		<v-container fluid grid-list-xl>

		    	<v-btn flat value="left"  class="v-btn--active black">
                	<i class="fas fa-arrow-left white--text"></i>
                	<span class="ml-1 white--text font-weight-light subheading">back</span>
             	</v-btn>

             	<v-btn flat value="left" class="v-btn--active blue">
                	<i class="ml-1 white--text font-weight-light subheading far fa-edit white--text"></i>
                	<span class="ml-1 white--text font-weight-light subheading">Edit Inquiry</span>
             	</v-btn>
             	
			<v-layout row wrap>

				<v-flex xs8>

				 <v-toolbar color="grey darken-4" class="white--text" height="40px">
			            <v-toolbar-title class="subheading font-weight-light">Title of the Inquiry</v-toolbar-title>
			            <v-spacer></v-spacer>
			            <v-toolbar-title class="subheading font-weight-light">Inquiry # 112938273</v-toolbar-title>
		          </v-toolbar>

				<v-card>
				    <v-container fluid>

				    	<v-layout row wrap mb-2 mt-1>
				    		<h4 class="font-weight-bold"> Category: LED STRIPS LIGHTS</h4>	  
				    		<v-spacer></v-spacer>
				    		<h4 class="font-weight-bold">Quantity: 1000</h4>	  
				    		<v-spacer></v-spacer>
				    		<h4 class="font-weight-bold">Posted: Jan 1, 2017 (3 days ago)</h4>	
				    	</v-layout>

				    	<v-layout row wrap>
				    	  	<v-divider></v-divider>
				    	</v-layout>

				      	<v-layout row wrap mt-4>
				      	  <h4 class="font-weight-bold mb-2">Details</h4>
				      	  <h5 class="font-weight-light">
				      	  	Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
				      	  </h5>
				      	</v-layout>

				      	 <v-layout row column mt-4 mb-2>
					      	 
					      	<h4 class="font-weight-bold mb-2 ">Attachments</h4>
							<v-layout row wrap>
							  <v-flex xs12>
							  		<img width="150px;" src="/static/examples/led-strip-lights-daaden-al-sl-1017-7777.jpg">
					      	      	<img width="150px;" src="/static/examples/led-strip-lights-dieburg-al-sl-1018-7778.jpg">
					      	      	<img width="150px;" src="/static/examples/led-strip-lights-grimmen-al-sl-1234-7781.jpg">
					      	  </v-flex>
							</v-layout>

				      	</v-layout>
				    </v-container>
				  </v-card>

				 <v-card>
				 	<!-- c -->
				 </v-card>

				</v-flex>
				<!-- end of detils  -->

				<div>
				</div>

				<v-flex xs4 >
					<v-toolbar color="grey darken-4" class="justify-center white--text" height="40px">
						<v-layout row wrap justify-center>
							<h1 class="subheading font-weight-light text-xs-center">Recent Bids</h1>  
						</v-layout>
		          	</v-toolbar>
					  <v-card class="bids-section">
					  	<v-container fluid class="">
							<div class="pa-0">
								<v-chip color="green" text-color="white">New</v-chip>
								<a href="#" class="text-no-underline caption black--text font-weight-light text-xs-center">Supplier #129981723 Set Price @ $200.00 on January 3, 2019 - 2:14 PM </a> 

							</div>
					  		
					  		<v-divider></v-divider>
				
								<v-chip color="green" text-color="white">New</v-chip>
								<a href="#" class="text-no-underline caption black--text font-weight-light text-xs-center">Supplier #129981723 Set Price @ $200.00 on January 3, 2019 - 2:14 PM </a> 

							<v-divider></v-divider>
				
								<v-chip color="green" text-color="white">New</v-chip>
								<a href="#" class="text-no-underline caption black--text font-weight-light text-xs-center">Supplier #129981723 Set Price @ $200.00 on January 3, 2019 - 2:14 PM </a> 
					  	</v-container>
					  </v-card>
				</v-flex>  

				<v-flex xs12>
				  	<v-toolbar color="grey darken-4" class="white--text" height="40px">
		            	<v-toolbar-title class="subheading font-weight-light">My Bids</v-toolbar-title>
		          	</v-toolbar>
		          	<v-card class="proposal-section">
						<v-container fluid>
							<div>
								<v-card class="mb-2" color="grey lighten-5">
						   	 	   <v-layout row wrap pa-1>

						   	 	     	<v-flex xs2 class="justify-center text-xs-center row column">
											<!-- <h1> Image Blur</h1> -->
											<img width="170px;" src="/static/examples/Logo-Samples2-08-min.jpg">

											 <v-btn flat value="left"  class="v-btn--active light-green">
						                	<i class="fas fa-eye white--text"></i>
						                	<span class="ml-1 white--text font-weight-light subheading">Supplier Info</span>
						             	</v-btn>
						   	 	     	</v-flex>

						   	 	     	<v-flex xs7>
						   	 	     	  <h2 class="">content here</h2>
						   	 	     	</v-flex>

						   	 	     	<v-flex xs3>
						   	 	     	  <h1 class="text-xs-center">$99.99/piece</h1>

											 <v-btn flat value="left"  class="v-btn--active light-blue">
						                	<i class="fas fa-chat white--text"></i>
						                	<span class="ml-1 white--text font-weight-light subheading">Message</span>
						             	</v-btn>

											 <v-btn flat value="left"  class="v-btn--active light-green">
						                	<i class="fas fa-eye white--text"></i>
						                	<span class="ml-1 white--text font-weight-light subheading">Vie Proposal</span>
						             	</v-btn>
						   	 	     	</v-flex>

						   	 	   </v-layout>
						   	 	</v-card>
							</div>
						</v-container>
				  </v-card>
				</v-flex>

			</v-layout>
		</v-container>
	</div>
</template>


<script>

import InquiriesTable from "@/views/Components/App/Buyer/InquiriesTable";
import InProgressTable from "@/views/Components/App/Buyer/InProgressTable";
import CloseTable from "@/views/Components/App/Buyer/CloseTable";

let isActive = 'v-btn--active';

export default {

	components: {

		InquiriesTable,
		InProgressTable,
	    CloseTable

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



<style scoped lang="stylus">
	.bids-section
		height:42.3vh;
		overflow-y: auto;
	.proposal-section
		height:34vh;
		overflow-y: auto;
	.text-no-underline
		text-decoration:none;		

</style>