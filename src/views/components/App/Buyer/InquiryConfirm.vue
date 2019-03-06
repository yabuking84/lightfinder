<template>
	<div>
	<v-dialog :value="dialog" @input="$emit('update:dialog',false)" max-width="850px">
		
	     <v-toolbar dark color="dark">
            <v-toolbar-title class="font-weight-light subheading">
           	 <i class="fas fa-award white--text"></i>
          	  Award This Supplier
        	</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>



        <v-card>

        	<v-container fluid>
				<v-layout row wrap>
					<v-flex xs8 >
						<h1 class="font-weight-light subheading">Payment Information</h1>

						<v-layout row mt-4 pa-0>

							   <v-flex xs4 mt-3>
						      		<h4 class="font-weight-light">Payment Methods</h4>						  
						      </v-flex>
	
						      <v-flex xs7>

						      	<v-select
						          :items="paymentItems"
						          label="Select Payment Method"
						          solo
						        ></v-select>

						      </v-flex>
							    
						</v-layout>  

							<v-layout row>

							   <v-flex xs4 mt-3>
						      		<h4 class="font-weight-light">Shipping Address</h4>						  
						      </v-flex>

						      <v-flex xs6>
						        <v-text-field
						          label="Address"
						          solo
						        ></v-text-field>
						      </v-flex>

						      <v-flex xs1 pa-2>
						      	 <h6 class="blue--text" @click="changeAdd()">Change Address</h6> 
						        
						      </v-flex>

						</v-layout>  


							<v-layout row>

							   <v-flex xs4 mt-3>
						      		<h4 class="font-weight-light">Shipping Method</h4>						  
						      </v-flex>

						      <v-flex xs7>
						           	<v-select
						          :items="paymentItems"
						          label="Select Shipping Method"
						          solo
						        ></v-select>
						      </v-flex>

						</v-layout>  


							<v-layout row>

							   <v-flex xs4 mt-3>
						      		<h4 class="font-weight-light">Shipment Date</h4>						  
						      </v-flex>

						      <v-flex xs7>


							   <v-menu
		                        :close-on-content-click="false"
		                        :nudge-right="40"
		                        lazy
		                        transition="scale-transition"
		                        offset-y
		                        full-width
		                        min-width="290px">

		                        <v-text-field
		                            slot="activator"
		                            label="Shipment Date"
		                            prepend-icon="event" 
		                            solo                           
		                            readonly></v-text-field>
		                        <v-date-picker 
		                            header-color="black"
		                            @input="calendar_menu = false">
		                             
		                        </v-date-picker>
		                    
		                    </v-menu>





						      </v-flex>

						</v-layout>  

					</v-flex>	


					
					<!-- order details -->
					<v-flex xs4>
						<h1 class="font-weight-light subheading">Order Details</h1>
						<v-divider></v-divider>

						<v-layout row wrap mt-4>

								  <v-flex xs8 mt-3>
									<h4 class="font-weight-light">Quantity</h4>						  
								</v-flex>
								
								<v-flex xs4>
								   <v-text-field
						    		  label="00"
						     	 required
						     	 solo
						    ></v-text-field>
								</v-flex>

						</v-layout>

						<v-layout row wrap pa-0>
							
								<v-flex xs8 mt-3>
									<h4 class="font-weight-light">Unit</h4>						  
								</v-flex>
								
								<v-flex xs4>
								   <v-text-field
						    		  label="00"
						     		  required
						     		  prefix="$"
						     	      solo>
						     	    </v-text-field>
								</v-flex>

						</v-layout>

						<v-layout row wrap pa-0>
							<v-divider></v-divider>
						</v-layout>

						<v-layout row wrap pa-0>
							
								<v-flex xs8 mt-3>
									<h4 class="font-weight-light">Total Price</h4>						  
								</v-flex>
								
								<v-flex xs4 mt-3>
									<h4 class="font-weight-light">$ 100.00</h4>						  
								</v-flex>

						</v-layout>

						<v-layout row wrap mt-5>
								<v-flex xs12>
									  <v-btn flat value="left" block class="v-btn--active green">
									  	<i class=""></i>
					                	<i class="ml-1 white--text font-weight-light subheading far fa-check-circle white--text"></i>
					                	<span class="ml-1 white--text font-weight-light subheading">Continue</span>
					             	</v-btn>
								</v-flex>
						</v-layout>
					</v-flex>

				</v-layout>


        	</v-container>
				
        </v-card>
      </v-dialog>
	</div>
</template>

<script>
	
	export default {

		data: () => ({
			paymentItems: ['Credit Card', 'Bank Transfer'],

		}),

		props: ({

			dialog: {
				type:Boolean,
				default:false
			}

		}),
		methods: {

			changeAdd: () => {
				alert('hehe')
			}

		}
	}

</script>



<style scoped lang="">

	.v-messages {
	    -webkit-box-flex: 1 !important;
	    -ms-flex: 1 1 auto !important;
	    flex: 1 1 auto !important;
	    font-size: 12px !important;
	    min-height: 0px !important;
	    min-width: 1px !important;
	    position: relative !important;
	}

</style>