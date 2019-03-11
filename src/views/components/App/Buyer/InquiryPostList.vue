<template>
	<div>

		<v-toolbar color="grey darken-4" class="white--text" height="40px">
        	<v-toolbar-title class="subheading font-weight-light">Bids</v-toolbar-title>
      	</v-toolbar>

      	<v-card color="grey lighten-5">
					
			<v-card-text>

				  	<v-card class="mb-3"  v-for="(bidItem, i) in bidItems" :key="'bidItem_'+i">
						<v-card-text>
							<v-layout row wrap>

								<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
								<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->					
									<v-flex xs5>
										<image-gallery-small no-thumbnails height="200px"></image-gallery-small>
									</v-flex>

									<v-flex xs7>
										<v-layout row wrap>
							  	  		<!-- <v-container> -->
								  	  		<v-flex xs12 pl-2>
								  	  			<h5 class="font-weight-thin">Product name</h5>
								  	  			<h2>{{ bidItem.product_name }}</h2>
									        </v-flex>

								  	  		<v-flex xs12 pt-0 pl-2>
								  	  			<h3 class="font-weight-regular">{{ bidItem.description }}</h3>
									        </v-flex>

								  	  		<v-flex xs12>
									        <v-layout row wrap >
									           	<v-flex xs4 pa-2>
									  	  			<h5 class="font-weight-thin">Quantity</h5>
									  	  			<h3>{{ inquiry.quantity }} pcs</h3>
										        </v-flex>
										        
										        <v-flex xs4 pa-2>					          	
									  	  			<h5 class="font-weight-thin">Unit Price</h5>
									  	  			<h3>${{ bidItem.price }}</h3>
										        </v-flex>
									        
									      		<v-flex xs4 pa-2>
									  	  			<h5 class="font-weight-thin">Total Price</h5>
									  	  			<h2>${{ bidItem.total_price }}</h2>					          	
										        </v-flex>
									        </v-layout>
									        </v-flex>

									         <v-flex xs12 pt-0>
									  	  		<h5 class="font-weight-thin">Remarks</h5>
									  	  		<h4>
									  	  			<p class="mb-0">{{ bidItem.remarks }}</p>
									  	  		</h4>
									      	 </v-flex>
							  	  		<!-- </v-container> -->
										</v-layout>
									</v-flex>
								<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
								<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->

							</v-layout>

						</v-card-text>
		   	 	   	  	<v-divider></v-divider>
		   	 	   	   	<v-card-actions>

				   	 	    		<h5 class="font-weight-light">January 6, 2017 10:00 AM</h5>
				   	 	   			<v-spacer></v-spacer>

				   	 	     		<v-btn 
				   	 	     			class="green darken-1" 
				   	 	     			@click="openAwardBid(bidItem)"> 
				   	 	     			<i class="fas fa-award white--text"></i>
				   	 	     			<span class="font-weight-light ml-1 white--text" >Award</span>
								    </v-btn> 
								    <!-- <v-btn class="orange darken-3" @click="dialog = true">
									    <i class="fas fa-tasks white--text"></i>
									    <span class="font-weight-light ml-1 white--text" >Request Sample</span>
								    </v-btn>  -->

				   	 	</v-card-actions>
		   	 		</v-card>



					<!-- <v-layout row wrap> -->
					<v-layout align-center justify-center row fill-height  v-if="!bidItems.length">
						<v-flex xs12>
							<v-alert 
								:value="true"
								type="info" 
								style="width: auto;"
								class="ma-4"
								outline>
								No Quote yet..
							</v-alert>
						</v-flex>
					</v-layout>
			  
			</v-card-text>

	    </v-card>

		<inquiry-confirm :openAwardDialog.sync="openAwardDialog" :bid="bidToAward"> </inquiry-confirm>

	</div>

</template>

<script>

import ImageGallerySmall from "@/views/Components/App/ImageGallerySmall"
import InquiryConfirm from "@/views/Components/App/Buyer/InquiryConfirm"


export default {

components: {
	InquiryConfirm,
	ImageGallerySmall,
},

props: ['inquiry'],

data: function () {
	return {
		openAwardDialog: false,
		bidItems: [],
		hasBid: true,
		bidToAward: null,

	}
},

methods: {
	fillBidTable(){

		this.$store.dispatch('byrInq/getAllInquiryBids_a',{inq_id:this.inquiry.id})
		.then(response=>{
			console.log(response);
			this.bidItems = response;
			this.bidItems.sort((a,b)=>{
				// return b.total_price - a.total_price;
				return a.total_price - b.total_price;
			});
		})
		.catch(error=>{
            console.log(error);					
		});
	},

	openAwardBid(bid){
		this.bidToAward = bid;
		this.openAwardDialog = true;
	},

},

created(){
	this.fillBidTable();
},

watch: {

	inquiry: {
		handler(nVal,oVal){
	    	this.fillBidTable();
		},
		deep: true,
	},

},

}
</script>



<style scoped lang="scss">
	.proposal-section {	
		max-height:80vh;
		overflow-y: auto;
	}

	.minh-400 {
		min-height: 400px;
	}
</style>