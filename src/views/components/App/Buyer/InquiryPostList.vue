<template>
	<div>

		<v-toolbar color="grey darken-4" class="white--text" height="40px">
        	<v-toolbar-title class="subheading font-weight-light">Bids</v-toolbar-title>
      	</v-toolbar>

      	<v-card class="proposal-section" color="grey lighten-5">
					
			<v-card-text>

				  <v-card class="mb-1" v-for="item in items" >

							<v-card-title primary-title>

								    <h4 class="font-weight-bold">Product Name:  {{ item.product_name }}  </h4>
								    <v-spacer></v-spacer>
									<h4 class="font-weight-bold">Quantiy: {{ item.quantity }} </h4>
									<v-spacer></v-spacer>
									 <h4 class="font-weight-bold"> Unit Price: $ {{ item.unit_price }}  USD </h4>
									<v-spacer></v-spacer>
									<h4 class="font-weight-bold">Total Price: {{ item.total_price }} </h4>

							</v-card-title>

							<v-divider></v-divider>

							<v-card-text>

									<v-layout row wrap pa-2>

										<h4 class="font-weight-bold">Message</h4>
									  	<h5 class="font-weight-light text-xs-justify"> {{ dummy }} </h5>	

										<div>
									  		<img width="100px;" src="/static/examples/led-strip-lights-daaden-al-sl-1017-7777.jpg">
							      	      	<img width="100px;" src="/static/examples/led-strip-lights-dieburg-al-sl-1018-7778.jpg">
							      	  	</div>

									</v-layout>

							</v-card-text>
							
			   	 	   	  <v-divider></v-divider>

			   	 	   	   <v-card-actions>

					   	 	    		<h5 class="font-weight-light">January 6, 2017 10:00 AM</h5>
					   	 	   			<v-spacer></v-spacer>

					   	 	     		<v-btn class="green darken-1" @click="dialog = true"> <i class="fas fa-eye white--text"></i> <span class="ml-1 white--text" >Award this Supplier</span>
									    </v-btn> 
									    <v-btn class="orange darken-3" @click="dialog = true">
										    <i class="fas fa-eye white--text"></i>
										    <span class="ml-1 white--text" >Request Sample</span>
									    </v-btn> 

					   	 </v-card-actions>
		   	 	</v-card>
			  
			</v-card-text>

	    </v-card>

			<inquiry-dialog :dialog.sync="dialog"> </inquiry-dialog>	

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
					product_name: 'LED STRIP Light',
					quantity	: '13',
					unit_price	: '98',
					total_price : '212',
					message 	: 'Lorem asdasdas',
					supplier_id : '23123',
					bid_id 		: '231029381',

				  },

				  {
					product_name: 'LED STRIP Light',
					quantity	: '23',
					unit_price	: '98',
					total_price : '212',
					message 	: 'Lorem asdasdas',
					supplier_id : '23123',
					bid_id 		: '231029381',

				  },

				  {
					product_name: 'LED STRIP Light',
					quantity	: '11',
					unit_price	: '98',
					total_price : '212',
					message 	: 'Lorem asdasdas',
					supplier_id : '23123',
					bid_id 		: '231029381',

				  },

				  {
					product_name: 'LED STRIP Light',
					quantity	: '12',
					unit_price	: '98',
					total_price : '212',
					message 	: 'Lorem asdasdas',
					supplier_id : '23123',
					bid_id 		: '231029381',

				  },

				  {
					product_name: 'LED STRIP Light',
					quantity	: '32',
					unit_price	: '98',
					total_price : '212',
					message 	: 'Lorem asdasdas',
					supplier_id : '23123',
					bid_id 		: '231029381',

				  },

				  {
					product_name: 'LED STRIP Light',
					quantity	: '23',
					unit_price	: '98',
					total_price : '212',
					message 	: 'Lorem asdasdas',
					supplier_id : '23123',

				  },

				]
			}
		},

	}
</script>



<style scoped lang="stylus">
	.proposal-section
		max-height:80vh;
		overflow-y: auto;
</style>