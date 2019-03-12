<template>
<div>

		<v-toolbar color="grey darken-4" class="white--text" height="40px">
        	<v-toolbar-title class="subheading font-weight-light">Proposal List</v-toolbar-title>
        	<v-spacer></v-spacer>
        	<!-- <v-toolbar-title class="subheading font-weight-light">You're Current Quote is $11.50</v-toolbar-title> -->

			<v-spacer></v-spacer>

			<!-- <v-toolbar-title @click="bidDialog=true" class="subheading font-weight-light">
				    <v-btn depressed small color="green" dark>
				    	<i class="fas fa-plus white--text mr-1"> </i>
						Set new bid price per unit
					</v-btn>
			</v-toolbar-title> -->

      	</v-toolbar>

      	<v-card class="minh-500" color="grey lighten-5">
			<v-container fluid grid-list-md>

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

			</v-container>
	    </v-card>
		
		
		<!-- <bid-dialog :bidDialog.sync="bidDialog"> </bid-dialog> -->


</div>
</template>

<script>

	import InquiryDialog from "@/views/Components/App/Buyer/BuyerInquiryViewDialog"
	import BidDialog from "@/views/Components/App/Supplier/BidDialog"
	import inqEvntBs from "@/bus/inquiry";

	import config from "@/config/main";

	// import crono from 'vue-crono';
	import VueTimers from 'vue-timers/mixin'


	export default {
		mixins: [VueTimers],

		timers: [			
			{ 
				name: 'BidTableTimer',
				time: config.polling.bidTable.time, 
				immediate: true, 
				repeat: true,
				autostart: true,
	            callback: function(){
	                console.log("BidTableTimer");
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

	    data: function () {

			return {
				bidDialog:false,
				bidItems: [],
			}
		},

		methods: {

			fillBidTable(){

				this.$store.dispatch('spplrInq/getAllInquiryBids_a',{inq_id:this.inquiry.id})
				.then(response=>{
					console.log(response);
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