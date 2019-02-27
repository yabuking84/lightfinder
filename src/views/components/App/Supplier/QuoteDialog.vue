<template>

  <div class="text-xs-center">

    <v-dialog :value="QuoteDialog" @input="$emit('update:QuoteDialog', false)" width="600">
    	
      <v-toolbar dark color="dark" height="45">
			<v-toolbar-title class="font-weight-light">Add Quote</v-toolbar-title>
	  </v-toolbar>

      <v-card>

		<v-layout row wrap >
				<v-layout row wrap mt-2>
		  	  		<v-container>

			  	  		<v-flex xs12>
				          <v-text-field
				            label="Pruduct Name"
				            placeholder="Enter Product Name "
				          ></v-text-field>
				        </v-flex>

				        <v-flex xs12>
				          <v-textarea
				            label="Pruduct Details"
				            placeholder="Enter Product Details "
				          ></v-textarea>
				        </v-flex>

				        <v-layout row wrap >

				           <v-flex xs4 pa-2>

					          <v-text-field
					            label="Quantity"
					            placeholder="0"
					            disabled
					             suffix="Piece"
					          ></v-text-field>

					        </v-flex>
					        
					        <v-flex xs4 pa-2>
					          <v-text-field
					            label="Unit Price"
					            placeholder="0.00"
					             prefix="$"
					          ></v-text-field>
					        </v-flex>
				        
				      		 <v-flex xs4 pa-2>
						          <v-text-field
						            label="Total Price"
						            placeholder="0.00"
						             prefix="$"
						          ></v-text-field>
					         </v-flex>
				        </v-layout>

				         <v-flex xs12>
					          <v-textarea
					            label="Message"
					            placeholder="Enter Remarks Here"
					          ></v-textarea>
				      	 </v-flex>
		  	  		</v-container>
				</v-layout>
		</v-layout>

		 <v-divider></v-divider>

	 	<v-card-actions class="pa-3">
	       <v-spacer></v-spacer>
	        <v-btn color="primary" > Submit </v-btn>
	    </v-card-actions>

      </v-card>
    </v-dialog>
  </div>

</template>

<script>

  export default {
  	props: {
  		QuoteDialog: {
  			type:Boolean,
  			default:false,
  		}
  	},
    data () {
      return {

      }
    }
  }

</script>