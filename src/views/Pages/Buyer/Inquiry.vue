<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex>
					<v-container fluid>
					    <v-layout row>

					      <v-flex grow pa-1 lg8 >
					        <v-card color="white" class="propposed_field">
								<v-container>

									<v-flex xs8 offset-xs1>
										<h1 class="font-weight-light">Hello { Markie } ! Tell supplier what you want</h1>
									  	<h4 class="font-weight-light">The more data the more match supplier you get!</h4>  
									</v-flex>

									<v-divider></v-divider>
									
								  <!-- end -->

									<v-flex xs8 offset-xs1 >
										<v-layout row column mt-5>
										  		<v-flex xs5>
									  	  			<v-text-field  color="black" label="Specific Keyword for your Quotation" required></v-text-field>
									  	  			 <v-btn color="info">Next</v-btn> 
									  	  		</v-flex>
										</v-layout>
									</v-flex>


										<v-flex xs8 offset-xs1 >
										<v-layout row column mt-5>
										  		<v-flex xs5>
									  	  			   <v-select label="Choose Category" color="info" outline required></v-select>
									  	  			 <v-btn color="info">Next</v-btn> 
									  	  		</v-flex>
										</v-layout>
									</v-flex>



										<v-flex xs8 offset-xs1 >
										<v-layout row column mt-5>
										  		<v-flex xs5>
									  	  			<v-text-field  color="info" label="Specific Keyword for your Quotation" required></v-text-field>
									  	  			 <v-btn color="info">Next</v-btn> 
									  	  		</v-flex>
										</v-layout>
									</v-flex>



										<v-flex xs8 offset-xs1 >
										<v-layout row column mt-5>
										  		<v-flex xs5>
									  	  			<v-text-field  color="black" label="Specific Keyword for your Quotation" required></v-text-field>
									  	  			 <v-btn color="info">Next</v-btn> 
									  	  		</v-flex>
										</v-layout>
									</v-flex>


										<v-flex xs8 offset-xs1 >
										<v-layout row column mt-5>
										  		<v-flex xs5>
									  	  			<v-text-field  color="black" label="Specific Keyword for your Quotation" required></v-text-field>
									  	  			 <v-btn color="info">Next</v-btn> 
									  	  		</v-flex>
										</v-layout>
									</v-flex>


										<v-flex xs8 offset-xs1 >
										<v-layout row column mt-5>
										  		<v-flex xs5>
									  	  			<v-text-field  color="black" label="Specific Keyword for your Quotation" required></v-text-field>
									  	  			 <v-btn color="info">Next</v-btn> 
									  	  		</v-flex>
										</v-layout>
									</v-flex>


										<v-flex xs8 offset-xs1 >
										<v-layout row column mt-5>
										  		<v-flex xs5>
									  	  			<v-text-field  color="black" label="Specific Keyword for your Quotation" required></v-text-field>
									  	  			 <v-btn color="info">Next</v-btn> 
									  	  		</v-flex>
										</v-layout>
									</v-flex>

									<!-- end -->

								</v-container>
					        </v-card>
					      </v-flex>

					      <v-flex shrink pa-1 lg4>
					        <v-card color="white"class="proposed_quote" >
					          <v-card-text>Proposed Quote</v-card-text>
								<v-divider></v-divider>
								<v-container>
									<span>
										<h4 class="font-weight-medium">Keyword</h4>	
										<h5 class="font-weight-light">Light</h5>	
									</span>
								</v-container>
					        </v-card>
					      </v-flex>

					    </v-layout>
					  </v-container>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>




<script>


export default {
	data: () => ({
		
	}),

	components: {
	},

	computed: {

	},
}
	
</script>

<style scoped lang="stylus">
	.proposed_quote
		height: 82vh;
		max-height: 82vh;
		overflow-y: auto;
	.propposed_field
		height: 82vh;	
		max-height: 82vh;
		overflow-y: auto;
</style>



