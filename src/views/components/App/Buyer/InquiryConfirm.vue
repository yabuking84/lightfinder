<template>
	<div>
	<v-dialog :value="dialogConfirm" @input="$emit('update:dialogConfirm',false)" max-width="750px">
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

					<v-flex xs8>

						<h1 class="font-weight-light subheading">Payment Information</h1>

						<v-flex xs6>
								      
						</v-flex>

						<v-flex xs6>
								      
						</v-flex>	

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
									<h4 class="font-weight-light">100.00</h4>						  
								</v-flex>

						</v-layout>

						<v-layout row wrap mt-3>
								<v-flex xs12>
									  <v-btn flat value="left" block class="v-btn--active green">
					                	<i class="ml-1 white--text font-weight-light subheading far fa-edit white--text"></i>
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

		}),

		props: ({

			dialogConfirm: {
				type:Boolean,
				default:false
			}
		})
	}

</script>