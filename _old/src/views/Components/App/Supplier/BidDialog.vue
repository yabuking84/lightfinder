<template>
  <div class="text-xs-center">
    <v-dialog
      :value="bidDialog" 
       @input="$emit('update:bidDialog', false)" 
    	width="500"
    >

      <v-toolbar dark color="dark" height="45">
			<v-toolbar-title class="font-weight-light">Re-Bid</v-toolbar-title>
	  </v-toolbar>

      <v-card>

		      	<v-layout row column pa-4 justify-center>
		      	  <h1 class="subheading font-weight-light text-xs-center">Product Name: Patel Strip Lights</h1>
		      	  <h1 class="subheading font-weight-light text-xs-center">Current Bid Price: $100:00</h1>
		      	</v-layout>

				<v-divider></v-divider>

		        <v-layout row wrap >
				        
				        <v-flex xs8 offset-xs2 pa-2 mt-5>
				          <v-text-field
				            label="Unit Price"
				            placeholder="0.00"
				             prefix="$"
				             suffix="/Piece"
				          ></v-text-field>
				        </v-flex>

				        <v-flex xs8 offset-xs2 pa-2>
					           <v-flex xs12>
						          <v-textarea
						            label="Message"
						            placeholder="Enter Remarks Here"
						          ></v-textarea>
					        </v-flex>
				        </v-flex>

				</v-layout>

				<v-divider></v-divider>

		        <v-card-actions>
		          <v-spacer></v-spacer>
		          <v-btn color="primary">Submit</v-btn>
		        </v-card-actions>

      </v-card>
      
    </v-dialog>
  </div>

</template>

<script>
  export default {
  	props: {
  		bidDialog: {
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