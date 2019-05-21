<template>
	<v-alert 
	:value="(inquiry.stage_id==1005)?1:0"
	color="red darken-3" 
	style="width: auto; text-align:center; font-size:20px;"
	class="mb-2">
		Pending Payment!

		<template v-if="inquiry.etd != null && inquiry.eta != null">

		<v-card color="white darken-4 mt-3" class="black--text">
		    <v-card-title primary-title>
		        <div>
		            <v-layout row wrap>
		                <v-flex xs12>
		                    <div class="subheading">Shipment Details</div>
		                </v-flex>
		                <v-flex xs6>
		                    <span class="font-weight-light">
								<!-- Estimated Time Departure:  -->
								ETD: 
							</span>
		                    <br/>
		                    <span class="font-weight-medium">  
								{{  getDateTime('mmm dd, yyyy', inquiry.etd ) }} 
							</span>
		                </v-flex>
		                <v-flex xs6>
		                    <span class="font-weight-light">
								<!-- Estimated Time Arrival:  -->
								ETA: 
							</span>
		                    <br/>
		                    <span class="font-weight-medium">
								{{  getDateTime('mmm dd, yyyy', inquiry.eta ) }} 
							</span>
		                </v-flex>
		                <v-flex xs12>
					        <v-layout row wrap>

		                		<v-flex xs12 mt-3>
						        	<h3>PAY BY:</h3>
						        </v-flex>
		                		<v-flex xs6>
							        <v-btn block 
							        color="red darken-2" 
							        class="white--text payBtn">
							        	<v-icon class="mr-2">
								        	fas fa-money-check-alt
								        </v-icon>
							        	<h4>BANK TRANSFER</h4>
							        </v-btn>
							    </v-flex>
		                		<v-flex xs6>
							        <v-btn block 
							        color="red darken-2" 
							        class="white--text payBtn">
							        	<v-icon class="mr-2">
							        		far fa-credit-card
							        	</v-icon>
							        	<h4>CREDIT CARD</h4>
							        </v-btn>
							    </v-flex>

					    	</v-layout>		                	
		                </v-flex>
		            </v-layout>
		        </div>
		    </v-card-title>

		    <v-card-actions>
		    </v-card-actions>

		</v-card>

		</template>

	</v-alert>	
</template>
<script>
import helpers from "@/mixins/helpers";
export default {

    mixins: [
        helpers,
    ],

	props:[
		'inquiry',
	],

}	
</script>

<style scoped lang="scss">
.payBtn {
	height: 65px;
}
</style>