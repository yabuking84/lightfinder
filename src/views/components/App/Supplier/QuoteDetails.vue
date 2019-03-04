<template>
<div>

		<v-toolbar color="grey darken-4" class="white--text" height="40px">
        	<v-toolbar-title class="subheading font-weight-light">Quote Details</v-toolbar-title>
        	<v-spacer></v-spacer>
        	<v-toolbar-title class="subheading font-weight-light">Your Current Quote is $11.50</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-toolbar-title @click="bidDialog=true" class="subheading font-weight-light pa-2">
             	<v-btn @click="QuoteDialog = true" class="font-weight-light" color="green" dark small>
			    	<i class="fas fa-plus  white--text ma-2"> </i>
					Create Quote
				</v-btn>
			</v-toolbar-title>


      	</v-toolbar>

      	<v-card class="minh-500" color="grey lighten-5">
			<v-container fluid grid-list-md>			
	      	<v-layout row wrap>

			<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
			<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<v-flex xs5>					
					<image-gallery-small></image-gallery-small>
				</v-flex>


				<v-flex xs7>
		  	  		<v-container>
			  	  		<v-flex xs12>
			  	  			<h5 class="font-weight-thin">Product name</h5>
			  	  			<h2>Super Lighting Bulb Infinity</h2>
				        </v-flex>

			  	  		<v-flex xs12>
				        <v-layout row wrap >

				           	<v-flex xs4 pa-2>
				  	  			<h5 class="font-weight-thin">Quantity</h5>
				  	  			<h3>100 pcs</h3>
					        </v-flex>
					        
					        <v-flex xs4 pa-2>					          	
				  	  			<h5 class="font-weight-thin">Unit Price</h5>
				  	  			<h3>$11.50</h3>
					        </v-flex>
				        
				      		<v-flex xs4 pa-2>
				  	  			<h5 class="font-weight-thin">Total Price</h5>
				  	  			<h2>$1150.00</h2>					          	
					        </v-flex>
				        </v-layout>
				         </v-flex>

				         <v-flex xs12>					        
				  	  		<h5 class="font-weight-thin">Message</h5>
				  	  		<h3>
				  	  			<p>lorew ipsurew ipsurew ipsuipsurew ipsuipsurew ipsurew ipsum </p>				  	  			
				  	  		</h3>
				      	 </v-flex>
		  	  		</v-container>
				</v-flex>

			<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
			<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->



			</v-layout>
			</v-container>
	    </v-card>
		
		<span>
			<quote-dialog :QuoteDialog.sync="QuoteDialog" :inquiry="inquiry"></quote-dialog>
		</span>

</div>
</template>

<script>

	import ImageGallerySmall from "@/views/Components/App/ImageGallerySmall"

	import InquiryDialog from "@/views/Components/App/Buyer/BuyerInquiryViewDialog"
	import QuoteDialog from "@/views/Components/App/Supplier/QuoteDialog"

	export default {

		props: ['inquiry'],

		components: {
			InquiryDialog,
		    QuoteDialog,
		    ImageGallerySmall,
		},

	    data: ()=>({
			bidDialog:false,
			QuoteDialog:false,
			img: `/static/examples/Logo-Samples2-08-min.jpg`,
		    dummy: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishingrelease of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishin`,

		}),

	}
</script>



<style scoped lang="scss">
	.minh-500 {	
		min-height:300px;
		overflow-y: auto;
	}
</style>