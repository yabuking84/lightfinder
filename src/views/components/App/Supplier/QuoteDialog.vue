<template>
  <div class="text-xs-center">
    <v-dialog
      :value="QuoteDialog" 
       @input="$emit('update:QuoteDialog', false)" 
    	width="1000"
    >

      <v-toolbar dark color="dark" height="45">
			<v-toolbar-title class="font-weight-light">Add Quote</v-toolbar-title>
	  </v-toolbar>

      <v-card>
		<v-layout row wrap pa-3>
				<v-flex xs12>

					  <v-layout row wrap mb-2 mt-1>
				    		<h4 class="font-weight-bold"> Supplier : LED STRIPS LIGHTS</h4>	  
				    		<v-spacer></v-spacer>
				    		<h4 class="font-weight-bold">Quantity: 1000</h4>	  
				    		<v-spacer></v-spacer>
				    		<h4 class="font-weight-bold">Posted: Jan 1, 2017 (3 days ago)</h4>	

					   </v-layout>

					   <v-divider></v-divider>

				</v-flex>
							
			  	<v-flex xs9 mt-3>

					<v-layout row wrap>

						<v-flex xs2>
						  <h1 class="subheading font-weight-light">Product Name</h1>
						</v-flex>

				    	<v-flex xs7>
			  	  			<v-text-field solo color="black" label="Product Name" required></v-text-field>  
			  	  		</v-flex>

					</v-layout>
					

					<v-layout row wrap>

						<v-flex xs2>
						  <h1 class="subheading font-weight-light">Product Details</h1>
						</v-flex>

					  	<v-flex xs7>
		  	  			 <v-textarea
				          solo
				          name="input-7-4"
				          label="Details"
				          value=""
				        ></v-textarea>
		  	  		</v-flex>

					</v-layout>
					

				

				</v-flex>

				<v-flex xs3 mt-3>
					
				</v-flex>

		</v-layout>
		

    <!--     <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions> -->

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