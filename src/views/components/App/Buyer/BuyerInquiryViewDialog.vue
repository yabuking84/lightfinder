<template>
	<div class="buyerinquirydialog">
	    <v-layout row justify-center>
	      <v-dialog width="1000" height="900" :value="dialog" @input="$emit('update:dialog', false)" transition="dialog-bottom-transition">

	        <v-card height="800">
	          <v-toolbar dark color="dark">
	            <v-toolbar-title></v-toolbar-title>
	            <v-spacer></v-spacer>
	            <v-toolbar-items>
	              <v-btn dar>Inquiry #1239182399 </v-btn>

	            </v-toolbar-items>
	          </v-toolbar>
				
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
									  		<img width="100px;" src="/static/examples/led-strip-lights-daaden-al-sl-1017-7777.jpg">
							      	      	<img width="100px;" src="/static/examples/led-strip-lights-dieburg-al-sl-1018-7778.jpg">
							      	  </v-flex>
									</v-layout>
						      	</v-layout>

						      	<v-layout row wrap justify-end class="buyerinquirydialog">

						      	    <v-btn @click="dialogConfirm = true" value="left"  class="v-btn--active orange">
						                	<i class="fas fa-award white--text"></i>
						                	<span class="ml-1 white--text font-weight-light subheading">Award this Supplier</span>
					             	</v-btn>

					             	<v-btn flat value="left"  class="v-btn--active green">
							    		<router-link :to="{ name: 'BuyerHome' }">
						                	<i class="fas fa-tasks white--text"></i>
						                	<span class="ml-1 white--text font-weight-light subheading">Request Sample</span>
					                	 </router-link>
					             	</v-btn>

						      	</v-layout>	
						    </v-container>				

	        </v-card>
	      </v-dialog>
	    </v-layout>

	    <inquiry-confirm-dialog :dialogConfirm.sync="dialogConfirm"></inquiry-confirm-dialog>

	</div>

</template>

<script>

	import InquiryDetailsCard from "@/views/Components/App/Buyer/InquiryDetailsCard"
	import InquiryConfirmDialog from "@/views/Components/App/Buyer/InquiryConfirm"
	
	export default {

		props: {
			dialog: {
	            type: Boolean,
	            default: false,            
	        },
		},

		 data () {
		    return {
				dialogConfirm: false		 
		    }

		  },components: {
		  		InquiryDetailsCard,
		  		InquiryConfirmDialog
		  }
	}

</script>

<style scoped>
	.buyerinquirydialog a {
		text-decoration: none;
	}
</style>