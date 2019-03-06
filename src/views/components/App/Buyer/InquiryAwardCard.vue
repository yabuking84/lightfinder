<template>
	<div>
		
		  <v-card class="mb-1" color="green" dark>

			<v-card-title primary-title>

  						<h4 class="font-weight-bold">Product Name:  {{ product_name }}  </h4>
					    <v-spacer></v-spacer>
						<h4 class="font-weight-bold">Quantiy: {{ quantity }} </h4>
						<v-spacer></v-spacer>
						 <h4 class="font-weight-bold"> Unit Price: $ {{ unit_price }}  USD </h4>
						<v-spacer></v-spacer>
						<h4 class="font-weight-bold">Total Price: {{ total_price }} </h4>

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

	   	 	    		<h5 class="font-weight-light">Award Date: January 6, 2017 10:00 AM</h5>
	   	 	   			<v-spacer></v-spacer>

	   	 	     
					    <v-btn class="blue darken-3" @click="dialog = true">
						    <i class="fas fa-envelope white--text"></i>
						    <span class="font-weight-light ml-1 white--text" >Message</span>
					    </v-btn> 

	   	 </v-card-actions>
 	</v-card>

	</div>
</template>

<script>

	import InquiryConfirm from "@/views/Components/App/Buyer/InquiryConfirm"

	export default {

		components: {
			InquiryConfirm
		},

    data: function () {

			return {
				dialog: false,
				img: `/static/examples/Logo-Samples2-08-min.jpg`,
			    dummy: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishingrelease of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishin`,
					product_name: 'LED STRIP Light',
					quantity	: '13',
					unit_price	: '98',
					total_price : '212',
					message 	: 'Lorem asdasdas',
					supplier_id : '23123',
					bid_id 		: '231029381',

			}
		},

	}
</script>