<template>
<div>

      	<v-card class="minh-500" color="grey lighten-5">
		<v-toolbar color="grey darken-4" class="white--text" height="40px">
        	<v-toolbar-title class="subheading font-weight-light">Proposal List</v-toolbar-title>
			<v-spacer></v-spacer>

      	</v-toolbar>
		
		<v-card-text>
			
			<template v-if="inquiry.awarded && inquiry.awarded_to_me">
                <v-layout row wrap pa-0 mb-4>

                    <v-flex xs6>

                        <v-btn 
                            @click=""
                            block 
                            class="green darken-1 font-weight-light ">
                            <i class="fas fa-thumbs-up white--text"></i>
                            <span class="ml-1 white--text font-weight-light ">Confirm</span>
                        </v-btn>
                    </v-flex>

                    <v-flex xs6>
                       <v-btn 
                            @click=""
                            block 
                            class="red darken-2 font-weight-light ">
                            <i class="fas fa-thumbs-down white--text"></i>
                            <span class="ml-1 white--text font-weight-light ">Deny</span>
                        </v-btn>
                    </v-flex>
                    <v-flex xs12>
                		<v-layout row wrap>
		                    <v-flex xs4>
			                    <h5 class="font-weight-thin">Payment Method</h5>
			                    <h4 class="font-weight-bold">
									<h2 class="mb-0">
										{{ payment_methods.filter(obj=>obj.id==inquiry.payment_method_id)[0].name  }}
									</h2>
						      	</h4>
		                    </v-flex>
		                    <v-flex xs4>
			                    <h5 class="font-weight-thin">Shipping Address</h5>
			                    <h4 class="font-weight-bold">
									<h2 class="mb-0">
										{{ inquiry.shipping_address }}
									</h2>
						      	</h4>
		                    </v-flex>
		                    <v-flex xs4>
			                    <h5 class="font-weight-thin">Shipping Method</h5>
			                    <h4 class="font-weight-bold">
									<h2 class="mb-0">
										{{ shipping_methods.filter(obj=>obj.id==inquiry.shipping_method_id)[0].name  }}
									</h2>
						      	</h4>
		                    </v-flex>
		                    <v-flex xs4>
			                    <h5 class="font-weight-thin">Shipment Date</h5>
			                    <h4 class="font-weight-bold">
									<h2 class="mb-0">									
										{{ getDateTime('mmm dd, yyyy',inquiry.desired_shipping_date) }}

									</h2>
						      	</h4>
		                    </v-flex>
		                </v-layout>                    	
                    </v-flex>                           
                                   
                </v-layout>

			</template>

			<div v-for="bidItem in bidItems">
				<v-card class="mb-2 pa-2" :class="(bidItem.owned)?'blue lighten-5':''">
		   	 	   <v-layout row wrap class="pa-2">

		   	 	     	<v-flex xs6>
		   	 	     		<h3 class="text-xs-left ml-3">
		   	 	     			<span class="font-weight-light">Overall: </span>
		   	 	     			${{ bidItem.total_price}}
		   	 	     		</h3>
		   	 	     	</v-flex>
						
		   	 	     	<v-flex xs5>
							<h3 class="font-weight-light text-xs-left ml-3">
								${{ bidItem.price }} / piece
							</h3>
		   	 	     	</v-flex>						
		   	 	     	<v-flex xs1>
							<v-icon 
							v-if="bidItem.awarded"
							class="awarded orange--text">
								fas fa-award
							</v-icon>
		   	 	     	</v-flex>
		   	 	   </v-layout>
		   	 	</v-card>
			</div>

			<v-alert 
				:value="!bidItems.length"
				type="info" 
				style="width: auto;"
				class="ma-4"
				outline>
				No bids yet..
			</v-alert>

		</v-card-text>
	    </v-card>
		
		
		<!-- <bid-dialog :bidDialog.sync="bidDialog"> </bid-dialog> -->


</div>
</template>

<script>

	import InquiryDialog from "@/views/Components/App/Buyer/BuyerInquiryViewDialog"
	import BidDialog from "@/views/Components/App/Supplier/BidDialog"
	import inqEvntBs from "@/bus/inquiry";
	import helpers from "@/mixins/helpers";

	import config from "@/config/main";

	// import crono from 'vue-crono';
	import VueTimers from 'vue-timers/mixin'


	export default {
		mixins: [
	        helpers,
			VueTimers,
		],

		timers: [			
			{ 
				name: 'BidTableTimer',
				time: config.polling.bidTable.time, 
				immediate: true, 
				repeat: true,
				autostart: true,
	            callback: function(){
	                this.fillBidTable();
	            },
			}			
		],

		components: {
			InquiryDialog,
			BidDialog
		},

		props: {
			inquiry:{
				type:Object,
			},
			openInquiry : {
				type:Boolean,
			}
		},

	    data: ()=>({
			bidDialog:false,
			bidItems: [],
			payment_methods: config.payment_methods, 
			shipping_methods: config.shipping_methods, 
		}),

		methods: {

			fillBidTable(){

				this.$store.dispatch('spplrInq/getAllInquiryBids_a',{inq_id:this.inquiry.id})
				.then(response=>{
					// console.log(response);
					this.bidItems = response;
					this.bidItems.sort((a,b)=>{
						return a.total_price - b.total_price;
					});
				})
				.catch(error=>{
                    console.log(error);					
				});

			},

			testTimer(){
				console.log('testTimer');
			},


			updateTime: function () {
				setInterval(function () {
					this.displayTime = moment().format()
				}.bind(this), 1000);
			}

		},

	    created(){
	    	this.fillBidTable();
	        inqEvntBs.onBidFormSubmitted(this.fillBidTable);
	    },

	    mounted(){

	    },

	    watch: {
	    	
	    	inquiry: {
	    		handler(nVal,oVal){
			    	this.fillBidTable();
	    		},
	    		deep: true,
	    	},

	    	openInquiry(nVal) {
	    		if(nVal)
	       		this.$timer.start('BidTableTimer');
	       		else
	       		this.$timer.stop('BidTableTimer');
	    	}
	    },

	}
</script>



<style scoped lang="scss">

	.minh-500 {	
		min-height:300px;
		overflow-y: auto;
	}	
</style>