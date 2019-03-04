<template>

  <div class="text-xs-center">

    <v-dialog :value="QuoteDialog" @input="$emit('update:QuoteDialog', false)" width="80%">
    	
      <v-toolbar dark color="dark" height="45">
			<v-toolbar-title class="font-weight-light">Add Quote</v-toolbar-title>
	  </v-toolbar>

      <v-card>

		<v-layout row wrap>
			<v-flex xs6>
				<v-layout row wrap>
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
			</v-flex>
			<v-flex xs6>
				<v-layout row wrap>
		  	  		<v-container>
                <v-layout row wrap>                	
				  	<v-flex xs8>
                		<v-layout row wrap>
		                    <v-flex shrink>
			                    <h5 class="font-weight-thin">Keywords </h5>
			                    <h4 class="font-weight-bold">
									<p class="mb-0">{{ inquiry.keyword }}</p>
						      	</h4>
		                    </v-flex>

					  	  	<v-flex shrink>
			                    <h5 class="font-weight-thin">Category</h5>
			                    <h4 class="font-weight-bold">                     	
			                    	<span style="text-transform:uppercase;">{{ inquiry.categories.join(', ') }}</span>
			                    </h4>
		                	</v-flex>

					  	  	<v-flex shrink>
			                    <h5 class="font-weight-thin">Quantity</h5>
			                    <h4 class="font-weight-bold">                     	
			                    	<span>{{ inquiry.quantity }} pcs</span>
			                    </h4>
		                	</v-flex>



		                    <v-flex xs12>
			                    <h5 class="font-weight-thin">Message </h5>
			                    <h4 class="font-weight-bold">                     	
									<p class="mb-0">{{ inquiry.message }}</p>
						      	</h4>
		                    </v-flex>

		                    <v-flex xs12>
			                    <h5 class="font-weight-thin">Attachments </h5>
		                        <img width="100px;" src="/static/examples/led-strip-lights-daaden-al-sl-1017-7777.jpg">
		                        <img width="100px;" src="/static/examples/led-strip-lights-dieburg-al-sl-1018-7778.jpg">
		                    </v-flex>
		                </v-layout>
	            	</v-flex>

	            	<v-flex xs4>
		                <v-layout row wrap>

		                    <!-- specification -->
		                    <v-flex xs12>
			                    <h5 class="font-weight-thin">Specifications</h5>
		                        <v-layout row wrap >
		                            <v-chip label dark outline text-color="black">Category: LED STRIP LIGHTS</v-chip>
		                            <v-chip label dark outline text-color="black">Warranty: 1 Years</v-chip>
		                            <v-chip label dark outline text-color="black">Power 180 </v-chip>
		                            <v-chip label dark outline text-color="black">Lumens: 190 </v-chip>
		                            <v-chip label dark outline text-color="black">Efficiency: 190</v-chip>
		                            <v-chip label dark outline text-color="black">Bean Angle: 190</v-chip>
		                            <v-chip label dark outline text-color="black">CCT: 190</v-chip>
		                            <v-chip label dark outline text-color="black">IP Rating: 190</v-chip>
		                            <v-chip label dark outline text-color="black">IP Rating: 190</v-chip>
		                            <v-chip label dark outline text-color="black">Finish: 190</v-chip>
		                            <v-chip label dark outline text-color="black">Size: 109</v-chip>
		                            <v-chip label dark outline text-color="black">Size: 109</v-chip>
		                            <v-chip label dark outline text-color="black">Size: 109</v-chip>
		                        </v-layout>
		                    </v-flex>
		                </v-layout>
	                </v-flex>

                </v-layout>

		  	  		</v-container>				
				</v-layout>
			
			</v-flex>
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

import helpers from "@/mixins/helpers";

export default {
    mixins: [
        helpers,
    ],

  	props: {
  		QuoteDialog: {
  			type:Boolean,
  			default:false,
  		},
  		inquiry: {
  			type:Object,
  		},

  	},
    data () {
      return {

      }
    }
}

</script>